'use strict';

// MODULES //

var matrix = require( 'dstructs-matrix' );


// INF //

/**
* FUNCTION: inf( dims, dt[, sign] )
*	Creates an infinity-filled matrix.
*
* @param {Number[]} dims - dimensions
* @param {String} dt - data type
* @param {Number} [sign=1] - sign specifying positive or negative infinity
* @returns {Matrix} infinity-filled matrix
*/
function inf( dims, dt, sign ) {
	var out,
		v, i;

	if ( sign === -1 ) {
		v = Number.NEGATIVE_INFINITY;
	} else {
		v = Number.POSITIVE_INFINITY;
	}
	out = matrix( dims, dt );
	for ( i = 0; i < out.length; i++ ) {
		out.data[ i ] = v;
	}
	return out;
} // end FUNCTION inf()


// EXPORTS //

module.exports = inf;
