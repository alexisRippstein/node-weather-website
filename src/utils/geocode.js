const request = require('request')

const geocode = (address, callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXJpcHBzdGVpbiIsImEiOiJjanV6am8wbWswOG1vM3lvbW5ieG1iNDN5In0.wJraZ0586sVgw7PzVIHbaw&limit=1'

    request({ url, json: true }, (error, {body, statusCode}) => {
    	
        if (error) {

            callback('Unable to connect to location services!', undefined)
        
        }  else if (statusCode !== 200) {

            callback('Statuscode: ' + statusCode + '. Something went wrong with the request! Check the Url of geocode.js', undefined);

        } else if (body.features.length === 0 ) {
            
            callback('Unable to find location. Try another search.', undefined)
        
        } else if (body.features[0].place_type[0] === 'postcode') {
        
            callback('Postcodes are not supportet until now, try to search for a location name.', undefined)
        
        } else if (body.features[0].properties.hasOwnProperty('short_code')) {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtidude: body.features[0].center[0],
                location: body.features[0].text,
                shortCodeFormatted: body.features[0].properties.short_code
            })
        } else {

            var shortCode = body.features[0].context[0].short_code
            var shortCodeFormatted = shortCode.charAt(0) + shortCode.charAt(1)
   
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtidude: body.features[0].center[0],
                location: body.features[0].text,
                shortCodeFormatted: shortCodeFormatted
            })
        }
    })
}

module.exports = geocode