const clock = document.querySelector(".header-time");
const dateToday = document.querySelector(".date-today");
const dayWeek = document.querySelector(".day-week");
const headerBtn = document.querySelector(".header-button");
const footerInfo = document.querySelector(".footer-info");
const footerImg = document.querySelector(".footer-img");
const body = document.querySelector("body");
const key = '3ccd8c73603482c1dfb8a13e3f0b3b5b';


function clockTimer() {
    const date = new Date();
    const time = [date.getHours(), date.getMinutes(), date.getSeconds()];

    const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthOfyear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = date.getDay();
    const month = date.getMonth();
    const dayOfmonth = date.getDate();

    if (time[0] < 10) { time[0] = "0" + time[0]; }
    if (time[1] < 10) { time[1] = "0" + time[1]; }
    if (time[2] < 10) { time[2] = "0" + time[2]; }

    let currentTime = [time[0], time[1], time[2]].join(':');
    clock.textContent = currentTime;


    dateToday.textContent = [dayOfmonth, monthOfyear[month]].join(' ');
    dayWeek.textContent = [dayOfWeek[days]].join('');

    timerId = setTimeout(clockTimer, 1000);
}
clockTimer()

function request(url, defaultData) {
    return fetch(url)
        .then(response => response.ok ? response.json() : defaultData)
}

let gitAvatar;
let gitName;
let gitBio;
let createDiv;

request('https://api.github.com/users/homutovsky')
    .then((data) => {
        gitAvatar = data.avatar_url;
        gitName = data.name;
        gitBio = data.bio;
        gitBio ? gitBio : gitBio = 'Front-end developer'
    })

footerInfo.addEventListener('mouseover', () => {
    footerImg.src = gitAvatar;
    const newElement = document.createElement('div');
    footerInfo.after(newElement);
    newElement.className = 'create-div';
    createDiv = document.querySelector(".create-div");
    createDiv.textContent = `${gitName} - ${gitBio}`;
})

footerInfo.addEventListener('mouseout', () => {
    footerImg.src = "img/footer-git_icon.svg";
    createDiv.remove()
})

let i = 0;
let j = 0;
// let images;
const tags = 'nature'

const flickr = {
    url: 'https://www.flickr.com/',
    getRequestUrl(tags) {
        return (`${this.url}/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${tags}&tag_mode=all&extras=url_h&format=json&nojsoncallback=1`);
    },
}

defaultData = {
    photos: {
        photo: [
            'https://live.staticflickr.com/65535/50614166012_adb10128a1_h.jpg',
            'https://live.staticflickr.com/65535/52277006822_05473162a0_h.jpg',
            'https://live.staticflickr.com/65535/52278705520_8da4f92f2e_h.jpg',
            'https://live.staticflickr.com/65535/52278712790_abc7cfa32e_h.jpg',
            'https://live.staticflickr.com/65535/52278274238_35a9428f6b_h.jpg']
    }
}





headerBtn.addEventListener('click', () => {

    request(flickr.getRequestUrl(tags))
        .then(data => {
            const { photo: images } = data.photos;
            console.log(images)
        })

    if (images[i].url_h) {
        document.body.style.backgroundImage = `url('${images[i].url_h}')`;
        i++;
    } else {
        document.body.style.backgroundImage = `url('${defaultData.photos.photo[i]}')`;
        j++;
        if (j === 5) {
            j = 0;
        }
    }

})
