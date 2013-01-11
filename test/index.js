var tox = require('..');

tox.set({
  path: 'test/pages'
});

describe('tox.page(page)', function () {
  it('should return object', function (done) {
    var page = tox.page();
    if (typeof page === 'object' && !(page instanceof Array) && typeof page !== 'function') done();
  });
  it('tox property should contains string of html', function (done) {
    tox.page().tox.should.include('<h1>');
    done();
  });
  it('set and get option', function (done) {
    tox.set('viewFile', 'page');
    if (tox.get('viewFile') === 'page') done();
  });
});