var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/',function(req,res){
    res.render('home.handlebars') //We can omit the .handlebars extension as we do below
});

function genContext(){
    var stuffToDisplay = {};
    stuffToDisplay.randnum = Math.random();
    return stuffToDisplay;
}


app.get('/randnum',function(req,res){
    res.render('randnum',genContext());
});

app.get('/requests',function(req,res){
    var params = [];
    for (var i in req.query){
        params.push({'name':i, 'val':req.query[i]});
    }
    var context = {};
    context.list = params;
    res.render('get_request_page', context);
});

app.post('/requests', function(req,res){
    var params = [];
    for (var i in req.body){
        params.push({'name':i,'val':req.body[i]})
    }
    var context = {};
    context.list = params;
    res.render('post_request_page', context);
});



app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
