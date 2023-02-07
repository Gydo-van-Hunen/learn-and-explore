// canvas setup
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

const btnimg = document.getElementById('btn');

canvas.width = 1024;
canvas.height = 576;

canvas.addEventListener('mousedown', function (e) {
    getCursorPosition(canvas, e)
})



let points = 0;
let score = 1;
let cost = 10;
let cost2 = 24;
let cost3 = 2400;
let clicklv = 0;
let multiplier = 1;

class Sprite {
    constructor({ position, height, width, color, imageSrc }) {
        this.position = position;
        this.height = height;
        this.width = width;
        this.color = color;
        this.image = new Image();
        this.image.src = imageSrc
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        // ctx.drawImage(this.image, 0, 0);
    }
    update() {
        this.draw();
    }
}


object = new Sprite({
    position: {
        x: 432,
        y: 100,
    },
    height: 150,
    width: 150,
    color: "red"
})

buttonUpgrade = new Sprite({
    position: {
        x: 80,
        y: 450,
    },
    height: 70,
    width: 240,
    color: "blue",
    imageSrc: "./img/button.png"
})

buttonClickers = new Sprite({
    position: {
        x: 600,
        y: 450,
    },
    height: 70,
    width: 240,
    color: "blue",
    imageSrc: "./img/button.png"
})

buttonMultiplier = new Sprite({
    position: {
        x: 600,
        y: 50,
    },
    height: 70,
    width: 240,
    color: "blue",
    imageSrc: "./img/button.png"
})

function animate() {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    object.update();

    if (points < cost) { buttonUpgrade.color = "red"; }
    else { buttonUpgrade.color = "blue"; }
    if (points < cost2) { buttonClickers.color = "red"; }
    else { buttonClickers.color = "blue"; }
    if (points < cost3) { buttonMultiplier.color = "red"; }
    else { buttonMultiplier.color = "blue"; }

    buttonUpgrade.update();
    buttonClickers.update();
    buttonMultiplier.update();

    ctx.fillStyle = "white";
    ctx.font = "100px arial";
    ctx.textAlign = "center";
    ctx.fillText(points, 512, 400);

    ctx.font = "50px arial";
    ctx.fillText("lvl: " + score, 202, 565);
    ctx.fillText("lvl: " + clicklv, 722, 565);
    ctx.fillText("lvl: " + multiplier, 722, 45);
    ctx.fillText("autoclick", 722, 500);
    ctx.fillText("multiplier", 722, 100);

    ctx.fillText("upgrade", 202, 500);
    ctx.textAlign = "start";


    if (cost > 1000) { ctx.fillText(Math.floor(cost / 1000 * 100) / 100 + " k", 325, 500); }
    else { ctx.fillText(cost, 325, 500); }
    if (cost2 > 1000) { ctx.fillText(Math.floor(cost2 / 1000 * 100) / 100 + " k", 850, 500); }
    else { ctx.fillText(cost2, 850, 500); }
    if (cost3 > 1000) { ctx.fillText(Math.floor(cost3 / 1000 * 100) / 100 + " k", 850, 100); }
    else { ctx.fillText(cost3, 850, 100); }

}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    if (x >= object.position.x && x <= object.position.x + object.width && y >= object.position.y && y <= object.position.y + object.height) {
        points += score * multiplier;
    }
    if (x >= buttonUpgrade.position.x && x <= buttonUpgrade.position.x + buttonUpgrade.width && y >= buttonUpgrade.position.y && y <= buttonUpgrade.position.y + buttonUpgrade.height
        && points >= cost) {
        points -= cost;
        cost = Math.floor(cost * 1.4);
        score++;
    }
    if (x >= buttonClickers.position.x && x <= buttonClickers.position.x + buttonClickers.width && y >= buttonClickers.position.y && y <= buttonClickers.position.y + buttonClickers.height
        && points >= cost2) {
        points -= cost2;
        cost2 = Math.floor(cost2 * 1.4);
        clicklv++;
        setInterval(function () {
            points += score * multiplier;
        }, 1000);
    }
    if (x >= buttonMultiplier.position.x && x <= buttonMultiplier.position.x + buttonMultiplier.width && y >= buttonMultiplier.position.y && y <= buttonMultiplier.position.y + buttonMultiplier.height
        && points >= cost3) {
        points -= cost3;
        cost3 = Math.floor(cost3 * 1.4);
        multiplier++;
    }
}


animate();
console.log(buttonUpgrade.image.src);
