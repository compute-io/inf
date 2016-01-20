inf
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Creates an infinity-filled [matrix](https://github.com/dstructs/matrix) or array.


## Installation

``` bash
$ npm install compute-inf
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var inf = require( 'compute-inf' );
```

#### inf( dims[, opts] )

Creates an infinity-filled [`matrix`](https://github.com/dstructs/matrix) or [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). The `dims` argument may either be a positive `integer` specifying a `length` or an `array` of positive `integers` specifying dimensions.

``` javascript
var out;

out = inf( 5 );
// returns [ +inf, +inf, +inf, +inf, +inf ];

out = inf( [2,1,2] );
// returns [ [ [+inf,+inf] ], [ [+inf,+inf] ] ]
```

The function accepts the following `options`:

*	__dtype__: output data type. The following `dtypes` are accepted:

	-	`float32`
	-	`float64`
	-	`generic` (default)
*	__sign__: specifies whether to fill using positive or negative `infinity`. Default: `+1`.

By default, the output data structure is a generic [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). To output a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), set the `dtype` option.

``` javascript
var out;

out = inf( 5, {
	'dtype': 'float32'
});
// returns Float32Array( [+inf,+inf,+inf,+inf,+inf] );

out = inf( [3,2], {
	'dtype': 'float64'
});
/*
	[ +inf +inf
	  +inf +inf
	  +inf +inf ]
*/
```

To fill using negative `infinity`, set the `sign` option to `-1`.

``` javascript
var out = inf( 5, {
	'sign': -1
});
// returns [ -inf, -inf, -inf, -inf, -inf ];
```

__Notes__:
*	Currently, for more than `2` dimensions, the function outputs a __generic__ `array` and ignores any specified `dtype`.

	``` javascript
	var out = inf( [2,1,3], {
		'dtype': 'float32'
	});
	// returns [ [ [+inf,+inf,+inf] ], [ [+inf,+inf,+inf] ] ]
	```
*	Integer [`arrays`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) are __not__ supported. In JavaScript, positive and negative `infinity` are only represented in floating-point storage formats ([IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point)).


#### inf.compile( dims )

Compiles a `function` for creating infinity-filled [`arrays`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) having specified dimensions.

``` javascript
var fcn, out;

fcn = inf.compile( [2,1,3] );

out = fcn();
// returns [ [ [+inf,+inf,+inf] ], [ [+inf,+inf,+inf] ] ]

out = fcn();
// returns [ [ [+inf,+inf,+inf] ], [ [+inf,+inf,+inf] ] ]
```

__Notes__:
*	When repeatedly creating [`arrays`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) having the same shape, creating a customized `inf` function will provide performance benefits.




## Examples

``` javascript
var inf = require( 'compute-inf' ),
	out;

// Plain arrays...

// 1x10:
out = inf( 10 );

// 2x1x3:
out = inf( [2,1,3] );

// 5x5x5:
out = inf( [5,5,5] );

// 10x5x10x20:
out = inf( [10,5,10,20] );

// Typed arrays...
out = inf( 10, {
	'dtype': 'float32',
	'sign': -1
});

// Matrices...
out = inf( [3,2], {
	'dtype': 'float64'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015-2016. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-inf.svg
[npm-url]: https://npmjs.org/package/compute-inf

[travis-image]: http://img.shields.io/travis/compute-io/inf/master.svg
[travis-url]: https://travis-ci.org/compute-io/inf

[coverage-image]: https://img.shields.io/codecov/c/github/compute-io/inf/master.svg
[coverage-url]: https://codecov.io/github/compute-io/inf?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/inf.svg
[dependencies-url]: https://david-dm.org/compute-io/inf

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/inf.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/inf

[github-issues-image]: http://img.shields.io/github/issues/compute-io/inf.svg
[github-issues-url]: https://github.com/compute-io/inf/issues
