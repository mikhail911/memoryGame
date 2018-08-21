let timeLeft = 12;
let timer;

const progressBar       = document.getElementById("progressBar");
const timeLeftStatus    = document.getElementById("timeLeftStatus");
const progressStatus    = document.getElementById("progressStatus");
const startButton       = document.getElementById("startButton");
const pairsFoundVal     = document.getElementById("pairsFoundVal");
const pairsNotFoundVal  = document.getElementById("pairsNotFoundVal");
const cardsDeck         = document.getElementById("cardsDeck");

startButton.addEventListener("click", startGame);
timeLeftStatus.innerHTML = "Time left: " + Math.floor(timeLeft / 600) + " minutes " + timeLeft % 60 + " seconds";

var gameCard = [
    {
        'name': 'beer',
        'img': 'img/cards/beer-solid.svg'
    },
    {
        'name': 'bug',
        'img': 'img/cards/bug-solid.svg'
    },
    {
        'name': 'car',
        'img': 'img/cards/car-solid.svg'
    },
    {
        'name': 'drum',
        'img': 'img/cards/drum-solid.svg'
    },
    {
        'name': 'graduation',
        'img': 'img/cards/graduation-cap-solid.svg'
    },
    {
        'name': 'home',
        'img': 'img/cards/home-solid.svg'
    },
    {
        'name': 'hospital',
        'img': 'img/cards/hospital-solid.svg'
    },
    {
        'name': 'laptop',
        'img': 'img/cards/laptop-solid.svg'
    },
    {
        'name': 'lemon',
        'img': 'img/cards/lemon-solid.svg'
    },
    {
        'name': 'magnet',
        'img': 'img/cards/magnet-solid.svg'
    }
];

refreshCards(); 

function refreshCards() {
    var gameGrid = gameCard.concat(gameCard).sort(function () {
        return 0.5 - Math.random();
    });

    gameGrid.forEach(function(item) {
        var name = item.name,
            img = item.img;

        var card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = name;

        var front = document.createElement('div');
        front.classList.add('back');

        var back = document.createElement('div');
        back.classList.add('front');
        back.style.backgroundImage = 'url(' + img + ')';

        cardsDeck.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);
    });
}

function startGame() {
    timer = setInterval(countdown, 1200);
}

function stopGame() {
    clearTimeout(timer);
    timeLeft = 12;
    progressStatus.style = "width: 0%;";
    progressStatus.classList.add("green");
    progressStatus.classList.remove("red");
    startButton.classList.remove("green");
}

function countdown() {
    startButton.classList.add("green");
    if (timeLeft == 0) {
        stopGame();
    }
    if (timeLeft <= 5 && timeLeft >= 2) { 
        progressStatus.style = "width: " + (timeLeft / 12) * 100 + "%;"; 
        progressStatus.classList.remove("green");
        progressStatus.classList.add("orange");
    }
    if (timeLeft <= 2) { 
        progressStatus.style = "width: " + (timeLeft / 12) * 100 + "%;"; 
        progressStatus.classList.remove("orange");
        progressStatus.classList.add("red");}
    else {     
        progressStatus.style = "width: " + (timeLeft / 12) * 100 +"%;"; 
        progressStatus.classList.add("green");
    }
    timeLeftStatus.innerHTML = "Time left: " + Math.floor(timeLeft / 600) + " minutes " + timeLeft % 60 + " seconds";
    timeLeft--;
}