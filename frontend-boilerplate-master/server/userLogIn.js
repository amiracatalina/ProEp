class User {
  logUser(){

  }
}
module.exports = User



//
// //jsut a try
// var bodyParser= require('body-parser');
// var jwt=require('jsonwebtoken');
//
// var users=[
//   {
//     email:"xxxx",
//     password:"xxxx"
//   },
//   {
//     email:"yyyy",
//     password:"yyyy"
//   }
// ]
// app.use( bodyParser.json() );
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
//
// app.use('/log', (req,res)=>{
//   res.render('log');
// });
//
// app.post('https://proepapi.azurewebsites.net/api/Login/AddUser',(req,res)=>{
//   var message;
//   for(var user of users){
//     if(user.email!=req.body.email){
//       message="Wrong Name";
//     }else{
//       if(user.password!=req.body.password){
//         message="Wrong Password";
//         break;
//       }
//       else{
//         //create the token.
//         var token=jwt.sign(user,"samplesecret");
//         message="Login Successful";
//         break;
//       }
//     };
//   }
//   //If token is present pass the token to client else send respective message
//   if(token){
//     res.status(200).json({
//       message,
//       token
//     });
//   }
//   else{
//     res.status(403).json({
//       message
//     });
//   }
// });


// // user session
// const cookeParser =  require('cookie-parser');
// const bodyParser =  require('body-parser') ;
// const expressValidator =  require('express-validator') ;
// const session =  require('express-session') ;
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(cookeParser());
//
// app.use(session({ secret: 'ana', resave: false, saveUninitialized: true, }));
//
// app.use(expressValidator());
//
// const user = require('./routes/user');
//
// app.use('/user', user);
