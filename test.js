var validate = require('./pp-validate.js');

var result = validate(
  {name : "Carlos",age:30,email:'c4rl0sill3sc4@gmai'},
  {name : "required|string|maxlength:7|minlength:3",age:'required|number|min:31',email:'mail'}
);
// required|max:20|min:10|regex:/^.+@.+$/i|no_regex:/^.+@.+$/i
console.log( result );
