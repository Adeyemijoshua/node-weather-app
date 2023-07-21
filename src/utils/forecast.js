const request = require('request');


const forecast =(latitude,longitude,callback)=>{
  const url = `http://api.weatherstack.com/current?access_key=3aa037b509c609616c5172c54a8a1003&query=${longitude},${latitude}&units=m`;

  request({url:url, json:true},(error,response)=>{
    if(error){
        callback('Unable to connect to forecast service',undefined);
    }
    else if (response.body.error){
        callback('Unable to find location!',undefined);
    }
    else{
        callback(undefined,(`It is currently ${response.body.current.weather_descriptions[0]} the temperature is ${response.body.current.temperature} degrees out and it feels like ${response.body.current.feelslike}`)
           );
    }
  })

}

module.exports = forecast