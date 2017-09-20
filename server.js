var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');
var config={
    user:'vickyvijay1147',
    database:'vickyvijay1147',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
function createtemplate(data)
{
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
var htmltemplate=`
<html>
    <head>
        <title>
            ${title}
        </title>
             <link href="/ui/style.css" rel="stylesheet" />
    </head>
        <body>
            <div class="container">
            <div>
                <a href='/'>get back to home page</a>
                </div>
                <div>
                <a href='/ui/madi.png'>cartoon</a>
                </div>
                <hr/>
                <h1>
                    ${heading}
                    </h1>
                    <div>
                       ${date.toDateString()} 
                    </div>
                    <div>
                        ${content}
                    </div>
                    </div>
            </body>
</html>`
;
return htmltemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var counter=0;
app.get('/counter', function (req, res) {
    counter=counter+1;
  res.send(counter.toString());
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
var pool=new Pool(config);
app.get('/test-db',function(req,res){
    //make a select request
    //respond the result
    pool.query('SELECT * FROM store', function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result.rows));
        }
    });
    
});
function hash(input,salt){
    var hashed=crypto.pbkdf2Sync(input,salt,1000,512,'sha512');
    return ['pbkdf2','1000',salt,hashed.toString('hex')].join('$');
}
app.get('/hash/:input',function(req,res){
  var hashedstring=hash(req.params.input,'this_is_duplicate');
  res.send(hashedstring);
});
app.post('/create-user',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
   var salt=crypto.randomBytes(128).toString('hex');
   var dbstring=hash(password,salt); 
   pool.query('INSERT INTO "user" (username,password) VALUES($1,$2)',[username,dbstring],function(err,result){
       if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send('sucessfully created'+username);
        }
   });
});
app.get('/login',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
   pool.query('SELECT * FROM "user" WHERE username= $2',[username],function(err,result){
       if(err){
            res.status(500).send(err.toString());
        }
        else
        if(result.rows.length===0){
            res.status(403).send('invalid username/password');
        }
        else{
         var dbstring=result.rows[0].password;
         var salt=dbstring.split('$')[2];
         var hashedpassword=hash(password,salt);
         if(hashedpassword==dbstring){
             res.send('sucessfully logged in');
         }
         else{
             res.status(403).send('invalid username/password');
         }
        }
   });
});
var names=[];
app.get('/submit-name', function (req, res) {
  //get the parameter
  var name=req.query.name;
  //add the variable whenever submit button is clicked
  names.push(name);
  //using JSON to change array or objects to a string
  res.send(JSON.stringify(names));
});
app.get('/articles/:articlename',function(req,res){
    pool.query("SELECT * FROM article WHERE title=$1", [req.params.articlename] , function (err,result){
       if(err){
            res.status(500).send(err.toString());
       }
       else {
           if(result.rows.length===0){
            res.status(404).send('article not found');
       }
        else{
        var articlesname=result.rows[0];
        res.send(createtemplate(articlesname));
        }
}
    });
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
