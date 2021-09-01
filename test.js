var validate = require('./pp-validate.js');

var result = validate(

  {
    name :"Daisy Nataly Montenegro vera",
    age:27,
    email:'a@a.com'
  },


  {
    name : "string|minlength:10",
    age:'number|range:25,30',
    email:'mail|min:10'
  }

);


// required|max:20|min:10|regex:/^.+@.+$/i|no_regex:/^.+@.+$/i
console.log( result );
