const express = require('express')
const app = express()

const PORT = 5000

app.use(express({ extended: false })) // To use JSON on server

app.get('/', (req,res) => {
    res.json({msg: "Hello world!"})
})

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})