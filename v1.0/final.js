var myCanvas;
var chicken_r = 20;
var chicken1 = new Chicken(65,215);
var chicken2 = new Chicken(155,215);
var chicken3 = new Chicken(245,215);
var chicken4 = new Chicken(335,215);
var person = new Person(180,70);

window.onload = function(){
    myCanvas = document.getElementById("canvas").getContext('2d');
    showAll();
    start();
}

function showAll(){
    for(var j=40,k=50;j<=310;j=j+90,k=k+90){
	   showFoodArea(j, 165, k);
    }   
    for(j=65;j<=335;j=j+90){
        showChicken(j, 215, chicken_r);
    }
    showPerson(180,70,35,35);
    showFinalLine(10,380,400);
}

//chicken food area;
function showFoodArea(x, y, k){
	myCanvas.beginPath();
    myCanvas.moveTo(x,y);
    myCanvas.lineTo(x,y+20);
    myCanvas.closePath();
    myCanvas.stroke();
    myCanvas.beginPath();
    myCanvas.moveTo(x,y+20);
    myCanvas.lineTo(x+50,y+20);
    myCanvas.closePath();
    myCanvas.stroke();
    myCanvas.beginPath();
    myCanvas.moveTo(x+50,y);
    myCanvas.lineTo(x+50,y+20);
    myCanvas.closePath();
    myCanvas.stroke();
    showFood(k,165,30,15);
}

//show food
function showFood(x, y, w, h){
    myCanvas.fillStyle ="rgb(181,230,29)";  
    myCanvas.fillRect(x,y,w,h);
}

//show person;
function showPerson( x, y, w){
    myCanvas.fillStyle = "rgb(0,0,0)";
    myCanvas.fillRect(x, y, w, w);
}

//show chicken;
function showChicken(x,y,r){
    myCanvas.beginPath();
    myCanvas.fillStyle ="rgb(255,242,0)";
    myCanvas.arc(x,y,r,0,2 * Math.PI,false);
    myCanvas.closePath();
    myCanvas.fill();
}

//show final line;
function showFinalLine(x1,y,x2){
    myCanvas.beginPath();
    myCanvas.moveTo(x1, y);
    myCanvas.lineTo(x2, y);
    myCanvas.closePath();
    myCanvas.stroke();
}

//caculate time;
function caculateTime(){
    var time= document.getElementById("time");
    var caculateTime = setInterval(function(){
        time.innerText = parseInt(time.innerText)-1 +"s";
        if(!parseInt(time.innerText)){
            clearInterval(caculateTime);
        }
    },1000);
}

//Chicken constructor
function Chicken(x,y){
    var _this = this;
    var goSpeed = 10;
    var index = 1;
    var stop1,stop2;
    this.x = x;
    this.y = y;
    this.eatFood = function(){
        myCanvas.clearRect(this.x-15,164,30,20);
    }
    this.move = function(){
        myCanvas.clearRect(this.x - 25, 186, 52, 190);
        this.y += goSpeed * index ;
        showChicken(this.x,this.y,chicken_r);
        index+1;
        stop1 = setTimeout(function(){
            _this.move();
        },1000);
        if(this.y>=355){
            clearTimeout(stop1);
            clearTimeout(stop2);
            myCanvas.clearRect(0,0,400,400);
        }
    }
    this.back = function(){
        console.log(this.y);
        clearTimeout(stop1);
        myCanvas.clearRect(this.x - 25, 186, 52, 190);
        showChicken(this.x,this.y,chicken_r);
        this.y -= goSpeed * index ;
        index+1;
        stop2 = setTimeout(function(){
            _this.back();
        },1000);
        if(this.y==205){
            clearTimeout(stop2);
            setTimeout(function(){
                _this.eatFood();
                _this.move();
            },3000)
        }
    }
}

