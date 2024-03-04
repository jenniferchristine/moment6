"use strict"

window.onload = () => {
    const searchValue = document.getElementById("searchValue");

    document.getElementById("searchButton").onclick = () => {
        search(searchValue.value);
    }

    search(searchValue.value);

    searchValue.addEventListener('keypress', async function (e) {
        if (e.key === 'Enter')
        search(searchValue.value);
    });
}

async function search(song) {
    const input = song.split(" ").join("+");

    const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + input;
    /*const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=love+the+way+you+lie";*/
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
    resultDiv.innerHTML = "";

    if (result.data.length === 0) {
        const errorEl = document.createElement("h2");
        const errorText = document.createTextNode("No results to be find in your search");
        errorEl.appendChild(errorText);
        resultDiv.appendChild(errorEl);

        const paraErrorEl = document.createElement("p");
        paraErrorEl.classList.add("noresult-text");
        const paraText = document.createTextNode("Double check your spelling or try searching for both the name of the song and the artist");
        paraErrorEl.appendChild(paraText);
        resultDiv.appendChild(paraErrorEl);
        
        return;
    }

    const alternative = document.createElement("h2");
    const alternativeText = document.createTextNode("Results from search...");
    alternative.appendChild(alternativeText);
    resultDiv.appendChild(alternative);

    result.data.slice(0, 5).forEach((song) => {
        const container = document.createElement("div");
        const textContainer = document.createElement("div");

        container.classList.add("songResult");
        textContainer.classList.add("textContainer");
        const title = document.createElement("p");
        const titleText = document.createTextNode(song.artist.name+" - "+song.title);
        title.appendChild(titleText);
        textContainer.appendChild(title);

        const album = document.createElement("p");
        const albumText = document.createTextNode(song.album.title);
        album.appendChild(albumText);
        textContainer.appendChild(album);

        container.appendChild(textContainer);

        const albumCover = document.createElement("img");
        albumCover.src = song.album.cover;
        albumCover.classList.add("album-cover");
        container.appendChild(albumCover);

        resultDiv.appendChild(container);
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