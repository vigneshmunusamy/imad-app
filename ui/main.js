var button=document.getElementById('counter');
var counter=0;
button.onclick=function(){
    //get a var of counter end point
    var request=new XMLHttpRequest();
    
    //respond to the request
    request.onreadystatechange=function(){
        if(request.readystate==XMLHttpRequest.Done){
            //take some action
         if(request.status==200){
             var counter=request.responseText;
             var span=document.getElementById('count');
             span.innerHTML=counter.toString();
         }
        //not done yet
    }
};
    request.open('GET',"http://vickyvijay1147.imad.hasura-app.io/counter",true);
    request.send(null);
};