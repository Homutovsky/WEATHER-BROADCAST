import { createHtmlElement, daysOfWeek, getTodayData, getNearestTime } from "./utils.js";
import { setContent } from "./setContent.js";
import { getCorrespondingWeatherData } from "./getCorrespondingWeatherData.js";

const listener = (event) => {
	const day = window.sessionStorage.getItem("currentDay")

	const { timeRanges } = getCorrespondingWeatherData(day);
	onTimeControl(event, day, timeRanges)
}

let timeOutForChangeImg = null;
const inputWithTimeOut = (event) => {
	if (timeOutForChangeImg !== null) {
		clearTimeout(timeOutForChangeImg);
	}
	timeOutForChangeImg = setTimeout(() => {
		listener(event);
	}, 350);
}

export const setInitialContent = () => {
	const resetBtn = document.querySelector('.reset-btn');
	resetBtn.disabled = false;

	const weatherTimeControl = document.querySelector('.weather-timeControl')
	weatherTimeControl.disabled = false;

	const todayData = getTodayData();
	const time = getNearestTime()
	setContent(todayData, time)
}

const onTimeControl = (event, day, timeRanges) => {
	setContent(day, timeRanges[event.target.value - 1]);
};

const renderMainCard = () => {
	const weatherToday = createHtmlElement("div", "weather-today");
	const mainContainer = document.querySelector(".main-container");
	mainContainer.prepend(weatherToday);
	const todayData = getTodayData();
	const dayOfWeek = daysOfWeek[new Date().getDay()]
	const resetBtn = createHtmlElement("button", "reset-btn");
	resetBtn.disabled = true;
	resetBtn.addEventListener("click", () => {

		const time = getNearestTime();
		setContent(todayData, time);
	});
	const dateToday = createHtmlElement("h3", "date-today", todayData);
	const weatherWrapper = createHtmlElement("div", "weather-wrapper");
	const mainInformation = createHtmlElement("div", "main-information");
	const extraInformation = createHtmlElement("div", "extra-information");
	weatherToday.prepend(
		resetBtn,
		dateToday,
		weatherWrapper,
		mainInformation,
		extraInformation
	);

	const timeControl = createHtmlElement("input", "weather-timeControl");


	timeControl.addEventListener("input", inputWithTimeOut, true);

	timeControl.type = 'range';
	timeControl.disabled = true;


	const today = createHtmlElement("h1", "today", dayOfWeek);
	weatherWrapper.append(today);

	const temperature = createHtmlElement("h2", "temperature", "Tempereture: -- °C");
	const animation = createHtmlElement("div", 'animation');
	const animation1 = createHtmlElement("div", 'animation1');

	const weatherDescription = createHtmlElement("h2", "weatherDescription", "Description: ...");
	const subInformation = createHtmlElement("div", 'subInformation');
	subInformation.prepend(temperature, animation, animation1, weatherDescription)


	const nameCity = createHtmlElement("h2", "name-city");
	const time = createHtmlElement("h2", "time", 'Weather for: --:--:--');

	mainInformation.prepend(nameCity, time, timeControl, subInformation);


	const humidity = createHtmlElement("span", "humidity", "humidity: --");
	const speedWind = createHtmlElement("span", "speed-wind", "speedWind: --");
	const pressure = createHtmlElement("span", "pressure", "pressure: --");
	extraInformation.prepend(humidity, speedWind, pressure);


};

renderMainCard();
