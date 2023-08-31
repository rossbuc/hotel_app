import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [bookings, setBookings] = useState([])

  const fetchBookings = () => {
    fetch('http://localhost:9000/api/bookings/')
    .then((res) => res.json())
    .then((data) => setBookings(data))
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const bookingsGrid = bookings.map((booking) => {
    console.log(booking)
    return (
      <div key={booking._id}>
        <h2>{booking.guestName}</h2>
        <h3>{booking.guestEmail}</h3>
        <button>Check Out</button>
        <button>Delete</button>
      </div>
    )
  })

  return (
    <>
      <h1>Bookings List</h1>
      {bookingsGrid}
    </>
    
  )

}

export default App
