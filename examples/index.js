'use strict';

var inf = require( './../lib' ),
	out;

// ---
// Plain arrays...

// 1x10:
out = inf( 10 );
console.log( '1x10:' );
console.log( out );
console.log( '\n' );

// 2x1x3:
out = inf( [2,1,3] );
console.log( '2x1x3:' );
console.log( out );
console.log( '\n' );

// 5x5x5:
out = inf( [5,5,5] );
console.log( '5x5x5:' );
console.log( out );
console.log( '\n' );

// 10x5x10x20:
out = inf( [10,5,10,20] );
console.log( '10x5x10x20:' );
console.log( JSON.stringify( out ) );
console.log( '\n' );
// Note that infinity values are stringified as `null`.


// ---
// Typed arrays...
out = inf( 10, {
	'dtype': 'float32',
	'sign': -1
});
console.log( 'Typed arrays:' );
console.log( out );
console.log( '\n' );


// ---
// Matrices...
out = inf( [3,2], {
	'dtype': 'float64'
});
console.log( 'Matrix: %s\n', out.toString() );
