'use strict';

// MODULES //

var recurse = require( './recurse.js' );


// INF //

/**
* FUNCTION: inf( dims[, sign] )
*	Creates an infinity-filled multidimensional array.
*
* @param {Number[]} dims - dimensions
* @param {Number} [sign=1] sign - sign specifying positive or negative infinity
* @returns {Matrix} infinity-filled multidimensional array
*/
function inf( dims, sign ) {
	if ( sign === -1 ) {
		return recurse( dims, 0, Number.NEGATIVE_INFINITY );
	}
	return recurse( dims, 0, Number.POSITIVE_INFINITY );
} // end FUNCTION inf()


// EXPORTS //

module.exports = inf;
