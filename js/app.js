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
let a;
let c=[];

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
   for(var i=0;i<imgArr;i++)
    console.log(Images.all[i].click) ;
    // console.log(a);
    // for(let j=0;j<3;j++){
    //   if(c[i]!==leftIndex &&c[i]!==midIndex &&c[i]!==rightIndex ){}
    // }

   c.push(leftIndex);
   c.push(midIndex);
   c.push(rightIndex);
   
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
    else{drawChart();}
       
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


function drawChart(){
   let arrName=[];
   let arrViews=[];
   let arrVotes=[];
  for(let i =0;i<imgArr.length;i++)
  {
    arrName.push(Images.all[i].name.split('.')[0]);
    arrViews.push(Images.all[i].view);
    arrVotes.push(Images.all[i].click);

  }

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
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


