import { getCorrespondingWeatherData} from "./getCorrespondingWeatherData.js";
import { getDayOfWeek} from "./utils.js";


export const setContent = (day, time) => {

	const { correspondingWeatherData, timeRanges } =
		getCorrespondingWeatherData(day, time);

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
	temperature.textContent = `temperature: ${Math.round(correspondingWeatherData.main.temp)} °C`

	const humidity = document.querySelector(".humidity");
	humidity.textContent = `humidity: ${correspondingWeatherData.main.humidity}`;

	const speedWind = document.querySelector(".speed-wind");
	speedWind.textContent = `speedWind: ${correspondingWeatherData.wind.speed}`

	const pressure = document.querySelector(".pressure");
	pressure.textContent = `pressure: ${correspondingWeatherData.main.pressure}`
};