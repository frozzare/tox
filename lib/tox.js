/**
 * Module dependecies.
 */
 
var tox = exports
  , page = require('./page');
  
/**
 * Options.
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
 * Set options via object or key/value.
 *
 * @param {Object|String} obj Object with options or string key.
 * @param {Object} value
 */

tox.set = function (obj, value) {
  if (typeof obj === 'string') {
    this.options[obj] = value;
  } else {
    for (var k in obj) {
      if (k === 'viewFiles') {
        for (var r in obj[k]) {
          this.options[k][r.replace('/*', '.*')] = obj[k][r];
        }
      } else {
        this.options[k] = obj[k];
      }
    }
  }
};

/**
 * Get option by key
 *
 * @param {String} key
 *
 * @return {Object}
 */
 
tox.get = function (key) {
  return this.options.hasOwnProperty(key) && this.options[key];
};

/**
 * Load page if it exists, if not try to load the not found page.
 *
 * @param {String} file The file to look for.
 *
 * @return {Object} Object contaning html and yaml
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
 * @param {String} route The route to look for.
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
 *
 * @param {Object|String} req Express request object or a string with the url or empty.
 * @param {Object} res Express response object.
 *
 * @return {String} Will return a string if not Express is used.
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