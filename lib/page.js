/**
 * Module dependencies.
 */
 
var marked = require('marked')
  , page = exports
  , fs = require('fs')
  , yaml = require('js-yaml');

/**
 * Load and parse markdown
 *
 * @param {String} path
 * @param {String} page
 */
 
page.load = function (path, page) {
  var ymlReg = /---([\s\S]*)?---/
    , str
    , yml;
    
  if (this.exists(path, page)) {
    str = fs.readFileSync(process.cwd() + '/' + path + '/' + page).toString();
    yml = ymlReg.exec(str);
    yml = yml !== null && yml.length ? yml : '';
    str = str.replace(yml[0], '');
    yml = yml[1] ? yaml.load(yml[1]) : {};
    yml.tox = marked(str);
    return yml;
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