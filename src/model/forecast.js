const request = require('request')

const forecast = (lat,lon,callback) => {
    const url = `https://api.darksky.net/forecast/f38a38fac278da5ed4a39d7573655ca3/${lat},${lon}?&units=si`
    request({url,json:true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect to weather service!!',undefined)
        }else if(body.error){
            callback('Unable to find location!',undefined)
        }else{
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees outside. There is a ' +body.currently.precipProbability +'% Chance of rain.')
        }
    })
    }
    module.exports =forecast