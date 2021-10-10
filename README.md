# pp-validate

pp-validate is a simple function for data validation.

## Getting Started

In the web project include pp-validate with:

```
<script src="https://cdn.jsdelivr.net/npm/pp-validate@latest/pp-validate.min.js" ></script>
```

Or

## Install

```console
npm i pp-validate --save
```
## Initialize

```javascript
// Declare pp-validate here
var validate = ppValidate;

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
    name : "minlength:6", // true
    age : "number|range:18,65", // true
    email:"mail|minlength:10", // true
    website:"url", // true
    pass:"minlength:8", // true
    repeatpass:"equalTo:pass",//true
    something:"presence" // true
}
var result = validate( data , rules);

if( result.valid ){
  // here you successful code
  console.log( " data validated : successful" );
}else{

    console.log( result.error );
}
```
## Rules

### Numeric
  * **range** :
     - The range validator will check that a number is within a range.
  * **number** :
     - The maxlength validator will check the type of a value
  * **maxlength** :
      - The maxlength validator will check the maximun length of a string
  * **minlength** :
      - The minlength validator will check the minimun length of a string
  * **max** :
      - The max validator will check the maximun length of a number
  * **min** :
     - The min validator will check the minimun length of a number

### Pattern
  * **regex** :
    - The regex validator will validate the value matches the regular expression
  * **no_regex** :
    - The no_regex validator will validate the value does not match the regular expression
  * **mail** :
    - The mail validator will verify that the value is a valid e-mail.
  * **url** :
    - The mail validator will verify that the value is a valid url.

### String
  * **string**
    - The string validator will validate that the value is a text string.
  * **equalTo**
    - The equalTo validator will validate that the value matches the key to be compared.

### Boolean
  * **required**
    - The required validator will validate that the value is not empty.
  * **presence**
    - The validator presence will validate the key and value in the data to be compared.
