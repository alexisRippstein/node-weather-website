const request = require('request')

const forecast = (body, callback) => {
	const { latitude, longtidude } = body
	const url = 'https://api.darksky.net/forecast/86cc7d2dceadbd38fb526a4cc0639bfa/' + latitude + ',' + longtidude + '?units=si'

    request({ url, json: true }, (error, {body, statusCode}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (statusCode !== 200) {
        	callback('Statuscode: ' + statusCode + '. Something went wrong with the request! Check the Url of forecast.js', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
        	const { temperature, precipProbability } = body.currently
        	const dailySummary = body.daily.data[0].summary
            const { temperatureHigh, temperatureLow } = body.daily.data[0]

            callback(undefined, dailySummary + ' – The highest temperatures today are ' + temperatureHigh + ' °C. – It is currently ' + temperature + ' °C out. – There is a ' + precipProbability + '% chance of precipitation. – The lowest temperature will be at ' + temperatureLow + ' °C!')
        }
    })
}

module.exports = forecast