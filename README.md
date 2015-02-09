# lightning.js

> Node.js client for the Lightning data visualization server.


## Install

```sh
$ npm install --save lightning.js
```


## Usage


### Plotting 

```js
var Lightning = require('lightning.js');

var lightning = new Lightning();
lightning.line([1,1,2,3,5,8,13,21]);

```

### Updating

```js
var Lightning = require('lightning.js');

var lightning = new Lightning();
var viz = lightning.lineStreaming([1,1,2,3,5,8,13,21]);

setInterval(function() {
    viz.appendData([Math.random()]);
});


```

## Examples

See [the tests](./test.js)

## Available Methods

#### line(series)

#### lineStreaming(series)

#### stackedLine(series)

#### matrix(mat)

#### scatter(x,y)

#### scatterStreaming(x,y)

#### scatter3(x,y,z)

#### adjacency(mat)

#### force(mat)

#### graph(x, y, mat)

#### map(regions, values)


## License

MIT © [Matthew Conlen](http://mathisonian.com)

