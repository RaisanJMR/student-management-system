const dotenv = require('dotenv').config()
const express = require('express')
const colors = require('colors')
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler')
const connectDB = require('./config/db')
const userRouter = require('./routes/userRoutes')
const studentRouter = require('./routes/studentRoutes')
connectDB()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 8080
app.use(cors());

app.use('/api/users', userRouter)
app.use('/api/students', studentRouter)

app.get('/', (req, res) => {
    res.send('api is running...')
})

app.use(errorHandler)
app.listen(PORT, () =>
    console.log(
        `Server Running on Port: http://localhost:${PORT} at ${new Date().toLocaleString(
            'en-US'
        )}`.bgCyan.bold.underline
    )
)