var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var file = 'data.json';

 


router.get('/', function(req, res){
	if (req.session.is_logged_in) {
		res.redirect('/home');
	}else {
		res.render('login',{message: ""});	
	}
   
});
router.post('/login', function(req, res){
 
    var username = req.body.username;
    var password = req.body.password;
   if(!username || !password){
       res.redirect('/');
   } else {

     if(username=="admin" && password=="admin"){
	    if (!req.session.is_logged_in) {
		  req.session.is_logged_in = true
		}
		console.log(req.session);
        res.redirect('/home');
     } else{
     
     	res.render('login', {message: "Invalid credentials!"});	
     }
     
   }
});

router.get('/home', function(req, res){
	
	if (req.session.is_logged_in == undefined || !req.session.is_logged_in) {
		res.redirect('/');
	}else{
		res.render('home');	
	}
});


router.get('/edit', function(req, res){
	
	if (req.session.is_logged_in == undefined || !req.session.is_logged_in) {
		res.redirect('/');
	}else{
		res.render('edit');	
	}
});

router.post('/save', function(req, res){
	if (req.session.is_logged_in == undefined || !req.session.is_logged_in) {
		res.redirect('/');
	}else{
		console.log(req.body);
		jsonfile.writeFile(file, req.body, function (err) {
		  console.error(err)
		});
		res.redirect('/edit');
	}
})


module.exports = router;