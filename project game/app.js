let player;
let box;
let box2;
let box3;
let wall;
let wall2;
let wall3;
let wall4;
let wall5;
let wall6;
let wall7;
let wall8;
let wall9;
let wall10;
let button;
let button2;
let button3;
let door;
let win

let collL;
let collR;
let collU;
let collD;
let push;

let song = document.getElementById("audio");

// speed let
let speed = 3;

//add new compnents here (make sure to add their varible above)
function startGame() {
    gameField.start();
    // create compnent
    player = new component(30, 30, "blue", 15, 15);
    box = new component(30, 30, "brown", 135, 400);
    box2 = new component(30, 30, "brown", 105, 75);
    box3 = new component(30, 30, "brown", 825, 285);
    wall = new component(30, 210, "black", 60, 0);
    wall2 = new component(30, 210, "black", 60, 300);
    wall3 = new component(30, 210, "black", 180, 0);
    wall4 = new component(30, 210, "black", 180, 300);
    wall5 = new component(100, 440, "black", 900, 70);
    wall6 = new component(30, 30, "black", 390, 390);
    wall7 = new component(510, 30, "black", 390, 360);
    wall8 = new component(510, 30, "black", 390, 90);
    wall9 = new component(30, 90, "black", 390, 120);
    wall10 = new component(390, 30, "black", 390, 210);
    button = new component(30, 30, "red", 270, 420);
    button2 = new component(30, 30, "red", 450, 150);
    button3 = new component(30, 30, "red", 810, 420);
    door = new component(20, 70, "grey", 905, 0);
    win = new component(990, 510, "green", 0, 0);
}

//playing field
const gameField = {
    canvas: document.querySelector("canvas"),
    start: function () {
        this.canvas.width = 990;
        this.canvas.height = 510;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            gameField.keys = (gameField.keys || []);
            gameField.keys[e.key] = true;
        })
        window.addEventListener('keyup', function (e) {
            gameField.keys[e.key] = false;
        })
        song.autoplay = true;
        song.loop = true;
        song.volume = 0.4;
        song.play();
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    reset: function () {
        location.reload();
    }
}

