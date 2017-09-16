console.log('Loaded!');
//change the html text
var element=document.getElementById('first');
element.innerHTML='deleted';
//perform functions with image
var img=document.getElementById('madi');
var moveright=0;
function right(){
    moveright=moveright+10;
    img.style.moveright=moveright+'px';
}
img.onclick=function(){
var interval=setInterval(right,100);
};
