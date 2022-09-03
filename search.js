const searchWrapper = document.querySelector(".search-wrapper");
const searchList = document.querySelector(".search-list");
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const geoKey = "dc1c4dd507e246778fa00eb113d80c9e";
async function request(url) {
	const response = await fetch(url);
	return await response.json();
}

const geo = {
	url: "https://api.opencagedata.com/",
	getRequestUrl(city) {
		return `${this.url}geocode/v1/json?q=${city}&key=${geoKey}&language=ru&pretty=1`;
	},
};

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
const removeClasses = () => {
	searchWrapper.classList.remove("withResults");
	searchList.classList.remove("withResults");
};

const removeOldResults = (searchResult) => {
	if ([...searchList.children].length || !searchResult.length) {
		[...searchList.children].forEach((oldChild) => {
			oldChild.remove();
		});
	}
};

const renderSearchResults = (searchResult) => {
	searchResult.forEach((result) => {
		console.log(result);
		const newResult = document.createElement("p");
		newResult.className = "search-element";
		newResult.textContent = result.formatted;
		newResult.id = result.formatted;
		newResult.setAttribute("lat", result.geometry.lat);
		newResult.setAttribute("lng", result.geometry.lng);
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
		});
	} else {
		removeOldResults(searchString);
		removeClasses();
	}
});
