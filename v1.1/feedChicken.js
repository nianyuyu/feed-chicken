var myCanvas;
var people_speed = 10;
var chicken_speed = 10;
var person = new Person(people_speed,180,70);
var num =5;
var chicken1,chicken2,chicken3,chicken4,chicken5,chicken6;
var eventArray =[];
var position = {};
window.onload = function(){
    myCanvas = document.getElementById("canvas").getContext('2d');
    showAll();
    start();
}

//chicken food area;
function showFoodArea(cao_left,y,food_left,cao_w,food_w){
    myCanvas.beginPath();
    myCanvas.moveTo(cao_left,y);
    myCanvas.lineTo(cao_left,y+20);
    myCanvas.closePath();
    myCanvas.stroke();
    myCanvas.beginPath();
    myCanvas.moveTo(cao_left,y+20);
    myCanvas.lineTo(cao_left+cao_w,y+20);
    myCanvas.closePath();
    myCanvas.stroke();
    myCanvas.beginPath();
    myCanvas.moveTo(cao_left+cao_w,y);
    myCanvas.lineTo(cao_left+cao_w,y+20);
    myCanvas.closePath();
    myCanvas.stroke();
    showFood(food_left,165,food_w,15);
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
        eventArray.push(caculateTime);
        time.innerText = parseInt(time.innerText)-1 +"s";
        if(!parseInt(time.innerText)){
            clearInterval(caculateTime);
            alert("win");
            window.location.reload()
        }
    },1000);
}

function showAll(){
    var index=num;
    var cao_left = 400/index/4/2,
        cao_w = 400/index/4*3,
        food_w = cao_w/4*3,
        food_left = cao_left+cao_w/4*0.5,
        cao_in = 400/index/4,
        chicken_left = 400/index/4/2+cao_w/2,
        chicken_r = food_w/3;
    for(var i=0;i<index;cao_left=400/index/8+(400/index)*(i+1),
                        food_left=cao_left+cao_w/4*0.5,
                        chicken_left=chicken_left+400/index,
                        i++){
        position[i]={
            chicken_index:"chicken"+(i+1),
            cao_left:cao_left,
            food_left:food_left,
            chicken_left:chicken_left,
            food_w:food_w,
            cao_w:cao_w,
            chicken_r:chicken_r
        };
        showFoodArea(cao_left, 165, food_left,cao_w,food_w);
        showChicken(chicken_left, 215, chicken_r);
    }
    showPerson(180,70,35,35);
    showFinalLine(10,380,400);
    
    for(var i in position){
        window["chicken"+(parseInt(i)+1)] = new Chicken(chicken_speed,position[i].chicken_left,215,position[i]);  
    } 
   
}


//Chicken constructor
function Chicken(chicken_speed,x,y,otherObj){
    var _this = this;
    var index = 1;
    var stop1,stop2,stop3;
    this.chicken_speed = chicken_speed;
    this.x = x;
    this.y = y;
    this.otherObj = otherObj;
    var food_w = this.otherObj.food_w;
    var food_left = this.otherObj.food_left;
    var chicken_r = this.otherObj.chicken_r;
    var cao_left = this.otherObj.cao_left;
    var cao_w = this.otherObj.cao_w;
    this.eatFood = function(){
        myCanvas.clearRect(food_left-1,164,food_w+2,20);
    }
    this.move = function(){
        myCanvas.clearRect(cao_left-1, 186, food_w+2, 190);
        this.y += this.chicken_speed * index ;
        showChicken(this.x,this.y,chicken_r);
        index+1;
        stop1 = setTimeout(function(){
            _this.move();
            eventArray.push(stop1);
            console.log("stop1:"+stop1);
        },1000);
        if(this.y>=355){
            clearTimeout(stop1);
            alert("lose");
            window.location.reload();
            EventUtil.removeHandle(document,"keyup",personControl);
            clearInterval("1");
            myCanvas.clearRect(0,0,400,400);
        }
    }
    this.back = function(){  
        clearInterval(stop1);
        myCanvas.clearRect(cao_left, 186, food_w, 190);
        showChicken(this.x,this.y,chicken_r);
        this.y -= this.chicken_speed * index ;
        index+1;
        stop2 = setTimeout(function(){
            _this.back();
            eventArray.push(stop2);
            console.log("stop2:"+stop2);
        },1000);
        if(this.y==205){
            clearTimeout(stop2);
            stop3 = setTimeout(function(){
                _this.eatFood();
                _this.move();
                eventArray.push(stop3);
            },3000)
        }
    }
}

//Person constructor
function Person(perple_speed,x,y){
    this.people_speed = people_speed;
    this.x = x;
    this.y = y;
    this.moveLeft = function(){
        myCanvas.clearRect(0,0,400,165);
        this.x-=this.people_speed;
        myCanvas.fillStyle = "rgb(0,0,0)";
        myCanvas.fillRect(this.x,this.y,35,35);
        if(this.x<10){
            this.x = 10;
        }
    };
    this.moveUp = function(){
        myCanvas.clearRect(0,0,400,165);
        this.y-=this.people_speed;
        myCanvas.fillStyle = "rgb(0,0,0)";
        myCanvas.fillRect(this.x,this.y,35,35);
        if(this.y<10){
            this.y = 10;
        }
    };
    this.moveDown = function(){
        myCanvas.clearRect(0,0,400,165);
        this.y+=this.people_speed;
        myCanvas.fillStyle = "rgb(0,0,0)";
        myCanvas.fillRect(this.x,this.y,35,35);
        if(this.y>110){
            this.y = 110;
        }
    };
    this.moveRight = function(){
        myCanvas.clearRect(0,0,400,165);
        this.x+=this.people_speed;
        myCanvas.fillStyle = "rgb(0,0,0)";
        myCanvas.fillRect(this.x,this.y,35,35);
        if(this.x>350){
            this.x = 350;
        }
    };
    this.giveFood = function(){
        for(var i in position){
            var k = position[i];
            if((this.x<=k.cao_left+k.cao_w)&&(this.x>=k.cao_left)){
                showFood(k.food_left,165,k.food_w,15);
                var chicken_name = k.chicken_index;
                window[chicken_name].back();
            }
        }
    }
}

//event
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
        if(element.removeEventListener){
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

//game start
function start(){
    var btn = document.getElementById("start");
    EventUtil.addHandle(btn,"click",startGame);

    function startGame(){
        var index = 0;
        EventUtil.addHandle(document,"keyup",personControl);
        caculateTime();
        for(var i in position){
            var randomTime = Math.floor(Math.random()*(6000-400))+400;
            var k = position[i];
            (function(k,index){
                setTimeout(function(){
                   window[k.chicken_index].eatFood()
                   window[k.chicken_index].move()
                },randomTime);
            })(k,i)
        }
        EventUtil.removeHandle(btn,"click",startGame);
    }
};

function personControl(event){
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
}








