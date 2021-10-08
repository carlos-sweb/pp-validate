/*!!
 * Power Panel Validate <https://github.com/carlos-sweb/pp-validate>
 * @author Carlos Illesca
 * @version 1.0.0 (2020/10/08 13:29 PM)
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

    var length = function( value ){
        return value.length;
    }

    /**
     * @function : getRegex
     * @description - captura en un array el patron entregado, la primera parte
     * es el patron en cadena y la segunda son las banderas ha usar
     **/
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

    /**
     *@function compare
     */
    var compare = function( rules , value ){

      var checkList = {},
      keyRules = Object.keys(rules);
      // =======================================================================
      for( var i = 0 ; i < length( keyRules ); i ++ ){
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
            if( length( rules[ key ] ) == 2 ){
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
          if( key == 'presence' ){
            console.log("-------------------------------------------------------");
             console.log( keyRules[key] );
          }
          // Not necesary
          //if( key == 'string'    ){ checkList[key] = isS( value ) }
          if( key == 'mail'    ){ checkList[key] = isM( value ) }
          if( key ==='number' ){ checkList[key] = isNum(value) }
          if( key == 'required'  ){ checkList[key] = (value !== "") }
          if( key == 'maxlength' ){ checkList[key] = ( length(value.toString()) <= rules[key]) }
          if( key == 'minlength' ){ checkList[key] = ( length(value.toString()) >= rules[key]) }
          if( key == 'min' ){ checkList[key] = ( parseInt(value) >= rules[key]) }
          if( key == 'max' ){ checkList[key] = ( parseInt(value) <= rules[key]) }

          if( checkList[key] === false ){ break; }

        }
        // =======================================================================
      }

      var thereAreErrors = !(Object.values( checkList ).includes( false ));

      if(  thereAreErrors === false  ){
         throw  (function( checkL ){
            var checkLfalse = {},checkLfalseKeys = Object.keys(checkL);
            for(var i = 0 ; i < length(checkLfalseKeys); i++){
              if( checkL[checkLfalseKeys[i]] === false ){
                checkLfalse[checkLfalseKeys[i]] = checkL[checkLfalseKeys[i]];
              }
            }
            return checkLfalse;
         })(checkList);
      }
      return thereAreErrors;
    }

     // Proceso 1
    var createRules = function( rules , data ){
      // =======================================================================
      //
      var validateArray = {};
      // =======================================================================
      //
      var keyRules = Object.keys( rules );
      // -----------------------------------------------------------------------
      // Procedemos a recorrer las reglas
      for( var i = 0; i < length(keyRules)  ; i++){
        var key = keyRules[i];
        if( isS( rules[ key ] ) ){
          rulesArray = rules[ key ].split('|');
          validateArray[ key ] = {};
          for( var e = 0 ; e <  length(rulesArray); e++ ){
             var options = rulesArray[e].split(":");
             var keyOptions = options[0];
             // VERIFICAMOS QUE se cree un valor predeterminado en true
             if( isU(options[1]) && length(options) == 1  ){options[1] = true;}
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
             })()(options[1] , data ) :

              ['presence'].includes(keyOptions)  ?  ( String(options[1]).toLowerCase() === 'true' ) : options[1] ) );

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
    return function( data , rules ){
      // Agregamos la data para la funcion equalTo
      // Paso 1 - creamos las reglas de una
      var rules = createRules( rules , data ),
      keyRules = Object.keys( rules ), // Todas las key
      error = {}, // Contenedor de los errores
      result = {}; // Contendor del resultado
      // -----------------------------------------------------------------------
      for( var i = 0 ; i < length(keyRules); i++){
        var key = keyRules[i];
        // hay que Procesar el presence
        // En este caso muy bueno para capturar errores
        // El error se ejecutara cuando alla un aspecto en falso
        try{
          result[key] = compare( rules[key] , ( has(data,key) ?  data[key] : "" ) );
        }catch( ErrorCompared ){
          result[key] = false;
          error[key] = ErrorCompared;
        }
        // En este caso muy bueno para capturar errores
      }
      // -----------------------------------------------------------------------
      // Get Error Items
      // Get Error Items
      return { valid : !Object.values(result).includes(false) , error : error };
    }
});
