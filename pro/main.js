// config
let duration = 1000;
let blocksContainer = document.querySelector('.memory-game-blocks');
var startCount = 0
let flagsList = ['algeria', 'argentina', 'brazil', 'canada', 'egypt', 'japan', 'turkey', 'united-kingdom', 'united-states', 'uzbekistan', 'algeria', 'argentina', 'brazil', 'canada', 'egypt', 'japan', 'turkey', 'united-kingdom', 'united-states', 'uzbekistan']
let foodList = ['burger', 'cake', 'chicken', 'french-fries', 'hot-dog', 'ice-cream', 'kebab', 'noodles', 'pizza', 'spaghetti', 'burger', 'cake', 'chicken', 'french-fries', 'hot-dog', 'ice-cream', 'kebab', 'noodles', 'pizza', 'spaghetti']
let socilaList = ['facebook', 'instagram', 'linkedin', 'pinterest', 'reddit', 'snapchat', 'spotify', 'twitter', 'whatsapp', 'youtube', 'facebook', 'instagram', 'linkedin', 'pinterest', 'reddit', 'snapchat', 'spotify', 'twitter', 'whatsapp', 'youtube']
const cardList = [
    {name:'flags', list:shuffle(flagsList)},
    {name:'food', list:shuffle(foodList)},
    {name:'social', list:shuffle(socilaList)},
]

// Start the game
document.querySelector('.control-buttons span').onclick = function() {
    let playerName = prompt('Your Name?');
    if (playerName === '' || playerName === null ) {
        document.querySelector('.info-container .name span').innerHTML = 'Unknown'
    }else {
        document.querySelector('.info-container .name span').innerHTML = playerName
    }
    document.querySelector('.control-buttons').style.display = 'none'

    
    startGame(document.getElementById('gameListSelect').value)
}

// Play again
document.querySelector('.round-completed .play-again').onclick = ()=> {
    location.reload()
}


// Start Game Function
function startGame(select) {
    cardList[parseInt(select)].list.map((item)=>(
        blocksContainer.innerHTML += `
        <div class="game-block" onclick="flipBlock(this)" data-card="${item}">
            <div class="face front"></div>
            <div class="face back"><img src="./images/${cardList[parseInt(select)].name}/${item}.png" alt="${item}"></div>
        </div>
        `
    ))

}


let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()]
shuffle(orderRange)
blocks.forEach(function(block, i){
    block.style.order = orderRange[i]
    block.onclick = () => flipBlock(block);
})


// Win round function
function winRound() {
    let myBlocks = Array.from(document.querySelector('.memory-game-blocks').children)
    let correctBlocks = myBlocks.filter(b => b.classList.contains('correct'));
    if ( correctBlocks.length === 20 ){
        document.getElementById('winEffect').play()
        document.querySelector('.round-completed').style.display = 'flex'
    }
}

// Flip block function
function flipBlock(block) {
    block.classList.add('is-flipped')
    let myBlocks = Array.from(document.querySelector('.memory-game-blocks').children)
    console.log(myBlocks);
    let flippedBlocks = myBlocks.filter(b => b.classList.contains('is-flipped'));
    console.log(flippedBlocks);
    if(flippedBlocks.length===2){
        stopClicking();
        checkMatchedBlocks(flippedBlocks[0] , flippedBlocks[1]);
    }  
}

// Stop clicking function
function stopClicking() {
    blocksContainer.classList.add('no-clicking')
    
    setTimeout(() => {
        // blocks.forEach(b=>b.classList.remove('is-flipped'))
        blocksContainer.classList.remove('no-clicking')
    }, duration)
}

// check similarity function
function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesCount = document.querySelector('.tries span')
    if ( firstBlock.dataset.card === secondBlock.dataset.card ){
        firstBlock.classList.remove('is-flipped')
        secondBlock.classList.remove('is-flipped')
        firstBlock.classList.add('correct')
        secondBlock.classList.add('correct')

        document.getElementById('successEffect').play()
        winRound()

    }else{
        triesCount.innerHTML = parseInt(triesCount.innerHTML) + 1
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped')
            secondBlock.classList.remove('is-flipped')
        }, duration)
        document.getElementById('loseEffect').play()
    }
}

// Shuffle array function
function shuffle(array){
    let current = array.length,
        temp,
        random;
    
        while (current > 0) {
            random = Math.floor(Math.random()*current);
            console.log(random);
            current--;

            temp = array[current];
            array[current] = array[random];
            array[random] = temp
        }
    return array
}