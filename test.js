var validate = require('./pp-validate.js');

var result = validate(

  {
    name :"Daisy Nataly Montenegro vera",
    age:27,
    pass:'C4rl0sill3sc42020',
    repass:'C4rl0sill3sc42020',
    email:'c4rl0sill3sc4@gmail.com',
    code:'1234',
    website:'https://powerpanel.site'
  },
  {
    name : "string|minlength:10",
    age:'number|range:10,20',
    email:'mail|min:10',
    code:'no_regex:/^[0-9]{4}$/gm',
    website:'url',
    pass:"required|string",
    repass:"equalTo:pass"
  }

);


// required|max:20|min:10|regex:/^.+@.+$/i|no_regex:/^.+@.+$/i
console.log( result );
