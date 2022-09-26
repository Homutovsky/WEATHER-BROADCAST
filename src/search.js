import { setSearch, finalizeClick, formatWeatherData, setWeatherDataToSessionStorage } from "./getWeather.js";
import { request, geo, createHtmlElement, removeChilds, weatherQuery } from "./utils.js";
import { renderWeeklyCards } from "./renderCards.js";
import { setInitialContent } from "./renderMainCard.js";

const searchWrapper = document.querySelector(".search-wrapper");
const searchList = document.querySelector(".search-list");
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");

const getSearchResult = (data, searchString) =>
	data.results.reduce((acc, result) => {

		const {
			city = "",
			village = "",
			town = "",
			country = "",
			formatted = "",
		} = result.components;
		if (
			(city.toLowerCase().includes(searchString) ||
				village.toLowerCase().includes(searchString) ||
				town.toLowerCase().includes(searchString)) &&
			!acc.some(
				(accItem) =>
					(accItem.components.city === city &&
						accItem.components.country === country) ||
					(accItem.components.village === village &&
						accItem.components.country === country) ||
					(accItem.components.town === town &&
						accItem.components.country === country) ||
					accItem.components.formatted === formatted
			)

		) {
			return [...acc, result];
		} else {
			return acc;
		}
	}, []);

const addClasses = () => {
	searchWrapper.classList.add("withResults");
	searchList.classList.add("withResults");
};
export const removeClasses = () => {
	searchWrapper.classList.remove("withResults");
	searchList.classList.remove("withResults");
};

export const removeOldResults = (searchResult) => {
	if ([...searchList.children].length || !searchResult.length) {
		removeChilds(searchList);
	}
};

const renderSearchResults = (searchResult) => {
	searchResult.forEach((result) => {
		const newResult = createHtmlElement(
			"p",
			"search-element",
			result.formatted
		);

		newResult.id = result.formatted;
		newResult.setAttribute("lat", result.geometry.lat);
		newResult.setAttribute("lon", result.geometry.lng);
		searchList.append(newResult);
	});
};

searchInput.addEventListener("input", (event) => {
	const searchString = event.target.value.toLowerCase();
	if (searchString.length > 2) {
		request(geo.getRequestUrl(searchString)).then((data) => {
			const searchResult = getSearchResult(data, searchString);
			if (searchResult.length) {
				addClasses();
			} else {
				removeClasses();
			}
			removeOldResults(searchResult);
			renderSearchResults(searchResult);
			setSearch();
		});
	} else {
		removeOldResults(searchString);
		removeClasses();
	}
});

export const requestWeather = (lat, lon) => {
	request(weatherQuery.getRequestUrl(lat, lon)).then((data) => {
		const formatedData = formatWeatherData(data.list);
		setWeatherDataToSessionStorage(formatedData);
		const weeklyDays = Object.keys(formatedData);
		weeklyDays.shift();
		renderWeeklyCards(weeklyDays);
		setInitialContent();
	})
}

document.addEventListener("keydown", async (event) => {
	const mainInput = document.querySelector(".search-input");
	const searchString = mainInput.value.toLowerCase();

	if (event.code === "Enter" && mainInput.value.length > 2) {
		finalizeClick(searchString.innerText);

		const searchElement = document.querySelector('.search-element')
		const lat = searchElement.getAttribute("lat");
		const lon = searchElement.getAttribute("lon");
		requestWeather(lat, lon);
	}
});
