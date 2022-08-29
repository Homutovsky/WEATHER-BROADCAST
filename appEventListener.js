import {
    headerBtn, footerInfo, footerImg, mainInput, mainBtn, weatherItems
} from "./nodes.js";
import { request } from "./index.js";
import { images } from "./getImages.js";
import {
    getCityCordinates,
} from "./getCordinates.js";
import { getWeatherForecast } from "./getWeatherForecast.js";

export const giveEventListener = function () {
    request();
    let gitAvatar;
    let gitName;
    let gitBio;
    let createDiv;
    let i = 0;
    let j = 0;

    request("https://api.github.com/users/homutovsky").then((data) => {
        gitAvatar = data.avatar_url;
        gitName = data.name;
        gitBio = data.bio;
        gitBio ? gitBio : (gitBio = "Front-end developer");
    });

    footerInfo.addEventListener("mouseover", () => {
        footerImg.src = gitAvatar;
        const newElement = document.createElement("div");
        footerInfo.after(newElement);
        newElement.className = "create-div";
        createDiv = document.querySelector(".create-div");
        createDiv.textContent = `${gitName} - ${gitBio}`;
    });

    footerInfo.addEventListener("mouseout", () => {
        footerImg.src = "img/footer-git_icon.svg";
        createDiv.remove();
    });

    headerBtn.addEventListener("click", () => {
        i++;
        j++;
        if (images[i]) {
            const img = new Image();
            img.src = images[i];
            img.addEventListener("load", () => {
                document.body.style.backgroundImage = `url('${images[i]}')`;
            });
        }
    });

    mainInput.addEventListener("input", (event) => {
        if (mainInput.value) {
            mainBtn.disabled = false;
        } else {
            mainBtn.disabled = true;
        }
    });

    mainBtn.addEventListener("click", async (event) => {
        getCityCordinates();
        document.querySelector('.weather-condition').remove();
        document.querySelector('.weather-condition1').remove();
        await getWeatherForecast();
    });

    document.addEventListener("keydown", async (event) => {
        if (event.code === "Enter" && mainInput.value !== "") {
            getCityCordinates();
            document.querySelector('.weather-condition').remove();
            document.querySelector('.weather-condition1').remove();
            await getWeatherForecast();
        }
    });
}


weatherItems.forEach(weatherItem => {
    weatherItem.addEventListener('click', (event) => {
        let cartDate = weatherItem.querySelector('div').textContent
        console.log(cartDate.split('-')[0])
    })
})
