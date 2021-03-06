'use strict';

/**
* FUNCTION: recurse( dims, d, v )
*	Recursively create an infinity-filled multidimensional array.
*
* @param {Number[]} dims - dimensions
* @param {Number} d - current recursion depth
* @param {Number} v - infinity value (positive or negative)
* @returns {Array} output array
*/
function recurse( dims, d, v ) {
	var out = [],
		len,
		i;

	len = dims[ d ];
	d += 1;
	if ( d < dims.length ) {
		for ( i = 0; i < len; i++ ) {
			out.push( recurse( dims, d, v ) );
		}
	} else {
		for ( i = 0; i < len; i++ ) {
			out.push( v );
		}
	}
	return out;
} // end FUNCTION recurse()


// EXPORTS //

module.exports = recurse;
