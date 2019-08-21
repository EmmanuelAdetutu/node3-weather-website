const geocode = require('./geocode')
const forecast = require('./forecast')


const forecastGeocode=(params,callback)=> {
    geocode(params,(error,geoData)=>{
        if(error){
            return(error)
        }
        forecast(geoData.lat,geoData.lon,(error,forData)=>{
            if (error) {
                return(error)
            }
            callback(undefined,{forecast:forData,location:geoData.descloc}) 
        })
    }) 
}


module.exports =forecastGeocode
