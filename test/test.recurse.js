/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	recurse = require( './../lib/recurse.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'recursive creation', function tests() {

	var pinf = Number.POSITIVE_INFINITY,
		ninf = Number.NEGATIVE_INFINITY;

	it( 'should export a function', function test() {
		expect( recurse ).to.be.a( 'function' );
	});

	it( 'should create an infinity-filled array', function test() {
		var expected, actual, i;

		expected = new Array( 10 );
		for ( i = 0; i < expected.length; i++ ) {
			expected[ i ] = pinf;
		}

		actual = recurse( [10], 0, pinf );

		assert.deepEqual( actual, expected );
	});

	it( 'should create an infinity-filled multidimensional array', function test() {
		var expected, actual;

		expected = [
			[
				[ninf,ninf,ninf]
			],
			[
				[ninf,ninf,ninf]
			]
		];

		actual = recurse( [2,1,3], 0, ninf );

		assert.deepEqual( actual, expected );
	});

});
