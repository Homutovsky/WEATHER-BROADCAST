import { giveEventListener } from "./appEventListener.js";
import { clockTimer } from "./dateAndTime.js";
import { timeToDay } from "./dateAndTime.js";
import {
	cityLatitude,
	cityLongitude,
	localLatitude,
	localLongitude,
	getLocalPosition,
} from "./getCordinates.js";
getLocalPosition();
giveEventListener();
clockTimer();
export function request(url) {
	return fetch(url).then((response) => response.json());
}

cityLatitude.join("");
cityLongitude.join("");
localLatitude.join("");
localLongitude.join("");
console.log(cityLatitude, cityLongitude, localLatitude, localLongitude);
