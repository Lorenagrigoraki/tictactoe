const game = (() =>{
//create game board
const GameBoard = (() =>{
const gameboard = ['','','','','','','','','']
return {gameboard}
})();

const players = (() =>{
    //create players factory function
    const Player = (name, sign) =>{
        return {name, sign}
    };

    const player1 = Player('Player 1', 'X')
    const player2 = Player('Player 2', 'O')
    return {player1, player2}
})()
// !!!!! Think how make this without global code !!!!!
const gmBoard = GameBoard.gameboard
const box = document.getElementsByClassName('box')
let sign = ''
const gmBoardArray = Array.from(box)    
     
gmBoardArray.forEach(el => el.addEventListener('click', markSpotArr)) 
function markSpotArr(e){           
    if(sign === ''){
        sign =  players.player1.sign
        gmBoard[e.target.id-1]=sign          
    }else if(sign === players.player1.sign){
        sign =  players.player2.sign
        gmBoard[e.target.id-1]=sign
    }else{
        sign =  players.player1.sign;
        gmBoard[e.target.id-1]=sign
    }
    markSpotDiv(e)
    removeEvntLstnr(e)
    console.log(sign)
    console.log(gmBoard)
    findWinner(gmBoard)
}

function markSpotDiv(ell){
    gmBoardArray[ell.target.id-1].innerHTML = sign 
}
let eventArr = Array(gmBoardArray.length).fill(true)
function removeEvntLstnr(el){
    gmBoardArray[el.target.id-1].removeEventListener('click', markSpotArr)
    eventArr[el.target.id-1] = false
}
          
const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let winner = null
let whoWin = document.querySelector('.whoWin')
const wrapperWhoWin = document.querySelector('.wrapperWhoWin')
let player1Div = document.getElementById('player1')
let player2Div = document.getElementById('player2')
let point1 = 0;
let point2 = 0;
function findWinner(array){
    for(let i=0;i<winCombos.length; i++){
        let [a,b,c] = winCombos[i];
        let newarray =array.filter(el => el=='') 
        if(array[a] == array[b] && array[b] == array[c] && array[a]!==''){            
            gmBoardArray.forEach((elem,i)=>{
            if(eventArr[i]==true){
            elem.removeEventListener('click', markSpotArr)
            }
            })
            if(array[a] === 'X'){
                winner = players.player1.name
                point1 +=1;
                player1Div.innerHTML = `Player 1: ${point1}`
                console.log(point1)
                                
            }else{
                winner = players.player2.name
                point2 +=1;
                player2Div.innerHTML = `Player 1: ${point2}`
            }
            whoWin.innerHTML = `The winner is ${winner}`
            console.log(`The winner is ${winner}`)
            wrapperWhoWin.style.display = 'flex'
        return
        }else if(newarray.length !=0 && winner == null){
            console.log(`keep playing`)
        }else{
            console.log('It is a draw')
            whoWin.innerHTML = `It's a draw!`
            wrapperWhoWin.style.display = 'flex'
        }
    }
    
}

const resetBtn = Array.from(document.querySelectorAll('.resetBtn'))

    resetBtn.forEach(el => el.addEventListener('click', () =>{
       for(let i = 0; i<gmBoard.length; i++){
        GameBoard.gameboard[i] = '';
       }
       console.log(gmBoard)
       winner =null
        gmBoardArray.forEach(el => el.innerHTML = '')
        gmBoardArray.forEach(el => el.addEventListener('click', markSpotArr))
        wrapperWhoWin.style.display = 'none'
        console.clear()
        }))

const newGame = Array.from(document.querySelectorAll('.newGame'))

newGame.forEach(el => el.addEventListener('click', () =>{
    if(winner != 0 ){
        for(let i = 0; i<gmBoard.length; i++){
            GameBoard.gameboard[i] = '';
           }
           console.log(`This is a new game!`)
           winner = null;
           point1 = 0;
           point2 = 0;
           player1Div.innerHTML = `Player 1: ${point1}`
           player2Div.innerHTML = `Player 2: ${point2}`
           gmBoardArray.forEach(el => el.innerHTML = '')
           gmBoardArray.forEach(el => el.addEventListener('click', markSpotArr))
           wrapperWhoWin.style.display = 'none'
        
    }
    }))       

})()
  

