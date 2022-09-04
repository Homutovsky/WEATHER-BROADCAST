import { request, weatherQuery } from "./utils.js";
import { removeClasses, removeOldResults } from "./search.js";
import { renderWeeklyCards } from "./renderCards.js";

const formatWeatherData = (weatherData) => {
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

const setWeatherDataToSessionStorage = (formatedData) => {
	Object.keys(formatedData).forEach((day) => {
		window.sessionStorage.setItem(day, JSON.stringify(formatedData[day]));
	});
};

const finalizeClick = (text) => {
	document.querySelector(".search-input").value = text;
	removeClasses();
	removeOldResults();
};

export const setSearch = () => {
	const listElements = document.querySelectorAll(".search-element");
	console.log("listElements", [...listElements]);
	[...listElements].forEach((listElement) => {
		listElement.addEventListener("click", (event) => {
			console.log("event", event);
			finalizeClick(event.target.innerText);

			const lat = event.target.getAttribute("lat");
			const lon = event.target.getAttribute("lon");

			request(weatherQuery.getRequestUrl(lat, lon)).then((data) => {
				const formatedData = formatWeatherData(data.list);
				setWeatherDataToSessionStorage(formatedData);
				const weeklyDays = Object.keys(formatedData);
				weeklyDays.shift();

				renderWeeklyCards(weeklyDays);
			});
		});
	});
};
