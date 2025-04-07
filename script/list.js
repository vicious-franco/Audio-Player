import { songs } from "./data.js";

const songList = document.querySelector(".song-container");

let list = "";
songs.forEach((song) => {
  list += ` <div class="songList">
              <div class="image">
                <img src="../image/ariana-grande-2018.png" alt="" />
              </div>
              <div>
                <h3>${song.title}</h3>
                <p>${song.artist}</p>
              </div>
            </div>`;
});
songList.innerHTML = list;
