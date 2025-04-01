GAME = {
    width: 500,
    height: 500,
    background: '#BDB76B',
    isFight: false,
    state: 0, // отвечает за то какой экран будет выводить 1 - победа 2 - поражение 3 - ничья
    counter: 0,
    recordScore: loadScore(),
    timeTick: 0,
    animationTick: 0,
    score: 0,
    game: 0,
    game_1: 0,
    tick: 0,
    tickAttack: 0,
    triggerZone: 50,
}

var GRASS = {
    x: 0,
    y: 320,
    img: new Image(),
    imgIsLoad: false,
    width: GAME.width,
    height: 90,
}

var HILLS = {
    x: 0,
    y: -50,
    img: new Image(),
    imgIsLoad: false,
    width: GAME.width,
    height: 80,
}


var canvas = document.getElementById('canvas');
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext('2d');

var ANIMATION_PLAYER = {
    img: new Image(),
    imgIsLoad: false,
    count: 0,
    attack: false,
    defend: false,
    tick: 0,
    width: 128,
    height: 64,
}

var ANIMATION_ENEMY = {
    imgIdle: new Image(),
    imgAttack: new Image(),
    imgDefend: new Image(),
    imgIsLoadIdle: false,
    imgIsLoadAttack: false,
    imgIsLoadDefend: false,
    count: 0,
    attack: false,
    defend: false,
    tick: 0,
    width: 30,
    height: 40,
}


PLAYER = {
    x: 50,
    y: 200,
    attack: -1,
    defend: -1,
    style: '',
    isAttack: false,
    damage: 20,
    tick: 0,
    counter: 0,
    attackCounter: 0,
    summaryDamage: 0,
    xDirection: 5,
    yDirection: 5,
}

ENEMY = {
    x: GAME.width,
    y: GAME.height,
    attack: -1,
    defend: -1,
    damage: 20,
    summaryDamage: 0,
}

function initAnimation() {
    ANIMATION_PLAYER.img.src = './img/player_anim.png';
    ANIMATION_PLAYER.img.onload = () => {
        ANIMATION_PLAYER.imgIsLoad = true;
    }
    ANIMATION_ENEMY.imgIdle.src = './img/idle.png';
    ANIMATION_ENEMY.imgIdle.onload = () => {
        ANIMATION_ENEMY.imgIsLoadIdle = true;
    }
    ANIMATION_ENEMY.imgAttack.src = './img/enemyAttack.png';
    ANIMATION_ENEMY.imgAttack.onload = () => {
        ANIMATION_ENEMY.imgIsLoadAttack = true;
    }
    ANIMATION_ENEMY.imgDefend.src = './img/enemyDefend.png';
    ANIMATION_ENEMY.imgDefend.onload = () => {
        ANIMATION_ENEMY.imgIsLoadDefend = true;
    }

    GRASS.img.src = './img/grass.png';
    GRASS.img.onload = () => {
        GRASS.imgIsLoad = true;
    }
    HILLS.img.src = './img/hills.png';
    HILLS.img.onload = () => {
        HILLS.imgIsLoad = true;
    }
}

function drawIdleAnimation() {
    if (ANIMATION_PLAYER.imgIsLoad && ANIMATION_PLAYER.attack === false && ANIMATION_PLAYER.defend === false) {
        canvasContext.drawImage(
            ANIMATION_PLAYER.img,
            ANIMATION_PLAYER.count * ANIMATION_PLAYER.width + 50,
            0,
            ANIMATION_PLAYER.width,
            ANIMATION_PLAYER.height,
            PLAYER.x,
            PLAYER.y,
            ANIMATION_PLAYER.width,
            ANIMATION_PLAYER.height,);
        ANIMATION_PLAYER.tick++;
        if (ANIMATION_PLAYER.tick === 15) {
            ANIMATION_PLAYER.count++;
            ANIMATION_PLAYER.tick = 0;
        }
        if (ANIMATION_PLAYER.count === 2) {
            ANIMATION_PLAYER.count = 0;
        }
    }
    if (ANIMATION_ENEMY.imgIsLoadIdle && ANIMATION_ENEMY.attack === false && ANIMATION_ENEMY.defend === false) {
        canvasContext.drawImage(
            ANIMATION_ENEMY.imgIdle,
            ANIMATION_ENEMY.count * ANIMATION_ENEMY.width,
            0,
            ANIMATION_ENEMY.width,
            ANIMATION_ENEMY.height,
            ENEMY.x,
            ENEMY.y + 15,
            ANIMATION_ENEMY.width + 20,
            ANIMATION_ENEMY.height + 20,);
        ANIMATION_ENEMY.tick++;
        if (ANIMATION_ENEMY.tick === 15) {
            ANIMATION_ENEMY.count++;
            ANIMATION_ENEMY.tick = 0;
        }
        if (ANIMATION_ENEMY.count === 2) {
            ANIMATION_ENEMY.count = 0;
        }
    }
}

