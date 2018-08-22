let timeLeft = 12;
let timer;
let count = 0;
let clicksCount = 0;
let previousTarget = null;
let firstGuess = "";
let secondGuess = "";
let delay = 1000;
let matchCount = 0;
let startedByClick = false; 
let gameStart = false;

const progressBar       = document.getElementById("progressBar");
const timeLeftStatus    = document.getElementById("timeLeftStatus");
const progressStatus    = document.getElementById("progressStatus");
const startButton       = document.getElementById("startButton");
const pairsFoundVal     = document.getElementById("pairsFoundVal");
const pairsNotFoundVal  = document.getElementById("pairsNotFoundVal");
const totalClickVal     = document.getElementById("totalClickVal");
const game              = document.getElementById('game');
const grid              = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

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
    if (grid.hasChildNodes) {
            while (grid.firstChild) {
                grid.removeChild(grid.firstChild);
            }
    }

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
        front.classList.add('front');

        var back = document.createElement('div');
        back.classList.add('back');
        back.style.backgroundImage = 'url(' + img + ')';

        grid.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);
    });
}

function startGame() {
    if (gameStart === false) {
        gameStart = true;
        matchCount = 0;
        timer = setInterval(countdown, 1200);
        startButton.innerHTML = "Stop";
        startButton.classList.remove("green");
        startButton.classList.add("red");
        refreshCards();
    } else {
        stopGame();
    }
}

function stopGame() {
    gameStart = false;
    clearTimeout(timer);
    timeLeft = 12;
    startButton.innerHTML = "Start";
    startButton.classList.remove("red");
    startButton.classList.add("green");
    progressStatus.classList.remove("red");
    progressStatus.classList.add("green");
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

const resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.remove('selected');
    });
};

const match = () => {
    matchCount++;
    pairsFoundVal.innerHTML = matchCount;
    pairsNotFoundVal.innerHTML = 10 - matchCount;
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.add('match');
    });
};

grid.addEventListener("click", function(event){
    var clickedCard = event.target;
    
    if (startedByClick === false) {
        startedByClick = true;
        startGame();
    } else {
        if (clickedCard.nodeName === 'SECTION' ||
            clickedCard === previousTarget ||
            clickedCard.parentNode.classList.contains('selected') ||
            clickedCard.parentNode.classList.contains('match')) {
                return console.log(clickedCard.nodeName);
        }

        if (count < 2) {
            count++;
            if (count === 1) {
                firstGuess = clickedCard.parentNode.dataset.name;
                clickedCard.parentNode.classList.add('selected');
                clicksCount++;
                totalClickVal.innerHTML = clicksCount;
            } else {
                secondGuess = clickedCard.parentNode.dataset.name;
                clickedCard.parentNode.classList.add('selected');
                clicksCount++;
                totalClickVal.innerHTML = clicksCount;
            }

            if (firstGuess && secondGuess) {
                if (firstGuess === secondGuess) {
                    setTimeout(match, delay);
                }
                setTimeout(resetGuesses, delay);
            }
            previousTarget = clickedCard;
        }
    }
    console.log(clicksCount);
});