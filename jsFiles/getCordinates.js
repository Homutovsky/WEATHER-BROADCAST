import { request } from "./index.js";
import { geoKey, nameCity, mainInput } from "./nodes.js";

export let cityLongitude = [];
export let cityLatitude = [];
export let localLatitude = [];
export let localLongitude = [];

export const getCityCordinates = function (city) {
	city = mainInput.value ? mainInput.value : "Minsk";
	const geo = {
		url: "https://api.opencagedata.com/",
		getRequestUrl(city) {
			return `${this.url}/geocode/v1/json?q=${city}&key=${geoKey}`;
		},
	};
	request(geo.getRequestUrl(city)).then((date) => {
		const { lat: x, lng: y } = date.results[0].geometry;
		if (x && y) {
			nameCity.textContent = city;
		}

		cityLatitude.push(x);
		cityLongitude.push(y);
		if (cityLongitude.length > 1) {
			cityLatitude.shift();
			cityLongitude.shift();
		}
	});
};
export const getLocalPosition = function () {
	navigator.geolocation.getCurrentPosition((succes) => {
		if (succes) {
			const { latitude: x, longitude: y } = succes.coords;
			localLatitude.push(x);
			localLongitude.push(y);
		} else {
			localLatitude.push("53.90336");
			localLongitude.push("27.5120128");
		}
	});
};
getCityCordinates();
