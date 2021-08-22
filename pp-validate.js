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
      define(['ppModel','exports'], function(ppIs, exports) {
        root.ppValidate = factory( root , exports , ppModel );
      });
    } else if (typeof exports !== 'undefined') {
      var ppModel = {};
      try { ppModel = require('pp-model.js'); } catch (e) {}
      module.exports = factory(root, exports, ppModel );
    } else {
      root.ppValidate = factory(root, {}, root.ppModel );
    }

})(this,function( root, exports , model ){
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
    
    function emailIsValid (email) {
      return /\S+@\S+\.[a-z]{1,}/.test(email)
    }

    console.log(  emailIsValid('ventas@test999.com.ar') );


    var validate = function( data , rules ){
        return false;
    }

    return validate;


});
