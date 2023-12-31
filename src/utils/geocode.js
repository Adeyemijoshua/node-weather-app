const request = require('request');

const geocode = (address,callback)=>{
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWRleWVtaWpvc2h1YTAwOSIsImEiOiJjbGpoeDgxajkwc2tmM2dwOWVobjUxcGY0In0.8YgNRNy3YbMl9LKBK87Fkw&limit=1`

    request({url:geocodeURL, json:true}, (error, response) => {
        
        if (error) {
            callback('Unable to connect to location services!',undefined)
        }
        else if (response.body.features.length === 0){
            callback('Unable to find location. Try another search.',undefined)
        }
        else{
            callback(undefined,{
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location:response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode