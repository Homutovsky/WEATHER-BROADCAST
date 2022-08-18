import { giveEventListener } from './appEventListener.js';
import { clockTimer } from './dateAndTime.js';
import { timeToDay } from './dateAndTime.js';


giveEventListener();
clockTimer();

export function request(url) {
    return fetch(url)
        .then(response => response.json())
}


