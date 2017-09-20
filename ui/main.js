
var submit=document.getElementById('submit_btn');
submit.onclick=function(){
     //get a var of counter end point
    var request=new XMLHttpRequest();
    
    //respond to the request
    request.onreadystatechange=function(){
        if(request.readystate==XMLHttpRequest.Done){
            //take some action
         if(request.status==200){
    //make a request to the server
    //capture and render the name list
    var names=request.responseText;
    names=JSON.parse(names);
    var list='';
    for(var i=0;i<names.length;i++){
        list+= '<li>' + names[i] + '</li>';
    }
    var ul=document.getElementById('namelist');
    ul.innerHTML=list;
         }
        //not done yet
    }
    };
 var username=document.getElementById('username').value;
 var password=document.getElementById('password').value;
    request.open('POST',"http://vickyvijay1147.imad.hasura-app.io/login",true);
    request.send(JSON.stringify(username: username,password: password));
};