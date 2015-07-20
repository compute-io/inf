/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	createFcn = require( './../lib/inf.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'create inf function', function tests() {

	var pinf = Number.POSITIVE_INFINITY,
		ninf = Number.NEGATIVE_INFINITY;

	it( 'should export a function', function test() {
		expect( createFcn ).to.be.a( 'function' );
	});

	it( 'should return a function', function test() {
		assert.isFunction( createFcn( [1,2,3] ) );
	});

	it( 'should correctly create an inf function for a linear array', function test() {
		var expected, actual, inf, i;

		this.timeout( 0 );

		// Small array:
		inf = createFcn( [10] );

		expected = new Array( 10 );
		for ( i = 0; i < expected.length; i++ ) {
			expected[ i ] = pinf;
		}
		actual = inf();

		assert.deepEqual( actual, expected );

		// Large array:
		inf = createFcn( [100000], -1 );

		actual = inf();

		for ( i = 0; i < expected.length; i++ ) {
			assert.strictEqual( actual[i], ninf, i );
		}
	});

	it( 'should correctly create an inf function for a multidimensional array', function test() {
		var expected,
			actual,
			dims,
			arr1,
			arr2,
			inf,
			i, j, k;

		this.timeout( 0 );

		// [1]
		dims = [ 1, 64000, 2 ];
		inf = createFcn( dims );

		expected = new Array( 1 );
		for ( i = 0; i < dims[ 0 ]; i++ ) {
			arr1 = [];
			for ( j = 0; j < dims[ 1 ]; j++ ) {
				arr2 = new Array( dims[ 2 ] );
				for ( k = 0; k < dims[ 2 ]; k++ ) {
					arr2[ k ] = pinf;
				}
				arr1.push( arr2 );
			}
			expected[ i ] = arr1;
		}
		actual = inf();

		expected = expected[ 0 ];
		actual = actual[ 0 ];
		for ( i = 0; i < dims[ 1 ]; i++ ) {
			assert.deepEqual( actual[i], expected[i], i );
		}

		// [2]
		dims = [ 64000, 1, 2 ];
		inf = createFcn( dims, -1 );

		expected = new Array( 1 );
		for ( i = 0; i < dims[ 0 ]; i++ ) {
			arr1 = [];
			for ( j = 0; j < dims[ 1 ]; j++ ) {
				arr2 = new Array( dims[ 2 ] );
				for ( k = 0; k < dims[ 2 ]; k++ ) {
					arr2[ k ] = ninf;
				}
				arr1.push( arr2 );
			}
			expected[ i ] = arr1;
		}
		actual = inf();

		for ( i = 0; i < dims[ 0 ]; i++ ) {
			assert.deepEqual( actual[i], expected[i], i );
		}

		// [3]
		dims = [ 1, 2, 64000 ];
		inf = createFcn( dims, 1 );

		actual = inf();

		actual = actual[ 0 ];
		for ( i = 0; i < dims[ 1 ]; i++ ) {
			for ( j = 0; j < dims[ 2 ]; j++ ) {
				assert.strictEqual( actual[i][j], pinf, i + ',' + j );
			}
		}
	});

});
