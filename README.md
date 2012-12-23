# Tox

With Tox you can create websites with markdown files. All your content will be store in the markdown files you creates. Tox is design to work great with [Express.js](http://expressjs.com). But it will work with any web framework. 

## Tox with Express

```
app.engine('html', require('els').renderFile);
app.set('views', './site/views')

tox.setOptions({
  path: 'path/to/markdown/files'
});

app.get('/*', tox.page);

app.listen(4000);
```

## Tox without Express

```
tox.setOptions({
  path: 'path/to/markdown/files'
});

// Will render start page
tox.page();

// Render some other page
tox.page('about');
```

## Options

* `path` - Set the path where the markdown files is stored
* `startPage` - Filename of the start page file without extension. Default `index`.
* `ext` - Set file extension. Default `md`.
* `notFound` - Filename of the not found file wihtout extension. Default `404`.
* `exclude` - Array containg filenames to exclude.

#### Express related options

* `viewFile` - The default view file to use.
* `viewFiles` - Change view files depending on route. Use `/*` if every page under will use the same view file instead of the `viewFile`.

```
viewFiles: {
	'about' : 'about.html',
	'page/*': 'page.html'
}
```