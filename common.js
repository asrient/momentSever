const fs=require('fs');

 read=(file)=>{
    return   fs.readFileSync(file,'utf8', (err, data) => {
      if (err) throw err;
      return(data);
    });
   }

var Vars = {};

if (process.env.vars == undefined) {
    Vars = JSON.parse(read('./vars.json'));
}
else {
    Vars = JSON.parse(process.env.vars);
}


const users = require('./models.js').users;
const pods = require('./models.js').pods;
const txts = require('./models.js').txts;
const visits = require('./models.js').visits;
/**
 * After u call reveal, u can use 'me' to get user instance of the curr user except following list
 * call reveal to init me with req of pipe.
 *  */


time = () => {
    return new Date().getTime();
}

var crypto = require('crypto');

code = (length = 10) => {
    return crypto.randomBytes(length).toString('hex');
}

const { google } = require('googleapis');

var CLIENT_ID = Vars.google_photos.client_id;
var CLIENT_SECRET = Vars.google_photos.client_secret;
var REDIRECT_URL = Vars.google_photos.redirect_uris[0];

function getAuthClient(){
return new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);
}


module.exports = {
    vars: Vars,
    users: users,
    time: time,
    code: code,
    visits,
    txts,
    gAuth:getAuthClient
};