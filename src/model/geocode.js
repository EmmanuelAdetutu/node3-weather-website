const request = require('request')
const geocode = (address,callback)=>{
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidHV0dWVtbWEyMDAxIiwiYSI6ImNqbXFrbmY5cTFsdHMzcG54OG5pNnR0dmYifQ.YamfASRJ1Xm3Wk2wGIL17g'
    request({url, json:true},(error,{body})=>{
        if (error) {
            callback('Unable to connect to weather service',undefined)
        }else if (body.features.lenght === 0){
            callback('Unable to find location',undefined)
        }else if (body.features[0]===undefined) {
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,{
                lat:body.features[0].center[1],
                lon:body.features[0].center[0],
                descloc:body.features[0].place_name
                })
        }
    })
}
module.exports =geocode