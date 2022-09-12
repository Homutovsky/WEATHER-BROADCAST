import { key } from './nodes.js';
import { request } from './index.js';
import { timeToDay } from './dateAndTime.js';
import { clockTimer } from './dateAndTime.js';

export let images = [];
clockTimer();

const flickr = {
    url: 'https://www.flickr.com/',
    getRequestUrl(tags) {
        return (`${this.url}/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${tags}&tag_mode=all&extras=url_h&format=json&nojsoncallback=1`);
    },
}

let tags;
if (timeToDay[0] <= 6) {
    tags = 'night,twilight,moon';
} else if (timeToDay[0] >= 6 && timeToDay[0] <= 12) {
    tags = 'morning,sunrise';
} else if (timeToDay[0] >= 12 && timeToDay[0] <= 18) {
    tags = 'afternoon,sun,canyon';
} else {
    tags = 'evening,sunset,nature';
}
request(flickr.getRequestUrl(tags))
    .then(data => {
        data.photos.photo.filter(element => {
            if (element.url_h) {
                images.push(element.url_h)
            };
        });
    });
