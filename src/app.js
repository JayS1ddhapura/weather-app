const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { query, response } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Flamie'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'I'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HALP PLOX',
        name: 'bruh',
        helptext: 'tasuketekudasai'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'halp 404',
        name: 'fag',
        errorMessage: 'help article not found'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'gib address REEEEEEEEEEEE'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
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

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'gib search term REEEEEEEEEEE'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'nvm',
        errorMessage: '404 Page not found'
    })
})

// app.com/help

app.listen(3000, () => {
    console.log('server is up')
})