function drawAttackAnimation() {
    if (ANIMATION_PLAYER.imgIsLoad && ANIMATION_PLAYER.attack === true && ANIMATION_PLAYER.defend === false) {
        canvasContext.drawImage(
            ANIMATION_PLAYER.img,
            ANIMATION_PLAYER.count * ANIMATION_PLAYER.width + 50,
            128,
            ANIMATION_PLAYER.width,
            ANIMATION_PLAYER.height,
            PLAYER.x,
            PLAYER.y,
            ANIMATION_PLAYER.width,
            ANIMATION_PLAYER.height,);
        ANIMATION_PLAYER.tick++;
        if (ANIMATION_PLAYER.tick === 10) {
            ANIMATION_PLAYER.count++;
            ANIMATION_PLAYER.tick = 0;
        }
        if (ANIMATION_PLAYER.count === 6) {
            ANIMATION_PLAYER.count = 0;
            ANIMATION_PLAYER.attack = false;
        }
    }
    if (ANIMATION_ENEMY.imgIsLoadAttack && ANIMATION_ENEMY.attack === true && ANIMATION_ENEMY.defend === false) {
        canvasContext.drawImage(
            ANIMATION_ENEMY.imgAttack,
            ANIMATION_ENEMY.count * ANIMATION_ENEMY.width,
            0,
            ANIMATION_ENEMY.width,
            ANIMATION_ENEMY.height,
            ENEMY.x,
            ENEMY.y + 15,
            ANIMATION_ENEMY.width + 20,
            ANIMATION_ENEMY.height + 20,);
        ANIMATION_ENEMY.tick++;
        if (ANIMATION_ENEMY.tick === 15) {
            ANIMATION_ENEMY.count++;
            ANIMATION_ENEMY.tick = 0;
        }
        if (ANIMATION_ENEMY.count === 7) {
            ANIMATION_ENEMY.count = 0;
            ANIMATION_ENEMY.attack = false;
        }
    }

}

