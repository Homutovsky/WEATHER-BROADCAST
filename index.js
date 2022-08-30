import { getLocalPosition } from "./getCordinates.js";
import { giveEventListener } from "./appEventListener.js";
import { clockTimer } from "./dateAndTime.js";
import { timeToDay } from "./dateAndTime.js";
import { getWeatherForecast } from "./getWeatherForecast.js";

getLocalPosition();
giveEventListener();
clockTimer();
setTimeout(() => {
	getWeatherForecast();
}, 1000);

export function request(url) {
	return fetch(url).then((response) => response.json());
}
