import { getCorrespondingWeatherData } from "./getCorrespondingWeatherData.js";
import { getDayOfWeek } from "./utils.js";
import { getBackgroundImage } from "./getBackgroundImage.js";



export const setContent = (day, time) => {

	const { correspondingWeatherData, timeRanges } =
		getCorrespondingWeatherData(day, time);
	const weatherDescription = correspondingWeatherData.weather[0].description;
	const weatherTags = correspondingWeatherData.weather[0].main;
	const timeForSearch = time.split(':')[0]

	let tags;
	if (+timeForSearch <= 6) {
		tags = 'night,twilight,' + weatherTags;
	} else if (+timeForSearch >= 6 && +timeForSearch <= 12) {
		tags = 'morning,' + weatherTags;
	} else if (+timeForSearch >= 12 && +timeForSearch <= 18) {
		tags = 'afternoon,' + weatherTags;
	} else {
		tags = 'evening,' + weatherTags;
	}

	getBackgroundImage(`${tags}`, `${weatherDescription}`, +timeForSearch)

	const dateToday = document.querySelector(".date-today");
	dateToday.textContent = day;

	const today = document.querySelector(".today");
	today.textContent = getDayOfWeek(correspondingWeatherData.dt);
	// Апи возвращает ошибочные данные
	// Для вечера воскресенья dt = 1664139600 + 000 соответствует 00 часов понедельник
	// В это время dt_txt содержит значение 2022-09-25 :: 21:00:00

	const nameCity = document.querySelector(".name-city");

	nameCity.textContent = document.querySelector(".search-input").value;
	if (nameCity.textContent.length > 24) {
		nameCity.classList = 'newCityName'
	}
	const timeField = document.querySelector(".time");
	timeField.textContent = `Weather for: ${time}`;

	const timeControl = document.querySelector(".weather-timeControl");
	timeControl.setAttribute("type", "range");
	timeControl.setAttribute("min", 1);
	timeControl.setAttribute("max", timeRanges.length);

	const temperature = document.querySelector(".temperature");
	const weatherDate = JSON.parse(
		window.sessionStorage.getItem(day)
	);

	let mainDescription;
	let description
	weatherDate.forEach(item => {
		if (item.dt_txt === `${day} ${time}`) {
			mainDescription = item.weather[0].main
			description = item.weather[0].description
		}
	});
	const animation = document.querySelector(".animation");
	const animation1 = document.querySelector(".animation1");


	if (mainDescription === "Clear") {
		animation.classList = 'animation';
		animation1.classList = 'animation1';

		animation.classList.add("sunny");
		animation1.classList.add("sunny1");
	} else if (
		description === "broken clouds" ||
		description === "overcast clouds" ||
		description === "scattered clouds"
	) {
		animation.classList = 'animation';
		animation1.classList = 'animation1';

		animation.classList.add("cloudy");
		animation1.classList.add("cloudy1");
	} else if (
		description === "moderate rain" ||
		description === "light rain"
	) {
		animation.classList = 'animation';
		animation1.classList = 'animation1';

		animation.classList.add("rainy");
		animation1.classList.add("rainy1");
	} else if (description === "few clouds") {
		animation.classList = 'animation';
		animation1.classList = 'animation1';

		animation.classList.add("cloud-sun");
		animation1.classList.add("cloud-sun1");
	} else if (description === "heavy intensity rain") {
		animation.classList = 'animation';
		animation1.classList = 'animation1';

		animation.classList.add("stormy");
		animation1.classList.add("stormy1");
	}

	temperature.textContent = `${Math.round(correspondingWeatherData.main.temp)} °C`

	const weatherText = document.querySelector('.weatherDescription');
	weatherText.textContent = `${correspondingWeatherData.weather[0].description}`


	const humidity = document.querySelector(".humidity");
	humidity.textContent = `humidity: ${correspondingWeatherData.main.humidity}`;

	const speedWind = document.querySelector(".speed-wind");
	speedWind.textContent = `speedWind: ${correspondingWeatherData.wind.speed}`

	const pressure = document.querySelector(".pressure");
	pressure.textContent = `pressure: ${correspondingWeatherData.main.pressure}`
};