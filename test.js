var express = require('express')
  , app = express()
  , tox = require('./lib/tox');
  
tox.setOptions({
  path: 'test/pages',
  viewFile: 'page.html',
  viewFiles: {
    'about': 'about.html'
  },
  debug: true
});

app.engine('html', require('ejs').renderFile);
app.set('views', './test/views')
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
  - /about/contact -> about/contact
  - 404 -> 404.md
  
tox.setOptions({
  viewFile: {
    'about/contact': 'about.html',
    default:
  }
});
  
*/