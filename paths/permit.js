const express = require('express');
const Router = express.Router;
const common = require('../common.js');
const { google } = require('googleapis');
const plus = google.plus('v1');
/** 
 * @ASRIENT
 * Exposes the function that handels the root of the site.
 */

let app = Router();
opts = {};
app.get('/permit', async (req, res) => {
  var auth = common.gAuth();
  if (req.query.code != undefined) {
    var code = req.query.code;
    try {
      var { tokens } = await auth.getToken(code);
      auth.setCredentials(tokens);
      var rec = {
        id: common.code(),
        created_on: common.time(),
        google_photos: {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expiry_date: tokens.expiry_date
        }
      }
      var r = new common.users(rec);
      r.save()
      res.send("AUTHORISED! " + JSON.stringify(rec));
    }
    catch (e) {
      res.send("ERROR!")
    }
  }
  else {
    res.send("INVALID REQUEST");
  }
})
module.exports = app;