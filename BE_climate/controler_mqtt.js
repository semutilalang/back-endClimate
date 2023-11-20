// const dbase_mqtt = require('./database_config.js');
// const mqtt_connect = require('./mqtt_config.js');

// require('dotenv').config()
// // VARIABLE IN Topic MQTT 
// TOPIC_DIPASENA = process.env.TOPIC;
// TS_PATH = process.env.PAYLOAD_DIPASENA_TS
// SUHU_AIR_ATAS_PATH = process.env.PAYLOAD_DIPASENA_SUHU_AIR_ATAS 
// SUHU_AIR_BAWAH_PATH = process.env.PAYLOAD_DIPASENA_SUHU_AIR_BAWAH 
// SUHU_RUANG_PATH = process.env.PAYLOAD_DIPASENA_SUHU_RUANG
// SALINITAS_PATH = process.env.PAYLOAD_DIPASENA_SALINITAS
// OXYGEN_PATH = process.env.PAYLOAD_DIPASENA_DO
// PH_PATH = process.env.PAYLOAD_DIPASENA_PH
// AMONIA_PATH = process.env.PAYLOAD_DIPASENA_AMONIA
// TINGGI_AIR_PATH = process.env.PAYLOAD_DIPASENA_TINGGI

// var { TS, TINGGI_AIR, SUHU_AIR_ATAS, SUHU_AIR_BAWAH, SUHU_RUANG, SALINITAS, OXYGEN, PH, AMONIA } = [];

// module.exports = {
//         // MQTT HANDLING
//         async incomingData(topic,message){
//             if (topic === TOPIC_DIPASENA){
//                 const payload = JSON.parse(message.toString());
        
//                 // Checking property of payload topic send from mqtt. so it will never null
//                 if ((payload.hasOwnProperty(TS_PATH))
//                     && (payload.hasOwnProperty(SUHU_AIR_ATAS_PATH)) 
//                     && (payload.hasOwnProperty(SUHU_AIR_BAWAH_PATH))
//                     && (payload.hasOwnProperty(SUHU_RUANG_PATH))
//                     && (payload.hasOwnProperty(SALINITAS_PATH))
//                     && (payload.hasOwnProperty(OXYGEN_PATH))
//                     && (payload.hasOwnProperty(PH_PATH))
//                     && (payload.hasOwnProperty(AMONIA_PATH))
//                     && (payload.hasOwnProperty(TINGGI_AIR_PATH))
            
//             ) {
//                     if ((payload[TS_PATH] != null)
//                         && (payload[SUHU_AIR_ATAS_PATH] != null)
//                         && (payload[SUHU_AIR_BAWAH_PATH] != null)
//                         && (payload[SUHU_RUANG_PATH] != null)
//                         && (payload[SALINITAS_PATH] != null)
//                         && (payload[OXYGEN_PATH] != null)
//                         && (payload[PH_PATH] != null)
//                         && (payload[AMONIA_PATH] != null)
//                         && (payload[TINGGI_AIR_PATH] != null)
//                     ) {
//                         // Save Payload to variable
//                         TS = payload[TS_PATH];
//                         SUHU_AIR_ATAS = parseFloat(payload[SUHU_AIR_ATAS_PATH]);
//                         SUHU_AIR_BAWAH= parseFloat(payload[SUHU_AIR_BAWAH_PATH]);
//                         SUHU_RUANG = parseFloat(payload[SUHU_RUANG_PATH]);
//                         SALINITAS = parseFloat(payload[SALINITAS_PATH]);
//                         O2= parseFloat(payload[OXYGEN_PATH]);
//                         OXYGEN = O2/1000;//convert to pp,
//                         PH = parseFloat(payload[PH_PATH]);
//                         NH3 = parseFloat(payload[AMONIA_PATH]);
//                         AMONIA = NH3/1000
//                         TINGGI_AIR = parseFloat(payload[TINGGI_AIR_PATH]);


//                     }
        
//                 }
//                 const dataArray = [TS,SUHU_AIR_ATAS, SUHU_AIR_BAWAH, SUHU_RUANG, SALINITAS, OXYGEN,PH, AMONIA,TINGGI_AIR];
//                 const insertQuery = `INSERT INTO tambak_dipasena(time, suhu_air_permukaan, suhu_air_dasar, suhu_ruang, salinitas, oxygen, ph, amonia,tinggi_air ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
//                 dbase_mqtt.query(insertQuery, dataArray, (err, res) => {
//                     if (err) throw err;
//                 console.log(`DATA INSERTED TO DATABASE db_dipasena_trial : Time = ${TS}, Suhu_Air_Atas = ${SUHU_AIR_ATAS},Suhu_Air_Bawah =${SUHU_AIR_BAWAH} Suhu_Ruang = ${SUHU_RUANG}, Salinitas = ${SALINITAS}, Kadar_oksigen =${OXYGEN}, Salinitas = ${SALINITAS}, ph = ${PH} Amonia = ${AMONIA}, Tinggi_Air=${TINGGI_AIR}`);
//                 });
//             }
//         }
// }