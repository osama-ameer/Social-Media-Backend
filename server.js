const express = require('express')
const app = express()
const connectDB = require('./config/db')

app.use(express.json({ extended: false })) // To use JSON on server

connectDB();
const PORT = process.env.PORT || 5000

app.get("/" , (req,res) => {
    res.json({
        msg: "This is social App"
    })
})

// APIs
app.use("/api/auth", require('./rotues/auth'))
app.use('/api/users', require('./rotues/users'))
app.use('/api/posts', require('./rotues/posts'))


app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})