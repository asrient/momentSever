var express=require("express");
var https = require('https');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

const common=require('./common.js');

const root =require('./paths/root.js');

var opts = {
  useNewUrlParser: true,
server: {
socketOptions: { keepAlive: 1 }
}
};
mongoose.connect(common.vars.db.url, opts);

var app=express();

app.set('views','./pages');
app.disable('x-powered-by');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./exposed'));
app.use(cookieParser());


  app.post('/login', function (reqq, ress) {
ress.send({prams:reqq.params,query:reqq.query,body:reqq.body});
  });

  app.use(root);

  app.use(function (req, res) {
    res.sendFile(__dirname+'/pages/404.html');
  });

  app.listen(3000, () => console.log(`IEM Sucks!`));
