import { headerBtn, footerInfo, footerImg, mainInput, mainBtn, body } from './nodes.js';
import { request } from './index.js';
import { images } from './getImages.js';

export const giveEventListener = function () {
    request();

    let gitAvatar;
    let gitName;
    let gitBio;
    let createDiv;
    let i = 0;
    let j = 0;

    request('https://api.github.com/users/homutovsky')
        .then((data) => {
            gitAvatar = data.avatar_url;
            gitName = data.name;
            gitBio = data.bio;
            gitBio ? gitBio : gitBio = 'Front-end developer'
        })

    footerInfo.addEventListener('mouseover', () => {
        footerImg.src = gitAvatar;
        const newElement = document.createElement('div');
        footerInfo.after(newElement);
        newElement.className = 'create-div';
        createDiv = document.querySelector(".create-div");
        createDiv.textContent = `${gitName} - ${gitBio}`;
    })

    footerInfo.addEventListener('mouseout', () => {
        footerImg.src = "img/footer-git_icon.svg";
        createDiv.remove()
    })

    headerBtn.addEventListener('click', () => {
        i++;
        j++;
        if (images[i]) {
            document.body.style.backgroundImage = `url('${images[i]}')`;
        }
    })


    setInterval(() => {
        if (mainInput.value) {
            mainBtn.disabled = false;
        } else {
            mainBtn.disabled = true;
        }
    }, 20)
    // onchange = (event) => {

    // }

    mainInput.addEventListener('click', () => {
        console.log(1)
    })

    mainBtn.addEventListener('click', () => {
        console.log(2)
    })
}
