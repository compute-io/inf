'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isString = require( 'validate.io-string-primitive' ),
	contains = require( 'validate.io-contains' ),
	DTYPES = require( './dtypes.js' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination for validated options
* @param {Object} options - function options
* @param {Number} [opts.sign] - sign specifying positive or negative infinity
* @param {String} [options.dtype] - output data type
* @returns {Null|Error} null or an error
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'inf()::invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'dtype' ) ) {
		opts.dtype = options.dtype;
		if ( !isString( opts.dtype ) ) {
			return new TypeError( 'inf()::invalid option. Data type option must be a string primitive. Option: `' + opts.dtype + '`.' );
		}
		if ( !contains( DTYPES, opts.dtype ) ) {
			return new Error( 'inf()::invalid option. Data type option must be one of the following: [' + DTYPES.join( ', ' ) + '].' );
		}
	}
	if ( options.hasOwnProperty( 'sign' ) ) {
		opts.sign = options.sign;
		if ( opts.sign !== 1 && opts.sign !== -1 ) {
			return new TypeError( 'inf()::invalid option. Sign option must be either +1 or -1. Option: `' + opts.sign + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
