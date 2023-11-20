const router = require('express').Router();
const climate_http = require('./controler_http.js');
// 
router.get('/climate/latest', climate_http.getDataclimate);// route request to respond lastest 100 data microclimate_petengoran
router.get('/climate/latest2', climate_http.getDataclimate2);// route request to respond lastest 100 data microclimate_petengoran2
router.get('/climate/tabel', climate_http.getDataTabel);// route request to respond lastest tabel microclimate_petengoran
router.get('/climate/tabel2', climate_http.getDataTabel2);// route request to respond lastest tabel microclimate_petengoran2

// // 
router.get('/climate/chart/temperature', climate_http.getDataCharttemperature); // route req to get Chart temperature
router.get('/climate/chart/humidity', climate_http.getDataCharthumidity);// route req to res Chart humidity
router.get('/climate/chart/rainfall', climate_http.getDataChartrainfall); // // route req to res Chart rainfall
router.get('/climate/chart/wind_direction', climate_http.getDatatChartwind_direction); // // route req to res line chart wind_direction 
router.get('/climate/chart/wind_direction_degrees', climate_http.getDataCharttwind_direction_degrees);// route req to res line chart wind_direction_degrees
router.get('/climate/chart/wind_speed', climate_http.getDataChartwind_speed);// route req to res line chart wind_speed
router.get('/climate/chart/water_temperature', climate_http.getDataChartwater_temperature);// route req to res Chart water_temperature 
router.get('/climate/chart/irradiation', climate_http.getDataChartirradiation);// route req to res Chart irradiationr 
router.get('/climate/chart/CO', climate_http.getDataChartCO);// route req to res data Chart CO
router.get('/climate/chart/CH4', climate_http.getDataChartCH4);// route req to res data Chart CH4
router.get('/climate/chart/C2H5OH', climate_http.getDataChartC2H5OH);// route req to res Chart C2H5OH
router.get('/climate/chart/H2', climate_http.getDataChartH2);// route req to res Chart H2
router.get('/climate/chart/NH3', climate_http.getDataChartNH3);// route req to res Chart NH3
router.get('/climate/chart/NO2', climate_http.getDataChartNO2);// route req to res Chart NO2
router.get('/climate/chart/temperature_2', climate_http.getDataCharttemperature2); // route req to get Charttemperature 2
router.get('/climate/chart/humidity_2', climate_http.getDataCharthumidity2);// route req to res Chart humidity 2
router.get('/climate/chart/rainfall_2', climate_http.getDataCharrainfall2); // // route req to res Chart rainfall 2
router.get('/climate/chart/wind_direction_2', climate_http.getDataChartwind_direction2); // // route req to res line chart wind_direction 2
router.get('/climate/chart/wind_direction_degrees_2', climate_http.getDataChartwind_direction_degrees2);// route req to res line chart wind_direction_degrees 2
router.get('/climate/chart/wind_speed_2', climate_http.getDataChartwind_speed2);// route req to res line chart wind_speed 2
router.get('/climate/chart/irradiationr_2', climate_http.getDataCharttirradiation2);// route req to res Chart irradiationr 2
router.get('/climate/chart/CO_2', climate_http.getDataChartCO2);// route req to res data Chart CO 2
router.get('/climate/chart/CH4_2', climate_http.getDataChartCH42);// route req to res data Chart CH4 2
router.get('/climate/chart/C2H5OH_2', climate_http.getDataChartC2H5OH2);// route req to res Chart C2H5OH 2
router.get('/climate/chart/H2_2', climate_http.getDataChartH22);// route req to res Chart H2 2
router.get('/climate/chart/NH3_2', climate_http.getDataChartNH32);// route req to res Chart NH3 2
router.get('/climate/chart/NO2_2', climate_http.getDataChartNO22);// route req to res Chart NO2 2

// // 
router.get('/climate/accumulation/getRainfallAccumulation', climate_http.getRainfallAccumulation);// route req to res get Rainfall Accumulation
router.get('/climate/accumulation/DailyRainfallAccumulation', climate_http.getDailyRainfallAccumulation);// route req to res get daily rainfall accumulation
router.get('/climate/accumulation/getRainfallAccumulation_2', climate_http.getRainfallAccumulation2);// route req to res get Rainfall Accumulation 2
router.get('/climate/accumulation/getDailyRainfallAccumulation_2', climate_http.getDailyRainfallAccumulation2);// route req to res get Daily Rainfall Accumulation 2

module.exports = router;


