'use strict';

const imageSection = document.getElementById('images');
const leftImg = document.getElementById('leftimg');
const midelImg = document.getElementById('centerimg');
const rightImg = document.getElementById('rightimg');
const viewResult = document.getElementById('viewResult');
const list = document.getElementById('list');
let round = 25;
let counter = 0;  
let leftIndex;
let midIndex;
let rightIndex;


let imgArr = ['bag.jpg', 'banana.jpg', 'bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg',
'chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg',
'shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];

function Images(name, imgSrc) {
    this.name = name;
    this.imgSrc = `./images/${imgSrc}`;
    this.view = 0;
    this.click = 0;
    Images.all.push(this);

}
Images.all = [];
for (var i = 0; i < imgArr.length; i++) {
    let imageName = imgArr[i].split('.')[0];
    new Images(imageName, imgArr[i])
}


function renderImage(){
     leftIndex=getRandomNumber(0,imgArr.length-1);
    

    do{
        midIndex=getRandomNumber(0,imgArr.length-1);
        rightIndex=getRandomNumber(0,imgArr.length-1);

    }while(leftIndex === midIndex || leftIndex === rightIndex || midIndex === rightIndex );

   leftImg.src=Images.all[leftIndex].imgSrc;
   midelImg.src=Images.all[midIndex].imgSrc;
   rightImg.src=Images.all[rightIndex].imgSrc;
   Images.all[leftIndex].view++;
   Images.all[midIndex].view++;
   Images.all[rightIndex].view++;

}

 renderImage();
function clickFunction(event){
    if((event.target.id === 'leftimg' || event.target.id === 'centerimg' || event.target.id === 'rightimg' )
      &counter<round){
        if(event.target.id === 'leftimg'){Images.all[leftIndex].click++}
        if(event.target.id === 'centerimg'){Images.all[midIndex].click++}
        if(event.target.id === 'rightimg'){Images.all[rightIndex].click++}
        
        renderImage();
        counter++;

    }
       
}

imageSection.addEventListener('click',clickFunction);


viewResult.addEventListener('click', function dataView() {
    document.getElementById('list').innerHTML='';
    for (let i = 0; i < imgArr.length; i++) {
      let item = document.createElement('li');
      list.appendChild(item);
      item.textContent = `${Images.all[i].name.split('.')[0]} had ${Images.all[i].click} votes, and was seen ${Images.all[i].view} times.`;
      imageSection.removeEventListener('click',clickFunction);
    }
    imageSection.addEventListener('click', clickFunction);
  });

function getRandomNumber(min, max){
    
    return Math.floor(Math.random() * (max - min + 1) + min); 
      

}





