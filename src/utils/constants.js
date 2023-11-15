const weatherConditions = [
  {
    weather: "sunny",
    url: require("../images/day-weather/sunny.svg").default,
    day: true,
  },
  {
    weather: "cloudy",
    url: require("../images/day-weather/cloudy.svg").default,
    day: true,
  },
  {
    weather: "rain",
    url: require("../images/day-weather/rain.svg").default,
    day: true,
  },
  {
    weather: "storm",
    url: require("../images/day-weather/storm.svg").default,
    day: true,
  },
  {
    weather: "snow",
    url: require("../images/day-weather/snow.svg").default,
    day: true,
  },
  {
    weather: "fog",
    url: require("../images/day-weather/fog.svg").default,
    day: true,
  },
];

const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Winter coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

const apiKey = "7fdcb46da96fb444e3ed010cf264fd9e";

const latitude = 32.222607;
const longitude = -110.974709;

export { weatherConditions, defaultClothingItems, apiKey, latitude, longitude };
