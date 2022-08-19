import { headerBtn, footerInfo, footerImg, mainInput, mainBtn, weatherKey } from './nodes.js';
import { request } from './index.js';
import { images } from './getImages.js';
import { getCityCordinates } from './getCityCordinates.js';
export let city;


export const giveEventListener = function () {
    request();

    let gitAvatar;
    let gitName;
    let gitBio;
    let createDiv;
    let i = 0;
    let j = 0;

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

    headerBtn.addEventListener('click', () => {
        i++;
        j++;
        if (images[i]) {
            const img = new Image();
            img.src = images[i]
            img.addEventListener('load', () => {
                document.body.style.backgroundImage = `url('${images[i]}')`;
            })
        }
    })


    mainInput.addEventListener('input', (event) => {
        if (mainInput.value) {
            mainBtn.disabled = false;
        } else {
            mainBtn.disabled = true;
        }
        city = mainInput.value;
    })

    mainBtn.addEventListener('click', () => {
        getCityCordinates()
    })

    document.addEventListener('keydown', event => {
        if (event.code === 'Enter' && city !== '') {
            getCityCordinates()
        }
    })

    let localLatitude;
    let localLongitude;
    navigator.geolocation.getCurrentPosition((succes) => {
        if (succes) {
            const { latitude: lat,
                longitude: lng } = succes.coords;
            localLatitude = lat;
            localLongitude = lng;
        } else {
            localLatitude = '53.90336';
            localLongitude = '27.5120128';
        }
    })

    const getWeatherForecast = function () {
        const weatherQuery = {
            url: 'https://api.openweathermap.org/',
            getRequestUrl() {
                return (`${this.url}/data/3.0/onecall?lat=${localLatitude}&lon=${localLongitude}&exclude='minutely'&appid=${weatherKey}`);
            }
        }
        request(weatherQuery.getRequestUrl())
            .then(date => {
                console.log(date, 1)
            })

    }
    getWeatherForecast()




}




