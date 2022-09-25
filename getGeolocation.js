import { requestWeather } from "./search.js";

const getGeolocation = (geolocation) => {
  const {latitude, longitude} = geolocation.coords;
  requestWeather(latitude, longitude)
}

const requestPermission = () => {
  const answer = confirm('Показать погоду для вашей геолокации');
  if(answer) {
    navigator.geolocation.getCurrentPosition(getGeolocation);
  } 
}
requestPermission();

