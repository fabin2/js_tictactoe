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