import express from 'express';
import { getZipCode } from '../controller/getZipCode.js';
import { getLoggerInstance } from '../logger.js';
//const express = require('express')

const location = express.Router()

const logger = getLoggerInstance()

//get request
location.get('/user-location', async(req, res) => {
    logger.info('Entering user-location routes')
    //console.log(req)

    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const userInformation = await getZipCode(userIp)
    const userDevice = req.header('User-Agent')

    console.log(userInformation, 'userInformation')

    res.json({userIp: userIp, userDevice: userDevice, userInformation: userInformation})

    logger.info('Exiting user-location routes')
})


//module.exports = location

//ES Modules Format
export default location