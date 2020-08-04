const request = require('request');
const { response } = require('express');
const fetch = require("node-fetch");
const url = 'http://api.weatherstack.com/current?access_key=443ae1f90345503e4994dd8203a8ffd5&query=40.8443876,-74.6203679&units=m';
const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYW5keXN0YXJrIiwiYSI6ImNrZDJoOTZkbzFkNHozMW91Z3NleThrNDQifQ.qtQyrR8A20xmewJk59sZVg';


// /** api call form addres Informaiton **/
// const addressInformation = request({ url: mapBoxUrl, json: true }, (error, response) => {
//     if (error) {
//         console.log('Error due to  your network or query parameter');
//     } else if (response.body.error) {
//         console.log('Unable to fetch location information');
//     }
//     else {
//         const latitude = response.body.features[0].center[0];
//         const longitude = response.body.features[0].center[1];
//         console.log('latitude :', latitude)
//     }
// })

// /** network request for weather report **/
// const response = request({ url: url, json: true }, (error, response) => {
//     // const jsonResponse=JSON.parse(response.body);
//     //  //console.log(jsonResponse.current);
//     if (error) {
//         console.log('Unable to fetch temperature');
//     } else {
//         const weatherReport = "Current temperature " + response.body.current.temperature + " feels like " + response.body.current.feelslike
//         console.log(weatherReport);
//     }

// })

const address=process.argv[2];

/** call back function for fetchinLatLong  **/
const fetchLatLong = (address, callback) => {
    const mapBoxURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address).json + "?access_token=pk.eyJ1IjoiYW5keXN0YXJrIiwiYSI6ImNrZDJoOTZkbzFkNHozMW91Z3NleThrNDQifQ.qtQyrR8A20xmewJk59sZVg";
   
    // request({ url: mapBoxUrl, json: true }, (error, response) => {
    //     if (error) {
    //         callback("Network request error");
    //         console.log("Nework request error")
    //     } else if (response.body.error) {
    //         console.log("Unable to fetch address");
    //         callback("Unable to fetch address");
    //     } else {
    //         const latitude = response.body.features[0].center[0];
    //         const longitude = response.body.features[0].center[1];
    //         console.log('latitude :', latitude)
    //         callback(null, latitude, longitude)
    //     }
    // })

  fetch(mapBoxUrl).then((response)=>{
      response.json().then((data)=>{
        const latitude = response.body.features[0].center[0];
        const longitude = response.body.features[0].center[1];
        console.log('latitude :', latitude)
        callback(null, latitude, longitude)
      })
  }).then((error)=>{
      callback(error,null)
  })
}

/** callback function for fetching weatherReport **/
const fetchWeatherReport = (latitude, longitude, callback) => {
    const weatherURL = "http://api.weatherstack.com/current?access_key=443ae1f90345503e4994dd8203a8ffd5&query=40.8443876,-74.6203679&units=m";
    request({ url: weatherURL, json: true }, (error, response) => {
        if (error) {
            console.log("Unable to fetch the weather report");
        } else {
            const weatherReport = "Current temperature " + response.body.current.temperature + " feels like " + response.body.current.feelslike;

            callback(error, weatherReport);

            console.log(weatherReport);
        }
    })
}

/** callback function function **/
const fetchTest=( address !== undefined?address:'Nepal',(error, latitude, longitude) => {
    fetchWeatherReport(latitude, longitude, (error, weatherReport) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Weater report", weatherReport);
        }
    }
    )
});

const fetchWeatherInformation=(address,callback)=>{

    fetchLatLong(address,(error,latitude,longitude)=>{
        if(error){
            callback(null,{})
        }else{
          /**fetching latitude longitude **/  

          fetchWeatherReport(latitude,longitude,(error,weatherReport)=>{
            callback(null,{
                latitude:latitude,
                longitude:longitude,
                weatherReport:weatherReport
            })
          })
        }
    })


}

fetchWeatherInformation('TEST',()=>{
   console.log('test'); 
})

module.exports = fetchWeatherInformation;