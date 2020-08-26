const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//route page (route route) (app.com)

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Hari'
    })
})

//help page (help route) (app.com/he lp)

// app.get('/help', (req,res) => {
//     res.send([{
//         name: 'Hari'
//     },{
//         name: 'Sai'
//     }])
// })

app.get('/help', (req,res) => {
    res.render('help',{
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Hari'
    })
})

//about page (about route) (app.com/about)

// app.get('/about', (req,res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Hari'
    })

})


//weather page (weather route) (app.com/weather)
app.get('/weather', (req,res) => {
    address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide address'
        })
    }

    geocode(address, (error, {latitude,longitude,location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address

            })
        })
    })

})

//demo
// app.get('/products', (req,res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }

//     console.log(req.query.search)
//     res.send({
//         products: []  
//     })
// })

//help article 404 Error handler
app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Hari'
    })
})


//404 Error handler
app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Hari'
    })
})



app.listen(3000, () => {
    console.log('Server is up on port 3000')

})