import { getLocalPosition } from "./getCordinates.js";
import { giveEventListener, city } from "./appEventListener.js";
import { clockTimer } from "./dateAndTime.js";
import { timeToDay } from "./dateAndTime.js";

getLocalPosition();
giveEventListener();
clockTimer();

export function request(url) {
    return fetch(url).then((response) => response.json());
}

