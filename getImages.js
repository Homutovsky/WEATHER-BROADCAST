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
                console.log(element)
                images.push(element.url_h)
            };
        });
    });


    // const defaultData = {
//     photos: {
//         photo: [
//             'https://live.staticflickr.com/65535/50614166012_adb10128a1_h.jpg',
//             'https://live.staticflickr.com/65535/52277006822_05473162a0_h.jpg',
//             'https://live.staticflickr.com/65535/52278705520_8da4f92f2e_h.jpg',
//             'https://live.staticflickr.com/65535/52278712790_abc7cfa32e_h.jpg',
//             'https://live.staticflickr.com/65535/52278274238_35a9428f6b_h.jpg']
//     }
// };