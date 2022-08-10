const clock = document.querySelector(".header-time");
const dateToday = document.querySelector(".date-today");
const dayWeek = document.querySelector(".day-week");
const headerBtn = document.querySelector(".header-button");
const footerInfo = document.querySelector(".footer-info");
const footerImg = document.querySelector(".footer-img");
const loo = document.querySelector(".loo");



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

let gitAvatar;
let gitName;
let gitBio;
let createDiv;
const creatorInformation = fetch('https://api.github.com/users/homutovsky')
creatorInformation
    .then((response) => {
        const promise = response.json();
        return promise
    })
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

headerBtn.addEventListener('click', () => {
    const changerPhoto = fetch(https://api.flickr.com/services)
})