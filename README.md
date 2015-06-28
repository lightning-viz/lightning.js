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
lightning.line([1,1,2,3,5,8,13,21])
    .then(function(viz) {
        viz.open(); // opens in web browser
    });

```

### Updating Visualizations

```js
var Lightning = require('lightning.js');

var lightning = new Lightning();

lightning.lineStreaming([1,1,2,3,5,8,13,21])
    .then(function(viz) {
        setInterval(function() {
            viz.appendData([Math.random()]); // appends to existing data
            // or 
            // viz.updateData([Math.random()]); // replaces existing data
        });    
    });



// with an image gallery
lightning.gallery([fs.createReadStream(__dirname + '/img/example.png'), fs.createReadStream(__dirname + '/img/example2.png')])
    .then(function(viz) {
        viz.appendImage(/* another image */); // adds another image
    });

// with a single image
lightning.gallery(fs.createReadStream(__dirname + '/img/example.png'))
    .then(function(viz) {
        viz.updateImage(fs.createReadStream(__dirname + '/img/example2.png')); // replaces existing image
    });


```

## Available Methods

#### line(series)

```js

// single line
lightning
    .line([1,1,2,3,5,8,13,21])
    .then(function(viz) {
        viz.open(); // opens in web browser
    });
    
// multiple lines
lightning
    .line([[0,1,2], [3,4,5], [6,7,8]])
    .then(function(viz) {
        viz.open(); // opens in web browser
    });
```


#### lineStreaming(series)
```js
lightning
    .lineStreaming([1,1,2,3,5,8,13,21])
    .then(function(viz) {
        viz.append([34, 55]);
    });
```

#### stackedLine(series)

```js
var series = _.map(_.range(5), function() {
    return _.map(_.range(20), function() {
        return Math.random();
    });
});

lightning
    .lineStacked(series)
    .then(function(viz) {
    });
```

#### matrix(mat)

```js

var mat = _.map(_.range(100), function() {
    return _.map(_.range(100), function() {
        return Math.random();
    });
});

lightning
    .matrix(mat)
    .then(function(viz) {
    });
```

#### scatter(x,y)

```js
var x = _.range(100);
var y = _.map(_.range(100), Math.random);

lightning
    .scatter(x, y)
    .then(function(viz) {
    });
```

#### scatterStreaming(x,y)
```js
var x = _.range(100);
var y = _.map(_.range(100), Math.random);

lightning
    .scatterStreaming(x, y)
    .then(function(viz) {
    });
```

#### scatter3(x,y,z)

```js
var x = _.range(100);
var y = _.map(_.range(100), function() {
    return Math.random() * 100;
});
var z = _.map(_.range(100), function() {
    return Math.random() * 100;
});

lightning
    .scatter3(x, y, z)
    .then(function(viz) {
    });

```

#### adjacency(mat)

```js
var mat = _.map(_.range(3), function(i) {
    return _.map(_.range(3), function(j) {
        return i * 3 + j;
    });
});

lightning
    .adjacency(mat)
    .then(function(viz) {

    });

```

#### force(mat)

```js
var mat = _.map(_.range(13), function(i) {
    return _.map(_.range(13), function(j) {
        return i * 3 + j;
    });
});

lightning
    .force(mat)
    .then(function(viz) {

    });

```

#### graph(x, y, mat)

```js
var mat = _.map(_.range(10), function(i) {
    return _.map(_.range(10), function(j) {
        return i * 3 + j;
    });
});

var x = _.range(10);
var y = _.map(_.range(10), Math.random);

lightning
    .graph(x, y, mat)
    .then(function(viz) {

    });
```

#### map(regions, values)
```js
var regions = ['NY', 'MI', 'NM'];
var values = [0.33, 0.6, 0.07];

lightning
    .map(regions, values)
    .then(function(viz) {
    });
```

#### image(image)

```js
// with a single image
lightning.image(fs.createReadStream(__dirname + '/img/example.png'))
    .then(function(viz) {
    });

```

#### gallery(images)

```js
lightning.gallery([fs.createReadStream(__dirname + '/img/example.png'), fs.createReadStream(__dirname + '/img/example2.png')])
    .then(function(viz) {
    });
```

## License

MIT © [Matthew Conlen](http://mathisonian.com)