//Person constructor
function Person(x,y){
    var goSpeed = 20;
    this.x = x;
    this.y = y;
    this.moveLeft = function(){
        myCanvas.clearRect(0,0,400,165);
        this.x-=goSpeed;
        myCanvas.fillStyle = "rgb(0,0,0)";
        myCanvas.fillRect(this.x,this.y,35,35);
        if(this.x<10){
            this.x = 10;
        }
    };
    this.moveUp = function(){
        myCanvas.clearRect(0,0,400,165);
        this.y-=goSpeed;
        myCanvas.fillStyle = "rgb(0,0,0)";
        myCanvas.fillRect(this.x,this.y,35,35);
        if(this.y<10){
            this.y = 10;
        }
    };
    this.moveDown = function(){
        myCanvas.clearRect(0,0,400,165);
        this.y+=goSpeed;
        myCanvas.fillStyle = "rgb(0,0,0)";
        myCanvas.fillRect(this.x,this.y,35,35);
        if(this.y>110){
            this.y = 110;
        }
    };
    this.moveRight = function(){
        myCanvas.clearRect(0,0,400,165);
        this.x+=goSpeed;
        myCanvas.fillStyle = "rgb(0,0,0)";
        myCanvas.fillRect(this.x,this.y,35,35);
        if(this.x>350){
            this.x = 350;
        }
    };
    this.giveFood = function(){
        if((this.x <=50&&this.x>=40) && (this.y <=125&&this.y>=105)){
            showFood(50,165,30,15);
            chicken1.back();
        }
        if((this.x <=140&&this.x>=130) && (this.y <=125&&this.y>=105)){
            showFood(140,165,30,15);
            chicken2.back();
        }
        if((this.x <=230&&this.x>=220) && (this.y <=125&&this.y>=105)){
            showFood(230,165,30,15);
            chicken3.back();
        }
        if((this.x <=320&&this.x>=310) && (this.y <=125&&this.y>=105)){
            showFood(320,165,30,15);
            chicken4.back();
        }
    }
}


//game start
function start(){
    var btn = document.getElementById("start");
    EventUtil.addHandle(btn,"click",startGame);
    function startGame(){
        var index = 0;
        EventUtil.addHandle(window.document,"keyup",function(event){
            event = EventUtil.getEvent(event);
            switch (event.keyCode) {
            case 37:    //left
                person.moveLeft();
                index=0;
                break;
            case 38:    //up
                person.moveUp();
                index=0;
                break;
            case 39:    //right
                person.moveRight();
                index=0;
                break;
            case 40:    //down
                person.moveDown();
                index=0;
                break;
            case 90: 
                index++; 
                console.log(index);
                if(index>=2){
                    break;
                }else{
                    person.giveFood();
                    break; 
                }  
                
            default:
                return;
        }
    })
    
        caculateTime();
        setTimeout(function(){
            chicken1.eatFood();
            chicken1.move();
        },1000);
         setTimeout(function(){
            chicken2.eatFood();
            chicken2.move();
        },3500);
          setTimeout(function(){
            chicken3.eatFood();
            chicken3.move();
        },2000);
           setTimeout(function(){
            chicken4.eatFood();
            chicken4.move();
        },100);
        EventUtil.removeHandle(btn,"click",startGame);
    }
};

var timers = {
    timeId:0,
    timers:[],

    add:function(fn){
        this.timers.push(fn);
    },

    start:function(){
        if(this.timerId){
            return;
        }
        (function runNext(){
            if(timers.timers.length>0){
                for(var i=0;i<timers.timers.length;i++){
                    if(timers.timers[i]()===false){
                        timers.timers.splice()
                    }
                }
            }
        })();
    }
}
var EventUtil = {
    addHandle :function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type] = handler;
        }
    },
    removeHandle : function(element,type,handler){
        if(element.reomveEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            element.detachEvent("on"+type,handler);
        }else{
            element["on"+type] = null;
        }
    },
    getEvent:function(){
        return event ? event:window.event;
    }
}





