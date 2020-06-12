const request = require('request');

const forecast = ({location, latitud, longitud}, callback) => {

  const url = `http://api.weatherstack.com/current?access_key=0a28013946bacc0cbfd4dfb0f286043d&query=${latitud},${longitud}`;


  request({ url , json: true}, (error, {body} = {}) => {
    if(error){
      callback(`Uable to connect to weather service!`, )
    }else if(body.error){
      callback('Unable to find location', );
    }else {
      callback(undefined, {
        location: `${location}`,
        description: `${body.current.weather_descriptions[0]}`,
        temperature: `${body.current.temperature}`,
        feelslike: `${body.current.feelslike}`

      })
    }
  });
}

module.exports = forecast;