console.log('Loaded!');
//change the html text
var element=document.getElementById('first');
element.innerHTML='deleted';
//perform functions with image
var img=document.getElementById('madi');
var marginLef=0;
function right(){
    marginLef=marginLef+10;
    img.style.marginLef=marginLef+'px';
}
img.onclick=function(){
var interval=setInterval(right,100);
};
