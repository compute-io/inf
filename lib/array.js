'use strict';

/**
* FUNCTION: inf( len[, sign] )
*	Creates an infinity-filled array.
*
* @param {Number} len - array length
* @param {Number} [sign=1] sign - sign specifying positive or negative infinity
* @returns {Number[]} infinity-filled array
*/
function inf( len, sign ) {
	var out,
		v, i;

	if ( sign === -1 ) {
		v = Number.NEGATIVE_INFINITY;
	} else {
		v = Number.POSITIVE_INFINITY;
	}
	// Ensure fast elements...
	if ( len < 64000 ) {
		out = new Array( len );
		for ( i = 0; i < len; i++ ) {
			out[ i ] = v;
		}
	} else {
		out = [];
		for ( i = 0; i < len; i++ ) {
			out.push( v );
		}
	}
	return out;
} // end FUNCTION inf()


// EXPORTS //

module.exports = inf;
