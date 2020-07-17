var HEIGHT;
var WIDTH;
var pipeWidth;
var space;
var firstPipeHeight;
var secondPipeHeight;
var MIN_PIPE_HEIGHT;
var pipes;
var frameCount;
var birds;
var canvas = document.getElementById("canvas");
MIN_PIPE_HEIGHT = 40;
HEIGHT = 500;
WIDTH = 800;
pipeWidth = 60;
space = 120;
frameCount = 0;
var Bird = /** @class */ (function () {
    function Bird(ctx) {
        this.ctx = ctx;
        this.x = 150;
        this.y = 150;
        this.gravity = 0;
        this.velocity = 0.1;
    }
    Bird.prototype.draw = function () {
        this.ctx.fillStyle = "red";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
        this.ctx.fill();
    };
    Bird.prototype.update = function () {
        this.gravity += this.velocity;
        this.gravity = Math.min(4, this.gravity);
        this.y += this.gravity;
        if (this.velocity == -4) {
            this.velocity = 0.1;
        }
    };
    Bird.prototype.jump = function () {
        this.velocity = -4;
    };
    return Bird;
}());
var Pipe = /** @class */ (function () {
    function Pipe(ctx, height, space) {
        this.ctx = ctx;
        this.isDead = false;
        this.width = pipeWidth;
        this.x = WIDTH;
        this.y = height ? HEIGHT - height : 0;
        this.height = height || MIN_PIPE_HEIGHT + Math.random() * (HEIGHT - space - MIN_PIPE_HEIGHT * 2);
    }
    Pipe.prototype.draw = function () {
        // firstPipeHeight=MIN_PIPE_HEIGHT +  Math.random()*(HEIGHT-space-MIN_PIPE_HEIGHT*2)
        // secondPipeHeight=HEIGHT - firstPipeHeight -space;
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        // this.ctx.fillRect(WIDTH, firstPipeHeight + space, pipeWidth, secondPipeHeight);
    };
    Pipe.prototype.update = function () {
        this.x -= 1;
        if ((this.x + pipeWidth) < 0) {
            this.isDead = true;
        }
    };
    return Pipe;
}());
function generatePipe() {
    var ctx = canvas.getContext("2d");
    var firstPipe = new Pipe(ctx, null, space);
    secondPipeHeight = HEIGHT - firstPipe.height - space;
    var secondPipe = new Pipe(ctx, secondPipeHeight, 120);
    return [firstPipe, secondPipe];
}
// space=120;
document.addEventListener('click', function () {
    birds[0].jump();
});
// var ctx = canvas.getContext("2d");
// var firstPipe = new Pipe(ctx,null,space);
// secondPipeHeight=HEIGHT - firstPipe.height - space;
// var secondPipe=new Pipe(ctx,secondPipeHeight,80);
this.pipes = generatePipe();
var ctx = canvas.getContext("2d");
birds = [new Bird(ctx)];
function isGameOver() {
    var _this = this;
    this.birds.forEach(function (bird) {
        _this.pipes.forEach(function (pipe) {
            if (bird.y < 0 || bird.y > HEIGHT || (bird.x > pipe.x && bird.x < pipe.x + pipe.width && bird.y > pipe.y && bird.y < pipe.y + pipe.height)) {
                window.alert('Oyun Bitti! Skorunuz :' + document.getElementById("scor").innerText);
                // console.log("Game Over");
                clearInterval(loop);
            }
        });
    });
}
;
var loop = setInterval(function () {
    gameLoop();
}, 1000 / 120);
function gameLoop() {
    update();
    draw();
}
function update() {
    var _a;
    frameCount += 1;
    if (frameCount % 320 == 0) {
        var pipes = generatePipe();
        (_a = this.pipes).push.apply(_a, pipes);
    }
    this.pipes.forEach(function (pipe) { return pipe.update(); });
    this.birds.forEach(function (bird) { return bird.update(); });
    document.getElementById("scor").innerHTML = frameCount;
    isGameOver();
}
function draw() {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    this.pipes.forEach(function (pipe) { return pipe.draw(); });
    this.pipes = pipes.filter(function (pipe) { return !pipe.isDead; }); //Ölü pipes oyundan çıkar    
    this.birds.forEach(function (bird) { return bird.draw(); });
}
