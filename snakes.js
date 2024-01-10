function init(){
    //console.log("Init");
    canvas=document.getElementById('mycanvas');
    pen= canvas.getContext('2d');
    W=canvas.width;
    H=canvas.height;
    game_over=false;
    food =getrandomfood();
    score=0;
   snake={
       init_length:5,
       color:"red",
       cells:[],
       direction:"right",
       createSnake:function(){
           for(var i=this.init_length-1;i>=0;i--){
               this.cells.push({x:i,y:0});
           }
       },
       drawSnake:function(){
           for (var i=0;i<this.cells.length;i++){
               pen.fillStyle=this.color;
               pen.strokeStyle="black";
               pen.lineWidth=3;
               pen.strokeRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
               
               pen.fillRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
           }
           
       },
    
       updateSnake:function(){
       var headx=this.cells[0].x;
       var heady=this.cells[0].y;
          // this.cells.pop();
           
           if(headx==food.x && heady==food.y){
               food=getrandomfood();
           score++;}
               else{
                   //pop if not eaten
                   this.cells.pop()
               }
           
           
           
           
       if(this.direction=='right')
           {
             nextx=headx+1;
               nexty=heady;
           }
         else if(this.direction=='left')
           {
             nextx=headx-1;
               nexty=heady;
           }
         else    if(this.direction=='down')
           {
             nextx=headx;
               nexty=heady+1;
        
           }
            else
           {
             nextx=headx;
               nexty=heady-1;
           }
           //insert new cell
          this.cells.unshift({x:nextx,y:nexty}) ;
           var lastx=Math.round(W/10);
           var lasty=Math.round(H/10);
           if(this.cells[0].y<0||this.cells[0].x<0||this.cells[0].x>lastx||this.cells[0].y>lasty){
               alert("Game Over");
               game_over=true;
           }
   }
   };
    snake.createSnake();
    // add eventlistener
    function keypressed(e){
        console.log("you pressed a key");
        console.log(e);
        if(e.key=='ArrowRight'){
            snake.direction='right';
            
        }
        else if(e.key=='ArrowLeft'){
            snake.direction='left';
        }
        else if(e.key=='ArrowDown'){
            snake.direction='down';
        }
        else {
            snake.direction='up';
        }
    }
    document.addEventListener('keydown',keypressed);
}
function draw(){
    pen.clearRect(0,0,W,H);
snake.drawSnake();
     
   pen.fillStyle=food.color;
    
    pen.fillRect(food.x*10,food.y*10,10,10);
    pen.fillStyle="white";
    pen.font="14px Roboto";

    pen.fillText("Score: "+score,10,10);
}



function update(){
    snake.updateSnake();
    

    
}

function gameloop(){
    draw();
    update();
    if(game_over==true){
        clearInterval(f)
    }
    
}

function getrandomfood(){
    var foodx=Math.round(Math.random()*(W-10)/10);
    var foody=Math.round(Math.random()*(H-10)/10);
    foodColor=["blue","green","aqua","yellow","purple","corol", "orchid"];
    var i=Math.round(Math.random()*foodColor.length);
    var food={
        x:foodx,
        y:foody,
        color:foodColor[i]
    }
    return food;
}


init();

var f=setInterval(gameloop,100);


