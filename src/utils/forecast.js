const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const accessKey = "1518f91a7a36215b24448e5e02cc0100";
  const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Ubable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const temperature = body.current.temperature;
      const rain = body.current.precip;
      const weather_descriptions = body.current.weather_descriptions;
      const data = `${weather_descriptions}. It is currently ${temperature} degree out. There is a ${rain}% chance of rain.`;
      callback(undefined, data);
    }
  });
};

module.exports = forecast;
