var express = require('express')
  , app = express()
  , tox = require('../lib/tox');

app.engine('html', require('ejs').renderFile);
app.set('views', 'site/views')
app.set('view engine', 'html');

// Set tox options
tox.set({
  path: 'site/pages',
  viewFile: 'page',
  viewFiles: {
    'about/*': 'about'
  }
});

app.get('/*', tox.page);

app.listen(4000);