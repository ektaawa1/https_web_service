import cors from 'cors';
import express from 'express';
import https from 'https';
import fs from 'fs';
import 'dotenv/config'
import startup from './routes/startup.js';
import classSchedule from './routes/classSchedule.js';
import location from './routes/location.js';
import studentInfo from './routes/springStudentInfo.js';
import { IP2LOCATION_API_KEY } from './settings.js';
import { getLoggerInstance } from './logger.js';
//if you want to import a particular file/module then you can import this way-
//import { readFileSync } from 'fs';

//const express = require('express') //CommonJS format
//const https = require('https')
//const fs = require('fs')
//const startup = require('./routes/startup')
//const classSchedule = require('./routes/classSchedule')
//const location = require('./routes/location')
//const studentInfo = require('./routes/springStudentInfo')

const logger = getLoggerInstance()

const app = express()
// const cert = fs.readFileSync('./ssl/cert.pem')
// const key = fs.readFileSync('./ssl/key.pem')

//also you can write the above 2 lines like this-
const httpsOptions = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem'),
    passphrase: '1234'
}

const server = https.createServer(httpsOptions,app)
app.use(cors()) //now our api can be used in any port
app.use(express.json())
app.use('/https-web-service/v1', startup)
app.use('/https-web-service/v1', classSchedule)
app.use('/https-web-service/v1', location)
app.use('/https-web-service/v1', studentInfo)
// domain-name/web-service/v1/<route/path/endpoint>
// example-
// safeway.com/order-purchases/v1/purchaseHistory

console.log(IP2LOCATION_API_KEY)


server.listen(8080, () => {
    logger.info('Server is up')
    //console.log('Server is up')
})
