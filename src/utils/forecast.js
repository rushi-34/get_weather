const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=1f0ffc73c51b458fa1bc53d476dbac86&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          " weather. In " +
          body.location.region +
          " there is currently " +
          body.current.temperature +
          " degrees out."
      );
    }
  });
};

module.exports = forecast;