function drawDefendAnimation() {
    if (ANIMATION_PLAYER.imgIsLoad && ANIMATION_PLAYER.defend === true) {
        canvasContext.drawImage(
            ANIMATION_PLAYER.img,
            ANIMATION_PLAYER.count * ANIMATION_PLAYER.width + 50,
            64,
            ANIMATION_PLAYER.width,
            ANIMATION_PLAYER.height,
            PLAYER.x,
            PLAYER.y,
            ANIMATION_PLAYER.width,
            ANIMATION_PLAYER.height,);
        ANIMATION_PLAYER.tick++;
        if (ANIMATION_PLAYER.tick === 10) {
            ANIMATION_PLAYER.count++;
            ANIMATION_PLAYER.tick = 0;
        }
        if (ANIMATION_PLAYER.count === 5) {
            ANIMATION_PLAYER.count = 0;
            ANIMATION_PLAYER.defend = false;
        }
    }
    if (ANIMATION_ENEMY.imgIsLoadDefend && ANIMATION_ENEMY.defend === true) {
        canvasContext.drawImage(
            ANIMATION_ENEMY.imgIdle,
            ANIMATION_ENEMY.count * ANIMATION_ENEMY.width,
            0,
            ANIMATION_ENEMY.width,
            ANIMATION_ENEMY.height,
            ENEMY.x,
            ENEMY.y,
            ANIMATION_ENEMY.width + 20,
            ANIMATION_ENEMY.height + 20,);
        ANIMATION_ENEMY.tick++;
        if (ANIMATION_ENEMY.tick === 15) {
            ANIMATION_ENEMY.count++;
            ANIMATION_ENEMY.tick = 0;
        }
        if (ANIMATION_ENEMY.count === 1) {
            ANIMATION_ENEMY.count = 0;
            ANIMATION_ENEMY.defend = false;
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function getRandomIntInterval(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function drawEnemy() {
    canvasContext.fillStyle = ENEMY.color;
    canvasContext.fillRect(ENEMY.x, ENEMY.y, ENEMY.width, ENEMY.height);
}

function drawMenuAttacks() {
    canvasContext.fillStyle = 'grey';
    canvasContext.fillRect(PLAYER.x - 25, PLAYER.y - 20, 43, 15);
    var deltaX = -22;

    for (let i = 1; i < 4; i++) {
        canvasContext.fillStyle = 'black';
        canvasContext.fillRect(PLAYER.x + deltaX, PLAYER.y - 17, 10, 10);
        canvasContext.fillStyle = 'white';
        canvasContext.font = '10px serif';
        canvasContext.fillText(i, PLAYER.x + deltaX + 2, PLAYER.y - 8)
        deltaX += 13

    }
}



function initEventListener() {
    window.addEventListener('keydown', onCanvasKeyDown);
}

function onCanvasKeyDown(event) {
    if (GAME.isFight && (PLAYER.attack === -1 || PLAYER.defend === -1)) {
        if (PLAYER.isAttack) {
            if (event.key === '1') {
                PLAYER.attack = 1;
                ANIMATION_PLAYER.attack = true;
                ANIMATION_ENEMY.defend = true;
            }
            if (event.key === '2') {
                PLAYER.attack = 2;
                ANIMATION_PLAYER.attack = true;
                ANIMATION_ENEMY.defend = true;
            }
            if (event.key === '3') {
                PLAYER.attack = 3;
                ANIMATION_PLAYER.attack = true;
                ANIMATION_ENEMY.defend = true;
            }

        }
        else {
            if (event.key === '1') {
                PLAYER.defend = 1;
                ANIMATION_PLAYER.defend = true;
                ANIMATION_ENEMY.attack = true;
            }
            if (event.key === '2') {
                PLAYER.defend = 2;
                ANIMATION_PLAYER.defend = true;
                ANIMATION_ENEMY.attack = true;
            }
            if (event.key === '3') {
                PLAYER.defend = 3;
                ANIMATION_PLAYER.defend = true;
                ANIMATION_ENEMY.attack = true;
            }
        }

    }
    if (!GAME.isFight) {
        if (event.key === 'ArrowLeft') {
            PLAYER.x -= PLAYER.xDirection;
        }
        if (event.key === 'ArrowDown') {
            PLAYER.y += PLAYER.yDirection;
        }
        if (event.key === 'ArrowUp') {
            PLAYER.y -= PLAYER.yDirection;
        }
        if (event.key === 'ArrowRight') {
            PLAYER.x += PLAYER.xDirection;
        }
        clampPositionPlayer();
    }

}

function enemyDefend() {
    PLAYER.isAttack = false;
    ENEMY.defend = getRandomInt(3);
    if (PLAYER.counter === 0) {
        if (PLAYER.attack == 1 && ENEMY.defend == 1) {
            PLAYER.summaryDamage += PLAYER.damage;
        }
        if (PLAYER.attack == 1 && ENEMY.defend == 2) {
            PLAYER.summaryDamage += PLAYER.damage * 1.5;
        }
        if (PLAYER.attack == 2 && ENEMY.defend == 0) {
            PLAYER.summaryDamage += PLAYER.damage * 1.5;
        }
        if (PLAYER.attack == 2 && ENEMY.defend == 2) {
            PLAYER.summaryDamage += PLAYER.damage;
        }
        if (PLAYER.attack == 3 && ENEMY.defend == 0) {
            PLAYER.summaryDamage += PLAYER.damage;
        }
        if (PLAYER.attack == 3 && ENEMY.defend == 1) {
            PLAYER.summaryDamage += PLAYER.damage * 1.5;
        }
    }
    if (PLAYER.defend != -1) {
        GAME.game = 1;
        enemyAttack();
    }
    PLAYER.counter++;

}

function enemyAttack() {
    GAME.tickAttack++;
    if (GAME.tickAttack === 110) {
        ENEMY.attack = getRandomInt(3);
        if (ENEMY.attack == 1 && PLAYER.defend == 1) {
            ENEMY.summaryDamage += ENEMY.damage;
        }
        if (ENEMY.attack == 1 && PLAYER.defend == 2) {
            ENEMY.summaryDamage += ENEMY.damage * 1.5;
        }
        if (ENEMY.attack == 2 && PLAYER.defend == 0) {
            ENEMY.summaryDamage += ENEMY.damage * 1.5;
        }
        if (ENEMY.attack == 2 && PLAYER.defend == 2) {
            ENEMY.summaryDamage += ENEMY.damage;
        }
        if (ENEMY.attack == 3 && PLAYER.defend == 0) {
            ENEMY.summaryDamage += ENEMY.damage;
        }
        if (ENEMY.attack == 3 && PLAYER.defend == 1) {
            ENEMY.summaryDamage += ENEMY.damage * 1.5;
        }
    }
    GAME.isFight = false;
    GAME.game = 1;
}


function Fight() {
    PLAYER.isAttack = true;
    if (PLAYER.attack != -1) {
        enemyDefend();
    }
    if (ENEMY.summaryDamage < PLAYER.summaryDamage && GAME.game === 1) {
        GAME.animationTick++;
        if (GAME.animationTick === 150) {
            GAME.state = 1;
        }
        saveScore();

    }
    if (ENEMY.summaryDamage > PLAYER.summaryDamage) {
        GAME.animationTick++;
        resetRecord();
        if (GAME.animationTick === 150) {
            GAME.state = 2;
        }
    }
    if (ENEMY.summaryDamage === PLAYER.summaryDamage && ENEMY.summaryDamage != 0 || ENEMY.summaryDamage === PLAYER.summaryDamage && GAME.game === 1 && GAME.game_1 != 1) {
        GAME.animationTick++;
        if (GAME.animationTick === 150) {
            PLAYER.recordScore = 0;
            GAME.state = 3;
        }

    }

    console.log('EnemyDamage: ' + ENEMY.summaryDamage);
    console.log('PLAYER: ' + PLAYER.summaryDamage);

}

function drawBackground() {
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
    canvasContext.fillStyle = '#87CEEB';
    canvasContext.fillRect(0, 0, GAME.width, 80);
    if (GRASS.imgIsLoad) {
        for (let i = 0; i < 2; i++) {
            canvasContext.drawImage(GRASS.img,
                GRASS.x + i * 150,
                GRASS.y,
            );
        }

    }
    if (HILLS.imgIsLoad) {
        for (let i = 0; i < 2; i++) {
            canvasContext.drawImage(HILLS.img,
                HILLS.x + i * 150,
                HILLS.y,
            );
        }
    }

}

function drawLoseFight() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    canvasContext.fillStyle = 'black';
    canvasContext.font = '50px serif';
    canvasContext.fillText('Поражение', 230, 230);
}

function drawDrawFight() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    canvasContext.fillStyle = 'black';
    canvasContext.font = '50px serif';
    canvasContext.fillText('Ничья', 250, 250);

}
function drawWinFight() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    canvasContext.fillStyle = 'black';
    canvasContext.font = '50px serif';
    canvasContext.fillText('Победа', 250, 250);

}

function drawRecord() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    canvasContext.fillStyle = 'black';
    canvasContext.font = '30px serif';
    canvasContext.fillText('Вы победили всех врагов', 25, 250);
}

