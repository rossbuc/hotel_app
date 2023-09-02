import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [bookings, setBookings] = useState([])
  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    checkedIn: null,
  })

  const fetchBookings = () => {
    fetch('http://localhost:9000/api/bookings/')
    .then((res) => res.json())
    .then((data) => setBookings(data))
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const handleFormChange = (e) => {
    const newFormData = Object.assign({}, formData)
    newFormData[e.target.name] = e.target.value
    newFormData["checkedIn"] = e.target.checked
    setFormData(newFormData)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:9000/api/bookings/', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {'Content-Type': 'application/json'}
    })
    .then((res) => res.json())
    .then((data) => setBookings([...bookings, data]))
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:9000/api/bookings/${id}`, {
      method: 'DELETE'
    })
    .then((res) => res.json())
    .then(setBookings(bookings.filter((booking) => booking._id !== id)))
  }

  const handleCheckIn = (booking) => {
    booking.checkedIn ? booking.checkedIn = false : booking.checkedIn = true
    console.log("This is the booking in the function")
    console.log(booking)

    fetch(`http://localhost:9000/api/bookings/${booking._id}`, {
      method: 'PUT',
      body: JSON.stringify({...booking}),
      headers: { 'Content-Type' : 'application/json' }
    })
    .then(fetchBookings())
  }

  const bookingsGrid = bookings.map((booking) => {
    console.log("This is the booking in the map")
    console.log(booking)
    return (
      <div key={booking._id}>
        <h2>{booking.guestName}</h2>
        <h3>{booking.guestEmail}</h3>
        <button onClick={() => handleCheckIn(booking)}>{booking.checkedIn ? "Check Out" : "Check In"}</button>
        <button onClick={() => handleDelete(booking._id)}>Delete</button>
      </div>
    )
  })

  return (
    <>
      <h1>Add Booking</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="guestName">Guest Name:</label>
          <input type="text" name="guestName" value={formData.guestName} onChange={handleFormChange}/>
        </div>
        <div>
          <label htmlFor="guestEmail">Guest Email:</label>
          <input type="text" name="guestEmail" value={formData.guestEmail} onChange={handleFormChange}/>
        </div>
        <div>
          <label htmlFor="checkedIn">Checked In:</label>
          <input type="checkbox" name="checkedIn" value="true" onChange={handleFormChange}/>
        </div>
        <button type="submit">Add Booking</button>
      </form>
      <h1>Bookings List</h1>
      {bookingsGrid}
    </>
    
  )

}

export default App
