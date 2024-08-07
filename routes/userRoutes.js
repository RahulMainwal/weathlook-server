const express = require("express");
const {
  sendCityForKnowingWeather,
  sendLatitudeLongitudeForKnowingWeather,
} = require("../controllers/userControllers");
const { userRequestValidator } = require("../middlewares/userReqValidator");
const router = express.Router();

router.get("/:city", userRequestValidator, sendCityForKnowingWeather);
router.get(
  "/:latitude/:longitude",
  userRequestValidator,
  sendLatitudeLongitudeForKnowingWeather
);

module.exports = router;
