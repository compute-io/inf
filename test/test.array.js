/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	inf = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'infinity-filled array', function tests() {

	var pinf = Number.POSITIVE_INFINITY,
		ninf = Number.NEGATIVE_INFINITY;

	it( 'should export a function', function test() {
		expect( inf ).to.be.a( 'function' );
	});

	it( 'should return an infinity-filled array', function test() {
		var actual, expected;

		actual = inf( 5 );
		expected = [ pinf, pinf, pinf, pinf, pinf ];

		assert.deepEqual( actual, expected );

		actual = inf( 5, 1 );
		expected = [ pinf, pinf, pinf, pinf, pinf ];

		assert.deepEqual( actual, expected );

		actual = inf( 5, -1 );
		expected = [ ninf, ninf, ninf, ninf, ninf ];

		assert.deepEqual( actual, expected );
	});

	it( 'should support fast elements', function test() {
		var actual, i;

		this.timeout( 0 );

		actual = inf( 100000 );
		for ( i = 0; i < actual.length; i++ ) {
			assert.strictEqual( actual[ i ], pinf );
		}
	});

});
