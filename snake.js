const grid=document.querySelector('.Area');
let speed=3;
let dir=1;
var wrongFood=0;
var time=30;
var life=0;
var speed_timer=60;
var seq_arr=[];
let last={'x':0,'y':0};
localStorage.setItem('score',0);
var sequence=document.querySelectorAll('.color');
document.querySelector('#score').innerHTML=`SCORE : 0`;
document.querySelector('#timer').innerHTML=`Timer : 40`;

console.log(life);

const colour=['red','black','blue','green'];
var gamestatus=0;

document.addEventListener("keyup",event=>{
    if(event.key=='Enter'){
        gamestatus=1;
        document.querySelector('h1').style.display="none";
    }
})

if(!localStorage.getItem('hs')){
    localStorage.setItem('hs',0);
}
var hs=localStorage.getItem('hs')
document.querySelector('#Hiscore').innerHTML=`Highscore : ${hs}`;

setInterval(() => {
    if(gamestatus==1){
        time--;
        speed+=0.1;
    }
    document.querySelector('#timer').innerHTML=`Timer : ${time}`;
},1000);

for(let i=0;i<20;i++){
    for(let j=0;j<20;j++){
        const cell=document.createElement('div');
        cell.dataset.x=j;
        cell.dataset.y=i;
        cell.classList.add('cell');
        grid.appendChild(cell);

    }
}    
//varibles
let head={'x':0,'y':0};
let segment=[head];

let lastframetime=0;

// fps
function fps(ctime){
    let seg=segment.slice(1,segment.length);
    seg.forEach(s=>{
        if(segment[0].x==s.x && segment[0].y==s.y){
            life++;
        let li=document.querySelector(`.life${life}`);
        li.style.display='none';
        alert(`You ate yourself and lost a life !, Only ${3-life} lives`)
    if(life==3){
       if(!alert(`OhhOhh You ATE YOURself!! GAME OVER !! \nYOUR SCORE IS ${localStorage.getItem('score')}`)){
        window.location.reload();
        return;
    }}
    
    let p=document.querySelectorAll('.snake');
    p.forEach(s=>{
        s.classList.remove('snake')
    })
    dir=1;

    segment=[{'x':1,'y':0},{'x':0,'y':0},{'x':0,'y':0}]
            }
        })
    
    if((segment[0].x<0 || segment[0].x>19)||(segment[0].y<0 || segment[0].y>19)){
        life++;
        let li=document.querySelector(`.life${life}`);
        li.style.display='none';
        alert(`You hit the wall and lost a life !, Only ${3-life} lives`)
    if(life==3){
       if(!alert(`OhhOhh You HIT the WALL !!GAME OVER !! \nYOUR SCORE IS ${localStorage.getItem('score')}`)){
        window.location.reload();
        return;
    }}
    
    let p=document.querySelectorAll('.snake');
    p.forEach(s=>{
        s.classList.remove('snake')
    })
    dir=1;
    

    segment=[{'x':1,'y':0},{'x':0,'y':0},{'x':0,'y':0}]
    }
    
if(wrongFood==1){
    wrongFood=0;
    life++;
        let li=document.querySelector(`.life${life}`);
        li.style.display='none';
        alert(`You ate picked the wrong and lost a life !, Only ${3-life} lives`)
    if(life==3){
       if(!alert(`OhhOhh You PICKED the wrong food !! \nYOUR SCORE IS ${localStorage.getItem('score')}`)){
        window.location.reload();
        return;
    }}
    
    let p=document.querySelectorAll('.snake');
    p.forEach(s=>{
        s.classList.remove('snake')
    })
    dir=1;
    segment=[{'x':1,'y':0},{'x':0,'y':0},{'x':0,'y':0}]
}
if(time==0){
    document.querySelector('#timer').innerHTML=`Timer : 0`;
    if(!alert(`SORRY You have RUN OUT of TIME!! GAME OVER !! \nYOUR SCORE IS ${localStorage.getItem('score')}`)){
     window.location.reload();
 }
 return;
}
    

    window.requestAnimationFrame(fps);
    
    if ((ctime-lastframetime)/1000 > 1/speed){
        lastframetime=ctime;
        if(gamestatus==1)
            main_logic();
    }
}






var arr=[];

