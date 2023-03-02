module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1677749233119, function(require, module, exports) {
function _(name, ...children) {
  const result = document.createElement(name)

  for (const child of children) {
    if (typeof (child) === 'string')
      result.appendChild(document.createTextNode(child))
    else
      result.appendChild(child)
  }

  result._att = function(atts) {
    for (const [name, value] of Object.entries(atts))
      this.setAttribute(name, value)
    return this
  }

  result._onclick = function(callback) {
    this.onclick = callback
    return this
  }

  return result
}

const MUNDANE_TAGS = ['canvas', 'h1', 'h2', 'h3', 'p', 'a', 'div', 'span', 'nav', 'ul', 'li', 'strong']
for (let tagName of MUNDANE_TAGS)
  window['_' + tagName] = (...children) => _(tagName, ...children)

function _img(src) {
  return _('src')._att({ src })
}

function _input(type) {
  return _('input')._att({ type });
}

function _router(routes) {
  let _result = _div()

  function syncHash() {
    let hashLocation = document.location.hash.split('#')[1]
    if (!hashLocation)
      hashLocation = '/'

    if (!(hashLocation in routes)) {
      const route404 = '/404'
      console.assert(route404 in routes)
      hashLocation = route404
    }

    while (_result.firstChild)
      _result.removeChild(_result.lastChild)

    _result.appendChild(routes[hashLocation])

    return _result;
  }

  syncHash()

  window.addEventListener("hashchange", syncHash);

  return _result
}
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1677749233119);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map