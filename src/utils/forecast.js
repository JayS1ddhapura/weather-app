const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    url = 'http://api.weatherstack.com/current?access_key=99406408d65a56f6fe4e27443eb8da96&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out here. It feels like '
                + body.current.feelslike + ' degrees out. Chances of precipitation are ' + body.current.precip + '%' + ". Humidity is " + body.current.humidity + '.')
        }
    })
}

module.exports = forecast 