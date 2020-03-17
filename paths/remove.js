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
app.get('/remove', (req, res) => {
  if (req.query.id != undefined) {
    var id = req.query.id;
    common.users.remove({ id }, (err) => {
        res.json({ result: "SUCCESS" });
    })
  }
})

module.exports = app;