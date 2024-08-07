var express = require("express");
var bodyParser = require("body-parser");
var userRoutes = require("./routes/userRoutes");
var dotenv = require("dotenv");
var cors = require("cors");

var app = express();
dotenv.config();

//  https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
//  https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json()).use(cors());

app.get("/", (req, res) => {
  res.send("Server has been started.");
});

app.use("/weather/api/", userRoutes);

var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
