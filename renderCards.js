import { createHtmlElement, daysOfWeek, removeChilds } from "./utils.js";

const weatherList = document.querySelector(".weather-list");

const getCorrespondingWeatherData = (day, time = "18:00:00") => {
	const weatherData = JSON.parse(window.sessionStorage.getItem(day));

	return weatherData.find(
		(weatherItem) => weatherItem.dt_txt.split(" ")[1] === time
	);
};

const createCard = (day) => {
	const newCard = createHtmlElement("li", "weather-item");
	newCard.setAttribute("day", day);
	let correspondingWeatherData = getCorrespondingWeatherData(day);
	const weatherData = JSON.parse(window.sessionStorage.getItem(day));
	correspondingWeatherData = correspondingWeatherData ? correspondingWeatherData : weatherData.at(-1);
	const tempereture = Math.round(correspondingWeatherData.main.temp);
	const weather = correspondingWeatherData.weather[0].description;

	const currentDay = new Date(+(correspondingWeatherData.dt + "000"));
	const currentDayOfWeek = daysOfWeek[currentDay.getDay()];

	const cardDayDate = createHtmlElement("span", "weather-date", day);
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
		cardDayWeather,
		cardDayTemperature
	);
	weatherList.append(newCard);
};

export const renderWeeklyCards = (weeklyDays) => {
	removeChilds(weatherList);
	weeklyDays.forEach((day) => {
		createCard(day);
	});
};
