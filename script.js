{
	/* <div class="weather-today">
                <h2 class="day-week"></h2>
                <h3 class="date-today"></h3>

                <div class="weather-wrapper">
                    <!-- <div class="weather-condition"></div> -->
                    <h1 class="today">TODAY</h1>
                    <!-- <div class="weather-condition1"></div> -->
                </div>
                <!-- sunny cloudy  rainy stormy cloud-sun-->

                <div class="main-information">
                    <h2 class="name-city">
                        Minsk
                    </h2>
                    <h2 class="time"></h2>
                    <h2 class="temperature">
                        25°C
                    </h2>
                </div>

                <div class="extra-information">
                    <span class="humidity">
                        влажность
                    </span>
                    <span class="speed-wind">
                        скорость ветра
                    </span>
                    <span class="pressure">
                        давление
                    </span>
                </div>
            </div> */
}
import { createHtmlElement, getDayOfWeek } from "./utils.js";
import { getCorrespondingWeatherData } from "./renderCards.js";

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
	const weatherData = JSON.parse(window.sessionStorage.getItem(day));
	const { correspondingWeatherData, timeRanges } =
		getCorrespondingWeatherData(day, time);
	console.log("weatherData", weatherData);

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
	timeControl.setAttribute("step", 1);
	timeControl.setAttribute("value", timeRanges.indexOf(time) + 1);

	const onTimeControl = (event) => {
		console.log(event.target.value);
		console.log("timeRanges", timeRanges);
		console.log("timeRanges - 1", timeRanges[event.target.value - 1]);
		setContent(day, timeRanges[event.target.value - 1]);
		timeControl.removeEventListener("input", onTimeControl);
		// updateCard(day, timeRanges[event.target.value]);
	};

	timeControl.addEventListener("input", onTimeControl);

	const temperature = document.querySelector(".temperature");
	temperature.textContent =
		"temperature: " + Math.round(correspondingWeatherData.main.temp) + "°C";

	const humidity = document.querySelector(".humidity");
	humidity.textContent =
		"humidity: " + correspondingWeatherData.main.humidity;

	const speedWind = document.querySelector(".speed-wind");
	speedWind.textContent = "speedWind: " + correspondingWeatherData.wind.speed;

	const pressure = document.querySelector(".pressure");
	pressure.textContent =
		"pressure: " + correspondingWeatherData.main.pressure;
};
renderMainCard();
