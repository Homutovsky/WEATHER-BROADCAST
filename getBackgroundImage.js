import { request, flickr } from "./utils.js";

const getBackgroundImage = (tags) => {
  const hours = new Date().getHours();

  if (hours <= 6) {
    tags = 'night,twilight,moon';
  } else if (hours >= 6 && hours <= 12) {
    tags = 'morning,sunrise';
  } else if (hours >= 12 && hours <= 18) {
    tags = 'afternoon,sun,canyon';
  } else {
    tags = 'evening,sunset,nature';
  }

  request(flickr.getRequestUrl(tags))
    .then(data => {
      const imgUrl = data.photos.photo.reduce((acc, current) => {
        if (current.url_h) {
          return [
            ...acc,
            current.url_h]
        } else {
          return acc
        }
      }, [])

      const headerBtn = document.querySelector(".header-button");
      headerBtn.addEventListener("click", () => {
        const img = new Image();
        const randomNumber = Math.round(Math.random() * (90 - 1) + 1)
        img.src = imgUrl[randomNumber];
        img.addEventListener("load", () => {
          document.body.style.backgroundImage = `url('${img.src}')`;
        });
      })
    });
}
getBackgroundImage()