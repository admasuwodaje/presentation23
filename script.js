const body = document.body;
const presentation = document.getElementById("presentation");
const tools = document.getElementById("tools");
const restart = document.getElementById("restart");
const nextSlide = document.getElementById("nextSlide");
const previousSlide = document.getElementById("previousSlide");
const nextChapter = document.getElementById("nextChapter");
const previousChapter = document.getElementById("previousChapter");
const chapters = document.querySelectorAll(".chapter");
const chapterSlidesLength = Array.from(chapters).map(chapter => chapter.querySelectorAll("section").length);
const titles = Array.from(document.getElementById("titles").children);

let chapter = 0;
let slides = [];
let fadeTimeout;

function startPresentation() {
  slides = chapterSlidesLength.map(() => 0);
  moveChapter(-chapter);
}

function translatePresentation() {
  presentation.style.transform = `translate(${-slides[chapter] * 100}vw, ${-chapter * 100}vh)`;
}

function moveSlide(delta) {
  slides[chapter] = Math.min(Math.max(slides[chapter] + delta, 0), chapterSlidesLength[chapter] - 1);
  previousSlide.disabled = slides[chapter] === 0;
  nextSlide.disabled = slides[chapter] === chapterSlidesLength[chapter] - 1;
  titles[chapter].querySelector(".position").innerHTML = slides[chapter] + 1;
  translatePresentation();
}

function moveChapter(delta) {
  titles[chapter].style.display = "none";
  chapter = Math.min(Math.max(chapter + delta, 0), chapters.length - 1);
  previousChapter.disabled = chapter === 0;
  nextChapter.disabled = chapter === chapters.length - 1;
  titles[chapter].style.display = "inline";
  moveSlide(0);
  translatePresentation();
}

function keyMove(e) {
  const keyFunctions = {
    " ": () => moveSlide(e.shiftKey ? -1 : 1),
    "ArrowRight": () => moveSlide(1),
    "ArrowLeft": () => moveSlide(-1),
    "ArrowDown": () => moveChapter(1),
    "ArrowUp": () => moveChapter(-1)
  };

  const keyFunction = keyFunctions[e.key];
  if (keyFunction) {
    keyFunction();
  }
}

nextSlide.addEventListener("click", () => {
  moveSlide(1);
  presentation.style.left = "100%";
  presentation.animate({ left: "100%" }, 7000);
});

previousSlide.addEventListener("click", () => {
  moveSlide(-1);
  presentation.style.left = `${parseInt(presentation.style.left) - 100}%`;
  presentation.animate({ left: `${parseInt(presentation.style.left) - 100}%` }, 500);
});

nextChapter.addEventListener("click", () => {
  moveChapter(1);
  presentation.style.top = `${parseInt(presentation.style.top) - 100}%`;
  presentation.animate({ top: `${parseInt(presentation.style.top) - 100}%` }, 500);
});

previousChapter.addEventListener("click", () => {
  moveChapter(-1);
  presentation.style.top = `${parseInt(presentation.style.top) + 100}%`;
  presentation.animate({ top: `${parseInt(presentation.style.top) + 100}%` }, 500);
});

restart.addEventListener("click", startPresentation);
body.addEventListener("keyup", keyMove);
startPresentation();
