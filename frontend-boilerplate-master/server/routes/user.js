const express = require('express');
const router =  express.Router();

router.get('/home', function(req, res){
  res.render('home', { errors: req.session.errors });
  req.session.errors = null;
});

router.post('https://proepapi.azurewebsites.net/api/Login/AddUser', function(req, res) {
  console.log("here got")
  let username = req.body.last_name;
  let email = req.body.email;

  req.checkBody('username', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Please enter a valid email').isEmail();

  const errors = req.validationErrors();
  if(errors){
    req.session.errors = errors;
    res.redirect('/home');
  }
  else{
    req.session.success = true;
    res.redirect('/user');
  }

});

module.exports =  router;
