const progress = document.querySelector(".progressBar");
const playIcon = document.querySelector(".play");
const audio = document.querySelector(".song");
const container = document.querySelector(".container");
const imageContainer = document.querySelector(".image");
const songName = document.querySelector(".songName");
const Vol = document.querySelector(".volume");
const volReder = document.getElementsByClassName("volText")[0];

Vol.value = audio.volume * 100;
Vol.addEventListener("input", () => {
  audio.volume = Vol.value / 100;
  volReder.textContent = `${Vol.value}%`;
});

audio.addEventListener("loadedmetadata", () => {
  progress.max = audio.duration;
  progress.value = audio.currentTime;
});

const play_pause = () => {
  if (playIcon.classList.contains("fa-play")) {
    audio.play();
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");
    Object.assign(imageContainer.style, {
      animation: "rotate 6s linear infinite",
    });
  } else {
    audio.pause();
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
    Object.assign(imageContainer.style, {
      animation: "none",
    });
  }
};

playIcon.addEventListener("click", play_pause);

progress.addEventListener("change", () => {
  audio.currentTime = progress.value;
  audio.play();
});

audio.addEventListener("timeupdate", () => {
  progress.value = audio.currentTime;
});

// drag and drop song;
container.addEventListener("dragover", (event) => {
  event.preventDefault();
  Object.assign(container.style, { backgroundColor: "#fafacc" });
});

container.addEventListener("dragleave", (evt) => {
  evt.preventDefault();
  Object.assign(container.style, { backgroundColor: "" });
});

const drag_drop = (e) => {
  e.preventDefault();
  Object.assign(container.style, { backgroundColor: "" });

  const file = e.dataTransfer.files[0];
  if (file) {
    songName.textContent = file.name;
    const audioUrl = URL.createObjectURL(file);
    audio.src = audioUrl;
    audio.addEventListener("loadedmetadata", () => {
      progress.max = audio.duration;
      progress.value = audio.currentTime;
      audio.play();
      play_pause();
    });
  } else {
    console.log("no file");
  }
};

container.addEventListener("drop", drag_drop);
