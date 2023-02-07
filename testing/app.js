const canvas = document.querySelector('canvas');
const cxt = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;


const gravity = 0.7;
let score = 0;
let hi = 0;
let fail = false;
let ss = true;

// start screen
function startS() {
    cxt.fillStyle = "black";
    cxt.fillRect(0, 0, canvas.width, canvas.height);
    cxt.font = "120px arial";
    cxt.fillStyle = "white";
    cxt.fillText("jump and dodge", 70, 120);
    cxt.font = "60px arial";
    cxt.fillText("press anywhere to start", 170, 300);
    fail = true;
}

class Sprite {
    constructor({ position, velocity, color, height, width }) {
        this.position = position;
        this.velocity = velocity;
        this.height = height;
        this.width = width;
        this.lastkey;
        this.color = color;
    }
    draw() {
        cxt.fillStyle = this.color;
        cxt.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.draw();

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.position.y + this.height + this.velocity.y >= canvas.height || fail === true) {
            this.velocity.y = 0;
        } else { this.velocity.y += gravity; }
    }
}

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    }
}

function rectcoll({ rect1, rect2 }) {
    return (
        rect1.position.x + rect1.width >= rect2.position.x &&
        rect1.position.x <= rect2.position.x + rect2.width &&
        rect1.position.y + rect1.height >= rect2.position.y &&
        rect1.position.y <= rect2.position.y + rect2.height
    )
}

function addScore() {
    if (!fail) { score += 0.01; }
    if (score > hi) {
        hi = score;
    }
    cxt.fillStyle = "white";
    cxt.font = "30px Arial";
    cxt.fillText("Score: " + Math.floor(score), 10, 30);
    cxt.fillText("Hi: " + Math.floor(hi), 10, 70);
}


player = new Sprite({
    position: {
        x: 0,
        y: 450,
    },
    velocity: {
        x: 0,
        y: 0
    },
    height: 50,
    width: 50,
    color: "red"
})

platform = new Sprite({
    position: {
        x: 900,
        y: 500
    },
    velocity: {
        x: -5,
        y: 0
    },
    height: 76,
    width: Math.floor(Math.random() * 150) + 100,
    color: "green"
})

function animate() {
    cxt.fillStyle = "black";
    cxt.fillRect(0, 0, canvas.width, canvas.height);
    window.requestAnimationFrame(animate);
    player.update();
    platform.update();
    // player movment
    player.velocity.x = 0;
    if (keys.a.pressed && player.lastkey === "a" && player.position.x > 0) { player.velocity.x = -5; } else if (keys.d.pressed && player.lastkey === "d" && player.position.x + player.width < canvas.width) { player.velocity.x = 5; }
    if (keys.w.pressed && player.position.y + player.height + 1 >= canvas.height) { player.velocity.y = -20; }
    // reset platform
    if (platform.position.x + platform.width <= 0) {
        platform.position.x = canvas.width;
        platform.width = Math.floor(Math.random() * 150) + 120;
        platform.position.y = Math.floor(Math.random() * 160) + 340;
        platform.height = canvas.height - platform.position.y;
        platform.velocity.x = Math.floor(Math.random() * - 10) - 5;
    }
    addScore();
    if (rectcoll({ rect1: player, rect2: platform })) {
        score = 0;
        fail = true;
        platform.velocity.x = 0;
        player.velocity.x = 0;
    }
    if (fail) {
        cxt.fillStyle = "rgba(180, 180, 180, 0.5)";
        cxt.fillRect(0, 0, canvas.width, canvas.height);
        cxt.fillStyle = 'black';
        cxt.font = "100px arial";
        cxt.fillText("test over", 320, 200);
        cxt.font = "45px arial";
        cxt.fillText("current high score: " + Math.floor(hi), 300, 280);
        cxt.font = "30px arial";
        cxt.fillText("click anywhere to restart", 335, 400);
    }
}

window.addEventListener('keydown', (e) => {
    if (!fail) {
        switch (e.key) {
            case "d":
                keys.d.pressed = true;
                player.lastkey = "d";
                break;
            case "a":
                keys.a.pressed = true;
                player.lastkey = "a";
                break;
            case " ":
                keys.w.pressed = true;
                break;
        }
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case "d":
            keys.d.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;
        case " ":
            keys.w.pressed = false;
            break;
    }
})

window.addEventListener('click', () => {
    if (fail) {
        if (ss) {
            animate();
            ss = false;
        }
        player.position.x = 0;
        player.position.y = 450;
        platform.position.x = 900;
        platform.position.y = 500;
        platform.height = 76;
        platform.width = Math.floor(Math.random() * 150) + 100;
        platform.velocity.x = -5;
        fail = false;
    }
})

startS();