import {
    headerBtn,
    footerInfo,
    footerImg,
    mainInput,
    mainBtn,
    weatherKey,
    temperature,
    humidity,
    speedWind,
    sunMove,
    pressure,
    header
} from "./nodes.js";
import { request } from "./index.js";
import { images } from "./getImages.js";
import {
    getCityCordinates,
    cityLatitude,
    cityLongitude,
    localLatitude,
    localLongitude,
} from "./getCordinates.js";

export let city = 'Minsk';
export const giveEventListener = function () {
    request();
    let gitAvatar;
    let gitName;
    let gitBio;
    let createDiv;
    let i = 0;
    let j = 0;

    request("https://api.github.com/users/homutovsky").then((data) => {
        gitAvatar = data.avatar_url;
        gitName = data.name;
        gitBio = data.bio;
        gitBio ? gitBio : (gitBio = "Front-end developer");
    });

    footerInfo.addEventListener("mouseover", () => {
        footerImg.src = gitAvatar;
        const newElement = document.createElement("div");
        footerInfo.after(newElement);
        newElement.className = "create-div";
        createDiv = document.querySelector(".create-div");
        createDiv.textContent = `${gitName} - ${gitBio}`;
    });

    footerInfo.addEventListener("mouseout", () => {
        footerImg.src = "img/footer-git_icon.svg";
        createDiv.remove();
    });

    headerBtn.addEventListener("click", () => {
        i++;
        j++;
        if (images[i]) {
            const img = new Image();
            img.src = images[i];
            img.addEventListener("load", () => {
                document.body.style.backgroundImage = `url('${images[i]}')`;
            });
        }
    });

    mainInput.addEventListener("input", (event) => {
        if (mainInput.value) {
            mainBtn.disabled = false;
        } else {
            mainBtn.disabled = true;
        }
        city = mainInput.value;
    });

    mainBtn.addEventListener("click", () => {
        getCityCordinates();
        document.querySelector('.weather-condition').remove();
        document.querySelector('.weather-condition1').remove();

        setTimeout(() => {
            getWeatherForecast();
        }, 1000)
    });

    document.addEventListener("keydown", (event) => {
        if (event.code === "Enter" && city !== "") {
            getCityCordinates();
            document.querySelector('.weather-condition').remove();
            document.querySelector('.weather-condition1').remove();
            setTimeout(() => {
                getWeatherForecast();
            }, 1000)
        }
    });

    const getWeatherForecast = function (Latitude, Longitude) {
        Latitude = cityLatitude ? cityLatitude.at(-1) : localLatitude;
        Longitude = cityLongitude ? cityLongitude.at(-1) : localLongitude;

        const weatherQuery = {
            url: "https://api.openweathermap.org/",
            units: 'metric',
            exclude: 'current,minutely,hourly,daily',
            getRequestUrl() {
                return `${this.url}/data/2.5/weather?lat=${Latitude}&lon=${Longitude}&exclude=${this.exclude}&appid=${weatherKey}&units=${this.units}`;
            },
        };
        request(weatherQuery.getRequestUrl()).then((date) => {
            temperature.textContent = `${Math.round(date.main.temp)}  °C`;
            humidity.textContent = `влажность  ${date.main.humidity} %`;
            speedWind.textContent = `скорость ветра  ${date.wind.speed} м/с`;
            const currentHour = new Date;
            let hoursSunset = new Date(+`${date.sys.sunset * 1000}`).getHours();
            let minutesSunset = new Date(+`${date.sys.sunset * 1000}`).getMinutes()
            let hoursSunrise = new Date(+`${date.sys.sunrise * 1000}`).getHours();
            let minutesSunrise = new Date(+`${date.sys.sunrise * 1000}`).getMinutes()

            if (currentHour.getHours() < hoursSunset) {
                minutesSunset = minutesSunset < 10 ? '0' + minutesSunset : minutesSunset;
                hoursSunset = hoursSunset < 10 ? '0' + hoursSunset : hoursSunset;
                sunMove.textContent = `закат в ${hoursSunset}:${minutesSunset}`
            } else {
                minutesSunrise = minutesSunrise < 10 ? '0' + minutesSunrise : minutesSunrise;
                hoursSunrise = hoursSunrise < 10 ? '0' + hoursSunrise : hoursSunrise;
                sunMove.textContent = `рассвет в ${hoursSunrise}:${minutesSunrise}`
            }
            pressure.textContent = `давление  ${date.main.pressure * 0.75} мм рт ст`;

            const div = document.createElement('div');
            const div1 = document.createElement('div1');
            div.className = 'weather-condition';
            div1.className = 'weather-condition1';
            header.prepend(div);
            header.append(div1);
            const weatherCondition = document.querySelector(".weather-condition");
            const weatherCondition1 = document.querySelector(".weather-condition1");

            if (`${date.weather[0].main}` === 'Clear') {
                weatherCondition.classList.add('sunny');
                weatherCondition1.classList.add('sunny1');
            } else if (`${date.weather[0].description}` === 'broken clouds' || `${date.weather[0].description}` === 'overcast clouds' || `${date.weather[0].description}` === 'scattered clouds') {
                weatherCondition.classList.add('cloudy');
                weatherCondition1.classList.add('cloudy1');
            } else if (`${date.weather[0].description}` === 'moderate rain' || `${date.weather[0].description}` === 'light rain') {
                weatherCondition.classList.add('rainy');
                weatherCondition1.classList.add('rainy1');
            } else if (`${date.weather[0].description}` === "few clouds") {
                weatherCondition.classList.add('cloud-sun');
                weatherCondition1.classList.add('cloud-sun1');
            } else if (`${date.weather[0].description}` === "heavy intensity rain") {
                weatherCondition.classList.add('stormy');
                weatherCondition1.classList.add('stormy1');
            }
            console.log(date, 3);
        });
    }
    setTimeout(() => {
        getWeatherForecast();
    }, 1000)
};
