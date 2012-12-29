# Tox

With Tox you can create websites with markdown files. All your content will be stored in the markdown files you create. Tox is design to work great with [Express](http://expressjs.com), but it will work with any web framework. 

## Tox with Express
This example is using Express 3.

```
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
This example is using the standard http server. `tox.page` will return an object containg all yaml properties and the `tox` property containg the html code.

```
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
* `exclude` - Array containg filenames to exclude.

#### Express related options

* `viewFile` - The default view file to use.
* `viewFiles` - Change view files depending on route. Use `/*` if every child page will use the same view file instead of the `viewFile`.

```
viewFiles: {
	'about' : 'about.html',
	'page/*': 'page.html'
}
```