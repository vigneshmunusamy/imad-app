var button=document.getElementById('counter');
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
var nameinput=document.getElementById('name');
var name=nameinnput.value;
var submit=document.getElementById('submit_btn');
submit.onclick=function(){
    //make a request to the server
    //capture and render the name list
    var names=('name1','name2','name3');
    var list='';
    for(var i=0;i<names.length;i++){
        list=='<li>' + names[i] + '</li>';
    }
    var ul=document.getElementById('namelist');
    ul.innerHTML=list;
};