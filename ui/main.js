var button=document.getElementById('counter');
var counter=0;
button.onclick=function(){
    //get a var of counter end point
    
    //respond to the request
    
    counter=counter+1;
    var span=document.getElementById('count');
    span.innerHTML=counter.toString();
};