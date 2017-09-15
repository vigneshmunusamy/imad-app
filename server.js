var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles=
{
 Articleone: 
   {
    title:'Article 1|vignesh',
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
 articletwo: {
     title:'Article2|vignesh',
    heading:'Article 2',
    date:"sep 15,2017",
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
articlethree : {
     title:'Article 3|vignesh',
    heading:'Article 3',
    date:"sep 15,2017",
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
                <a href='/article-two'>2nd page linke</a>
                </div>
                <div>
                <a href='/article-three'>3rd page link</a>
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

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/:articlesname',function(req,res){
    var articlesname=req.param.articlesname;
    res.send(createtemplate(articles(articlesname)));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
