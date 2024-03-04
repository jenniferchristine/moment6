"use strict"

let openBtn = document.getElementById("open-menu");
let closeBtn = document.getElementById("close-menu");

openBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
    let navMenuEl = document.getElementById("nav-menu");
    let style = window.getComputedStyle(navMenuEl);

    if (style.display === "none") {
        navMenuEl.style.display = "block";
    } else {
        navMenuEl.style.display = "none";
    }
}

window.onload = () => {
    const searchValue = document.getElementById("searchValue");

    document.getElementById("searchButton").onclick = () => {
        search(searchValue.value);
    }
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

function printSongs(songs) {
    
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