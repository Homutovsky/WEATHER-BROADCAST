import { createHtmlElement, getDayOfWeek, removeChilds } from "./utils.js";
import { setContent } from "./script.js";

const weatherList = document.querySelector(".weather-list");

export const getCorrespondingWeatherData = (day, time) => {
	const weatherData = JSON.parse(window.sessionStorage.getItem(day));
	let correspondingWeatherData = {};
	if (time) {
		correspondingWeatherData = weatherData.find(
			(weatherItem) => weatherItem.dt_txt.split(" ")[1] === time
		);
	} else {
		correspondingWeatherData = weatherData[weatherData.length - 1];
	}
	const timeRanges = weatherData.map(
		(weatherItem) => weatherItem.dt_txt.split(" ")[1]
	);

	return {
		correspondingWeatherData,
		timeRanges,
	};
};

const createCard = (day) => {
	const newCard = createHtmlElement("li", "weather-item");
	newCard.setAttribute("day", day);
	let { correspondingWeatherData } = getCorrespondingWeatherData(
		day,
		"15:00:00"
	);
	const weatherData = JSON.parse(window.sessionStorage.getItem(day));
	correspondingWeatherData = correspondingWeatherData
		? correspondingWeatherData
		: weatherData.at(-1);
	const tempereture = Math.round(correspondingWeatherData.main.temp);
	const weather = correspondingWeatherData.weather[0].description;
	const time = correspondingWeatherData.dt_txt.split(" ")[1];

	const currentDayOfWeek = getDayOfWeek(correspondingWeatherData.dt);

	const cardDayDate = createHtmlElement("span", "weather-date", day);
	const cardDayTime = createHtmlElement("span", "weather-date", time);

	const cardDayOfWeek = createHtmlElement(
		"span",
		"weather-day",
		currentDayOfWeek
	);
	const cardDayWeather = createHtmlElement(
		"span",
		"weather-weather",
		weather
	);
	const cardDayTemperature = createHtmlElement(
		"span",
		"weather-temperature",
		`${tempereture} °C`
	);

	newCard.append(
		cardDayDate,
		cardDayOfWeek,
		cardDayTime,
		// timeControl,
		cardDayWeather,
		cardDayTemperature
	);
	weatherList.append(newCard);
	newCard.addEventListener("click", (event) => {
		setContent(day, time);
	});
};

export const renderWeeklyCards = (weeklyDays) => {
	removeChilds(weatherList);
	weeklyDays.forEach((day) => {
		createCard(day);
	});
};
