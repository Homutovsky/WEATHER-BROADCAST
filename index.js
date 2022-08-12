import('./appEventListener.js');
import { clockTimer } from './dateAndTime.js';


clockTimer();
export function request(url, defaultData) {
    return fetch(url)
        .then(response => response.ok ? response.json() : defaultData)
}
