const express = require('express');
const Router = express.Router;
const common=require('../common.js');
/** 
 * @ASRIENT
 * Exposes the function that handels the root of the site.
 */



let app=Router();
opts={};
app.get('/',(req,res)=>{
   /* common.reveal(req,(me)=>{
      if(me==null){
  res.status(200);
    res.type('text/html');
      res.render("login",opts);
    }
     else{
      res.redirect('/pods');
     } 
    });*/
    //res.send("Duck off!");
    res.render("duck",opts);
  })

module.exports=app;