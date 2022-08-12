import { key } from './nodes.js';
import { request } from './index.js';
const tags = 'nature';
export let images = [];

const flickr = {
    url: 'https://www.flickr.com/',
    getRequestUrl(tags) {
        return (`${this.url}/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${tags}&tag_mode=all&extras=url_h&format=json&nojsoncallback=1`);
    },
}
request(flickr.getRequestUrl(tags))
    .then(data => {
        data.photos.photo.filter(element => {
            if (element.url_h) {
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