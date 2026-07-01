const game = document.getElementById("game");
const movesText = document.getElementById("moves");
const timerText = document.getElementById("timer");

let time = 0;
let timer;

const emojis = [
"🍎","🍌","🍇","🍓",
"🍎","🍌","🍇","🍓",
"🍒","🥝","🍍","🥥",
"🍒","🥝","🍍","🥥"
];

let cards = [];
let firstCard = null;
let secondCard = null;
let lock = false;
let moves = 0;
let matched = 0;

function startTimer(){

    timer = setInterval(()=>{
        time++;
        timerText.innerText = time;
    },1000);

}

function shuffle(array){
    return array.sort(()=>Math.random()-0.5);
}

function createBoard(){

    game.innerHTML="";
    cards = shuffle([...emojis]);

    cards.forEach(emoji=>{

        const card=document.createElement("div");
        card.classList.add("card");
        card.dataset.emoji=emoji;
        card.innerHTML=emoji;

        card.addEventListener("click",flipCard);

        game.appendChild(card);

    });

}

function flipCard(){

    if(lock) return;
    if(this===firstCard) return;
    if(this.classList.contains("match")) return;

    this.classList.add("flip");

    if(!firstCard){
        firstCard=this;
        return;
    }

    secondCard=this;
    lock=true;

    moves++;
    movesText.innerText=moves;

    if(firstCard.dataset.emoji===secondCard.dataset.emoji){

        firstCard.classList.add("match");
        secondCard.classList.add("match");

        matched+=2;

        reset();

        if(matched===16){

    clearInterval(timer); // Stop the timer

    setTimeout(()=>{
        alert("🎉 Congratulations! You Won!");
    },300);

}

    }
    else{

        setTimeout(()=>{

            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");

            reset();

        },800);

    }

}

function reset(){
 
    firstCard=null;
    secondCard=null;
    lock=false;

}

function restartGame(){

    clearInterval(timer); // Stop previous timer

    time = 0;
    timerText.innerText = 0;

    moves = 0;
    matched = 0;
    movesText.innerText = 0;

    reset();
    createBoard();

    startTimer(); // Start a new timer
}

createBoard();