# Tic Tac Toe

## Javascript code with comments 

```js
const tiles = document.querySelectorAll(".tile") // selecting all the tile class
const PLAYESR_X = 'X'
const PLAYESR_O = 'O'
let turn = PLAYESR_X;                   // starting position will be X

// 1. where the X and O are in the board
const boardState = Array(tiles.length); // console: boardState   (9)[empty * 9]
boardState.fill(null);                  // (9) [null,...]

// 2. Elements from html
const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", startNewGame);

// 3. Adding sounds: click and gameover
const gameOverSound = new Audio("sounds/game_over.wav");
const clickSound = new Audio("sounds/click.wav");


// 4. which box is clicked, gameover area, 5.Check whose turn 
// and defining players turn, 6. playing click sound
tiles.forEach((tile) => tile.addEventListener("click", tileClick)); // which box is clicked


// 7.hover text function implementing preview of placing " x or o ". Work in two steps. 1: remove any hover text already exists  2: add the hover text for the current turn
function setHoverText(){                             
    // remove all hover text
    tiles.forEach(tile=>{
        tile.classList.remove("x-hover");
        tile.classList.remove("o-hover");
    });

    // figure out which class we are going to be using based on the current turn for this string template `` used
    const hoverClass = `${turn.toLowerCase()}-hover`; // current turn to lowercase: PLAYESR_O = 'O' OR = " x or o "; x-hover or o-hover -> CSS hover
    tiles.forEach((tile) => {           // looping over every tiles and set that hover if only there isn't text there
        if(tile.innerHTML == ""){
            tile.classList.add(hoverClass);
        }
    });
}
setHoverText();                               


function tileClick(event){                           // event: which box is clicked
    if(gameOverArea.classList.contains('visible')){  // if gameover area is displayed then no more allowed to click the boxes
        return;                                      // if gameoverarea contains class 'visible'. return: the function will stop executing here                     
    }

    const tile = event.target;
    const tileNumber = tile.dataset.index; // tile.dataset.index: data attributes given to html; data-index="1" = data index numbers or tile number
    if(tile.innerText != ""){
        return;                           // if innertext is not empty: x or o is inside; return: exiting the method
    }

    // 5. Check whose turn it is; first turn is always x
    if(turn === PLAYESR_X){                   // let turn = PLAYESR_X; first turn is always x
        tile.innerText = PLAYESR_X;           // innertext is x
        boardState[tileNumber-1] = PLAYESR_X; // player x's spot on the board and set that. ?? boardState 0to8 total 9, [tileNumber-1] is 1to9                 ??
        turn = PLAYESR_O;                     // player o's turn after x
    }else{                                    // player o's turn defined here
        tile.innerText = PLAYESR_O; 
        boardState[tileNumber-1] = PLAYESR_O; // which player clicked on which boxes.  O/P console/board state: (9) ['X', null, null, null, null, null, null, null, 'O']
        turn = PLAYESR_X;  
    }

    // 6. clickSound.play();                  // 6. un comment for sound
    setHoverText(); // <- 7. this second call reseting the hover text for the next turn. This function in general is called once game starts and anytime clicking the tile

    // 8. Determining the winner! checking the winner anytime the "tileClick()" has been clicked
    checkWinner();
}

// 8.2 Implementing the checkWinner(). looping over winningCombinations. This function is invoked while cliking boxes by tileClick()
// console.log(winningCombination); inside for loop. To see whats winningCombination have
function checkWinner(){
    // check for a winner
    for(const winningCombination of winningCombinations){
        const { combo, strikeClass } = winningCombination;  // Object Destructuring: to extract combo and strikeClass from winningCombination which is an object
        // checking winning combination from our board which are boxes
        const tileValue1 = boardState[combo[0] -1]; // first item in array from . winning combination to get the values from our board
        const tileValue2 = boardState[combo[1] -1];
        const tileValue3 = boardState[combo[2] -1];

        if(tileValue1 != null && tileValue1 === tileValue2 && tileValue1 === tileValue3){
            strike.classList.add(strikeClass); // strike through line is appearing for the winner
            gameOverScreen(tileValue1); // tileValue1 who the winner 
            return;
        }
    }

    // 10. check for a draw
    const allTileFilledIn = boardState.every((tile) => tile !== null);
    if(allTileFilledIn){
        gameOverScreen(null);
    }

}

// 9. Gameover screen is getting value from the method checkwinner->gameOverScreen(VALUE)
function gameOverScreen(winnerText){
    let text = "Draw!";
    if(winnerText != null){
        text = `Winner is ${winnerText}!`;
    }
    gameOverArea.className = "visible";
    gameOverText.innerText = text;
    gameOverSound.play();
}

// 11. 
function startNewGame(){
    strike.className = "strike";
    gameOverArea.className = "hidden";
    boardState.fill(null);
    tiles.forEach((tile) => (tile.innerText = ""));
    turn = PLAYESR_X;
    setHoverText();
}

// 8.1 Data structure Determining  winner, whether its a row, columns or a diagonal will describe the winning combination also the strikethrough to use.
const winningCombinations = [
    // rows
    {combo:[1,2,3], strikeClass: "strike-row-1"},
    {combo:[4,5,6], strikeClass: "strike-row-2"},
    {combo:[7,8,9], strikeClass: "strike-row-3"},
    // columns or vertical
    {combo:[1,4,7], strikeClass: "strike-column-1"},
    {combo:[2,5,8], strikeClass: "strike-column-2"},
    {combo:[3,6,9], strikeClass: "strike-column-3"},
    // diagonals 
    {combo:[1,5,9], strikeClass: "strike-diagonal-1"},
    {combo:[3,5,7], strikeClass: "strike-diagonal-2"},
];
```
## JS without comments
```javascript
const tiles = document.querySelectorAll(".tile") 
const PLAYESR_X = 'X'
const PLAYESR_O = 'O'
let turn = PLAYESR_X;                   

const boardState = Array(tiles.length); 
boardState.fill(null);                  

const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", startNewGame);

const gameOverSound = new Audio("sounds/game_over.wav");
const clickSound = new Audio("sounds/click.wav");

tiles.forEach((tile) => tile.addEventListener("click", tileClick));

function setHoverText(){                             
    tiles.forEach(tile=>{
        tile.classList.remove("x-hover");
        tile.classList.remove("o-hover");
    });

    const hoverClass = `${turn.toLowerCase()}-hover`; 
    tiles.forEach((tile) => {           
        if(tile.innerHTML == ""){
            tile.classList.add(hoverClass);
        }
    });
}

setHoverText();                               

function tileClick(event){                           
    if(gameOverArea.classList.contains('visible')){  
        return;                                      
    }
    const tile = event.target;
    const tileNumber = tile.dataset.index; 
    if(tile.innerText != ""){
        return;                           
    }
    if(turn === PLAYESR_X){                   
        tile.innerText = PLAYESR_X;           
        boardState[tileNumber-1] = PLAYESR_X; 
        turn = PLAYESR_O;                     
    }else{                                    
        tile.innerText = PLAYESR_O; 
        boardState[tileNumber-1] = PLAYESR_O; 
        turn = PLAYESR_X;  
    }
    // clickSound.play();  
    setHoverText(); 
    checkWinner();
}

function checkWinner(){
    for(const winningCombination of winningCombinations){
        const { combo, strikeClass } = winningCombination;  
        const tileValue1 = boardState[combo[0] -1]; 
        const tileValue2 = boardState[combo[1] -1];
        const tileValue3 = boardState[combo[2] -1];

        if(tileValue1 != null && tileValue1 === tileValue2 && tileValue1 === tileValue3){
            strike.classList.add(strikeClass); 
            gameOverScreen(tileValue1); 
            return;
        }
    }
    const allTileFilledIn = boardState.every((tile) => tile !== null);
    if(allTileFilledIn){
        gameOverScreen(null);
    }
}

function gameOverScreen(winnerText){
    let text = "Draw!";
    if(winnerText != null){
        text = `Winner is ${winnerText}!`;
    }
    gameOverArea.className = "visible";
    gameOverText.innerText = text;
    // gameOverSound.play();
}

function startNewGame(){
    strike.className = "strike";
    gameOverArea.className = "hidden";
    boardState.fill(null);
    tiles.forEach((tile) => (tile.innerText = ""));
    turn = PLAYESR_X;
    setHoverText();
}

const winningCombinations = [
    // rows
    {combo:[1,2,3], strikeClass: "strike-row-1"},
    {combo:[4,5,6], strikeClass: "strike-row-2"},
    {combo:[7,8,9], strikeClass: "strike-row-3"},
    // columns or vertical
    {combo:[1,4,7], strikeClass: "strike-column-1"},
    {combo:[2,5,8], strikeClass: "strike-column-2"},
    {combo:[3,6,9], strikeClass: "strike-column-3"},
    // diagonals 
    {combo:[1,5,9], strikeClass: "strike-diagonal-1"},
    {combo:[3,5,7], strikeClass: "strike-diagonal-2"},
];

```

