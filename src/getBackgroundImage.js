import { request, flickr } from "./utils.js";

export const getBackgroundImage = (tags, text, hours) => {

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


      const img = new Image();
      const randomNumber = Math.round(Math.random() * (35 - 1) + 1)
      img.src = imgUrl[randomNumber];
      img.addEventListener("load", () => {
        document.body.style.backgroundImage = `url('${img.src}')`;
      });

      const headerBtn = document.querySelector(".header-button");

      headerBtn.addEventListener("click", () => {
        const randomNumber = Math.round(Math.random() * (35 - 1) + 1)
        img.src = imgUrl[randomNumber];
        img.addEventListener("load", () => {
          document.body.style.backgroundImage = `url('${img.src}')`;
        });
      })
    });
}
getBackgroundImage()