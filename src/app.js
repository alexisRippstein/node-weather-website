//Webserver
const path = require('path')
const express = require('express')
const hbs = require('hbs')

//Forecast & Geocode Utils
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static Path directory
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Alexis Rippstein'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About me',
		name: 'Alexis Rippstein'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		helpText: 'This is some helpfull Text',
		name: 'Alexis Rippstein'
	})
})

app.get('/weather', (req, res) => {

	if (!req.query.adress) {
		return res.send({
			error: 'Your musst provide an Adress!'
		})
	}

	geocode(req.query.adress, (error, body) => {		
		if (error) {
			return res.send({ error })
		}

		forecast(body, (error, forecastData) => {
			if (error) {
				return res.send({ error })
			}
			res.send([{
				forecast: forecastData,
				location: body.location,
				adress: req.query.adress
			}])
		})
	})
})

app.get('/products', (req, res) => {
	
	if (!req.query.search) {
		return res.send({
			error: 'Your musst provide a search query!'
		})
	}
	console.log(req.query.search)
	res.send({
		products: []
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMsg: 'Help article not found',
		name: 'Alexis Rippstein'
	})
})

app.get('/*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMsg: 'Page not found',
		name: 'Alexis Rippstein'
	})
})

app.listen(1234, () => {
	console.log('Server is up on port 4000.')
	//process.on('uncaughtException', '')
	//process.on('SIGTERM', '')
})