function drawScore(){
    canvasContext.fillStyle = 'black';
    canvasContext.font = '30px serif';
    canvasContext.fillText('Счёт: ' + GAME.recordScore, 30, 30);
}

function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawMenuAttacks();
    drawEnemy();
    drawIdleAnimation();
    drawAttackAnimation();
    drawDefendAnimation();
    drawScore();
    requestAnimationFrame(play);
}

function play() {
    var xTriggerZone = PLAYER.x + GAME.triggerZone >= ENEMY.x && PLAYER.x + GAME.triggerZone <= ENEMY.x + GAME.triggerZone;
    var yTriggerZone = PLAYER.y >= ENEMY.y && PLAYER.y + GAME.triggerZone <= ENEMY.y + GAME.triggerZone + 5;
    drawFrame();
    if (xTriggerZone && yTriggerZone) {
        GAME.isFight = true;
    }
    else {
    }
    if (GAME.isFight) {
        Fight();
    }
    if (!GAME.isFight) {
        GAME.tick++;
        if (GAME.tick === 120) {
            GAME.counter++;
            ENEMY.x = getRandomIntInterval(100, GAME.width - 100);
            ENEMY.y = getRandomIntInterval(200, GAME.height - 200);
        }
        console.log(HILLS.imgIsLoad);
    }



    console.log(GAME.recordScore);
    console.log(GAME.isFight);
    if (GAME.recordScore === 3) {
        GAME.timeTick++;
        drawRecord();
    }
    if (GAME.state === 2) {
        drawLoseFight();
        GAME.timeTick++;
    }
    if (GAME.state === 1 && GAME.recordScore != 3) {
        drawWinFight();
        GAME.timeTick++;
    }
    if (GAME.state === 3) {
        drawDrawFight();
        GAME.timeTick++;
    }
    if (GAME.timeTick === 100) {
        refresh();
        if(GAME.recordScore === 3){
            resetRecord();
        }
    }
}

function clampPositionPlayer() {
    if (PLAYER.x >= 420) {
        PLAYER.x = 420;
    }
    if (PLAYER.x <= 0) {
        PLAYER.x = 0;
    }
    if (PLAYER.y + ANIMATION_PLAYER.height >= 420) {
        PLAYER.y = 420 - ANIMATION_PLAYER.height;
    }
    if (PLAYER.y <= 80) {
        PLAYER.y = 80;
    }
}

function refresh() {
    setTimeout(function () {
        location.reload()
    }, 100);
}

function saveScore() {
    GAME.score++;
    if (GAME.score === 1) {
        GAME.recordScore++;
        localStorage.setItem('score', GAME.recordScore.toString());
    }

}

function resetRecord() {
    GAME.recordScore = 0;
    localStorage.setItem('score', '0');
}

function loadScore() {
    const savedScore = localStorage.getItem('score');
    return savedScore ? parseInt(savedScore, 10) : 0;
}



initAnimation();
initEventListener();
play();
