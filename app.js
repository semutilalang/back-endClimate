"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const http = require('http');
const https = require('https');
require('dotenv').config()

const privateKey = fs.readFileSync('/etc/letsencrypt/live/vps.isi-net.org/privkey.pem','utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/vps.isi-net.org/cert.pem','utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/vps.isi-net.org/chain.pem','utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
  ca: ca
};

const api = express();
api.use(bodyParser.urlencoded({ extended: false }))
api.use(bodyParser.json())
api.use(cors({
    origin:['*']
}));


// CHECK for database. create if database not exist terminal 1
const dbase_climate = require('./BE_climate/database_config.js'); 
dbase_climate.query(`CREATE TABLE IF NOT EXISTS rainfall_hour (
  time TIMESTAMP NOT NULL, 
  rainfall_hour float)
  `, function(err, result){
    console.log("Database climate Connected");
  });

dbase_climate.query(`CREATE TABLE IF NOT EXISTS rainfall_daily (
  time TIMESTAMP NOT NULL,  
  rainfall_daily float)
  `, function(err, result){
    console.log("Database climate Connected");
  });


// CHECK for database. create if database not exist terminal 2
dbase_climate.query(`CREATE TABLE IF NOT EXISTS rainfall_hour_2 (
  time TIMESTAMP NOT NULL, 
  rainfall_hour float)
  `,function(err, result){
    console.log("Database climate Connected");
  });

dbase_climate.query(`CREATE TABLE IF NOT EXISTS rainfall_daily_2 (
  time TIMESTAMP NOT NULL,  
  rainfall_daily float)
  `, function(err, result){
    console.log("Database climate Connected");
  });
  
// convert to wib
  function convertToWIB(date) {
    // Your logic for converting date to WIB (Western Indonesian Time) here
    // Example: Assuming date is in UTC and you want to convert it to WIB
    const wibOffset = 7; // WIB is UTC+7
    const wibDate = new Date(date.getTime() + wibOffset * 60 * 60 * 1000);
    return wibDate;
  }
  
  module.exports = { convertToWIB };
// API HANLDING FOR PETENGORAN
const climate_appRoute = require('./BE_climate/route.js');
api.use('/', cors(), climate_appRoute);

api.use('/', cors(), (req, res) => {
    res.status(404);
    res.send('404 Not Found'); // respond 404 if not available
});  

// Starting both http & https servers
// const httpServer = http.createServer(api);
const httpsServer = https.createServer(credentials, api);
//const httpsServer = https.createServer(credentials, api);
//
httpsServer.listen(process.env.API_PORT, () => {
	console.log(`HTTP REST-API running on port ${process.env.API_PORT}`);
});

// httpsServer.listen(4443, () => {
// 	console.log('HTTPS REST-API running on port 4443');
// });
