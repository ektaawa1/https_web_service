import express from 'express';

//const express = require('express')

const startup = express.Router()

//get request
startup.get('/',(req, res) => {
    res.send(`It's Working!!`)
})

startup.get('/alive',(req,res) => {
    res.send('HTTPS-WEB-SERVICE is Alive')
})

//to export this startup.js file in index.js
//commonJS format
//module.exports = startup

//ES Modules Format
export default startup