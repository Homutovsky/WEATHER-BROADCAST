import { city } from './appEventListener.js';
import { request } from './index.js';
import { geoKey, nameCity } from './nodes.js';

export const getCityCordinates = function () {
    const geo = {
        url: 'https://api.opencagedata.com/',
        getRequestUrl(city) {
            return (`${this.url}/geocode/v1/json?q=${city}&key=${geoKey}`);
        },
    }
    request(geo.getRequestUrl(city))
        .then(date => {
            const { lat: cityLatitude,
                lng: cityLongitude } = date.results[0].geometry
            if (cityLongitude && cityLatitude) {
                nameCity.textContent = city
            }
        })
}
