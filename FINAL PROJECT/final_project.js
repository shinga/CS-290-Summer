var express = require('express');
var mysql = require('./sqlstuff.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

mysql.pool.query("DROP TABLE IF EXISTS exercises", function(err){
  var createString = "CREATE TABLE exercises("+
  "id INT PRIMARY KEY AUTO_INCREMENT,"+
  "name VARCHAR(255) NOT NULL,"+
  "reps INT,"+
  "weight INT,"+
  "date DATE,"+
  "lbs BOOLEAN)";
  mysql.pool.query(createString);
});

app.get('/',function(req,res,next){
    var context = {};
    mysql.pool.query('SELECT * FROM exercises', function(err, rows, fields){
        if(err){
            return next(err);
        }
        context.resultlist = rows;
        context.results = JSON.stringify(rows);
        res.render('home.handlebars', context);
    });
});

app.get('/reset',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS exercises", function(err){
    var createString = "CREATE TABLE exercises("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});

app.get('/insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO exercises(name,reps,weight,date,lbs) VALUES ('Pushups',12,120,'2016-08-06',1),('Liftin bruh',30,100,'2016-08-07',0)");

  mysql.pool.query("INSERT INTO exercises (`name`) VALUES (?)", [req.query.c], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Inserted id " + result.insertId;
    res.render('home',context);
  });
});




app.post('/requests', function(req,res){
    var params = [];
    for (var i in req.body){
        params.push({'name':i,'val':req.body[i]})
    }
    var context = {};
    context.list = params;
    res.render('home', context);
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
