/* jshint evil:true */
'use strict';

/**
* FUNCTION: createInf( dims, sign )
*	Returns a function to create an infinity-filled multidimensional array.
*
* @param {Number[]} dims - dimensions
* @param {Number} sign - sign specifying positive or negative infinity
* @returns {Function} function to create an infinity-filled multidimensional array
*/
function createInf( dims, sign ) {
	var ndims = dims.length,
		len,
		fcn,
		n,
		v,
		i;

	if ( sign === -1 ) {
		v = 'Number.NEGATIVE_INFINITY';
	} else {
		v = 'Number.POSITIVE_INFINITY';
	}
	// Code generation. Create variables...
	n = ndims - 1;
	fcn += 'var v=' + v + ';';
	fcn += 'var ';
	for ( i = 0; i < ndims; i++ ) {
		fcn += 'i' + i + ',o' + i;
		if ( i < n ) {
			fcn += ',';
		} else {
			fcn += ';';
		}
	}
	// => var i0,o0,i1,o1,i2,o2,...,iN,oN;

	// Create the nested for loops...
	for ( i = 0; i < ndims; i++ ) {
		len = dims[ i ];

		// When initializing arrays, ensure fast elements...
		fcn += 'o' + i + '=';
		if ( len < 64000 ) {
			fcn += 'new Array(' + len + ')';
		} else {
			fcn += '[]';
		}
		fcn += ';';
		// => e.g., o1=new Array(10);

		fcn += 'for(i' + i + '=0;i' + i + '<' + len + ';i' + i + '++){';
		// => e.g., for(i0=0;i0<10;i++){
	}
	/* => e.g.,

		o0 = new Array( 1 );
		for ( i0 = 0; i0 < 1; i0++ ) {
			o1 = [];
			for ( i1 = 0; i1 < 64000; i1++ ) {
				o2 = new Array( 2 );
				for ( i2 = 0; i2 < 2; i2++ ) {
					...
	*/

	// Create the code which assigns the value infinity...
	i = ndims - 1;
	fcn += 'o' + i;
	if ( len < 64000 ) {
		fcn += '[i' + i + ']=v;';
	} else {
		fcn += '.push(v);';
	}
	// => o2[i2]=Inf;  OR  o2.push(Inf);

	// Create the code which assigns nested arrays...
	for ( i = ndims-2; i >= 0; i-- ) {
		fcn += '}';
		fcn += 'o' + i;
		len = dims[ i ];
		n = i + 1;
		if ( len < 64000 ) {
			fcn += '[i' + i + ']=o' + n + ';';
			// => o1[i1]=o2;
		} else {
			fcn += '.push(o' + n + ');';
			// => o1.push(o2);
		}
	}
	// Tidy up:
	fcn += '}';
	/* => e.g.,
				...
					o2[ i2 ] = Inf;
				}
				o1.push( o2 );
			}
			o0[ i0 ] = o1;
		}
	*/

	// Return the array:
	fcn += 'return o0;';

	// Create a new function:
	return new Function( fcn );
	/* => e.g.,
		function inf() {
			var i0, o0, i1, o1, i2, o2;
			o0 = new Array( 1 );
			for ( i0 = 0; i0 < 1; i0++ ) {
				o1 = [];
				for ( i1 = 0; i1 < 64000; i1++ ) {
					o2 = new Array( 2 );
					for ( i2 = 0; i2 < 2; i2++ ) {
						o2[ i2 ] = Inf;
					}
					o1.push( o2 );
				}
				o0[ i0 ] = o1;
			}
			return o0;
		}
	*/
} // end FUNCTION createInf()


// EXPORTS //

module.exports = createInf;
