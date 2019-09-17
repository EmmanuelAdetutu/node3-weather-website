const request = require('request')
const geocode = (address,callback)=>{
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token='+process.env.MAPBOXTOKEN
    request({url, json:true},(error,{body})=>{
        if (error) {
            callback('Unable to connect to geocode service',undefined)
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

const reversegeocode =(lat,lon,callback)=>{
    url = `https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=${lat},${lon},250&mode=retrieveAddresses&maxresults=1&gen=9&app_id=${process.env.APP_ID}&app_code=${process.env.APP_CODE}`
    request({url,json:true},(error,respo)=>{
        if (error){
            callback('Unable to connect to geocode service',undefined)
        }else {
            const address ={
                city:respo.body.Response.View[0].Result[0].Location.Address.City,
                country:respo.body.Response.View[0].Result[0].Location.Address.Country
            }
           // console.log(address)
            callback(undefined,address)
        }
    })
}

module.exports = {
    geocode,
    reversegeocode
}