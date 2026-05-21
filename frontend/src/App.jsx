import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Booking from './pages/Booking'
import BookingHistory from './pages/BookingHistory'
import Profile from './pages/Profile'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/history" element={<BookingHistory />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App
