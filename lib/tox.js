/**
 * Module dependecies.
 */
 
var tox = exports
  , page = require('./page');
  
/**
 * Options
 */
 
tox.options = {
  path: 'pages',
  ext: 'md',
  startPage: 'index',
  notFound: '404',
  viewFile: ''
};

/**
 * Set options
 */
 
tox.setOptions = function (obj) {
  for (var k in obj) this.options[k] = obj[k];
};

/**
 * Load page
 */

tox.load = function (file) {
  if (page.exists(tox.options.path, file + '.' + tox.options.ext)) {
    return page.load(tox.options.path, file + '.' + tox.options.ext);
  } else {
    return page.load(tox.options.path, tox.options.notFound + '.' + tox.options.ext);
  }
};

/**
 * Middleware for pages
 */

tox.page = function (req, res, next) {
  if (req.params.length && req.params[0] === '') {
    if (tox.options.viewFile.length) {
      res.render(tox.options.viewFile, tox.load(tox.options.startPage));
    } else {
      res.send(tox.load(tox.options.startPage).tox);
    }
  } else {
    if (tox.options.viewFile.length) {
      res.render(tox.options.viewFile, tox.load(req.params[0]));
    } else {
      res.send(tox.load(req.params[0]).tox);
    }
  }
};