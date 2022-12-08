export const geoKey = "dc1c4dd507e246778fa00eb113d80c9e";
export const weatherKey = "a404df93a9aa64f583699a7d59cf1224";
export const flickrKey = "3ccd8c73603482c1dfb8a13e3f0b3b5b";

export const daysOfWeek = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

export const getTodayData = () => new Date().toISOString().split("T")[0];

export const getNearestTime = () => {
	const currentTime = new Date().getHours();
	const time = currentTime + (3 - (currentTime % 3));
	return `${time === 24 ? 21 : time}:00:00`
}

export async function request(url) {
	const response = await fetch(url);
	return await response.json();
}

export const flickr = {
	url: 'https://www.flickr.com/',
	getRequestUrl(tags, text) {
		return (`${this.url}services/rest/?method=flickr.photos.search&api_key=${flickrKey}&tags=${tags}&text=${text}&tag_mode=all&extras=url_h&format=json&nojsoncallback=1`);
	},
}

export const geo = {
	url: "https://api.opencagedata.com/",
	getRequestUrl(city) {
		return `${this.url}geocode/v1/json?q=${city}&key=${geoKey}&language=en&pretty=1`;
	},
	getCityBy(lat, lng) {
		return `${this.url}geocode/v1/json?q=${lat}+${lng}&key=${geoKey}&language=en&pretty=1`;
	}
};

export const weatherQuery = {
	url: "https://api.openweathermap.org",
	units: "metric",
	exclude: "current,minutely,hourly,daily",
	getRequestUrl(lat, lon) {
		return `${this.url}/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=${this.exclude}&appid=${weatherKey}&units=${this.units}`;
	},
};

export const createHtmlElement = (tag, className, content) => {
	const htmlElement = document.createElement(tag);
	htmlElement.className = className;
	if (content) {
		htmlElement.textContent = content;
	}
	return htmlElement;
};

export const removeChilds = (parent) => {
	[...parent.children].forEach((oldChild) => {
		oldChild.remove();
	});
};

export const getDayOfWeek = (dt) => {
	const currentDay = new Date(+(dt + "000"));
	return daysOfWeek[currentDay.getDay()];
};
