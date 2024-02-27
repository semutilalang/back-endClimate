
const path = require('path');
const moment = require('moment');
const {Pool} = require('pg')
const { off } = require('process');
const { start } = require('repl');
const { runInThisContext } = require('vm');
const { convertToWIB } = require('./convertToWIB');

require('dotenv').config()
require('fs');
const dbase_rest= new Pool({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_climate
})
  
dbase_rest.connect();
module.exports = {

    // HTTP HANDLING climate 1
    // Respond request to give latest 10 data
    async getDataclimate(req, res) {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Mendapatkan bulan saat ini
        const currentYear = currentDate.getFullYear();    
        // Mendapatkan tanggal 6 jam sebelumnya
        const sixHoursAgo = new Date(currentDate.getTime() - 6 * 60 * 60 * 1000);
        // Menggunakan kondisi WHERE untuk memfilter data
        const query = `
            SELECT 
                to_char(timestamp, 'DD-MM-YYYY HH24:MI:SS') as time,  
                temperature, 
                humidity, 
                rainfall, 
                wind_direction,
                wind_direction_degrees,
                wind_speed,
                water_temperature,
                irradiation,
                CO,
                CH4,
                C2H5OH,
                H2,
                NH3,
                NO2
            FROM 
            microclimate_petengoran1
            WHERE
            (EXTRACT(MONTH FROM timestamp) = $1 AND EXTRACT(YEAR FROM timestamp) = $2)
            OR
            (EXTRACT(MONTH FROM timestamp) = $3 AND EXTRACT(YEAR FROM timestamp) = $4 AND timestamp >= $5)
            ORDER BY 
                id DESC 
            LIMIT 15 
        `;
     
        const data = await dbase_rest.query(query, [currentMonth, currentYear, currentMonth - 1, currentYear, sixHoursAgo]);
    
        res.status(200);
        res.send({
            count: data.rowCount,
            result: data.rows,
        });
        
        console.log("[REST-API climate] GET: 15 NEW DATA FOR TABEL");
        return data;
    },

    //  MENDAPATKAN 10 DATA TERBARU UNTUK TABEL 
    async getDataTabel(req, res) {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Mendapatkan bulan saat ini
        const currentYear = currentDate.getFullYear();    
        // Mendapatkan tanggal 6 jam sebelumnya
        const sixHoursAgo = new Date(currentDate.getTime() - 6 * 60 * 60 * 1000);
        // Menggunakan kondisi WHERE untuk memfilter data
        const query = `
            SELECT 
                to_char(timestamp, 'DD-MM-YYYY HH24:MI:SS') as time, 
                temperature, 
                humidity, 
                rainfall, 
                wind_direction,
                wind_direction_degrees,
                wind_speed,
                water_temperature,
                irradiation,
                CO,
                CH4,
                C2H5OH,
                H2,
                NH3,
                NO2
            FROM 
            microclimate_petengoran1
            WHERE 
                (EXTRACT(MONTH FROM timestamp) = $1 AND EXTRACT(YEAR FROM timestamp) = $2) OR
                (EXTRACT(MONTH FROM timestamp) = $3 AND EXTRACT(YEAR FROM timestamp) = $4 AND timestamp >= $5)
            ORDER BY 
                time DESC 
            LIMIT 15
        `;
    
        const data = await dbase_rest.query(query, [currentMonth, currentYear, currentMonth - 1, currentYear, sixHoursAgo]);
    
        res.status(200);
        res.send({
            count: data.rowCount,
            result: data.rows,
        });
    
        console.log("[REST-API climate] GET: 15 NEW DATA FOR TABEL");
    },  

    // CHART temperature 
    async getDataCharttemperature(req, res) {
       const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time1,temperature FROM microclimate_petengoran1 ORDER BY timestamp DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API climate] GET :60 DATA CHART temperature ");
    },

    // CHART humidity
    async getDataCharthumidity(req, res) {
        const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time2, humidity FROM microclimate_petengoran1 ORDER BY timestamp DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API climate] GET :60 DATA CHART humidity");
    },

    // CHART kadar rainfall
    async getDataChartrainfall(req, res) {
        const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time3, rainfall FROM microclimate_petengoran1 ORDER BY timestamp DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API climate] GET :60 DATA CHART rainfall ");
    },

    // CHART wind_direction 
    async getDatatChartwind_direction(req, res) {
        const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time4, wind_direction FROM microclimate_petengoran1 ORDER BY timestamp DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API climate] GET :60 DATA CHART wind_direction");
    },

    // CHART  wind_direction_degrees
    async getDataCharttwind_direction_degrees(req, res) {
        const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time5,  wind_direction_degrees FROM microclimate_petengoran1 ORDER BY timestamp DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API climate] GET :60 DATA CHART  wind_direction_degrees");
    },

    // CHART wind_speed
    async getDataChartwind_speed(req, res) {
        const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time6,wind_speed FROM microclimate_petengoran1 ORDER BY timestamp DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API climate]GET :60 DATA CHART wind_speed");
    },

    // CHART water_temperature
    async getDataChartwater_temperature(req, res) {
        const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time7, water_temperature FROM microclimate_petengoran1 ORDER BY timestamp DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API climate]GET :60 DATA CHART water_temperature");
    },

    // CHART irradiation
     async getDataChartirradiation(req, res) {
        const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time8, irradiation FROM microclimate_petengoran1 ORDER BY timestamp DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API climate]GET :60 DATA CHART irradiation");
    },

    // CHART CO
    async getDataChartCO(req, res) {
        const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time9, CO FROM microclimate_petengoran1 ORDER BY timestamp DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API climate]GET :60 DATA CHART CO");
    },

    // CHART CH4
    async getDataChartCH4(req, res) {
        const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time10, CH4 FROM microclimate_petengoran1 ORDER BY timestamp DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API climate]GET :60 DATA CHART CH4");
    },
    
    // CHART C2H5OH
    async getDataChartC2H5OH(req, res) {
        const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time11, C2H5OH FROM microclimate_petengoran1 ORDER BY timestamp DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API climate]GET :60 DATA CHART C2H5OH");
    },

    // CHART H2
    async getDataChartH2(req, res) {
        const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time12, H2 FROM microclimate_petengoran1 ORDER BY timestamp DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API climate]GET :60 DATA CHART H2");
    },

    // CHART NH3
     async getDataChartNH3(req, res) {
       const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time13, NH3 FROM microclimate_petengoran1 ORDER BY timestamp DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API climate]GET :60 DATA CHART NH3");
    },

    // CHART NO2
     async getDataChartNO2(req, res) {
        const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time14, NO2 FROM microclimate_petengoran1 ORDER BY timestamp DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API climate]GET :60 DATA CHART NO2");
    },


    // fungsi Accumulation Rainfall hour
    async getRainfallAccumulation(req, res) {
        try {
            // timer 1jam 
            await new Promise(resolve => setTimeout(resolve, 60 * 60 * 1000));
            // Ambil data curah hujan dalam 1 jam terakhir
            const now = new Date();
            const oneHourAgo = new Date(now - 1 * 60 * 60 * 1000);
            const data = await dbase_rest.query("SELECT to_char(timestamp, 'HH24:MI:SS') as time15, rainfall FROM microclimate_petengoran1 WHERE timestamp >= $1 ORDER BY timestamp ASC LIMIT 6", [oneHourAgo]);
            // Hitung akumulasi curah hujan
            let accumulation = 0;
            data.rows.forEach(row => {
                accumulation += row.rainfall;
            });

            // Simpan hasil perhitungan ke dalam tabel
            const currentTimeWIB = convertToWIB(now).toISOString().replace("T", " ").slice(0, -5);
            const insertQuery = 'INSERT INTO rainfall_hour (time, rainfall_hour) VALUES ($1, $2)';
            const insertValues = [currentTimeWIB, accumulation];
            await dbase_rest.query(insertQuery, insertValues)

            res.status(200);
            res.send({
                count: data.rowCount,
                result: data.rows,
                rainfallAccumulation: accumulation
            });

            console.log("[REST-API climate] GET data for the latest hour and rainfall accumulation. Result saved to rainfall_hour table.");
        } catch (error) {
            console.error("Error in getRainfallAccumulation:", error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    
    },
 
   // daily rainfall accumulation
    async getDailyRainfallAccumulation(req, res) {
        try {
            // timer 24jam 
            await new Promise(resolve => setTimeout(resolve, 24 * 60 * 60 * 1000));
            // Ambil data curah hujan dalam 1 jam terakhir
            const now = new Date();
            const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000); // Waktu 24 jam yang lalu
            const data = await dbase_rest.query(
                "SELECT to_char(timestamp, 'HH24:MI:SS') as time16, rainfall FROM microclimate_petengoran1 WHERE timestamp >= $1 ORDER BY timestamp ASC LIMIT 144", [oneDayAgo]);
            // Hitung akumulasi curah hujan
            let accumulation = 0;
            data.rows.forEach(row => {
                accumulation += row.rainfall;
            });

            // Simpan hasil perhitungan ke dalam tabel
            const currentTimeWIB = convertToWIB(now).toISOString().replace("T", " ").slice(0, -5);
            const insertQuery = 'INSERT INTO rainfall_daily (time, rainfall_daily) VALUES ($1, $2)';
            const insertValues = [currentTimeWIB, accumulation];
            await dbase_rest.query(insertQuery, insertValues)

            res.status(200);
            res.send({
                count: data.rowCount,
                result: data.rows,
                rainfallAccumulation: accumulation
            });

            console.log("[REST-API climate] GET data for the latest hour and rainfall accumulation. Result saved to rainfall_daily table.");
        } catch (error) {
            console.error("Error in getRainfallAccumulation:", error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    
    },

    // sevenday 1
    async getDataclimateseven1(req, res) {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Mendapatkan bulan saat ini
        const currentYear = currentDate.getFullYear();
        // Menghitung tanggal 7 hari yang lalu
        const sevenDaysAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        // Menggunakan kondisi WHERE untuk memfilter data
        const query = `
            SELECT 
                to_char(timestamp, 'DD-MM-YYYY HH24:MI:SS') as time,  
                temperature, 
                humidity, 
                rainfall, 
                wind_direction,
                wind_direction_degrees,
                wind_speed,
                water_temperature,
                irradiation,
                CO,
                CH4,
                C2H5OH,
                H2,
                NH3,
                NO2
            FROM 
            microclimate_petengoran1
            WHERE
            timestamp >= $1
            ORDER BY 
                id DESC 
            LIMIT 1008 
        `;
    
        const data = await dbase_rest.query(query, [sevenDaysAgo]);
    
        res.status(200);
        res.send({
            count: data.rowCount,
            result: data.rows,
        });
    
        console.log("[REST-API climate] GET: 1008 NEW DATA FOR TABLE");
        return data;
    },



    // HTTP HANDLING climate 2
    // Respond request to give latest 10 data
    async getDataclimate2(req, res) {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Mendapatkan bulan saat ini
        const currentYear = currentDate.getFullYear();    
        // Mendapatkan tanggal 6 jam sebelumnya
        const sixHoursAgo = new Date(currentDate.getTime() - 6 * 60 * 60 * 1000);
        // Menggunakan kondisi WHERE untuk memfilter data
        const query = `
            SELECT 
                to_char(timestamp, 'DD-MM-YYYY HH24:MI:SS') as time,  
                temperature, 
                humidity, 
                rainfall, 
                wind_direction,
                wind_direction_degrees,
                wind_speed,
                irradiation,
                CO,
                CH4,
                C2H5OH,
                H2,
                NH3,
                NO2
            FROM 
            microclimate_petengoran2
            WHERE 
                (EXTRACT(MONTH FROM timestamp) = $1 AND EXTRACT(YEAR FROM timestamp) = $2) OR
                (EXTRACT(MONTH FROM timestamp) = $3 AND EXTRACT(YEAR FROM timestamp) = $4 AND timestamp >= $5)
            ORDER BY 
                time DESC 
            LIMIT 15
        `;
    
        const data = await dbase_rest.query(query, [currentMonth, currentYear, currentMonth - 1, currentYear, sixHoursAgo]);
    
        res.status(200);
        res.send({
            count: data.rowCount,
            result: data.rows,
        });
    
        console.log("[REST-API climate2] GET: 15 NEW DATA FOR TABEL");
    },

    //  MENDAPATKAN 10 DATA TERBARU UNTUK TABEL 
    async getDataTabel2(req, res) {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Mendapatkan bulan saat ini
        const currentYear = currentDate.getFullYear();    
        // Mendapatkan tanggal 6 jam sebelumnya
        const sixHoursAgo = new Date(currentDate.getTime() - 6 * 60 * 60 * 1000);
        // Menggunakan kondisi WHERE untuk memfilter data
        const query = `
            SELECT 
                to_char(timestamp, 'DD-MM-YYYY HH24:MI:SS') as time, 
                temperature, 
                humidity, 
                rainfall, 
                wind_direction,
                wind_direction_degrees,
                wind_speed,
                irradiation,
                CO,
                CH4,
                C2H5OH,
                H2,
                NH3,
                NO2
            FROM 
            microclimate_petengoran2
            WHERE 
                (EXTRACT(MONTH FROM timestamp) = $1 AND EXTRACT(YEAR FROM timestamp) = $2) OR
                (EXTRACT(MONTH FROM timestamp) = $3 AND EXTRACT(YEAR FROM timestamp) = $4 AND timestamp >= $5)
            ORDER BY 
                time DESC 
            LIMIT 15
        `;
    
        const data = await dbase_rest.query(query, [currentMonth, currentYear, currentMonth - 1, currentYear, sixHoursAgo]);
    
        res.status(200);
        res.send({
            count: data.rowCount,
            result: data.rows,
        });
    
        console.log("[REST-API climate] GET: 15 NEW DATA FOR TABEL");
    },  

    // CHART temperature 2
    async getDataCharttemperature2(req, res) {
        const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time1,temperature FROM microclimate_petengoran2 ORDER BY timestamp DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API climate] GET :60 DATA CHART temperature2 ");
    },

    // CHART humidity2
    async getDataCharthumidity2(req, res) {
        const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time2, humidity FROM microclimate_petengoran2 ORDER BY timestamp DESC LIMIT 100`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API climate] GET :60 DATA CHART humidity2");
    },

    // CHART kadar rainfall2
    async getDataCharrainfall2(req, res) {
        const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time3, rainfall FROM microclimate_petengoran2 ORDER BY timestamp DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API climate] GET :60 DATA CHART rainfall2");
    },

    // CHART wind_direction2 
    async getDataChartwind_direction2(req, res) {
        const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time4, wind_direction FROM microclimate_petengoran2 ORDER BY timestamp DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API climate] GET :60 DATA CHART wind_direction");
    },

    // CHART  wind_direction_degrees2
    async getDataChartwind_direction_degrees2(req, res) {
        const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time5,  wind_direction_degrees FROM microclimate_petengoran2 ORDER BY timestamp DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API climate] GET :60 DATA CHART  wind_direction_degrees2");
    },

    // CHART wind_speed2
    async getDataChartwind_speed2(req, res) {
        const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time6,wind_speed FROM microclimate_petengoran2 ORDER BY timestamp DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API climate]GET :60 DATA CHART wind_speed2");
    },

 // CHART irradiation2
     async getDataCharttirradiation2(req, res) {
        const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time8, irradiation FROM microclimate_petengoran2 ORDER BY timestamp DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API climate]GET :60 DATA CHART irradiation2");
    },

    // CHART CO 2
    async getDataChartCO2(req, res) {
        const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time9, CO FROM microclimate_petengoran2 ORDER BY timestamp DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API climate]GET :60 DATA CHART CO 2");
    },

    // CHART CH4 2
    async getDataChartCH42(req, res) {
        const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time10, CH4 FROM microclimate_petengoran2 ORDER BY timestamp DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API climate]GET :60 DATA CHART CH4");
    },
    
    // CHART C2H5OH 2
    async getDataChartC2H5OH2(req, res) {
        const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time11, C2H5OH FROM microclimate_petengoran2 ORDER BY timestamp DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API climate]GET :60 DATA CHART C2H5OH 2");
    },

    // CHART H2 2
    async getDataChartH22(req, res) {
        const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time12, H2 FROM microclimate_petengoran2 ORDER BY timestamp DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API climate]GET :60 DATA CHART H2 2");
    },

    // CHART NH3 2
     async getDataChartNH32(req, res) {
        const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time13, NH3 FROM microclimate_petengoran2 ORDER BY timestamp DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API climate]GET :60 DATA CHART NH3 2");
    },

    // CHART NO2 2
     async getDataChartNO22(req, res) {
        const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time14, NO2 FROM microclimate_petengoran2 ORDER BY timestamp DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data.rowCount,
            result:data.rows,
        })
        console.log("[REST-API climate]GET :60 DATA CHART NO2 2");
    },


    // fungsi Accumulation Rainfall hour
    async getRainfallAccumulation2(req, res) {
        try {
            // timer 1jam 
            await new Promise(resolve => setTimeout(resolve, 60 * 60 * 1000));
            // Ambil data curah hujan dalam 1 jam terakhir
            const now = new Date(); // Waktu sekarang
            const oneHourAgo = new Date(now - 60 * 60 * 1000); // Waktu 1 jam yang lalu
            const data = await dbase_rest.query(`SELECT to_char(timestamp, 'HH24:MI:SS') as time15, rainfall FROM microclimate_petengoran2 WHERE timestamp >= $1 ORDER BY timestamp ASC LIMIT 6`, [oneHourAgo]);
    
            // Hitung akumulasi curah hujan
            let accumulation = 0;
            data.rows.forEach(row => {
                accumulation += row.rainfall;
            });
    
            // Simpan hasil perhitungan ke dalam tabel
            const currentTimeWIB = convertToWIB(now).toISOString().replace("T", " ").slice(0, -5);
            const insertQuery = 'INSERT INTO rainfall_hour_2 (time, rainfall_hour) VALUES ($1, $2)';
            const insertValues = [currentTimeWIB, accumulation];
            await dbase_rest.query(insertQuery, insertValues);
    
            res.status(200);
            res.send({
                count: data.rowCount,
                result: data.rows,
                rainfallAccumulation: accumulation
            });
    
            console.log("[REST-API climate] GET data for the latest hour and rainfall accumulation. Result saved to rainfall_hour table.");
        } catch (error) {
            console.error("Error in getRainfallAccumulation:", error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    },
  

    // daily rainfall accumulation 2
    async getDailyRainfallAccumulation2(req, res) {
        try {
            // timer 24jam 
            await new Promise(resolve => setTimeout(resolve, 24 * 60 * 60 * 1000));
            // Ambil data curah hujan dalam 1 jam terakhir
            const now = new Date();
            const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000); // Waktu 24 jam yang lalu
            const data = await dbase_rest.query(
                "SELECT to_char(timestamp, 'HH24:MI:SS') as time16, rainfall FROM microclimate_petengoran2 WHERE timestamp >= $1 ORDER BY timestamp ASC LIMIT 144", [oneDayAgo]);
            // Hitung akumulasi curah hujan
            let accumulation = 0;
            data.rows.forEach(row => {
                accumulation += row.rainfall;
            });

            // Simpan hasil perhitungan ke dalam tabel
            const currentTimeWIB = convertToWIB(now).toISOString().replace("T", " ").slice(0, -5);
            const insertQuery = 'INSERT INTO rainfall_daily_2 (time, rainfall_daily) VALUES ($1, $2)';
            const insertValues = [currentTimeWIB, accumulation];
            await dbase_rest.query(insertQuery, insertValues)

            res.status(200);
            res.send({
                count: data.rowCount,
                result: data.rows,
                rainfallAccumulation: accumulation
            });

            console.log("[REST-API climate] GET data for the latest hour and rainfall accumulation. Result saved to rainfall_daily_2 table.");
        } catch (error) {
            console.error("Error in getRainfallAccumulation:", error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    },

    
    // seven day 2
    async getDataclimateseven2(req, res) {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Mendapatkan bulan saat ini
        const currentYear = currentDate.getFullYear();
        // Menghitung tanggal 7 hari yang lalu
        const sevenDaysAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        // Menggunakan kondisi WHERE untuk memfilter data
        const query = `
            SELECT 
                to_char(timestamp, 'DD-MM-YYYY HH24:MI:SS') as time, 
                temperature, 
                humidity, 
                rainfall, 
                wind_direction,
                wind_direction_degrees,
                wind_speed,
                irradiation,
                CO,
                CH4,
                C2H5OH,
                H2,
                NH3,
                NO2
            FROM 
            microclimate_petengoran2
            WHERE 
                timestamp >= $1
            ORDER BY 
                time DESC 
            LIMIT 1008
        `;
    
        const data = await dbase_rest.query(query, [sevenDaysAgo]);
    
        res.status(200);
        res.send({
            count: data.rowCount,
            result: data.rows,
        });
    
        console.log("[REST-API climate] GET: 15 NEW DATA FOR TABLE");
    },


}

