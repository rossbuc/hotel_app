import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [events, setEvents] = useState([])
  const [bookings, setBookings] = useState([])
  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    checkedIn: null,
  })

  // const watchChanges = async () => {
  //   for await (const change of bookingsCollection.watch()) {
  //     setEvents([...events, change])
  //   }
  // }

  const fetchBookings = () => {
    fetch('http://localhost:9000/api/bookings/')
    .then((res) => res.json())
    .then((data) => setBookings(data))
  }

  useEffect(() => {
    fetchBookings()
    // watchChanges()
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

  const handleCheckIn = async (id) => {
    const bookingToCheckIn = bookings.find((booking) => booking._id === id)
    bookingToCheckIn.checkedIn ? bookingToCheckIn.checkedIn = false : bookingToCheckIn.checkedIn = true
    delete bookingToCheckIn._id
    console.log(bookingToCheckIn)

    await fetch(`http://localhost:9000/api/bookings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bookingToCheckIn),
      headers: { 'Content-Type' : 'application/json' }
    })
    // .then(setTimeout(fetchBookings(), 1000))

    setTimeout(() => {
      fetchBookings()
      console.log("im fetching")
    }, 50)
  }

  const bookingsGrid = bookings.map((booking) => {
    return (
      <div key={booking._id}>
        <h2>{booking.guestName}</h2>
        <h3>{booking.guestEmail}</h3>
        <button onClick={() => handleCheckIn(booking._id)}>{booking.checkedIn ? "Check Out" : "Check In"}</button>
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
