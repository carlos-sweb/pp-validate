var validate = require('./pp-validate.js');

var result = validate(
  {name : "Carlos Illesca"},
  {name : "string(max:20,min:10),required(false)"}
);
