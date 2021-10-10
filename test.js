var validate = require('./pp-validate.js');
var data = {
    name  : "Jhon Smith",
    age   : 30,
    email : "john@jsmith.com",
    website : "https://jsmith.com",
    pass : "12345678",
    repeatpass : "12345678",
    something:"Hello World"
}
var rules = {    
    name : "minlength:6|maxlength:50", // true
    age : "number|range:18,65", // true
    email:"mail|minlength:10", // true
    website:"url", // true
    pass:"minlength:8", // true
    repeatpass:"equalTo:pass",//true
    something:"presence"
}
var result = validate( data , rules);

if( result.valid ){
  // here you successful code
  console.log( " data validated : successful" );
}else{

    console.log( result.error );
}
