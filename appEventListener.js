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
    pressure,
    header,
    weatherDateFirst,
    weatherDayFirst,
    weatherWeatherFirst,
    weatherTemperatureFirst,
    weatherDateSecond,
    weatherDaySecond,
    weatherWeatherSecond,
    weatherTemperatureSecond
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
                return `${this.url}/data/2.5/forecast?lat=${Latitude}&lon=${Longitude}&exclude=${this.exclude}&appid=${weatherKey}&units=${this.units}`;
            },
        };
        request(weatherQuery.getRequestUrl()).then((date) => {
            const newDate = new Date;

            const div = document.createElement('div');
            const div1 = document.createElement('div1');
            div.className = 'weather-condition';
            div1.className = 'weather-condition1';
            header.prepend(div);
            header.append(div1);
            const weatherCondition = document.querySelector(".weather-condition");
            const weatherCondition1 = document.querySelector(".weather-condition1");

            const { list: objectWithArr } = date;
            const { [0]: extraInfromation } = date.list;
            const { [0]: weatherInformation } = date.list[0].weather;
            const main = `${weatherInformation.main}`;
            const description = `${weatherInformation.description}`;

            temperature.textContent = `${Math.round(extraInfromation.main.temp)}  °C`;
            humidity.textContent = `влажность  ${extraInfromation.main.humidity} %`;
            pressure.textContent = `давление  ${extraInfromation.main.pressure * 0.75} мм рт ст`;
            speedWind.textContent = `скорость ветра  ${date.list[0].wind.speed} м/с`;

            if (main === 'Clear') {
                weatherCondition.classList.add('sunny');
                weatherCondition1.classList.add('sunny1');
            } else if (description === 'broken clouds' || description === 'overcast clouds' || description === 'scattered clouds') {
                weatherCondition.classList.add('cloudy');
                weatherCondition1.classList.add('cloudy1');
            } else if (description === 'moderate rain' || description === 'light rain') {
                weatherCondition.classList.add('rainy');
                weatherCondition1.classList.add('rainy1');
            } else if (description === "few clouds") {
                weatherCondition.classList.add('cloud-sun');
                weatherCondition1.classList.add('cloud-sun1');
            } else if (description === "heavy intensity rain") {
                weatherCondition.classList.add('stormy');
                weatherCondition1.classList.add('stormy1');
            }
            const currentMonth = newDate.getMonth() < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1;
            const currentDate = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();

            let tomorrowDate = `${newDate.getFullYear()}-${currentMonth}-${+currentDate + 1} 15:00:00`;
            let index;
            let index1;
            let index2;
            for (i = 1; i < objectWithArr.length; i++) {
                if (objectWithArr[i].dt_txt === tomorrowDate) {
                    index = i;
                    index1 = i + 8
                    index2 = i + 16
                    break
                }
            }
            console.log(index1)
            weatherDateFirst.textContent = `${+currentDate + 1}-${currentMonth}-${newDate.getFullYear()}`
            weatherDayFirst.textContent = ('' + new Date(newDate.getTime() + 86400000)).split(' ')[0];
            weatherWeatherFirst.textContent = objectWithArr[index].weather[0].description;
            weatherTemperatureFirst.textContent = `${Math.round(objectWithArr[index].main.temp)} °C`

            weatherDateSecond.textContent = `${+currentDate + 2}-${currentMonth}-${newDate.getFullYear()}`
            weatherDaySecond.textContent = ('' + new Date(newDate.getTime() + (86400000 * 2))).split(' ')[0];
            weatherWeatherSecond.textContent = objectWithArr[index1].weather[0].description;
            weatherTemperatureSecond.textContent = `${Math.round(objectWithArr[index1].main.temp)} °C`



            console.log(date, 3);
        });
    }
    setTimeout(() => {
        getWeatherForecast();
    }, 1000)
};
