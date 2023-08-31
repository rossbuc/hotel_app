use hotel;
db.dropDatabase();

db.bookings.insertMany([
    {
        guestName: "Barry White",
        guestEmail: "barrywhite@smoosh.com",
        checkedIn: true,
    },
    {
        guestName: "John Candy",
        guestEmail: "planestrainsandbusses@stevemartain.com",
        checkedIn: false,
    },
    {
        guestName: "Jeff Lebowski",
        guestEmail: "dueduedue@thedude.com",
        checkedIn: true,
    }
])