const https = require("https");

module.exports.sendCityForKnowingWeather = async (req, res) => {
  const city = req.params.city;
  const api = process.env.API_KEY;

  https.get(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      api,
    function (response) {
      response.on("data", function (data) {
        res.json(JSON.parse(data));
      });
    }
  );

  console.log("Requested by city");
};

module.exports.sendLatitudeLongitudeForKnowingWeather = async (req, res) => {
  const latitude = req.params.latitude;
  const longitude = req.params.longitude;
  const api = process.env.API_KEY;

  https.get(
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&units=metric&appid=" +
      api,
    function (response) {
      response.on("data", function (data) {
        res.json(JSON.parse(data));
      });
    }
  );

  console.log("Requested by latitude and longitude");
};
