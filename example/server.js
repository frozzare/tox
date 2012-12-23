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

/*

test/pages
  - index.md
  - about.md
  - 404.md
  - about/contact.md
  
urls:
  - / => index.md
  - /about => about.md
  - /about/contact -> about/contact.md
  - 404 -> 404.md
  
*/