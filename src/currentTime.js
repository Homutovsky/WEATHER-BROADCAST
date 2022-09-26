(function () {
	const clock = document.querySelector(".header-time");
	setInterval(() => {
		const date = new Date();
		const hours =
			date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
		const minutes =
			date.getMinutes() < 10
				? "0" + date.getMinutes()
				: date.getMinutes();
		const seconds =
			date.getSeconds() < 10
				? "0" + date.getSeconds()
				: date.getSeconds();
		const currentTime = `${hours}:${minutes}:${seconds}`;
		clock.textContent = currentTime;
	}, 1000);
})();
