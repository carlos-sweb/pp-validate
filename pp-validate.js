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
    // =========================================================================
    // FUNC HAS
    var has = function( value , key ){
      return value.hasOwnProperty( key )
    }

    var isO = _is.isObject , isS = _is.isString, isF = _is.isFunction;

    return function( data , validate ){
        // VALIDAMOS QUE LOS ARGUMENTOS SEAN OBJECTOS
        if( isO( data ) && isO( validate)  ){
          // CAPTURAMOS LOS LLAVES DEL OBJECTO
          var keyData = Object.keys( data );
          // ===================================================================
          // FOR START
          // HACEMOS UN FOR PARA VALIDAR CADA CAMPO
          for( var i = 0 ; i < keyData.length ; i++){
              // ---------------------------------------------------------------
              // DEFINIMOS LA LLAVE PRINCIPAL
              var _key = keyData[i];
              // ---------------------------------------------------------------
              // CAPTURANMOS EL VALOR A COMPARAR SEGUN EL VALIDADOR
              var _value = data[_key];
              // ---------------------------------------------------------------
              // validamos que el validor tenga alguna información
              if( has( validate, _key )  ){
                if( isS( validate[_key] )  ){
                  switch(validate[_key]){
                    case 'string':
                      console.log( isS( _value )  );
                    break;
                  } // switch
                }// if
              } //if
          }
          // ==== FOR END
          // ===================================================================
        }
        return false;
    }
});
