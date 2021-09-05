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

    var getRegex = function( str ){
        var result = [];
        var regex = /^\/([\^]{0,}[\W\S]{0,})\/([g]{0,1}[m]{0,1}[i]{0,1}[y]{0,1}[u]{0,1}[s]{0,1})/gm;
        var m;
        while ((m = regex.exec(str)) !== null) {
          // This is necessary to avoid infinite loops with zero-width matches
          if (m.index === regex.lastIndex) {
            regex.lastIndex++;
          }
          // The result can be accessed through the `m`-variable.
          m.forEach((match, groupIndex) => {
            //console.log(`Found match, group ${groupIndex}: ${match}`);
            if( groupIndex === 1 || groupIndex === 2 ){
                result.push( match );
            }
          });
        }

        return result;
    }


    var isS = _is.isString , isU = _is.isUndefined, isNum = _is.isNumber , isM = _is.isEmail,  isR = _is.isRegExp;
    var isUrl = _is.isUrl;

    var compare = function( rules , value ){

      var checkList = {};
      var keyRules = Object.keys(rules);
      // =======================================================================
      for( var i = 0 ; i < keyRules.length; i ++ ){
        var key = keyRules[i];
        if( [
          'alpha','range','regex',
          'no_regex','url','string',
          'mail','number','required',
          'maxlength','minlength','max','min','equalTo'
        ].includes(key) ){

          if( key == 'alpha'    ){ checkList[key] = /^[a-zA-Z]{1,}?$/.test(value)}
          // ---------------------------------------------------------------------
          if( key == 'range' ){
            if( rules[ key ].length == 2 ){
              checkList[key] = (parseInt( value )  >= rules[ key ][0] && parseInt(value) <= rules[ key ][1]);
            }else{checkList[key] = false;}
          }
          // ---------------------------------------------------------------------
          if( key == 'regex' || key == 'no_regex' ){
            var regex = getRegex(rules[key]),
            regexStr = isS(regex[0]) ? regex[0] : '',
            regexFlags = isS(regex[1]) ? regex[1] : '';
            try{
              if( key == 'regex' ){
                checkList[key] = new RegExp( regexStr , regexFlags ).test(value)
              }
              if( key == 'no_regex' ){
                checkList[key] = (new RegExp( regexStr , regexFlags ).test(value) === true ) ? false : true ;
              }
            }catch(ErrorCatch){
              checkList[key] = false ;
            }
          }
          // ---------------------------------------------------------------------
          if( key == 'equalTo'){ checkList[key]  = ( rules[key].toString() === value.toString()  ) }
          if( key == 'url' ){checkList[key] = isUrl( value ) }
          if( key == 'string'    ){ checkList[key] = isS( value ) }
          if( key == 'mail'    ){ checkList[key] = isM( value ) }
          if( key ==='number' ){ checkList[key] = isNum(value) }
          if( key == 'required'  ){ checkList[key] = (value !== "") }
          if( key == 'maxlength' ){ checkList[key] = (value.toString().length <= rules[key]) }
          if( key == 'minlength' ){ checkList[key] = (value.toString().length >= rules[key]) }
          if( key == 'min' ){ checkList[key] = ( parseInt(value) >= rules[key]) }
          if( key == 'max' ){ checkList[key] = ( parseInt(value) <= rules[key]) }

        }else{
          // key no definidas
          checkList[key] = false;
        }
        // =======================================================================
      }
      return !(Object.values( checkList ).includes( false ))
    }

    var createRules = function( rules , data ){
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
             })()(options[1])  : ( ['equalTo'].includes(keyOptions) ? (function(){
               return function( equalToValue  , _data ){
                  return  has( _data , equalToValue ) ?  _data[equalToValue] : null;
               }
             })()(options[1] , data ) : options[1]) );
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
      // Agregamos la data para la funcion equalTo
      var rules = createRules( rules , data );
      var keyRules = Object.keys( rules );
      var error = {};
      var result = {};
      for( var i = 0 ; i < keyRules.length ; i++){
        var key = keyRules[i];
        // Falta Procesar los errores
        result[key] = compare( rules[key] , data[key] );
      }
      return { valid : !Object.values(result).includes(false) , error : false };
    }
    return validate;
});
