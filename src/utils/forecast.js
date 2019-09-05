const request = require('request')
const moment = require('moment')
moment().format();

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
            
            // Today
            //______
            //Time
            const { time, summary, icon, precipProbability, temperature, humidity, windSpeed } = body.currently
            const timeFormatet = moment.unix(time).format('dddd, DD MMM YYYY');
            
            //summary
            const summaryFormatetObject = summary.split('throughout the day.');
            const summaryFormatet = summaryFormatetObject[0];

            //weekday
            const weekday = moment.unix(time).format('ddd');
            
            //Tomorrow
            //________
            //Time
            const { time: timeTomorrow, summary: summaryTomorrow, icon: iconTomorrow, precipProbability: precipProbabilityTomorrow, temperatureHigh: temperatureTomorrow, humidity: humidityTomorrow, windSpeed: windSpeedTomorrow } = body.daily.data[1]
            const timeTomorrowFormatet = moment.unix(timeTomorrow).format('dddd, DD MMM YYYY')
            
            //summary
            const summaryTomorrowFormatetObject = summaryTomorrow.split('throughout the day.');
            const summaryTomorrowFormatet = summaryTomorrowFormatetObject[0];

            //weekday
            const weekdayTomorrow = moment.unix(timeTomorrow).format('ddd');

            //Tomorrow2 = The day after
            //________________________
            //Time
            const { time: timeTomorrow2, summary: summaryTomorrow2, icon: iconTomorrow2, precipProbability: precipProbabilityTomorrow2, temperatureHigh: temperatureTomorrow2, humidity: humidityTomorrow2, windSpeed: windSpeedTomorrow2 } = body.daily.data[2]
            const timeTomorrowFormatet2 = moment.unix(timeTomorrow2).format('dddd, DD MMM YYYY')
            
            //summary
            const summaryTomorrowFormatetObject2 = summaryTomorrow2.split('throughout the day.');
            const summaryTomorrowFormatet2 = summaryTomorrowFormatetObject2[0];
            
            //weekday
            const weekdayTomorrow2 = moment.unix(timeTomorrow2).format('ddd');

            //Tomorrow3 = The day after
            //________________________
            //Time
            const { time: timeTomorrow3, summary: summaryTomorrow3, icon: iconTomorrow3, precipProbability: precipProbabilityTomorrow3, temperatureHigh: temperatureTomorrow3, humidity: humidityTomorrow3, windSpeed: windSpeedTomorrow3 } = body.daily.data[3]
            const timeTomorrowFormatet3 = moment.unix(timeTomorrow3).format('dddd, DD MMM YYYY')
                
            //summary
            const summaryTomorrowFormatetObject3 = summaryTomorrow3.split('throughout the day.');
            const summaryTomorrowFormatet3 = summaryTomorrowFormatetObject3[0];

            //weekday
            const weekdayTomorrow3 = moment.unix(timeTomorrow3).format('ddd');

            callback(undefined, {
                
                today: {
                    timeFormatet,
                    weekday,
                    summaryFormatet,
                    icon,
                    temperature,
                    precipProbability,
                    humidity,
                    windSpeed
                },
                tomorrow: {
                    timeTomorrowFormatet,
                    weekdayTomorrow,
                    summaryTomorrowFormatet,
                    iconTomorrow,
                    temperatureTomorrow,
                    precipProbabilityTomorrow,
                    humidityTomorrow,
                    windSpeedTomorrow
                },
                tomorrow2: {
                    timeTomorrowFormatet2,
                    weekdayTomorrow2,
                    summaryTomorrowFormatet2,
                    iconTomorrow2,
                    temperatureTomorrow2,
                    precipProbabilityTomorrow2,
                    humidityTomorrow2,
                    windSpeedTomorrow2
                },
                tomorrow3: {
                    timeTomorrowFormatet3,
                    weekdayTomorrow3,
                    summaryTomorrowFormatet3,
                    iconTomorrow3,
                    temperatureTomorrow3,
                    precipProbabilityTomorrow3,
                    humidityTomorrow3,
                    windSpeedTomorrow3
                }
            })
        }
    })
}

module.exports = forecast