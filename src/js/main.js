"use strict";

let isPlaying = false;
let audio = null;

window.onload = () => {

    const searchValue = document.getElementById("searchValue");

    document.getElementById("searchButton").onclick = () => {
        search(searchValue.value);
    }

    searchValue.addEventListener('keypress', async function (e) {
        if (e.key === 'Enter')
            await search(searchValue.value);
    });
}

async function search(song) {
    const input = song.split(" ").join("+");

    const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + input;
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
        printSongs(data);
    } else {
        console.log("ERROR: " + response.statusText);
    }
}

function printSongs(result) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    if (result.data.length === 0) {

        const errorEl = document.createElement("h2");
        const errorText = document.createTextNode("No results were found in your search");
        errorEl.appendChild(errorText);
        resultDiv.appendChild(errorEl);

        const paraErrorEl = document.createElement("p");
        paraErrorEl.classList.add("center");
        const paraText = document.createTextNode("Double check your spelling or try searching for both the name of the song and the artist");
        paraErrorEl.appendChild(paraText);
        resultDiv.appendChild(paraErrorEl);

        return;
    }

    const alternative = document.createElement("h2");
    const alternativeText = document.createTextNode("Results from search...");
    alternative.appendChild(alternativeText);
    resultDiv.appendChild(alternative);

    result.data.slice(0, 8).forEach((song) => {
        const container = document.createElement("div");
        const textContainer = document.createElement("div");
        const iconContainer = document.createElement("div");

        container.classList.add("songResult");
        textContainer.classList.add("textContainer");
        const title = document.createElement("p");
        const titleText = document.createTextNode(song.artist.name + " - " + song.title);
        title.appendChild(titleText);
        textContainer.appendChild(title);

        const album = document.createElement("p");
        const albumText = document.createTextNode(song.album.title);
        album.appendChild(albumText);
        textContainer.appendChild(album);

        iconContainer.classList.add("icon-container");

        const playButton = document.createElement("span");
        playButton.classList.add("material-symbols-outlined");
        playButton.innerHTML = "play_circle";
        iconContainer.appendChild(playButton);

        playButton.onclick = () => {
            playAndToggle(song.preview, playButton);
        };

        const lyricsEl = document.createElement("p");
        lyricsEl.classList.add("lyrics");
        const lyricsText = document.createTextNode("LYRICS");
        lyricsEl.appendChild(lyricsText);
        lyricsEl.onclick = () => showLyrics(song.artist.name, song.title);

        iconContainer.appendChild(lyricsEl);

        textContainer.appendChild(iconContainer);
        container.appendChild(textContainer);

        const albumCover = document.createElement("img");
        albumCover.classList.add("album-cover");
        albumCover.src = song.album.cover;
        albumCover.alt = "image for album";
        
        container.appendChild(albumCover);
        resultDiv.appendChild(container);
        
    });
}

async function showLyrics(artistName, title) {
    const lyrics = await getLyrics(artistName, title);
    const container = document.getElementById("result");
    container.innerHTML = "";

    const lyricsContainer = document.createElement("div");
    lyricsContainer.classList.add("lyrics-container");
    lyricsContainer.innerHTML = lyrics.split("\n").join("<br>");
    container.appendChild(lyricsContainer);
}

async function getLyrics(artistName, title) {
    try {
        const trimmedName = artistName.split(" ").join("+");
        const trimmedTitle = title.split(" ").join("+");
        const url = "https://api.lyrics.ovh/v1/" + trimmedName + "/" + trimmedTitle;

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            const lyrics = data.lyrics.substring(data.lyrics.indexOf("\r") + 1);

            return `<h2>${artistName} - ${title}</h2><p>${lyrics}</p>`;

        } else {
            if (response.status === 404) {
                return `<h2>Ops!</h2><p class="center">Unfortunately, we couldn't find the lyrics for this song</p>`;
            } else {
                console.log("Something went wrong:", response.statusText);
                return `<h2>Ops!</h2><p class="center">Unfortunately, we couldn't find the lyrics for this song</p>`;
            }
        }
    } catch (error) {
        console.error("Something went wrong:", error);
        return `<h2>Ops!</h2><p class="center">Unfortunately, we couldn't find the lyrics for this song</p>`;
    }
}

function playAndToggle(previewURL, btn) {
    if (audio === null) {
        return newAudio(previewURL, btn);
    }

    if (audio.src != previewURL) {
        const btns = document.querySelectorAll(".icon-container span");
        Array.from(btns).forEach((btn) => btn.innerHTML = "play_circle");
        audio.pause();
        return newAudio(previewURL, btn);
    }

    if (isPlaying === false) {
        audio.play();
        btn.innerHTML = "pause_circle";
        isPlaying = true;
    } else {
        audio.pause();
        btn.innerHTML = "play_circle";
        isPlaying = false;
    }
}

function newAudio(url, btn) {
    audio = new Audio(url);
    audio.play();
    btn.innerHTML = "pause_circle";
    isPlaying = true;
    return
}