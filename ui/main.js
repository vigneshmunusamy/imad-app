console.log('Loaded!');
//change the html text
var element=document.getElementById('first');
element.innerHTML='deleted';
//perform functions with image
var img=document.getElementById('madi');
var marginRight=0;
function right(){
    marginRight=marginRight+10;
   // img.style.marginRight=marginRight+'px';
}
img.onclick=function(){
var interval=setInterval(right,100);
};
