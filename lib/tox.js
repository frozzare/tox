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
  viewFile: '',
  viewFiles: {},
  exclude: ['favicon.ico']
};

/**
 * Set options
 */
 
tox.setOptions = function (obj) {
  for (var k in obj) {
    if (k === 'viewFiles') {
      for (var r in obj[k]) {
        this.options[k][r.replace('/*', '.*')] = obj[k][r];
      }
    } else {
      this.options[k] = obj[k];
    }
  }
};

/**
 * Load page
 */

tox.load = function (file) {
  if (page.exists(tox.options.path, file, tox.options.ext)) {
    return page.load(tox.options.path, file, tox.options.ext);
  } else {
    return page.load(tox.options.path, tox.options.notFound, tox.options.ext);
  }
};

/**
 * Get right view file.
 * Will check viewFiles option if route exists in there or fallback to viewFile option.
 *
 * @param {String} route
 *
 * @return {String}
 */

tox.view = function (route) {
  for (var key in tox.options.viewFiles) {
    if (new RegExp(key).test(route)) return tox.options.viewFiles[key];
  }
  return tox.options.viewFile;
}

/**
 * Middleware for pages
 */

tox.page = function (req, res) {
  if ((req === undefined || typeof req === 'string') && res === undefined) {
    if (tox.options.exclude.indexOf((typeof req === 'string' && req !== '/' ? req : tox.options.startPage)) !== -1) return;
    return tox.load((req !== undefined && req.length && req !== '/' ? req : tox.options.startPage));
  } else if (req.params) {
    if (tox.options.exclude.indexOf(req.params[0]) !== -1) return;
    if (req.params.length && req.params[0] === '') {
      if (tox.options.viewFile.length) {
        res.render(tox.view(tox.options.startPage), tox.load(tox.options.startPage));
      } else {
        res.send(tox.load(tox.options.startPage).tox);
      }
    } else {
      if (tox.options.viewFile.length) {
        res.render(tox.view(req.params[0]), tox.load(req.params[0]));
      } else {
        res.send(tox.load(req.params[0]).tox);
      }
    }
  }
};