## CSS
```css
body{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: black;
    color: greenyellow;
}
#board{
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
    cursor: pointer;
    position: relative; /*STRIKES will be relative*/
}
.tile{
    color: currentColor;
    /* 
    margin: 10px;remove this 
    background-color: grey; remove this 
     */
    font-size: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
}

.right-border{
    border-right: 0.2em solid indigo;
}
.bottom-border{
    border-bottom: 0.2em solid indigo;
}

/* STRIKES row:horizontal, column:vertical diagonal*/
.strike{
    position: absolute;
    background-color: darkred;
}
.strike-row-1{
    width: 100%;
    height: 4px;
    top: 16%;
}
.strike-row-2{
    width: 100%;
    height: 4px;
    top: 49%;
}
.strike-row-3{
    width: 100%;
    height: 4px;
    top: 84%;
}
.strike-column-1{
    height: 100%;
    width: 4px;
    left: 15%;
}
.strike-column-2{
    height: 100%;
    width: 4px;
    left: 48%;
}
.strike-column-3{
    height: 100%;
    width: 4px;
    left: 83%;
}
.strike-diagonal-1{
    width: 90%;
    height: 4px;
    top: 50%;
    left: 5%;
    transform: skewY(45deg);
}
.strike-diagonal-2{
    width: 90%;
    height: 4px;
    top: 50%;
    left: 4%;
    transform: skewY(-45deg);
}
/* STRIKES END*/

h1{
    color: currentColor;
}

/* Game over area: The square box with button and h2:message*/
#game-over-area{
    text-align: center;
    border: indigo 8px solid;
    padding: 50px;
    width: 50%;
    margin-top: 50px;
}

h2{
    color: currentColor;
    font-size: 2em;
    margin-top: 0px;
}
button{
    background-color: transparent;
    color: currentColor;
    border: currentColor 1px solid;
    padding: 10px;
    font-size: 1.5em;
}

/* Game over area: hiding, and visible*/
.hidden{
    display: none;
}
.visible{
    display: block;
}


.x-hover:hover::after{
    content: "X";
    opacity: 0.4;
}
.o-hover:hover::after{
    content: "O";
    opacity: 0.4;
}
```
## Index html
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic Tac Toe</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Tic Tac Toe</h1>
    <div id="board">
        <div data-index="1" class="tile right-border bottom-border"></div>
        <div data-index="2" class="tile right-border bottom-border"></div>
        <div data-index="3" class="tile bottom-border"></div>
        <div data-index="4" class="tile right-border bottom-border"></div>
        <div data-index="5" class="tile right-border bottom-border"></div>
        <div data-index="6" class="tile bottom-border"></div>
        <div data-index="7" class="tile right-border"></div>
        <div data-index="8" class="tile right-border"></div>
        <div data-index="9" class="tile"></div>
        
        <div id="strike" class="strike"></div>
    </div>

    <div id="game-over-area" class="hidden">
        <h2 id="game-over-text">Winner is X</h2>
        <button id="play-again">Play Again</button>
    </div>
        
    
    <script src="script.js"></script>
</body>
</html>
```