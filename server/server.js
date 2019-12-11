const path = require('path')
const express = require('express')
const app = express()

const buildPath = path.join(__dirname, '..', 'build')

app.use(express.static('build'))

app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'))
})

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})