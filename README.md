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
    something:"presence"
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

'alpha'
'range'
'regex'
'no_regex'
'url'
'string'
'mail'
'number'
'required'
'maxlength'
'minlength'
'max'
'min'
'equalTo'
'presence'
