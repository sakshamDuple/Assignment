const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');


const Connect = async () => {
    try {
        const con = await mongoose.connect('mongodb://localhost:27017/myapp', {
            useUnifiedTopology: true,
        })
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
Connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/bike-booking/', require('./routes/bookingRoutes'))


app.listen(PORT, () => { 
    console.log("Server started at http://localhost:8000");
})