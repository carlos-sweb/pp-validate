var validate = require('./pp-validate.js');
var result = validate(
  {
    name :"Daisy Nataly Montenegro vera",
    age:27,
    pass:'C4rl0sill3sc42020',
    repass:'C4rl0sill3sc42020',
    email:'c4rl0sill3sc4@gmail.com',
    code:'12345',
    website:'https://powerpanel.site'
  },
  {
    name:"presence|minlength:10|maxlength:30",
    age:'number|range:10,28',
    email:'mail|minlength:10',
    code:'no_regex:/^[0-9]{4}$/gm',
    website:'url',
    pass:"required|string",
    repass:"equalTo:pass"
  }
);

console.log( result );
