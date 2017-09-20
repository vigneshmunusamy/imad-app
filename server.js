var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var config={
    user:'vickyvijay1147',
    database:'vickyvijay1147',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles=
{
 'articleone':  {
    title:'articleone|vignesh',
    heading:'Article 1',
    date:'sep 15,2017',
    content:           `<p>
                            created an article one link
                        </p>
                        <p>
                            created an article one link
                        </p> 
                        <p>
                            created an article one link
                        </p>`
    
     },
 'articletwo': {
     title:'articletwo|vignesh',
    heading:'Article two',
    date:'sep 15,2017',
    content:           `<p>
                            created an article 2 link
                        </p>
                        <p>
                            created an article 2 link
                        </p> 
                        <p>
                            created an article 2 link
                        </p>`
 },
'articlethree': {
     title:'articlethree|vignesh',
    heading:'Article 3',
    date:'sep 15,2017',
    content:           `<p>
                            created an article 3 link
                        </p>
                        <p>
                            created an article 3 link
                        </p> 
                        <p>
                            created an article 3 link
                        </p>`
 }
};
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
                       ${date} 
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
var names=[];
app.get('/submit-name', function (req, res) {
  //get the parameter
  var name=req.query.name;
  //add the variable whenever submit button is clicked
  names.push(name);
  //using JSON to change array or objects to a string
  res.send(JSON.stringify(names));
});
app.get('/articles/:articlname',function(req,res){
    Pool.query("SELECT * FROM article WHERE title ='" + req.params.articlename + "'" , function (result){
       //if(err){
         //   res.status(500).send(err.toString());
      //  }
       //else {
           if(result.rows.length === 0){
            res.status(404).send('article not found');
       }
        else{
        var articlesname=result.rows[0];
        res.send(createtemplate(articlesname));
        }
//}
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
