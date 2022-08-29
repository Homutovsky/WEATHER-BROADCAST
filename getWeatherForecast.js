import {
    weatherKey,
    temperature,
    humidity,
    speedWind,
    pressure,
    header,
    weatherDateToday,
    weatherDayToday,
    weatherWeatherToday,
    weatherTemperatureToday,
    weatherDateFirst,
    weatherDayFirst,
    weatherWeatherFirst,
    weatherTemperatureFirst,
    weatherDateSecond,
    weatherDaySecond,
    weatherWeatherSecond,
    weatherTemperatureSecond,
    weatherDateThird,
    weatherDayThird,
    weatherWeatherThird,
    weatherTemperatureThird,
    weatherDateFourth,
    weatherDayFourth,
    weatherWeatherFourth,
    weatherTemperatureFourth,
    weatherDateFifth,
    weatherDayFifth,
    weatherWeatherFifth,
    weatherTemperatureFifth
} from "./nodes.js";
import { request } from "./index.js";
import {
    cityLatitude,
    cityLongitude,
    localLatitude,
    localLongitude,
} from "./getCordinates.js";

export const getWeatherForecast = function (Latitude, Longitude) {
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
        objectWithArr.forEach((elem, ind) => {
            elem = objectWithArr[ind].dt_txt;
            if (elem === tomorrowDate) {
                index = ind;
            }
        })

        console.log(date, 3);
        function createCardWeather(weatherDate, weatherDay, weatherWeather, weatherTemperature, nomber, index) {
            weatherDate.textContent = `${('' + new Date(newDate.getTime() + (86400000 * nomber))).split(' ')[2]}-${currentMonth}-${newDate.getFullYear()}`
            weatherDay.textContent = ('' + new Date(newDate.getTime() + (86400000 * nomber))).split(' ')[0];
            weatherWeather.textContent = objectWithArr[index].weather[0].description;
            weatherTemperature.textContent = `${Math.round(objectWithArr[index].main.temp)} °C`
        }
        createCardWeather(weatherDateToday, weatherDayToday, weatherWeatherToday, weatherTemperatureToday, 0, 0);
        createCardWeather(weatherDateFirst, weatherDayFirst, weatherWeatherFirst, weatherTemperatureFirst, 1, index);
        createCardWeather(weatherDateSecond, weatherDaySecond, weatherWeatherSecond, weatherTemperatureSecond, 2, index + 8);
        createCardWeather(weatherDateThird, weatherDayThird, weatherWeatherThird, weatherTemperatureThird, 3, index + 16);
        createCardWeather(weatherDateFourth, weatherDayFourth, weatherWeatherFourth, weatherTemperatureFourth, 4, index + 24);
        createCardWeather(weatherDateFifth, weatherDayFifth, weatherWeatherFifth, weatherTemperatureFifth, 5, index + 31);

    });
}