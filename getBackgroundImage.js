import { request, flickr } from "./utils.js";

export const getBackgroundImage = (tags, text, hours) => {
  // const hours = new Date().getHours();
  let updatedTags;
  if (hours <= 6) {
    updatedTags = 'night,twilight,moon,' + tags;
  } else if (hours >= 6 && hours <= 12) {
    updatedTags = 'morning,' + tags;
  } else if (hours >= 12 && hours <= 18) {
    updatedTags = 'afternoon,' + tags;
  } else {
    updatedTags = 'evening,'+ tags;
  }

  request(flickr.getRequestUrl(tags, text))
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
      // headerBtn.addEventListener("click", () => {
        const img = new Image();
        const randomNumber = Math.round(Math.random() * (20 - 1) + 1)
        img.src = imgUrl[randomNumber];
        img.addEventListener("load", () => {
          document.body.style.backgroundImage = `url('${img.src}')`;
        });
      // })
    });
}
// getBackgroundImage()