export const getCorrespondingWeatherData = (day, time) => {
	const weatherData = JSON.parse(window.sessionStorage.getItem(day));
	
	let correspondingWeatherData = {};
	if (time) {
		correspondingWeatherData = weatherData.find(
			(weatherItem) => weatherItem.dt_txt.split(" ")[1] === time
		);
	} else {
		correspondingWeatherData = weatherData[weatherData.length - 1];
	}
	const timeRanges = weatherData.map(
		(weatherItem) => weatherItem.dt_txt.split(" ")[1]
	);

	return {
		correspondingWeatherData,
		timeRanges,
	};
};
