
import https from 'https';
import axios from 'axios';
import { IP2LOCATION_API_KEY } from "../settings.js"

export const getZipCode = (userIp) => {
    //call ip2location endpoint
    const ip2locationUrl = `https://api.ip2location.io/?key=${IP2LOCATION_API_KEY}&ip=${userIp}`

    //Using Promises and HTTPS
    /*return new Promise((resolve, reject) => {
        https.get(ip2locationUrl, (response) => {

            let data = '';
            response.on('data', (chunk) => {
                data += chunk
            })

            response.on('end', () => {
                try{
                    const parseData = JSON.parse(data)
                    resolve(parseData)
                }catch(error){
                    reject(error)
                }
            }).on('error', (error) => {
                reject(error)
            })
        })
    })*/

    //Using Axios
    return axios.get(ip2locationUrl)
    .then(response => response.data)
    .catch(error => {throw error}) //or {console.log(error)}
}