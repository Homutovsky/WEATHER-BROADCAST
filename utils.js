export const geoKey = "dc1c4dd507e246778fa00eb113d80c9e";
export const weatherKey = "a404df93a9aa64f583699a7d59cf1224";

export const daysOfWeek = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

export async function request(url) {
	const response = await fetch(url);
	return await response.json();
}

export const geo = {
	url: "https://api.opencagedata.com/",
	getRequestUrl(city) {
		return `${this.url}geocode/v1/json?q=${city}&key=${geoKey}&language=en&pretty=1`;
	},
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
