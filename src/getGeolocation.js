import { requestWeather } from "./search.js";
import { geo, request } from "./utils.js";


const getGeolocation = async (geolocation) => {
  const { latitude, longitude } = geolocation.coords;
  requestWeather(latitude, longitude);
  const url = geo.getCityBy(latitude, longitude);
  const res = await request(url);
  const city = res.results[0].components.city;
  const country = res.results[0].components.country;
  const searchInput = document.querySelector(".search-input");
  searchInput.value = `${city ? city : 'city'}, ${country}`

}

const requestPermission = () => {

  const answer = confirm('Показать погоду для вашей геолокации');
  if (answer) {
    navigator.geolocation.getCurrentPosition(getGeolocation);
  }
}
requestPermission();

