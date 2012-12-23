var express = require('express')
  , app = express()
  , tox = require('./lib/tox');

// Set view engine and directory
app.engine('html', require('ejs').renderFile);
app.set('views', './site/views')
  
// Set tox options
tox.setOptions({
  path: 'site/pages',
  viewFile: 'page.html',
  viewFiles: {
    'about/*': 'about.html'
  }
});

app.get('/*', tox.page);

app.listen(4000);