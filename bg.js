const body = document.querySelector("body");

const IMG_NUMBER = 3;

/*
function handleImgLoad(){
    console.log("finish loading!");

} APi 사용시 필요
*/

function paintImage(imgNumber) {
  const image = new Image(); // 객체를 생성하는 이유 검색
  image.src = `images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
  //image.addEventListener("loadend", handleImgLoad); APi 사용시 필요
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
