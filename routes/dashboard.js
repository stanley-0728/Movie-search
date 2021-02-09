const express = require('express');
const router = express.Router();
const request=require('request');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
router.get('/Home',ensureAuthenticated, (req, res) =>
  res.render('Home',{name:req.user.name})
);

router.get('/result',ensureAuthenticated,(req,res)=>{
  const url=` http://www.omdbapi.com/?apikey=bc197144&s=${req.query.movie}`
  request(url,function(error,response,body){
    if(!error&&response.statusCode==200){
      const data=JSON.parse(body)
      if(data.response=='false')
      {
        res.send("MOVIE NOT FOUND")
      }
      res.render('result',{movieData:data,name:req.user.name})
    }
    else{
      res.send("UHH OHH ERROR")
    }
  })
});
router.get("/result/:id", (req, res)=>{
  const url = "http://www.omdbapi.com/?apikey=bc197144&i=" + req.params.id;
  request(url, function(error, response, body) {
      if (!error && response.statusCode == 200) {
          const data = JSON.parse(body)
          //console.log(data);
          if(data.Response==='False'){
              res.send("Movie Not Found");
          }else{
              //res.send(data);
              const user=req.user.name;
              if(user=='undefined')
              user='User'
              res.render("Info", {movieData: data, name:user});    
          }
      }else{
          res.send('Error');
      }
  });
});
module.exports = router;
