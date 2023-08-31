const express = require('express')
const cors = require('cors')
const createRouter = require('./helpers/createRouter')
const MongoClient = require('mongodb')

const app = express()
app.use(express.json())
app.use(cors())

MongoClient.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true })
    .then((client) => {
        const database = client.db('hotel')
        const bookingsCollection = database.collection('bookings')
        const bookingsRouter = createRouter(bookingsCollection)
        app.use('/api/bookings', bookingsRouter)
    })
    .catch((err) => {console.log(err)})

app.listen(9000, function () {
    console.log(`Listening on port ${this.address().port}`)
})