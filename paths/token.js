const express = require('express');
const Router = express.Router;
const common = require('../common.js');
const axios = require('axios');
/** 
 * @ASRIENT
 * Exposes the function that handels the root of the site.
 */

let app = Router();
opts = {};
app.get('/token', async (req, res) => {
  if (req.query.id != undefined) {
    var id = req.query.id;

    common.users.findOne({ id }, async (err, rec) => {
      if (rec != null) {
        try {
          var response = await axios.post('https://oauth2.googleapis.com/token',
            {
              client_id: common.vars.google_photos.client_id,
              client_secret: common.vars.google_photos.client_secret,
              grant_type: 'refresh_token',
              refresh_token: rec.google_photos.refresh_token
            })
            console.log(response);
          res.json({ result: "SUCCESS", body: response.data });
        }
        catch (e) {
          res.json({ result: "FAILED",body:e });
        }
      }
      else {
        res.json({ result: "FAILED" });
      }
    })

  }
  else {
    res.json({ result: "FAILED" });
  }
})
module.exports = app;