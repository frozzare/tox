/**
 * Module dependencies.
 */
 
var marked = require('marked')
  , page = exports
  , fs = require('fs');

/**
 * Load and parse markdown
 *
 * @param {String} path
 * @param {String} page
 */
 
page.load = function (path, page) {
  var etitle = /\#(.+)/, str;
  if (this.exists(path, page)) {
    str = fs.readFileSync(process.cwd() + '/' + path + '/' + page).toString();
    return {
      title: etitle.exec(str).length ? etitle.exec(str)[1] : '',
      tox: marked(str)
    };
  } else {
    return false;
  }
};

/**
 * Check if page exists
 *
 * @param {String} path
 * @param {String} page
 */

page.exists = function (path, page) {
  path = process.cwd() + '/' + path + '/' + page;
  return fs.existsSync(path);
};