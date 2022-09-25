import { request } from "./utils.js";
const setInformationAboutDeveloper = () => {
	request("https://api.github.com/users/homutovsky").then((data) => {
		const footerInfo = document.querySelector(".footer-info");
		const footerImg = document.querySelector(".footer-img");
		const newFooterContainer = document.createElement("div");

		footerInfo.addEventListener("mouseover", () => {
			footerImg.src = data.avatar_url;
			footerInfo.after(newFooterContainer);
			newFooterContainer.className = "create-div";
			const gitBio = data.bio ? data.bio : "Front-end developer";
			newFooterContainer.textContent = `${data.name} - ${gitBio}`;
		});
		footerInfo.addEventListener("mouseout", () => {
			footerImg.src = "img/footer-git_icon.svg";
			newFooterContainer.remove();
		});
	});
};
setInformationAboutDeveloper();