function main_logic(){
    

    if(arr.length==0){
        time=time+10;
        generateFood();
        var foods=document.querySelectorAll('.food');
        for(let i=foods.length;i--;arr.unshift(foods[i]));
        let k=Math.floor(Math.random()*4);
        for(let j=0;j<4;j++){
            sequence[j].style.backgroundColor=colour[(j+k)%4];
            sequence[j].style.margin=0;
            sequence[j].style.borderColor='black'
        }
        for(let i=sequence.length;i--;seq_arr.unshift(sequence[i]));
        
        //Incrementing body of snake
        last.x=segment[segment.length-1].x;
        last.y=segment[segment.length-1].y;
       segment.push(last)
       
        let add=grid.querySelector(`[data-x="${segment[segment.length-1].x}"][data-y="${segment[segment.length-1].y}"]`);
       segment.push(add);

       
       
    
       
    }
    
    else{
        
    let it=grid.querySelector(`[data-x="${segment[segment.length-1].x}"][data-y="${segment[segment.length-1].y}"]`);
    last=it;
    it.classList.remove('snake');
    
}
    

    for(let i=segment.length-1;i>0;i--){
        segment[i].x=segment[i-1].x;
        segment[i].y=segment[i-1].y;}
    
    switch(dir){
        case 1:
            segment[0].x++;
            break;
        case -1:
            segment[0].x--;
            break;
        case 2:
            segment[0].y--;
            break;
        case -2:
            segment[0].y++;
            break;
    }
    
    segment.forEach(s=>{
        let item=grid.querySelector(`[data-x="${s.x}"][data-y="${s.y}"]`);
        item.classList.add('snake');
    }
    )
    checkScore(); 

}


fps()


updatingPosition();

function updatingPosition(){
    document.addEventListener("keydown", function(event) {
        if (event.key == "ArrowLeft" && dir!=1){
           dir=-1;
        } else if (event.key == "ArrowUp" && dir!=-2){
           dir=2;
        } else if (event.key == "ArrowRight" && dir!=-1){
           dir=1;
        } else if (event.key == "ArrowDown" && dir!=2){
           dir=-2;
        }
})
}


// For Food
function generateFood(){

for(let i = 0; i < 4; i++){
    let x1 = Math.floor(Math.random() * 20);
    let y1 = Math.floor(2+Math.random() * 17);
    let food = grid.querySelector(`[data-x="${x1}"][data-y="${y1}"]`);
    food.style.backgroundColor = colour[i];
    food.classList.add('food');     
}
}

//Score Update
function checkScore(){

arr.forEach(s=>{
    if(s.dataset.x==segment[0].x && s.dataset.y==segment[0].y){
        if(seq_arr[0].style.backgroundColor==s.style.backgroundColor){
            s.classList.remove('food');
            s.removeAttribute('style');
            let index=arr.indexOf(s);
            seq_arr[0].style.margin='1vmin';
            seq_arr[0].style.borderColor='white';
            seq_arr.splice(0,1);
            if(index>-1){
                arr.splice(index,1);
            }
            let sc=localStorage.getItem('score');
            sc++;
            document.querySelector('#score').innerHTML=`SCORE : ${sc}`;
            localStorage.setItem('score',sc); 
            
            if(sc>hs){
                localStorage.setItem('hs',sc);
                document.querySelector('#Hiscore').innerHTML=`Highscore : ${sc}`
            }else{
                localStorage.setItem('hs',hs);
            }
    
    }
    else{
        wrongFood=1;
    }

}
})
}
window.addEventListener('keydown',function(event){
    let key=event.key;
    if(key=='Escape'){
        if(gamestatus==1){
            gamestatus=0
        }else{
            gamestatus=1;
        }
    }

}
)
//On-screen keyboard
document.querySelector('.up').onclick = function(){
    if(dir!=2 && dir!=-2){
        dir=2;
    }
}
document.querySelector('.right').onclick = function(){
    if(dir!=1 && dir!=-1){
        dir=1;
    }
}
document.querySelector('.down').onclick = function(){
    if(dir!=-2 && dir!=2){
        dir=-2;
    }
}
document.querySelector('.left').onclick = function(){
    if(dir!=-1 && dir!=1){
        dir=-1;
    }
}

// Spped increament







