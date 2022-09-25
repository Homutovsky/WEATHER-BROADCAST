import { removeClasses, removeOldResults, requestWeather} from "./search.js";

export const formatWeatherData = (weatherData) => {
	return weatherData.reduce((acc, currData) => {
		const day = currData.dt_txt.split(" ")[0];
		if (acc[day]) {
			return {
				...acc,
				[day]: [...acc[day], currData],
			};
		}
		return {
			...acc,
			[day]: [currData],
		};
	}, {});
};

export const setWeatherDataToSessionStorage = (formatedData) => {
	Object.keys(formatedData).forEach((day) => {
		window.sessionStorage.setItem(day, JSON.stringify(formatedData[day]));
	});
};

export const finalizeClick = (text) => {
	document.querySelector(".search-input").value = text;
	removeClasses();
	removeOldResults();
};

export const setSearch = () => {
	const listElements = document.querySelectorAll(".search-element");
	[...listElements].forEach((listElement) => {
		listElement.addEventListener("click", (event) => {
			finalizeClick(event.target.innerText);

			const lat = event.target.getAttribute("lat");
			const lon = event.target.getAttribute("lon");

			requestWeather(lat, lon);
		});
	});
};
