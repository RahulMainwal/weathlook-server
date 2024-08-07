const wrapper = document.querySelector(".wrapper"),
  inputPart = document.querySelector(".input-part"),
  infoTxt = inputPart.querySelector(".info-txt"),
  inputField = inputPart.querySelector("input"),
  locationBtn = inputPart.querySelector("button"),
  weatherPart = wrapper.querySelector(".weather-part"),
  wIcon = document.querySelector("#weather-icon"),
  arrowBack = wrapper.querySelector("header i"),
  bgImage = document.querySelector("#bg-image"),
  wMiddlePart = document.getElementById("weather-middle-part");

let api;

inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser not support geolocation api");
  }
});

function requestApi(city) {
  api = `http://localhost:8080/weather/api/${city}`;
  fetchData();
}

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  api = `http://localhost:8080/weather/api/${latitude}/${longitude}`;
  fetchData();
}

function onError(error) {
  infoTxt.innerText = error.message;
  infoTxt.classList.add("error");
}

function fetchData() {
  infoTxt.innerText = "Getting weather details...";
  infoTxt.classList.add("pending");
  fetch(api)
    .then((res) => res.json())
    .then((result) => weatherDetails(result))
    .catch((error) => {
      infoTxt.innerText = "Something went wrong";
      infoTxt.classList.replace("pending", "error");
    });
}

function weatherDetails(info) {
  if (info.cod == "404") {
    infoTxt.classList.replace("pending", "error");
    infoTxt.innerText = `${inputField.value} isn't a valid city name`;
  } else {
    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0];
    const { temp, feels_like, humidity } = info.main;

    const apisvg = info.weather[0].icon;

    if (
      apisvg === "01d" ||
      apisvg === "02d" ||
      apisvg === "03d" ||
      apisvg === "04d" ||
      apisvg === "09d" ||
      apisvg === "10d" ||
      apisvg === "11d" ||
      apisvg === "13d" ||
      apisvg === "50d"
    ) {
      bgImage.src = "images/day.svg";
      wMiddlePart.style.color = "none";
    } else {
      bgImage.src = "images/night.svg";
      wMiddlePart.style.color = "white";
    }

    if (id == 800) {
      wIcon.src = "images/icons/clear.svg";
    } else if (id >= 200 && id <= 232) {
      wIcon.src = "images/icons/storm.svg";
    } else if (id >= 600 && id <= 622) {
      wIcon.src = "images/icons/snow.svg";
    } else if (id >= 701 && id <= 781) {
      wIcon.src = "images/icons/haze.svg";
    } else if (id >= 801 && id <= 804) {
      wIcon.src = "images/icons/cloud.svg";
    } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
      wIcon.src = "images/icons/rain.svg";
    }

    weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
    weatherPart.querySelector(".weather").innerText = description;
    weatherPart.querySelector(
      ".location span"
    ).innerText = `${city}, ${country}`;
    weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(
      feels_like
    );
    weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
    infoTxt.classList.remove("pending", "error");
    infoTxt.innerText = "";
    inputField.value = "";
    wrapper.classList.add("active");
  }
}

arrowBack.addEventListener("click", () => {
  wrapper.classList.remove("active");
});
