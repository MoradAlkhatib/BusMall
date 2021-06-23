'use strict';

const imageSection = document.getElementById('images');
const leftImg = document.getElementById('leftimg');
const midelImg = document.getElementById('centerimg');
const rightImg = document.getElementById('rightimg');
const viewResult = document.getElementById('viewResult');
const list = document.getElementById('list');
const formSubmit=document.getElementById('formSubmit');
let round = 25;
let counter = 0;
let compareArr=[];  
let leftIndex;
let midIndex;
let rightIndex;

let imgArr = ['bag.jpg', 'banana.jpg', 'bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg',
'chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg',
'shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];

function submitRound(event){
    event.preventDefault();
    round=document.getElementById('round').value;
    
}
formSubmit.addEventListener('submit',submitRound);
function Images(name, imgSrc ,views,clicked) {
    this.name = name;
    this.imgSrc = imgSrc;
    this.views = views;
    this.clicked = clicked;
    Images.all.push(this);
}
Images.all = [];

function renderImage(){
     
    do{
        leftIndex=getRandomNumber(0,imgArr.length-1);
        midIndex=getRandomNumber(0,imgArr.length-1);
        rightIndex=getRandomNumber(0,imgArr.length-1);
        

    }while(leftIndex === midIndex || leftIndex === rightIndex || midIndex === rightIndex ||
    compareArr.includes(leftIndex)||compareArr.includes(midIndex)||compareArr.includes(rightIndex));
    
    
    compareArr=[];
    compareArr.push(leftIndex,midIndex,rightIndex);

    
    leftImg.src=Images.all[leftIndex].imgSrc;
    midelImg.src=Images.all[midIndex].imgSrc;
    rightImg.src=Images.all[rightIndex].imgSrc;
    Images.all[leftIndex].views++;
    Images.all[midIndex].views++;
    Images.all[rightIndex].views++;
      
      
    
   
}
function clickFunction(event){
    if((event.target.id === 'leftimg' || event.target.id === 'centerimg' || event.target.id === 'rightimg') && counter < round)
     {
        if(event.target.id === 'leftimg'){Images.all[leftIndex].clicked++}
        if(event.target.id === 'centerimg'){Images.all[midIndex].clicked++}
        if(event.target.id === 'rightimg'){Images.all[rightIndex].clicked++}
        renderImage();
        counter++;
        localStorage.setItem('order',JSON.stringify(Images.all));
    }
    if(counter==round){drawChart();}
}

imageSection.addEventListener('click',clickFunction);
function dataView() {
    document.getElementById('list').innerHTML='';
    for (let i = 0; i < imgArr.length; i++) {
      let item = document.createElement('li');
      list.appendChild(item);
      item.textContent = `${Images.all[i].name} had ${Images.all[i].clicked} votes, and was seen ${Images.all[i].views} times.`;
      imageSection.removeEventListener('click',clickFunction);
    }
    imageSection.addEventListener('click', clickFunction);

  }

viewResult.addEventListener('click',dataView);
function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min); 
}

function drawChart(){
   let arrName=[];
   let arrViews=[];
   let arrVotes=[];
  for(let i =0;i<imgArr.length;i++)
  {
    arrName.push(Images.all[i].name.split('.')[0]);
    arrViews.push(Images.all[i].views);
    arrVotes.push(Images.all[i].clicked);
  }

  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: arrName,
          datasets: [{
              label: '# of View',
              data: arrViews,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  
              ],
              borderWidth: 1
          },{
            label: '# of Votes',
            data: arrViews,
            backgroundColor: [                
                'rgba(54, 162, 235, 0.2)'                
            ],
            borderColor: [               
                'rgba(54, 162, 235, 1)'                
            ],
            borderWidth: 1
        }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  
  
}
function getData(){
    let data = JSON.parse(localStorage.getItem('order'));
  
    if(data){
       for(let i=0;i<data.length;i++)  { 
       new Images(data[i].name,data[i].imgSrc,data[i].views,data[i].clicked)
    } 
   
    }else {
        for (var i = 0; i < imgArr.length; i++) {
            let imageName = imgArr[i].split('.')[0];
            new Images(imageName, `./images/${imgArr[i]}`,0,0)
        } 
    }
    renderImage();}
  
     getData();