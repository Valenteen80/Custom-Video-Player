//----гдобальные переменные
const player = document.querySelector(".player");
const video = document.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const buttonfullscreen = player.querySelector(".button_full_screen");
let mousedown = false;
//-----функции
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  if (this.paused) {
    toggle.textContent = "►";
  } else {
    toggle.textContent = "❚ ❚";
  }
}

function skip() {
  video.currentTime = video.currentTime + parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const skrubTime = (e.offsetX * video.duration) / progress.offsetWidth;
  video.currentTime = skrubTime;
}

function toggleFullscreen() {
  if (document.fullscreenElement === null) {
    player.requestFullscreen();
    buttonfullscreen.textContent = "[X]";
  } else if (document.fullscreenElement !== null) {
    document.webkitCancelFullScreen();
    buttonfullscreen.textContent = "[_]";
  }
}

//----события

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);
toggle.addEventListener("click", togglePlay);
skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
buttonfullscreen.addEventListener("click", toggleFullscreen);
