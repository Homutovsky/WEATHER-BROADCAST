import { getCorrespondingWeatherData} from "./getCorrespondingWeatherData.js";
import { getDayOfWeek} from "./utils.js";
import { getBackgroundImage} from "./getBackgroundImage.js";



export const setContent = (day, time) => {

	const { correspondingWeatherData, timeRanges } =
		getCorrespondingWeatherData(day, time);
		const weatherDescription = correspondingWeatherData.weather[0].description;
		const weatherTags = correspondingWeatherData.weather[0].main;

		const timeForSearch = time.split(':')[0]

		getBackgroundImage(`weather,${weatherTags}`,`weather ${weatherDescription}`, +timeForSearch )

	const dateToday = document.querySelector(".date-today");
	dateToday.textContent = day;

	const today = document.querySelector(".today");
	today.textContent = getDayOfWeek(correspondingWeatherData.dt);
	// Апи возвращает ошибочные данные
	// Для вечера воскресенья dt = 1664139600 + 000 соответствует 00 часов понедельник
	// В это время dt_txt содержит значение 2022-09-25 :: 21:00:00

	const nameCity = document.querySelector(".name-city");
	nameCity.textContent = document.querySelector(".search-input").value;

	const timeField = document.querySelector(".time");
	timeField.textContent = `Weather for: ${time}`;

	const timeControl = document.querySelector(".weather-timeControl");
	timeControl.setAttribute("type", "range");
	timeControl.setAttribute("min", 1);
	timeControl.setAttribute("max", timeRanges.length);
	
	const temperature = document.querySelector(".temperature");
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