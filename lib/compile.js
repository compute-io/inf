'use strict';

// MODULES //

var isPositiveIntegerArray = require( 'validate.io-positive-integer-array' ),
	isPositiveInteger = require( 'validate.io-positive-integer' ),
	inf = require( './inf.js' );


// COMPILE //

/**
* FUNCTION: compile( dims[, sign] )
*	Compiles a function for creating infinity-filled arrays.
*
* @param {Number|Number[]} dims - dimensions
* @param {Number} [sign=1] - sign specifying positive or negative infinity
* @returns {Function} function for creating infinity-filled arrays
*/
function compile( dims, sign ) {
	var isArray;

	isArray = isPositiveIntegerArray( dims );
	if ( !isArray && !isPositiveInteger( dims ) ) {
		throw new TypeError( 'compile()::invalid input argument. Dimensions argument must be either a positive integer or a positive integer array. Value: `' + dims + '`.' );
	}
	if ( !isArray ) {
		dims = [ dims ];
	}
	return inf( dims, sign );
} // end FUNCTION compile()


// EXPORTS //

module.exports = compile;
