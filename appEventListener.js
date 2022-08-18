import { headerBtn, footerInfo, footerImg, mainInput, mainBtn, geoKey } from './nodes.js';
import { request } from './index.js';
import { images } from './getImages.js';


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

    let city;
    let lat;
    let lng;
    mainInput.addEventListener('input', (event) => {
        if (mainInput.value) {
            mainBtn.disabled = false;
        } else {
            mainBtn.disabled = true;
        }
        city = mainInput.value;
    })

    mainBtn.addEventListener('click', () => {

        const geo = {
            url: 'https://api.opencagedata.com/',
            getRequestUrl(city) {
                return (`${this.url}/geocode/v1/json?q=${city}&key=${geoKey}`);
            },
        }

        request(geo.getRequestUrl(city))
            .then(date => {
                let getQueryResult = [];
                getQueryResult.push(date.results[0])
                lat = getQueryResult[0].geometry.lat
                lng = getQueryResult[0].geometry.lng

            })
    })
}

let localLatitude;
let localLongitude;
navigator.geolocation.getCurrentPosition((succes) => {
    if (succes) {
        localLatitude = (succes.coords.latitude)
        localLongitude = (succes.coords.longitude)
        console.log(localLatitude, localLongitude)
    } else {
        localLatitude = '53.90336';
        localLongitude = '27.5120128';
    }
})
