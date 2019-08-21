const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/model/geocode')
const forecast = require('../src/model/forecast')
const  app = express()

//Define paths for Express config
const PublicDir =path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')


//sert up handle bars and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)
        
/// serving and making all  static html /asset available
app.use(express.static(PublicDir))

        //set up route to home page using hbs
        app.get('', (req,res)=>{
            res.render("index",{
                name:"Emmanuel A",
                title:"Weather App"
            })
        })
        //set up route for about
        app.get('/about',(req,res)=>{
            res.render("about",{
                title:'About me',
                name:'Emmanuel A'
            })
        })

        //set up route for help
        app.get('/help',(req,res)=>{
            res.render("help",{
                title:'Help',
                name: 'Emmanuel A',
                helpText:"Enter a Valid location to fetch the current weather"
            })
        })
        //creating a special route for weather
        app.get('/weather',(req,res)=>{
            if (!req.query.address){
                return res.send({
                    error:"You must provide an address"
                })
            }
            geocode(req.query.address,(error,{lat,lon,descloc}={})=>{
                if (error){
                    return res.send({error})
                }
                forecast(lat,lon,(error,forcastData)=>{
                    if (error){
                       return res.send(error)
                    }
                    return res.send({
                        address:req.query.address,
                        location:descloc,
                        forecast:forcastData
                    })
                })
            })
        })
        app.get('/products',(req,res)=>{

            if(!req.query.search){
                return res.send({
                    error:"You must provide a search term"
                })
            }
            console.log(req.query.search)
            res.send({
                Products:[]
            })
        })
        app.get('/help/*',(req,res)=>{
            res.render('404',{
                title:'404',
                name:'Emmanuel A',
                errorMessage:'Help article not found.'
            })
        })

        app.get('*',(req,res)=>{
            res.render('404',{
                title:'404',
                name:'Emmanuel A',
                errorMessage:'Page not found'
            })
            //res.send('My 404 page')
        })

app.listen(3000,()=>{
    console.log('Server is running in port 3000')
})