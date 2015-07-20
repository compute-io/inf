/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	inf = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-inf', function tests() {

	var pinf = Number.POSITIVE_INFINITY,
		ninf = Number.NEGATIVE_INFINITY;

	it( 'should export a function', function test() {
		expect( inf ).to.be.a( 'function' );
	});

	it( 'should export a function to compile an inf function', function test() {
		expect( inf.compile ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a positive integer or an array of positive integers', function test() {
		var values = [
			'5',
			0,
			Math.PI,
			-1,
			NaN,
			true,
			null,
			undefined,
			{},
			[1,0],
			[1,null],
			[1,Math.PI],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				inf( value );
			};
		}
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				inf( [1,2,3], {
					'dtype': value
				});
			};
		}
	});

	it( 'should return an infinity-filled matrix', function test() {
		var actual, expected, i;

		// Positive infinity:
		actual = inf( [2,2], {
			'dtype': 'float32'
		});

		expected = new Float32Array( 4 );
		for ( i = 0; i < expected.length; i++ ) {
			expected[ i ] = pinf;
		}

		assert.deepEqual( actual.shape, [2,2] );
		assert.strictEqual( actual.dtype, 'float32' );
		assert.deepEqual( actual.data, expected );

		// Negative infinity:
		actual = inf( [2,2], {
			'dtype': 'float64',
			'sign': -1
		});

		expected = new Float64Array( 4 );
		for ( i = 0; i < expected.length; i++ ) {
			expected[ i ] = ninf;
		}

		assert.deepEqual( actual.shape, [2,2] );
		assert.strictEqual( actual.dtype, 'float64' );
		assert.deepEqual( actual.data, expected );
	});

	it( 'should return an infinity-filled typed-array', function test() {
		var actual, expected;

		// Positive infinity:
		actual = inf( 5, {
			'dtype': 'float32'
		});
		expected = new Float32Array( [pinf,pinf,pinf,pinf,pinf] );

		assert.deepEqual( actual, expected );

		// Negative infinity:
		actual = inf( 5, {
			'dtype': 'float64',
			'sign': -1
		});
		expected = new Float64Array( [ninf,ninf,ninf,ninf,ninf] );

		assert.deepEqual( actual, expected );
	});

	it( 'should return an infinity-filled generic array', function test() {
		var actual, expected;

		actual = inf( 5 );
		expected = [ pinf, pinf, pinf, pinf, pinf ];

		assert.deepEqual( actual, expected );

		actual = inf( [1], {
			'sign': -1
		});
		expected = [ ninf ];

		assert.deepEqual( actual, expected );

		actual = inf( [2,1] );
		expected = [ [pinf], [pinf] ];

		assert.deepEqual( actual, expected );

		actual = inf( [2,1,3], {
			'sign': -1
		});
		expected = [ [[ninf,ninf,ninf]], [[ninf,ninf,ninf]] ];

		assert.deepEqual( actual, expected );
	});

	it( 'should, until ndarrays are supported, ignore the `dtype` option and return a generic multidimensional array for >2 dimensions', function test() {
		var actual, expected;

		actual = inf( [2,1,3], {
			'dtype': 'float32'
		});
		expected = [ [[pinf,pinf,pinf]], [[pinf,pinf,pinf]] ];

		assert.deepEqual( actual, expected );
	});

});
