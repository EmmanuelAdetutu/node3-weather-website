console.log('Client side Java loaded')



const weatherForm =document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const $sendlocationButton = document.querySelector('#send-location')



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = '...Loading'
    messageTwo.textContent = ''

    fetch(`/cityweather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            console.log(data.error)
            messageOne.textContent = data.error
        } else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
           // console.log(location)
            // console.log(
        }
    })
})
})

$sendlocationButton.addEventListener('click', (e) => {
     e.preventDefault()
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser')
    }
    // $sendlocationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {

        const locationdata = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
         }
        fetch(`/latlonweather/${locationdata.lat}/${locationdata.lon}`).then((response)=>{
            response.json().then((data)=>{
                if (data.error){
                    console.log(data.error)
                    messageOne.textContent = data.error
                } else{
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })

        }).catch((e)=>{
            messageOne.textContent=`Error fetching Data`
            console.log(e);
        })

    })
})
