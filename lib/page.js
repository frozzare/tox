/**
 * Module dependencies.
 */
 
var marked = require('marked')
  , page = exports
  , fs = require('fs')
  , yaml = require('js-yaml');

/**
 * Load and parse markdown and yaml.
 *
 * @param {String} path Path to markdown
 * @param {String} file Filename
 * @param {String} ext Extension
 */
 
page.load = function (path, file, ext) {
  var ymlReg = /---([\s\S]*)?---/, str, yml;
    
  if (!this.exists(path, file, ext)) return;

  str = fs.readFileSync(this.path).toString();
  yml = ymlReg.exec(str);
  yml = yml !== null && yml.length ? yml : '';

  str = str.replace(yml[0], '');
  yml = yml[1] ? yaml.load(yml[1]) : {};
  yml.tox = marked(str);

  return yml;
};

/**
 * Check if page exists.
 *
 * @param {String} path Path to markdown
 * @param {String} file Filename
 * @param {String} ext Extension
 */

page.exists = function (path, file, ext) {
  this.path = path + '/' + file + '.' + ext;
  if (fs.existsSync(this.path)) return true;
  
  this.path = path + '/' + file + '/index.' + ext;
  if (fs.existsSync(this.path)) return true;
  
  return false;
};