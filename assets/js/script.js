import {
    initList
} from "./initList.js";
import {
    playlist
} from "./playlist.js";

//---------------------- Declaration de Variables -------------------------
/* var tableauImages = [ //Crochet altGR+5
    "./assets/img/saudade.jpg", //0 //une "," dans un tableau separe les données
    "./assets/img/alavie.jpg", //1
    "./assets/img/bdlm.jpg" //2  // pas de virgule sur la derniere donnée
];

var tableauTitres = [
    "Barcelona92", //0
    "Toka", //1
    "Plasir Nocif" //2
]
 */
var spothiphop = document.getElementById("spothiphop");
var cover = document.getElementById("cover");
var back = document.getElementById("back");
var playBtn = document.getElementById("play");
var forw = document.getElementById("forw");
var rdm = document.getElementById("rdm");
//var audioPlayer = document.getElementById("audioPlayer");
var titre = document.getElementById("titre");
var coverMove = document.getElementById("coverMove");
var InnerTimeline = document.getElementById("InnerTimeline");
var bgi = document.getElementById("bgi2");
var timer = document.getElementById("timer");
var slider = document.getElementById("slider");
var timeline = document.getElementById("timeline");
var mc = new Hammer(slider);
var mcTime = new Hammer(timeline);

var random = false;
globalThis.currentTrack = 0;
var IsPlay = false;

var audio = new Audio(playlist[currentTrack].audio);
// audio.currentTime = 12;
console.dir(audio);
//audio.play()
//---------------------- FONCTIONS -----------------------
globalThis.nextTrack = (fromList = true) => {
    audio.pause();
    coverMove.style.transition = "all .4s";
    coverMove.style.transform = "translateY(-100%)";

    if (fromList) {
        //  boolean random
        if (random) {
            currentTrack = Math.floor(Math.random()*playlist.length);
        } else {
        if (currentTrack < playlist.length - 1) {
            currentTrack = currentTrack + 1;
        } else {
            currentTrack = 0;
        }
    }
}
    cover.src = playlist[currentTrack].cover;
    titre.innerText = playlist[currentTrack].titre;
    artiste.innerText = playlist[currentTrack].artiste;
    album.innerText = playlist[currentTrack].album;
    bgi.src = playlist[currentTrack].cover;
    annee.innerText = playlist[currentTrack].annee;

    /* audioPlayer.src = tableauAudio[currentTrack]; // Met à jour le src de l'audio */

    setTimeout(() => {
        coverMove.style.transition = "none";
        coverMove.src = playlist[currentTrack].cover;
        coverMove.style.transform = "none";
    }, 400);

    //partie audio
    audio = new Audio(playlist[currentTrack].audio);
    audio.play();
    IsPlay = true;
    //Bouton play
    playBtn.classList.replace("fa-solid", "fa-solid");
    playBtn.classList.replace("fa-circle-play", "fa-circle-pause");
}

function backTrack() {
    audio.pause();
    coverMove.style.transition = "all .4s";
    coverMove.style.transform = "translateY(+100%)"

    if (currentTrack > 0) {
        currentTrack = currentTrack - 1;
    } else {
        currentTrack = playlist.length - 1; // Retourne à la dernière image
    }
    cover.src = playlist[currentTrack].cover;
    titre.innerText = playlist[currentTrack].titre;
    artiste.innerText = playlist[currentTrack].artiste;
    album.innerText = playlist[currentTrack].album;
    bgi.src = playlist[currentTrack].cover;
    annee.innerText = playlist[currentTrack].annee;

    /* audioPlayer.src = tableauAudio[currentTrack]; // Met à jour le src de l'audio */

    setTimeout(() => {
        coverMove.style.transition = "none";
        coverMove.src = playlist[currentTrack].cover;
        coverMove.style.transform = "none";
    }, 400);

    //partie audio
    audio = new Audio(playlist[currentTrack].audio);
    audio.play();
    IsPlay = true;
    //Bouton play
    playBtn.classList.replace("fa-solid", "fa-solid");
    playBtn.classList.replace("fa-circle-play", "fa-circle-pause");
}

//---------------------- LOGIQUE -------------------------
mcTime.on("pan", (event) => {
   /*  if (event.isFinal) { */
        setTimeout(() => {
            //  let currentAudio = 
            let currentPan = event.deltaX;
            if (audio.currentTime < audio.duration){
                audio.currentTime = currentPan * audio.duration / timeline.clientWidth;
            }
        }, 10);
    /* }; */
})
mc.on("swipeleft", () => {
    nextTrack();
})
forw.addEventListener("click", () => {
    nextTrack();
});

mc.on("swiperight", () => {
    backTrack();
});
back.addEventListener("click", () => {
    backTrack();
});


playBtn.addEventListener("click", () => {
    if (!IsPlay) { // !IsPlay => IsPlay === false
        audio.play();
        //fa-solid fa-circle-pause"
        playBtn.classList.replace("fa-solid", "fa-solid");
        playBtn.classList.replace("fa-circle-play", "fa-circle-pause");
        IsPlay = true;
    } else {
        audio.pause();
        playBtn.classList.replace("fa-solid", "fa-solid");
        playBtn.classList.replace("fa-circle-pause", "fa-circle-play");
        IsPlay = false;
    }
    // IsPlay = !IsPlay (Factorisation du false/true)

});
rdm.addEventListener("click", () =>{
    random = !random;
    if (random) {
        rdm.style.color = "red";
    } else {
        rdm.style.color = "fuchsia";
    }
});
setInterval(() => {
    if (IsPlay) {
        if (audio.currentTime >= audio.duration) {
            nextTrack();
        }
        var widthBar = (100 * audio.currentTime / audio.duration);
        InnerTimeline.style.width = widthBar + "%";
    }
}, 100);

setInterval(() => {
    if (IsPlay) {

        var widthBar = (100 * audio.currentTime / audio.duration);
        InnerTimeline.style.width = widthBar + "%";

        var currentTime = audio.currentTime;
        var minutes = Math.floor(currentTime / 60);
        var seconds = Math.floor(currentTime % 60);
        timer.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
}, 100);

// Initialisation

initList();