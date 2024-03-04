"use strict"

window.onload = () => {
    const searchValue = document.getElementById("searchValue");

    document.getElementById("searchButton").onclick = () => {
        search(searchValue.value);
    }

    // auto-search
    search(searchValue.value);
}

async function search(song) {
    const input = song.split(" ").join("+");

    /* const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + input; */
    const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=love+the+way+you+lie";
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
    console.log(result.data.slice(0, 5));
    const resultDiv = document.getElementById("result");

    const alternative = document.createElement("h2");
    const alternativeText = document.createTextNode("Results from search...");
    alternative.appendChild(alternativeText);
    resultDiv.appendChild(alternative);

    result.data.slice(0, 5).forEach((song) => {
        const title = document.createElement("p");
        const titleText = document.createTextNode(song.artist.name+" - "+song.title);
        title.appendChild(titleText);
        resultDiv.appendChild(title);

        const albumCover = document.createElement("img");
        albumCover.src = song.album.cover;
        albumCover.classList.add("album-cover");
        resultDiv.appendChild(albumCover);
    });
}

/* async function search() {
    const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=love+the+way+you+lie";

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
        getLyrics(data.data[0].id);
        getLyrics();
    } else {
        console.log("ERROR: " + response.statusText);
    }
}

async function getLyrics(id) {
    const url = "https://api.lyrics.ovh/v1/coldplay/adventure+of+a+lifetime";
    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        console.log(data.lyrics);
    } else {
        console.log("ERROR");
    }
} */