const express = require('express');
const connectDB = require('./config/db');


const app = new express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`listening on port ${PORT}`))



// connect DB
connectDB();


// init middleware
app.use(express.json({ extended: false }))



// define routes
app.use('/api/users', require('./routes/users'))
app.use('/api/contacts', require('./routes/contacts'))
app.use('/api/auth', require('./routes/auth'))
