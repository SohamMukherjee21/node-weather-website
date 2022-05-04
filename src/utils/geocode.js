const request = require("request");

const geocode = (address, callback) => {
  const myURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=1&access_token=pk.eyJ1Ijoic29oYW1tdWtoZXJqZWUyOTgiLCJhIjoiY2wxbTg5NDV6MGk2cDNkczl3ZzNib2dpOSJ9.kGCIR0xTvp1wSfTcisLOUw&autocomplete=false`;
  request({ url: myURL, json: true }, (error, { body }) => {
    if (error) {
      callback("Can't connect to network services!", undefined);
    } else if (body.features.length === 0) {
      callback("Invalid location entered", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
