
var submit=document.getElementById('submit_btn');
submit.onclick=function(){
     //get a var of counter end point
    var request=new XMLHttpRequest();
    
    //respond to the request
    request.onreadystatechange=function(){
        if(request.readystate==XMLHttpRequest.Done){
            //take some action
         if(request.status === 200){
             alert('sucess');
         }else if(request.status === 403){
             alert('invalid');
         }else if(request.status === 500){
             alert('unknown error');
         }
    }
    };
 var username=document.getElementById('username').value;
 var password=document.getElementById('password').value;
 console.log(username);
 console.log(password);
    request.open('POST','http://vickyvijay1147.imad.hasura-app.io/login',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({"username": username,"password": password}));
};