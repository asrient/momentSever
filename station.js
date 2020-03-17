var express = require("express");
var https = require('https');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var useragent = require('useragent');

const common = require('./common.js');

const root = require('./paths/root.js');
const permit = require('./paths/permit.js');
const token = require('./paths/token.js');
const remove = require('./paths/remove.js');

var opts = {
  useNewUrlParser: true,
  server: {
    socketOptions: { keepAlive: 1 }
  }
};
mongoose.connect(common.vars.db.url, opts);

var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', './pages');
app.disable('x-powered-by');
app.set('view engine', 'ejs');


app.use((req, res, next) => {

  getSource = () => {
    var agent = useragent.parse(req.headers['user-agent']);
    var s = {
      os: agent.os.toString(),
      app: agent.toAgent()
    }
    if (req.query.ref != undefined) {
      if (req.query.ref == 'pwa') {
        s.reference = 'pwa'
      }
      else if (req.query.ref == 'ig') {
        s.reference = 'instagram'
      }
      else if (req.query.ref == 'tw') {
        s.reference = 'twitter'
      }
      else {
        s.reference = req.query.ref;
      }
    }
    if (req.headers["HTTP_CF_IPCOUNTRY"] != undefined) {
      s.country = req.headers["HTTP_CF_IPCOUNTRY"];
    }
    return (s)
  }

  getIp = () => {
    var ip = req.headers['x-forwarded-for'];
    if (ip) {
      var list = ip.split(',');
      ip = list[list.length - 1]
    }
    else {
      ip = req.connection.remoteAddress;
    }
    return ip;
  }


  if (req.path == '/') {
    var info = {
      page: "root",
      source: getSource(),
      time: common.time(),
      ip: getIp()
    }
    var view = new common.visits(info);
    app.set('info', info);
    view.save()
  }
  else if (req.path == '/rounak') {
    var info = {
      page: "Rounak",
      source: getSource(),
      time: common.time(),
      ip: getIp()
    }
    var view = new common.visits(info);
    app.set('info', info);
    view.save()
  }


  next();


})


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./exposed'));
app.use(cookieParser());


app.post('/txt', function (reqq, ress) {
  var txt = reqq.body.txt;
  if (txt != undefined) {
    txt.trim();
    if (txt != '') {
      var info = app.get('info');
      var rec = {
        source: info.source,
        time: info.time,
        ip: info.time,
        txt
      }
      var r = new common.txts(rec);
      r.save()
    }
  }
  ress.send("Message sent!");
});

app.get('/rounak', (req, res) => {
  var opts = app.get('info');
  res.render("rounak", opts);
})

app.get('/auth', (req, res) => {
const scopes = ['https://www.googleapis.com/auth/photoslibrary'];
const authUrl = common.gAuth().generateAuthUrl({ access_type: 'offline', scope: scopes});
  res.redirect(authUrl);
})

app.use(root);
app.use(permit);
app.use(token);
app.use(remove);

app.use(function (req, res) {
  res.sendFile(__dirname + '/pages/404.html');
});

app.listen(app.get('port'), () => console.log(`IEM Sucks!`));
