/*
var validate = require('validate.js');

var constraints = {
  creditCardNumber: {
    presence: false,
    format: {
      pattern: /^(34|37|4|5[1-5]).*$/,
      message: function(value, attribute, validatorOptions, attributes, globalOptions) {
        return validate.format("^%{num} is not a valid credit card number", {
          num: value
        });
      }
    },
    length: function(value, attributes, attributeName, options, constraints) {
      if (value) {
        // Amex
        if ((/^(34|37).*$/).test(value)) return {is: 15};
        // Visa, Mastercard
        if ((/^(4|5[1-5]).*$/).test(value)) return {is: 16};
      }
      // Unknown card, don't validate length
      return false;
    }
  },
  creditCardZip: function(value, attributes, attributeName, options, constraints) {
    if (!(/^(34|37).*$/).test(attributes.creditCardNumber)) return null;
    return {
      presence: {message: "is required when using AMEX"},
      length: {is: 5}
    };
  }
};


console.log(validate({},{
  name:{
    presence:true,
    length:{ minimum : 500 , message: "must be at least 6 characters" }
  }
}));
// => {"creditCardNumber": ["Credit card number is the wrong length (should be 16 characters)"]}





*/
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
    otro:"presence:true|minlength:50",
    name:"presence|minlength:10",
    age:'number|range:10,28',
    email:'mail|minlength:10',
    code:'no_regex:/^[0-9]{4}$/gm',
    website:'url',
    pass:"required|string",
    repass:"equalTo:pass"
  }
);
// required|max:20|min:10|regex:/^.+@.+$/i|no_regex:/^.+@.+$/i
console.log( result );
