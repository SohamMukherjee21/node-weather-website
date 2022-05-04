const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const forecastURL = `http://api.weatherstack.com/current?access_key=7de3b09c5cfbb2f5a8b9264f0442abf8&query=${latitude},${longitude}`;
  request({ url: forecastURL, json: true }, (error, { body }) => {
    if (error) {
      callback("Can't connect to network services", undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      callback(
        undefined,
        `It is currently ${body.current.temperature} degree celsius with ${body.current.precip}% chances of rainfall`
      );
    }
  });
};

module.exports = forecast;
