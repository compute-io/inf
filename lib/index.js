'use strict';

// MODULES //

var isPositiveIntegerArray = require( 'validate.io-positive-integer-array' ),
	isPositiveInteger = require( 'validate.io-positive-integer' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' ),
	recurse = require( './recurse.js' ),
	compile = require( './compile.js' );


// INF //

/**
* FUNCTION: inf( dims[, opts] )
*	Creates an infinity-filled matrix or array.
*
* @param {Number|Number[]} dims - dimensions
* @param {Object} [opts] - function options
* @param {Number} [opts.sign=1] - sign specifying positive or negative infinity
* @param {String} [opts.dtype="generic"] - output data type
* @returns {Array|Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} infinities
*/
function inf( dims, options ) {
	/* jshint newcap:false */
	var opts = {},
		isArray,
		ndims,
		sign,
		ctor,
		out,
		err,
		len,
		dt,
		v,
		i;

	isArray = isPositiveIntegerArray( dims );
	if ( !isArray && !isPositiveInteger( dims ) ) {
		throw new TypeError( 'inf()::invalid input argument. Dimensions argument must be either a positive integer or a positive integer array. Value: `' + dims + '`.' );
	}
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	sign = opts.sign || 1;
	if ( sign === 1 ) {
		v = Number.POSITIVE_INFINITY;
	} else {
		v = Number.NEGATIVE_INFINITY;
	}
	dt = opts.dtype || 'generic';
	if ( isArray ) {
		ndims = dims.length;
		if ( ndims < 2 ) {
			len = dims[ 0 ];
		}
	} else {
		ndims = 1;
		len = dims;
	}
	// 1-dimensional data structures...
	if ( ndims === 1 ) {
		// Ensure fast elements for generic arrays...
		if ( dt === 'generic' && len < 64000 ) {
			out = [];
			for ( i = 0; i < len; i++ ) {
				out.push( v );
			}
		} else {
			ctor = ctors( dt );
			out = new ctor( len );
			for ( i = 0; i < len; i++ ) {
				out[ i ] = v;
			}
		}
		return out;
	}
	// Multidimensional data structures...
	if ( dt !== 'generic' ) {
		if ( ndims === 2 ) {
			out = matrix( dims, dt );
			for ( i = 0; i < out.length; i++ ) {
				out.data[ i ] = v;
			}
			return out;
		}
		// TODO: dstructs-ndarray support goes here. Until then, fall through to plain arrays...
		// out = ndarray();
		// for ( i = 0; i < out.length; i++ ) {
		//	out.data[ i ] = v;
		// }
	}
	return recurse( dims, 0, v );
} // end FUNCTION inf()


// EXPORTS //

module.exports = inf;
module.exports.compile = compile;
