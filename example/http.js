var http = require('http')
  , tox = require('../lib/tox');

tox.set('path', 'site/pages');

http.createServer(function (req, res) {
  // tox.page will return an object with yaml properties and tox property for the html code.
  res.writeHead(200, {'Content-Type':'text/html'});
  res.end(tox.page(req.url).tox);
}).listen(4000);