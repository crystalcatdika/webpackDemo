import './style.css'
import data from './data.json'
import pintMe from './print'
import { cube } from './math'





window.onload=function(){
  const myJsonData = document.createElement("div");
  myJsonData.innerHTML= data.name;
  myJsonData.id = 'ok'
  document.body.appendChild(myJsonData)
  var btn = document.createElement('button')
  btn.innerHTML = '点击'
  btn.onclick = pintMe;
  myJsonData.appendChild(btn)


    var mathBtn = document.createElement('button')
    mathBtn.innerHTML = [
        'hello webpack',
        '3 cubed is equal toi' + cube(3)
    ]

    myJsonData.appendChild(mathBtn)

  const myImage= document.createElement("div");
  myImage.id= 'myImage';
  myJsonData.appendChild(myImage)




  if (!document.getElementById("myCanvas")) {
    var width = "";
    var height = "";
    var canvas = document.createElement("canvas");
    width = document.getElementById("ticketBox").offsetWidth;
    height = document.getElementById("ticketBox").offsetHeight;
    canvas.setAttribute("width", width + "px");
    canvas.setAttribute("height", height + "px");
    canvas.setAttribute("style", "border:1px solid gray");
    canvas.id = "myCanvas";
    document.getElementById("ticketBox").appendChild(canvas);
  }

  var myCanvasObject = document.getElementById("myCanvas");
  var ctx = myCanvasObject.getContext("2d");

  ctx.beginPath();
  ctx.fillStyle = "gray";
  ctx.rect(0, 0, width, height);
  ctx.closePath();
  ctx.fill();

  var pointerArr = []; //鼠标移动坐标数组
  var xPointer = 0;//鼠标当前x坐标
  var yPointer = 0;//鼠标当前y坐标

  //鼠标按下
  myCanvasObject.addEventListener('touchstart', function(event) {
    var e=window.event||event;
    this.style.cursor = "move";
    var changeWidth= this.getBoundingClientRect().left;
    var changeHeight =this.getBoundingClientRect().top;
    xPointer = e.targetTouches[0].pageX-changeWidth;
    yPointer = e.targetTouches[0].pageY-changeHeight;
    pointerArr.push([xPointer, yPointer]);
    circleReset(ctx);
  });


  //鼠标按下后拖动
  myCanvasObject.addEventListener('touchmove', function(event) {
    var e=window.event||event;
    var changeWidth= this.getBoundingClientRect().left;
    var changeHeight =this.getBoundingClientRect().top;
    xPointer = e.targetTouches[0].pageX-changeWidth;
    yPointer = e.targetTouches[0].pageY-changeHeight;
    pointerArr.push([xPointer, yPointer]);
    circleReset(ctx);
  });


  //鼠标抬起取消事件
  myCanvasObject.addEventListener('touchend', function(event) {
    pointerArr = [];
    const data = ctx.getImageData(0,0,canvas.width,canvas.height).data;
    for (var i=0,j=0;i<data.length;i+=4){
      if(data[i]&&data[i+1]&&data[i+2]&&data[i+3]){
        j++;
      }
    }
    //假如j的数量小于等于图片的0.7了，就全清除
    if(j<=data.length/4*0.6){
      ctx.clearRect(0,0,canvas.width,canvas.height);
    }
  });


  //圆形橡皮檫
  function circleReset(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(pointerArr[0][0], pointerArr[0][1]);
    ctx.lineCap = "round";　　 //设置线条两端为圆弧
    ctx.lineJoin = "round";　　 //设置线条转折为圆弧
    ctx.lineWidth = 20;
    ctx.globalCompositeOperation = "destination-out";
    if (pointerArr.length == 1) {
      ctx.lineTo(pointerArr[0][0] + 1, pointerArr[0][1] + 1);
    } else {
      for (var i=1;i<pointerArr.length;i++) {
        ctx.lineTo(pointerArr[i][0], pointerArr[i][1]);
        ctx.moveTo(pointerArr[i][0], pointerArr[i][1]);
      }
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

};


if (module.hot) {
  module.hot.accept('./print.js', function () {
      console.log('Accepting>>>>>>>>>>>>');
      pintMe();
      myJsonData.removeChild(btn)
      let btn = document.createElement('button')
      btn.innerHTML = '点击again'
      btn.onclick = pintMe;
      myJsonData.appendChild(btn)
  })

}


