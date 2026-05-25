import React, { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_USER_KEY = 'ride_demo_user'
const STORAGE_CURRENT_USER_KEY = 'ride_demo_current_user'

const defaultBookings = [
  {
    id: 1,
    date: '2024-01-15',
    pickup: 'Downtown Mall',
    dropoff: 'Airport Terminal',
    fare: 45.5,
    status: 'completed',
    driver: 'Ahmed Khan'
  },
  {
    id: 2,
    date: '2024-01-14',
    pickup: 'City Center',
    dropoff: 'Hotel XYZ',
    fare: 32.75,
    status: 'completed',
    driver: 'Mohammed Ali'
  }
]

const AuthContext = createContext(null)

const readUser = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_USER_KEY)) || null
  } catch (error) {
    return null
  }
}

const readCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_CURRENT_USER_KEY)) || null
  } catch (error) {
    return null
  }
}

export const getDemoBookings = (phone) => {
  if (!phone) return []
  const historyKey = `demo_history_${phone}`
  try {
    const stored = JSON.parse(localStorage.getItem(historyKey))
    if (stored && Array.isArray(stored)) {
      return stored
    }
  } catch (error) {
    // ignore parse errors
  }
  localStorage.setItem(historyKey, JSON.stringify(defaultBookings))
  return defaultBookings
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const user = readCurrentUser()
    if (user) {
      setCurrentUser(user)
      setIsLoggedIn(true)
    }
  }, [])

  const registerUser = ({ phone, password, name, email }) => {
    if (!phone || !phone.startsWith('+974')) {
      return { success: false, message: 'Phone number must start with +974.' }
    }
    if (!password || password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters.' }
    }
    const storedUser = readUser()
    if (storedUser && storedUser.phone !== phone) {
      return { success: false, message: 'A demo user already exists with a different phone number.' }
    }

    const user = {
      phone,
      password,
      name: name || 'Demo User',
      email: email || `${phone.replace('+', '')}@demo.com`
    }

    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user))
    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify({
      phone: user.phone,
      name: user.name,
      email: user.email
    }))
    localStorage.setItem(`demo_history_${phone}`, JSON.stringify(defaultBookings))

    setCurrentUser({ phone: user.phone, name: user.name, email: user.email })
    setIsLoggedIn(true)

    return { success: true }
  }

  const loginUser = ({ phone, password }) => {
    const storedUser = readUser()
    if (!storedUser) {
      return { success: false, message: 'No demo user registered yet.' }
    }
    if (storedUser.phone !== phone || storedUser.password !== password) {
      return { success: false, message: 'Invalid phone number or password.' }
    }

    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify({
      phone: storedUser.phone,
      name: storedUser.name,
      email: storedUser.email
    }))
    setCurrentUser({
      phone: storedUser.phone,
      name: storedUser.name,
      email: storedUser.email
    })
    setIsLoggedIn(true)
    getDemoBookings(phone)

    return { success: true }
  }

  const logoutUser = () => {
    localStorage.removeItem(STORAGE_CURRENT_USER_KEY)
    setCurrentUser(null)
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ currentUser, isLoggedIn, registerUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
