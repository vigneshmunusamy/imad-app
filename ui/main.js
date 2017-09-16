console.log('Loaded!');
//change the html text
var element=document.getElementById('first');
element.innerHTML='deleted';
//perform functions with image
var img=document.getElementById('madi');
var marginLeft=0;
function right(){
    marginLeft=marginLeft+10;
    img.style.marginLeft=marginLeft+'px';
}
img.onclick=function(){
var interval=setInterval(right,100);
};
