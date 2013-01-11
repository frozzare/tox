# Tox

With Tox you can create websites with markdown files. All your content will be stored in the markdown files you create. Tox is design to work great with [Express](http://expressjs.com), but it will work with any web framework. 

## Tox with Express
This example is using Express 3.

```javascript
var express = require('express')
  , app = express()
  , tox = require('tox');
 
// Or what you like to use for views
app.engine('html', require('els').renderFile);
app.set('views', './site/views')

tox.setOptions({
  path: 'path/to/markdown/files'
});

app.get('/*', tox.page);

app.listen(4000);
```

## Tox without Express
This example is using the standard http server. `tox.page` will return an object containing all yaml properties and the `tox` property containing the html code.

```javascript
var http = require('http')
  , tox = require('tox');
  
tox.setOptions({
  path: 'path/to/markdown/files'
});

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(tox.page(req.url).tox);
}).listen(4000);
```

## Options

* `path` - Set the path where the markdown files is stored
* `startPage` - Filename of the start page file without extension. Default `index`.
* `ext` - Set file extension. Default `md`.
* `notFound` - Filename of the not found file wihtout extension. Default `404`.
* `exclude` - Array containing filenames to exclude.

#### Express related options

* `viewFile` - The default view file to use.
* `viewFiles` - Change view files depending on route. Use `/*` if every child page will use the same view file instead of the `viewFile`.

```javascript
tox.setOptions({
  viewFiles: {
	  'about' : 'about',
	  'page/*': 'page'
  }
});
```

## Running tests

```
npm install
make
```


## License 

(The MIT License)

Copyright (c) 2013 Fredrik Forsmo &lt;fredrik.forsmo@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.