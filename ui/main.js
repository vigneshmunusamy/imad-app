console.log('Loaded!');
//change the html text
var element=document.getElementById('first');
element.innerHTML='deleted';
//perform functions with image
var img=document.getElementById('madi');
var marginRight=0;
function right(){
    marginRight=marginRight+1;
    img.style.marginRight=marginRight+'5px';
}
img.onclick=function(){
var interval=setInterval(right,100);
};
