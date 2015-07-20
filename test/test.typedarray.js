/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	inf = require( './../lib/typedarray.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'infinity-filled typed array', function tests() {

	var pinf = Number.POSITIVE_INFINITY,
		ninf = Number.NEGATIVE_INFINITY;

	it( 'should export a function', function test() {
		expect( inf ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				inf( 10, value );
			};
		}
	});

	it( 'should return an infinity-filled typed array', function test() {
		var actual, expected;

		// Positive infinity:
		actual = inf( 5, 'float32' );
		expected = new Float32Array( [pinf,pinf,pinf,pinf,pinf] );

		assert.deepEqual( actual, expected );

		// Negative infinity:
		actual = inf( 5, 'float64', -1 );
		expected = new Float64Array( [ninf,ninf,ninf,ninf,ninf] );

		assert.deepEqual( actual, expected );
	});

});
