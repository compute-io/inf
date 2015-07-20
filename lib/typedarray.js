'use strict';

// MODULES //

var ctors = require( 'compute-array-constructors' );


// INF //

/**
* FUNCTION: inf( len, dt[, sign] )
*	Creates an infinity-filled typed array.
*
* @param {Number} len - array length
* @param {String} dt - data type
* @param {Number} [sign=1] - sign specifying positive or negative infinity
* @returns {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} infinity-filled typed array
*/
function inf( len, dt, sign ) {
	/* jshint newcap:false */
	var ctor,
		out,
		v, i;

	if ( sign === -1 ) {
		v = Number.NEGATIVE_INFINITY;
	} else {
		v = Number.POSITIVE_INFINITY;
	}
	ctor = ctors( dt );
	if ( ctor === null ) {
		throw new Error( 'inf()::invalid value. Data type does not have a corresponding array constructor. Value: `' + dt + '`.' );
	}
	out = new ctor( len );
	for ( i = 0; i < len; i++ ) {
		out[ i ] = v;
	}
	return out;
} // end FUNCTION inf()


// EXPORTS //

module.exports = inf;
