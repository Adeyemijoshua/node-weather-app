const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
//define paths for expres config 
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//setup handlebars engine and views location n
app.set('view engine', 'hbs');
//telling express to point to this location below
app.set('views', viewsPath);
//
hbs.registerPartials(partialsPath);

//setup static directory to serve 
app.use(express.static(publicDirectory));

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:'joshua'
    });
});
app.get('/about',(req,res)=>{
    res.render('about',{
         title:'About Me',
         name:'joshua'
    });
});
app.get('/help',(req,res)=>{
    res.render('help',{
        response:'i was debitted twice for one request',
        title:'Help',
        name:'joshua'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ errverror })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
   res.render('error',{
    title: '404',
    name:'joshua',
    response:'Article not found'
   })
});
app.get('*',(req,res)=>{
    //'*' means match everything that has been unmatched {wild chaacter}
  res.render('error',{
    title: '404',
    name:'joshua',
    response:'Page not found'
  })
});
app.listen(3000,()=>{
    console.log('server is up on port 3000');
});