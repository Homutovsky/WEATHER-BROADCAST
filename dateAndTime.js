import { clock, dateToday, dayWeek } from "./nodes.js";
export let timeToDay = [];

const date = new Date();

const days = date.getDay();
const month = date.getMonth();
const dayOfmonth = date.getDate();

const dayOfWeek = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
const monthOfyear = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

dateToday.textContent = [dayOfmonth, monthOfyear[month]].join(" ");
dayWeek.textContent = [dayOfWeek[days]].join("");

export function clockTimer() {
	const currentDate = new Date();
	const time = [
		currentDate.getHours(),
		currentDate.getMinutes(),
		currentDate.getSeconds(),
	];

	timeToDay = [...time];

	if (time[0] < 10) {
		time[0] = "0" + time[0];
	}
	if (time[1] < 10) {
		time[1] = "0" + time[1];
	}
	if (time[2] < 10) {
		time[2] = "0" + time[2];
	}

	let currentTime = [time[0], time[1], time[2]].join(":");
	clock.textContent = currentTime;

	setTimeout(clockTimer, 1000);
}
