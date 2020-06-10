const express = require('express')
const app = express()

const bodyParser = require('body-parser');
const router = require('./routes/router')
const connectDB = require("./DB/connection");
const cors = require('cors')
const PORT = process.env.PORT || 5000


app.use(cors())


require('dotenv').config()
app.use(bodyParser.json())
app.use('/api', router)

connectDB() //Database connection

//start server
app.listen(PORT, () => console.log('Server is running & up !'))