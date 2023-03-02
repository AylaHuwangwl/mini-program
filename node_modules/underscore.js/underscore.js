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