import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './AdminDashboard.css'

const AdminDashboard = () => {
  const [stats] = useState({
    totalUsers: 1240,
    totalDrivers: 320,
    totalBookings: 5680,
    totalRevenue: 125400.50
  })

  const [chartData] = useState([
    { name: 'Jan', bookings: 400, revenue: 2400 },
    { name: 'Feb', bookings: 300, revenue: 1398 },
    { name: 'Mar', bookings: 500, revenue: 9800 },
    { name: 'Apr', bookings: 450, revenue: 3908 },
    { name: 'May', bookings: 600, revenue: 4800 },
  ])

  const [recentBookings] = useState([
    { id: 1, user: 'John Doe', driver: 'Ahmed Khan', fare: 45.50, status: 'completed' },
    { id: 2, user: 'Jane Smith', driver: 'Mohammed Ali', fare: 32.75, status: 'completed' },
    { id: 3, user: 'Bob Wilson', driver: 'Hassan Ibrahim', fare: 28.00, status: 'pending' }
  ])

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-value">{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Drivers</h3>
          <p className="stat-value">{stats.totalDrivers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Bookings</h3>
          <p className="stat-value">{stats.totalBookings}</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">${stats.totalRevenue}</p>
        </div>
      </div>

      <div className="chart-section">
        <h2>Monthly Statistics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="bookings" fill="#8884d8" />
            <Bar dataKey="revenue" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="recent-bookings">
        <h2>Recent Bookings</h2>
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User</th>
              <th>Driver</th>
              <th>Fare</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentBookings.map((booking) => (
              <tr key={booking.id}>
                <td>#{booking.id}</td>
                <td>{booking.user}</td>
                <td>{booking.driver}</td>
                <td>${booking.fare}</td>
                <td><span className={`status ${booking.status}`}>{booking.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="management-section">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="action-btn">View All Users</button>
          <button className="action-btn">View All Drivers</button>
          <button className="action-btn">View All Bookings</button>
          <button className="action-btn">Settings</button>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
