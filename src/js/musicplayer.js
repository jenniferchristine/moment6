"use strict";

const playContainer = document.getElementById("play-container");
playContainer.addEventListener('click', playSong, false);

window.onload = () => {
    const playButton = document.createElement("span");
    playButton.classList.add("material-symbols-outlined");
    playButton.innerHTML = "play_circle";
    playContainer.appendChild(playButton);
};

async function playSong() {
    const playlist = await getPlaylist();
    const random = Math.floor(Math.random() * playlist.length);

    const song = await getRandomSong(playlist[random].id);

    // rita ut
    
}

async function getRandomSong(id) {
    const url = "https://deezerdevs-deezer.p.rapidapi.com/track/" + id;
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
        if (data.preview === "") {
            playSong();
        } else {
            return {
                title: data.title,
                artist: data.artist.name,
                picture: data.artist.picture,
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