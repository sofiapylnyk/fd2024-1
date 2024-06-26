let myGamePiece;
let myObstacles = [];
let myScore;
let myStars = [];

function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
    document.addEventListener('keydown', function (e) {
        e.preventDefault();
        myGameArea.keys = (myGameArea.keys || []);
        myGameArea.keys[e.keyCode] = true;
    });
    document.addEventListener('keyup', function (e) {
        myGameArea.keys[e.keyCode] = false; 
    });
}

let myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        this.keys = [];
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
        updateScoreboard();
    },
    restart : function() {
        myObstacles = [];
        myStars = [];
        myGamePiece = new component(30, 30, "red", 10, 120);
        this.frameNo = 0;
        this.start();
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else if (this.type == "star") {
            ctx.fillStyle = color;
            drawStar(ctx, this.x, this.y, 5, this.width / 2, this.width / 4);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
    this.crashWith = function(otherobj) {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        let otherleft = otherobj.x;
        let otherright = otherobj.x + (otherobj.width);
        let othertop = otherobj.y;
        let otherbottom = otherobj.y + (otherobj.height);
        let crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.strokeStyle = "#000";
    ctx.stroke();
    ctx.fillStyle = "#ff0";
    ctx.fill();
}

function updateGameArea() {
    let x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (let i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            let finalScore = myGameArea.frameNo;
            console.log("Game Over. Final Score: " + finalScore);
            saveScore(finalScore);
            return;
        } 
    }
    for (let i = 0; i < myStars.length; i += 1) {
        if (myGamePiece.crashWith(myStars[i])) {
            myStars.splice(i, 1);
            myGameArea.frameNo += 10; // Add 10 points for collecting a star
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        let starX, starY, starCrash;
        do {
            starX = x;
            starY = Math.floor(Math.random() * (myGameArea.canvas.height - 30));
            starCrash = false;
            for (let i = 0; i < myObstacles.length; i++) {
                if (starX < myObstacles[i].x + myObstacles[i].width && starX + 20 > myObstacles[i].x &&
                    starY < myObstacles[i].y + myObstacles[i].height && starY + 20 > myObstacles[i].y) {
                    starCrash = true;
                    break;
                }
            }
        } while (starCrash);
        myStars.push(new component(20, 20, "yellow", starX, starY, "star"));
        myObstacles.push(new component(10, height, "green", x, 0));
        myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
    }
    for (let i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].speedX = -1;
        myObstacles[i].newPos();
        myObstacles[i].update();
    }
    for (let i = 0; i < myStars.length; i += 1) {
        myStars[i].speedX = -1;
        myStars[i].newPos();
        myStars[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -1; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 1; }
    if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -1; }
    if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 1; }
    myGamePiece.newPos();    
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function restartGame() {
    myGameArea.restart();
}

function saveScore(score) {
    let scores = localStorage.getItem('scores') ? JSON.parse(localStorage.getItem('scores')) : [];
    scores.push(score);
    localStorage.setItem('scores', JSON.stringify(scores));
    updateScoreboard();
}

function updateScoreboard() {
    let scores = localStorage.getItem('scores') ? JSON.parse(localStorage.getItem('scores')) : [];
    scores.sort((a, b) => b - a); // Sort scores in descending order
    let scoreboard = document.getElementById('scoreboard');
    scoreboard.innerHTML = '<h2>Scoreboard</h2>';
    for (let i = 0; i < scores.length; i++) {
        scoreboard.innerHTML += '<p>' + (i + 1) + '. ' + scores[i] + '</p>';
    }
}