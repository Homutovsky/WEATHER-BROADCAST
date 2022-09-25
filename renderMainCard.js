import { createHtmlElement,  daysOfWeek, getTodayData, getNearestTime} from "./utils.js";
import { setContent} from "./setContent.js";
import { getCorrespondingWeatherData} from "./getCorrespondingWeatherData.js";

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
	const timeControl = createHtmlElement("input", "weather-timeControl");

	const listener = (event) => {
		const day = window.sessionStorage.getItem("currentDay")
	
		const { timeRanges } = getCorrespondingWeatherData(day, time);
		onTimeControl(event, day, timeRanges)
	}
	timeControl.addEventListener("input", listener, true);
	timeControl.type = 'range';
	timeControl.disabled = true;
	const dateToday = createHtmlElement("h3", "date-today", todayData);
	const weatherWrapper = createHtmlElement("div", "weather-wrapper");
	const today = createHtmlElement("h1", "today",dayOfWeek );
	weatherWrapper.append(today);

	const mainInformation = createHtmlElement("div", "main-information");
	const nameCity = createHtmlElement("h2", "name-city");
	const time = createHtmlElement("h2", "time", 'Weather for: --:--:--');
	const temperature = createHtmlElement("h2", "temperature", "Tempereture: -- °C");
	mainInformation.prepend(nameCity, time, timeControl, temperature);

	const extraInformation = createHtmlElement("div", "extra-information");
	const humidity = createHtmlElement("span", "humidity", "humidity: --");
	const speedWind = createHtmlElement("span", "speed-wind", "speedWind: --");
	const pressure = createHtmlElement("span", "pressure", "pressure: --");
	extraInformation.prepend(humidity, speedWind, pressure);

	weatherToday.prepend(
		resetBtn,
		dateToday,
		weatherWrapper,
		mainInformation,
		extraInformation
	);
};

renderMainCard();
