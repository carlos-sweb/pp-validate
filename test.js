var validate = require('./pp-validate.js');

var result = validate(
  {name : "Carlos",age:30},
  {name : "required|string|maxlength:7|minlength:3",age:'required|number|min:29'}
);
// required|max:20|min:10|regex:/^.+@.+$/i|no_regex:/^.+@.+$/i
console.log( result );