//make components
function component(width, height, color, x, y) {
    this.gamearea = gameField;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.w = x + width;
    this.h = y + height;
    this.on = false;
    this.collL = false;
    this.collR = false;
    this.collU = false;
    this.collD = false;
    this.update = function () {
        ctx = gameField.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
        this.newPos = function () {
            this.x += this.speedX;
            this.y += this.speedY;
            this.w += this.speedX;
            this.h += this.speedY;
        },
        this.collide = function (obj) {
            if (this.x <= obj.w && this.y <= obj.h && this.h >= obj.y && this.w >= obj.x) {
                if (this.x - obj.w >= -5) { this.collL = true; }
                else if (this.w - obj.x <= 5) { this.collR = true; }
                else if (this.y - obj.h >= -5) { this.collU = true; }
                else if (this.h - obj.y <= 5) { this.collD = true; }
            } else {
                this.collL = false;
                this.collR = false;
                this.collU = false;
                this.collD = false;
            }
        },
        this.pressed = function (obj) {
            if (this.x <= obj.w && this.y <= obj.h && this.h >= obj.y && this.w >= obj.x) {
                this.push = true;
            } else {
                this.push = false;
            }
        }
}

// reset?
// update every frame
function updateGameArea() {
    gameField.clear();
    // update game piece
    player.speedX = 0;
    player.speedY = 0;
    box.speedX = 0;
    box.speedY = 0;
    box2.speedX = 0;
    box2.speedY = 0;
    box3.speedX = 0;
    box3.speedY = 0;


    // box collisions


    player.collide(box);
    box.collide(wall);
    if (box.y > wall.h) { box.collide(wall2); }
    if (box.x > wall.w) { box.collide(wall3); }
    if (box.x > wall.w && box.y > wall.h) { box.collide(wall4); }
    if (box.x > wall4.w) { box.collide(wall8); }
    if (box.y > wall8.h && box.x > wall4.w) { box.collide(wall9); }
    if (box.h > wall10.y && box.x > wall4.w) { box.collide(wall10); }
    if (box.y > wall10.h && box.x > wall4.w) { box.collide(wall7); }
    if (box.y > wall7.h && box.x > wall4.w) { box.collide(wall6); }

    if (player.collL == true) {
        if (box.collL == true) { }
        else if (box.x - 1 <= 40) { }
        else { box.speedX = -speed; }
    }
    else if (player.collR == true) {
        if (box.w + 1 >= 850) { }
        else if (box.collR == true) { }
        else { box.speedX = speed; }
    }
    else if (player.collU == true) {
        if (box.y - 1 <= 40) { }
        else if (box.collU == true) { }
        else { box.speedY = -speed; }
    }
    else if (player.collD == true) {
        if (box.h + 1 >= 470) { }
        else if (box.collD == true) { }
        else { box.speedY = speed; }
    }

    player.collide(box2);
    box2.collide(wall);
    if (box2.y > wall.h) { box2.collide(wall2); }
    if (box2.x > wall.w) { box2.collide(wall3); }
    if (box2.x > wall.w && box2.y > wall.h) { box2.collide(wall4); }
    if (box2.x > wall4.w) { box2.collide(wall8); }
    if (box2.y > wall8.h && box2.x > wall4.w) { box2.collide(wall9); }
    if (box2.h > wall10.y && box2.x > wall4.w) { box2.collide(wall10); }
    if (box2.y > wall10.h && box2.x > wall4.w) { box2.collide(wall7); }
    if (box2.y > wall7.h && box2.x > wall4.w) { box2.collide(wall6); }

    if (player.collL == true) {
        if (box2.x - 1 <= 40) { }
        else if (box2.collL == true) { }
        else { box2.speedX = -speed; }
    }
    else if (player.collR == true) {
        if (box2.w + 1 >= 850) { }
        else if (box2.collR == true) { }
        else { box2.speedX = speed; }
    }
    else if (player.collU == true) {
        if (box2.y - 1 <= 40) { }
        else if (box2.collU == true) { }
        else { box2.speedY = -speed; }
    }
    else if (player.collD == true) {
        if (box2.h + 1 >= 470) { }
        else if (box2.collD == true) { }
        else { box2.speedY = speed; }
    }

    player.collide(box3);
    box3.collide(wall);
    if (box3.y > wall.h) { box3.collide(wall2); }
    if (box3.x > wall.w) { box3.collide(wall3); }
    if (box3.x > wall.w && box3.y > wall.h) { box3.collide(wall4); }
    if (box3.x > wall4.w) { box3.collide(wall8); }
    if (box3.y > wall8.h && box3.x > wall4.w) { box3.collide(wall9); }
    if (box3.h > wall10.y && box3.x > wall4.w) { box3.collide(wall10); }
    if (box3.y > wall10.h && box3.x > wall4.w) { box3.collide(wall7); }
    if (box3.y > wall7.h && box3.x > wall4.w) { box3.collide(wall6); }

    if (player.collL == true) {
        if (box3.collL == true) { }
        else if (box3.x - 1 <= 40) { }
        else { box3.speedX = -speed; }
    }
    else if (player.collR == true) {
        if (box3.w + 1 >= 850) { }
        else if (box3.collR == true) { }
        else { box3.speedX = speed; }
    }
    else if (player.collU == true) {
        if (box3.y - 1 <= 40) { }
        else if (box3.collU == true) { }
        else { box3.speedY = -speed; }
    }
    else if (player.collD == true) {
        if (box3.h + 1 >= 470) { }
        else if (box3.collD == true) { }
        else { box3.speedY = speed; }
    }

    // key inputs a, d, w, s
    if (gameField.keys && gameField.keys["a"]) {
        player.collide(wall);
        if (player.y > wall.h) { player.collide(wall2); }
        if (player.x > wall.w) { player.collide(wall3); }
        if (player.x > wall.w && player.y > wall.h) { player.collide(wall4); }
        if (player.x > wall4.w) { player.collide(wall8); }
        if (player.y + 1 > wall8.h && player.x > wall4.w) { player.collide(wall9); }
        if (player.h > wall10.y && player.x > wall4.w) { player.collide(wall10); }
        if (player.y > wall10.h && player.x > wall4.w) { player.collide(wall7); }
        if (player.y + 1 > wall6.y && player.x > wall4.w) { player.collide(wall6); }
        if (player.w + 1 > wall7.w) { player.collide(wall5); }
        if (player.w - 2 > door.x) { player.collide(door); }

        //collision detection outer walls
        if (player.x - 1 <= 0) { }
        else if (player.collL == true) { }
        //move player
        else {
            player.speedX = -speed;
        }
    }
    if (gameField.keys && gameField.keys["d"]) {
        player.collide(wall);
        if (player.y > wall.h) { player.collide(wall2); }
        if (player.x > wall.w) { player.collide(wall3); }
        if (player.x > wall.w && player.y > wall.h) { player.collide(wall4); }
        if (player.x > wall4.w) { player.collide(wall8); }
        if (player.y > wall8.h && player.x > wall4.w) { player.collide(wall9); }
        if (player.y > wall9.h && player.x > wall4.w) { player.collide(wall10); }
        if (player.y > wall10.h && player.x > wall4.w) { player.collide(wall7); }
        if (player.y > wall6.y && player.x > wall4.w) { player.collide(wall6); }
        if (player.w + 1 > wall7.w) { player.collide(wall5); }
        if (player.w - 2 > door.x) { player.collide(door); }

        //collision detection outer walls
        if (player.w + 1 >= 990) { }
        else if (player.collR == true) { }

        //move player
        else {
            player.speedX = speed;
        }
    }
    if (gameField.keys && gameField.keys["w"]) {
        player.collide(wall);
        if (player.y > wall.h) { player.collide(wall2); }
        if (player.x > wall.w) { player.collide(wall3); }
        if (player.x > wall.w && player.y > wall.h) { player.collide(wall4); }
        if (player.x > wall4.w) { player.collide(wall8); }
        if (player.y > wall8.h && player.x > wall4.w) { player.collide(wall9); }
        if (player.y > wall9.h && player.x > wall4.w) { player.collide(wall10); }
        if (player.y > wall10.h && player.x > wall4.w) { player.collide(wall7); }
        if (player.y > wall6.y && player.x > wall4.w) { player.collide(wall6); }
        if (player.w + 1 > wall7.w) { player.collide(wall5); }
        if (player.w - 2 > door.x) { player.collide(door); }

        //collision detection outer walls
        if (player.y - 1 <= 0) { }
        else if (player.collU == true) { }

        //move player
        else {
            player.speedY = -speed;
        }
    }
    if (gameField.keys && gameField.keys["s"]) {
        player.collide(wall);
        if (player.y > wall.h) { player.collide(wall2); }
        if (player.x > wall.w) { player.collide(wall3); }
        if (player.x > wall.w && player.y > wall.h) { player.collide(wall4); }
        if (player.x > wall4.w) { player.collide(wall8); }
        if (player.y > wall8.h && player.x > wall4.w) { player.collide(wall9); }
        if (player.h > wall10.y && player.x > wall4.w) { player.collide(wall10); }
        if (player.y > wall10.h && player.x > wall4.w) { player.collide(wall7); }
        if (player.y > wall6.y && player.x > wall4.w) { player.collide(wall6); }
        if (player.w + 1 > wall7.w) { player.collide(wall5); }
        if (player.w - 2 > door.x) { player.collide(door); }

        //collision detection outer walls
        if (player.h + 1 >= 510) { }
        else if (player.collD == true) { }

        //move player
        else {
            player.speedY = speed;
        }
    }

    // update buttons
    button.update();
    button.pressed(box);
    if (button.push == false) { button.pressed(box2); }
    if (button.push == false) { button.pressed(box3); }

    button2.update();
    button2.pressed(box);
    if (button2.push == false) { button2.pressed(box2); }
    if (button2.push == false) { button2.pressed(box3); }

    button3.update();
    button3.pressed(box);
    if (button3.push == false) { button3.pressed(box2); }
    if (button3.push == false) { button3.pressed(box3); }
    // update box
    box.newPos();
    box.update();
    box2.newPos();
    box2.update();
    box3.newPos();
    box3.update();

    door.newPos();
    door.update();

    wall.update();
    wall2.update();
    wall3.update();
    wall4.update();
    wall5.update();
    wall6.update();
    wall7.update();
    wall8.update();
    wall9.update();
    wall10.update();

    // update players
    player.newPos();
    player.update();

    // check button pressed
    if (button.push == true && button2.push == true && button3.push == true) {
        // document.querySelector('canvas').style.backgroundColor = "green";
        setInterval(function () {
            if (door.y != 70 && button.push == true && button2.push == true) {
                door.y++
            }
        }, 500);
    } else if (button.push == false || button2.push == false) {
        // document.querySelector('canvas').style.backgroundColor = "white";
        setInterval(function () {
            if (door.y != 0 && button.push == false || door.y != 0 && button2.push == false) {
                door.y--
            }
        }, 500);
    }
    if (gameField.keys && gameField.keys["r"]) { gameField.reset(); }

    if (player.x + 5 > door.w) {
        win.update();
        ctx.font = "60px arial";
        ctx.textalign = "center"
        ctx.strokeText("You Win", 750 / 2, 500 / 2);
        ctx.strokeText("press R to restart", 750 / 2 - 110, 500 / 2 + 60);
        if (song.volume > 0.05) {
            song.volume -= 0.005;
        }

    }
}

