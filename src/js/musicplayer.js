"use strict";

let playlist;
let audio;

window.onload = async () => {
    playlist = await getPlaylist();
    document.getElementById("generate-btn").onclick = () => playSong();
};

async function playSong() {
    const song = await getRandomSong();

    if (audio) if (!audio.paused) audio.pause();
    audio = new Audio(song.link);
    audio.play();

    const container = document.getElementById("generate-result");
    const playContainer = document.createElement("div");
    playContainer.classList.add("play-container");
    container.innerHTML = "";

    const pauseBtn = document.createElement("span");
    pauseBtn.classList.add("material-symbols-outlined");
    pauseBtn.innerHTML = "pause_circle";
    pauseBtn.onclick = () => {
        toggleMusic(audio, pauseBtn);
    };

    playContainer.appendChild(pauseBtn);

    const artistEl = document.createElement("h2");
    const artistName = document.createTextNode(song.artist);
    artistEl.appendChild(artistName);
    playContainer.appendChild(artistEl);

    const titleEl = document.createElement("p");
    titleEl.classList.add("center");
    const titleName = document.createTextNode(song.title);
    titleEl.appendChild(titleName);
    playContainer.appendChild(titleEl);

    container.appendChild(playContainer);
}

function toggleMusic(audio, pauseBtn) {
    if (audio.paused) {
        audio.play();
        pauseBtn.innerHTML = "pause_circle";
    } else {
        audio.pause();
        pauseBtn.innerHTML = "play_circle";
    }
}

async function getRandomSong(retries = 10) {
    if (retries <= 0)
    throw Error("Can't find a song, no more retries");
    const random = Math.floor(Math.random() * playlist.length);
    const url = "https://deezerdevs-deezer.p.rapidapi.com/track/" + playlist[random].id;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '909254ca7bmsh60eaea82866cd6dp1c9572jsnc5023f43402d',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    const response = await fetch(url, options);

    if (response.ok) {
        const data = await response.json();
        if (!data.artist || !data.preview) {
            return await getRandomSong(retries - 1);
        } else {
            return {
                title: data.title,
                artist: data.artist.name,
                link: data.preview
            };
        }
    } else {
        console.log("ERROR: " + response.statusText);
    }
}

async function getPlaylist() {
    const url = "https://deezerdevs-deezer.p.rapidapi.com/playlist/9715755422";
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '909254ca7bmsh60eaea82866cd6dp1c9572jsnc5023f43402d',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    const response = await fetch(url, options);

    if (response.ok) {
        const data = await response.json();
        return data.tracks.data;
    } else {
        console.log("ERROR: " + response.statusText);
    }
}