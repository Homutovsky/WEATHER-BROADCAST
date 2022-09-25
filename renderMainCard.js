import { createHtmlElement} from "./utils.js";
import { setContent} from "./setContent.js";
import { getCorrespondingWeatherData} from "./getCorrespondingWeatherData.js";

const onTimeControl = (event, day, timeRanges) => {
	setContent(day, timeRanges[event.target.value - 1]);
};

const renderMainCard = () => {
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

	const listener = (event) => {
		const day = window.sessionStorage.getItem("currentDay")
	
		const { timeRanges } = getCorrespondingWeatherData(day, time);
		onTimeControl(event, day, timeRanges)
	}
	timeControl.addEventListener("input", listener, true);

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

renderMainCard();
