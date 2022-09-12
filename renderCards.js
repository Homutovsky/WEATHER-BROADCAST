import { createHtmlElement, getDayOfWeek, removeChilds } from "./utils.js";

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
const renderMainCard = (day) => {
	const weatherToday = createHtmlElement("div", "weather-today");
	const mainContainer = document.querySelector(".main-container");
	mainContainer.prepend(weatherToday);

	const resetBtn = createHtmlElement("button", "reset-btn");
	resetBtn.addEventListener("click", () => {
		const today = new Date().toISOString().split("T")[0];

		const currentTime = new Date().getHours();
		const time = currentTime + (3 - (currentTime % 3));
		setContent(today, `${time === 24 ? 21 : time}:00:00`);
	});
	const timeControl = createHtmlElement("input", "weather-timeControl");

	const dateToday = createHtmlElement("h3", "date-today");
	const weatherWrapper = createHtmlElement("div", "weather-wrapper");
	const today = createHtmlElement("h1", "today");
	weatherWrapper.append(today);

	const mainInformation = createHtmlElement("div", "main-information");
	const nameCity = createHtmlElement("h2", "name-city");
	const time = createHtmlElement("h2", "time");
	const temperature = createHtmlElement("h2", "temperature");
	mainInformation.prepend(nameCity, time, timeControl, temperature);

	const extraInformation = createHtmlElement("div", "extra-information");
	const humidity = createHtmlElement("span", "humidity");
	const speedWind = createHtmlElement("span", "speed-wind");
	const pressure = createHtmlElement("span", "pressure");
	extraInformation.prepend(humidity, speedWind, pressure);

	weatherToday.prepend(
		resetBtn,
		dateToday,
		weatherWrapper,
		mainInformation,
		extraInformation
	);
};

export const setContent = (day, time) => {
	const { correspondingWeatherData, timeRanges } =
		getCorrespondingWeatherData(day, time);

	const dateToday = document.querySelector(".date-today");
	dateToday.textContent = day;

	const today = document.querySelector(".today");
	today.textContent = getDayOfWeek(correspondingWeatherData.dt);

	const nameCity = document.querySelector(".name-city");
	nameCity.textContent = document.querySelector(".search-input").value;

	const timeField = document.querySelector(".time");
	timeField.textContent = `Weather for: ${time}`;

	const timeControl = document.querySelector(".weather-timeControl");
	timeControl.setAttribute("type", "range");
	timeControl.setAttribute("min", 1);
	timeControl.setAttribute("max", timeRanges.length);

	const onTimeControl = (event) => {
		setContent(day, timeRanges[event.target.value - 1]);
		timeControl.removeEventListener("input", onTimeControl);
	};

	timeControl.addEventListener("input", onTimeControl);

	const temperature = document.querySelector(".temperature");
	temperature.textContent = `temperature: ${Math.round(correspondingWeatherData.main.temp)} °C`

	const humidity = document.querySelector(".humidity");
	humidity.textContent = `humidity: ${correspondingWeatherData.main.humidity}`;

	const speedWind = document.querySelector(".speed-wind");
	speedWind.textContent = `speedWind: ${correspondingWeatherData.wind.speed}`

	const pressure = document.querySelector(".pressure");
	pressure.textContent = `pressure: ${correspondingWeatherData.main.pressure}`
};
renderMainCard();