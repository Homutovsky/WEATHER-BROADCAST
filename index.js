import { giveEventListener } from './appEventListener.js';
import { clockTimer } from './dateAndTime.js';
import { timeToDay } from './dateAndTime.js';


giveEventListener();
clockTimer();

export function request(url, defaultData) {
    return fetch(url)
        .then(response => response.ok ? response.json() : defaultData)
}

