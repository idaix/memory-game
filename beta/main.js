document.querySelector('.control-buttons span').onclick = () => {
    let playerName = prompt('Your Name?');
    console.log(playerName);
    
    if (playerName === '' || playerName === null ) {
        document.querySelector('.info-container .name span').innerHTML = 'Unknown'
    }else {
        document.querySelector('.info-container .name span').innerHTML = playerName
    }
    document.querySelector('.control-buttons').style.display = 'none'

}

document.querySelector('.round-completed .play-again').onclick = ()=> {
    location.reload()
}


let duration = 1000;

let blocksContainer = document.querySelector('.memory-game-blocks');

let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()]
shuffle(orderRange)
blocks.forEach((block, i)=>{
    block.style.order = orderRange[i]
    block.onclick = () => flipBlock(block);
})

function winRound() {
    let correctBlocks = blocks.filter(b => b.classList.contains('correct'));
    if ( correctBlocks.length === 20 ){
        document.getElementById('winEffect').play()
        document.querySelector('.round-completed').style.display = 'flex'
    }
}

function flipBlock(block) {
    block.classList.add('is-flipped')
    let flippedBlocks = blocks.filter(b => b.classList.contains('is-flipped'));
    console.log(flippedBlocks);
    if(flippedBlocks.length===2){
        stopClicking();
        checkMatchedBlocks(flippedBlocks[0] , flippedBlocks[1]);
    }  
}
function stopClicking() {
    blocksContainer.classList.add('no-clicking')
    
    setTimeout(() => {
        // blocks.forEach(b=>b.classList.remove('is-flipped'))
        blocksContainer.classList.remove('no-clicking')
    }, duration)
}

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