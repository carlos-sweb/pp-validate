var validate = require('./pp-validate.js');

var result = validate(

  {
    name :"Daisy Nataly Montenegro vera",
    age:27,
    email:'a@a.com',
    code:'0000-AB150-DEFY'
  },


  {
    name : "string|minlength:10",
    age:'number|range:10,20',
    email:'mail|min:10',
    code:'regex:^0000\-[A-Z]{2}[0-9]{3}\-[A-Z]{4}$'
  }

);


// required|max:20|min:10|regex:/^.+@.+$/i|no_regex:/^.+@.+$/i
console.log( result );
