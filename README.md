#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

> Node.js client for the Lightning data visualization server.


## Install

```sh
$ npm install --save lightning.js
```


## Usage

```js
var Lightning = require('lightning.js');

var lightning = new Lightning();
lightning.line([1,1,2,3,5,8,13,21]);

```


## License

MIT © [Matthew Conlen](http://mathisonian.com)


[npm-url]: https://npmjs.org/package/lightningjs
[npm-image]: https://badge.fury.io/js/lightningjs.svg
[travis-url]: https://travis-ci.org/mathisonian/lightningjs
[travis-image]: https://travis-ci.org/mathisonian/lightningjs.svg?branch=master
[daviddm-url]: https://david-dm.org/mathisonian/lightningjs.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/mathisonian/lightningjs
