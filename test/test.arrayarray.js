/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	inf = require( './../lib/arrayarray.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'infinity-filled multidimensional array', function tests() {

	var pinf = Number.POSITIVE_INFINITY,
		ninf = Number.NEGATIVE_INFINITY;

	it( 'should export a function', function test() {
		expect( inf ).to.be.a( 'function' );
	});

	it( 'should return an infinity-filled array of arrays', function test() {
		var actual, expected;

		actual = inf( [2,1] );
		expected = [ [pinf], [pinf] ];

		assert.deepEqual( actual, expected );

		actual = inf( [2,1], 1 );
		expected = [ [pinf], [pinf] ];

		assert.deepEqual( actual, expected );

		actual = inf( [2,1,3], -1 );
		expected = [ [[ninf,ninf,ninf]], [[ninf,ninf,ninf]] ];

		assert.deepEqual( actual, expected );
	});

});
