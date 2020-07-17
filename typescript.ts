var HEIGHT : number;
var WIDTH: number;
var pipeWidth:number;
var space:number;
var firstPipeHeight:number;
var secondPipeHeight:number;
var MIN_PIPE_HEIGHT:number;
var pipes:any;
var frameCount:number;
var birds:any;
var canvas = document.getElementById("canvas");

MIN_PIPE_HEIGHT=40;
HEIGHT=500;
WIDTH=800;
pipeWidth=60;
space=120;
frameCount=0;

class Bird{
    ctx:any;
    x:number;
    y:number;
    gravity:number;
    velocity:number;
    constructor(ctx){
        this.ctx=ctx;
        this.x=150;
        this.y=150;
        this.gravity=0;
        this.velocity=0.1;
    }
    draw(){
        this.ctx.fillStyle = "red";
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y, 10, 0, 2 * Math.PI);
        this.ctx.fill(); 
    }
    update(){
        this.gravity += this.velocity;
        this.gravity= Math.min(4,this.gravity);
        this.y += this.gravity;
        if(this.velocity == -4){
            this.velocity = 0.1;
        }
    }
    jump(){
        this.velocity = -4;
    }
}


class Pipe{
    ctx:Element;
    x:number;
    y:number;
    width:number;
    height:number;
    isDead:boolean;
    constructor(ctx,height,space){
        this.ctx=ctx; 
        this.isDead=false;
        this.width=pipeWidth;
        this.x=WIDTH;
        this.y=height ? HEIGHT - height : 0 ;
        this.height= height || MIN_PIPE_HEIGHT +  Math.random()*(HEIGHT-space-MIN_PIPE_HEIGHT*2);

    }
    draw(){
        // firstPipeHeight=MIN_PIPE_HEIGHT +  Math.random()*(HEIGHT-space-MIN_PIPE_HEIGHT*2)
        // secondPipeHeight=HEIGHT - firstPipeHeight -space;
        
        
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(this.x, this.y, this.width,this.height);
        // this.ctx.fillRect(WIDTH, firstPipeHeight + space, pipeWidth, secondPipeHeight);
    }
    update(){
        this.x -= 1;
        if((this.x+pipeWidth) < 0 ){
            this.isDead=true;
        }
    }
}
function generatePipe(){
    var ctx = canvas.getContext("2d");
    var firstPipe = new Pipe(ctx,null,space);
    secondPipeHeight=HEIGHT - firstPipe.height - space;
    var secondPipe=new Pipe(ctx,secondPipeHeight,120);
    return [firstPipe ,secondPipe]
}

// space=120;
document.addEventListener('click',function(){
    birds[0].jump();
});
// var ctx = canvas.getContext("2d");
// var firstPipe = new Pipe(ctx,null,space);
// secondPipeHeight=HEIGHT - firstPipe.height - space;
// var secondPipe=new Pipe(ctx,secondPipeHeight,80);
this.pipes=generatePipe();
var ctx = canvas.getContext("2d");
birds = [new Bird(ctx)];

function isGameOver(){
    this.birds.forEach(bird=> {
        this.pipes.forEach(pipe =>{

            if (bird.y<0 || bird.y > HEIGHT || (bird.x > pipe.x && bird.x < pipe.x + pipe.width && bird.y > pipe.y && bird.y < pipe.y + pipe.height)){
                window.alert('Oyun Bitti! Skorunuz :' + document.getElementById("scor").innerText );
                // console.log("Game Over");
                clearInterval(loop);
            }
            
        })
    })
};

var loop : any =setInterval(function(){
    gameLoop()}
    ,1000/120);

function gameLoop(){
    update()
    draw()
}
function update(){
    frameCount += 1;
    if(frameCount % 320 == 0){
        var pipes = generatePipe();
        this.pipes.push(...pipes);

    }
    this.pipes.forEach(pipe=>pipe.update());
    this.birds.forEach(bird=>bird.update());

    document.getElementById("scor").innerHTML = frameCount;
    isGameOver();
}

function draw(){
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    this.pipes.forEach(pipe=>pipe.draw())
    this.pipes=pipes.filter(pipe=>!pipe.isDead);//Ölü pipes oyundan çıkar    
    this.birds.forEach(bird=>bird.draw());
}