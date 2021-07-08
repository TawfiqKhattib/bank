const express = require('express')
const path = require('path')
const api = require('../src/routes/api')
const mongoose = require('mongoose')

const app = express()
const port = 3500
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})
// Mongoose setup
mongoose.connect( process.env.CLEARDB_DATABASE_URL ||'mongodb://localhost/tranactions', { useNewUrlParser: true, useUnifiedTopology: true })

// const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);
app.use(express.static(path.join(__dirname, 'build')));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use('/', api);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port, function() {
    console.log(`Running server on port ${port}`)
})