/*!!
 * Power Panel Validate <https://github.com/carlos-sweb/pp-validate>
 * @author Carlos Illesca
 * @version 1.0.0 (2020/05/14 18:12 PM)
 * Released under the MIT License
 */
(function(global,factory){

  var root = typeof self == 'object' && self.self === self && self ||
    typeof global == 'object' && global.global === global && global;
    if (typeof define === 'function' && define.amd) {
      define(['ppIs','exports'], function(ppIs, exports) {
        root.ppValidate = factory( root , exports , ppIs );
      });
    } else if (typeof exports !== 'undefined') {
      var ppIs = {};
      try { ppIs = require('pp-is'); } catch (e) {}
      module.exports = factory(root, exports, ppIs );
    } else {
      root.ppValidate = factory(root, {}, root.ppIs );
    }

})(this,function( root, exports , _is ){

    var isS = _is.isString , isU = _is.isUndefined, isNum = _is.isNumber , isM = _is.isEmail,  isR = _is.isRegExp;

    var compare = function( rules , value ){
      var checkList = {};
      var keyRules = Object.keys(rules);
      // =======================================================================
      for( var i = 0 ; i < keyRules.length; i ++ ){
        var key = keyRules[i];
        if( key == 'alpha'    ){ checkList[key] = /^[a-zA-Z]{1,}?$/.test(value)}
        // ---------------------------------------------------------------------
        if( key == 'range' ){
          if( rules[ key ].length == 2 ){
            checkList[key] = (parseInt( value )  >= rules[ key ][0] && parseInt(value) <= rules[ key ][1]);
          }else{checkList[key] = false;}
        }
        // ---------------------------------------------------------------------
        if( key == 'regex'){

          // pattern
          // ^\/([\^]{0,}[a-z,A-Z,0-9-\[\]\{\}$\W\s\S\w]{0,})\/([\w]{0,})
          // https://regex101.com
          console.log( rules[key] );

            try{
              checkList[key] = new RegExp(rules[key]).test(value);
            }catch(ErrorCatch){
              checkList[key] = false;
            }
        }
        if( key == 'string'    ){ checkList[key] = isS( value ) }
        if( key == 'mail'    ){ checkList[key] = isM( value ) }
        if( key ==='number' ){ checkList[key] = isNum(value) }
        if( key == 'required'  ){ checkList[key] = (value !== "") }
        if( key == 'maxlength' ){ checkList[key] = (value.toString().length <= rules[key]) }
        if( key == 'minlength' ){ checkList[key] = (value.toString().length >= rules[key]) }
        if( key == 'min' ){ checkList[key] = ( parseInt(value) >= rules[key]) }
        if( key == 'max' ){ checkList[key] = ( parseInt(value) <= rules[key]) }
      }
      // =======================================================================
      return !(Object.values( checkList ).includes( false ))
    }

    var createRules = function( rules ){
      // =======================================================================
      //
      var validateArray = {};
      // =======================================================================
      //
      var keyRules = Object.keys( rules );
      // -----------------------------------------------------------------------
      // Procedemos a recorrer las reglas
      for( var i = 0; i < keyRules.length ; i++){
        var key = keyRules[i];
        if( isS( rules[ key ] ) ){
          rulesArray = rules[ key ].split('|');
          validateArray[ key ] = {};
          for( var e = 0 ; e < rulesArray.length ; e++ ){
             var options = rulesArray[e].split(":");
             var keyOptions = options[0];
             // ----------------------------------------------------------------
             var valueOptions =  ['min','max','maxlength','minlength'].includes(keyOptions)  ?
             parseInt(options[1]) :
             ( ['range'].includes(keyOptions) ? (function(){
               return function( option1){
                 var option1Array = option1.split(",")
                 return [ parseInt(option1Array[0]) , parseInt(option1Array[1]) ]
               }
             })()(options[1])  : options[1]);
             // ----------------------------------------------------------------
             validateArray[ key ][keyOptions] = isU(valueOptions) ? true : valueOptions ;
          }
        }

      }
      // -----------------------------------------------------------------------

      return validateArray;
    }

    // =========================================================================
    // FUNC HAS
    var has = function( value , key ){
      return value.hasOwnProperty( key )
    }

    // Necesitamos validar
    // Data Time validator - format all
    // Email
    // Equality
    // Exclusion
    // Format
    // Inclusion
    // Length
    // numericality
    // presence
    // Type
    // Url

    var validate = function( data , rules ){
      var rules = createRules( rules );
      var keyRules = Object.keys( rules );
      var error = {};
      var result = {};
      for( var i = 0 ; i < keyRules.length ; i++){
        var key = keyRules[i];
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log( rules[key] );
        console.log( data[key] );
        console.log( compare( rules[key] , data[key] ) );
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

      }
      return { valid : true , error : false };
    }
    return validate;
});
