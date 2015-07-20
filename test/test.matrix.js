/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	inf = require( './../lib/matrix.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'infinity-filled matrix', function tests() {

	var pinf = Number.POSITIVE_INFINITY,
		ninf = Number.NEGATIVE_INFINITY;

	it( 'should export a function', function test() {
		expect( inf ).to.be.a( 'function' );
	});

	it( 'should return an infinity-filled matrix', function test() {
		var actual, expected, i;

		// Positive infinity:
		actual = inf( [2,2], 'float32' );

		expected = new Float32Array( 4 );
		for ( i = 0; i < expected.length; i++ ) {
			expected[ i ] = pinf;
		}

		assert.deepEqual( actual.shape, [2,2] );
		assert.strictEqual( actual.dtype, 'float32' );
		assert.deepEqual( actual.data, expected );

		// Negative infinity:
		actual = inf( [2,2], 'float64', -1 );

		expected = new Float64Array( 4 );
		for ( i = 0; i < expected.length; i++ ) {
			expected[ i ] = ninf;
		}

		assert.deepEqual( actual.shape, [2,2] );
		assert.strictEqual( actual.dtype, 'float64' );
		assert.deepEqual( actual.data, expected );
	});

});
