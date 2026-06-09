const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 3000;
const userRouters = require('./routes/user.routes');
const flightsRouters = require('./routes/flights.routes');


app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/aeroDB')
    .then(()=> console.log('Connected to MongoDB'))
    .catch(err=> console.error('Could not connect to MongoDB', err));


app.use('/auth', userRouters);
app.use('/flights', flightsRouters);

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});