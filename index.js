
//basically just an observable
function widget (fn) {
  var listeners = []
  var value

  function update (val) {
    value = val
    listeners.forEach(function (fn) { fn(value) })
  }

  function set (args) {
    var val = fn(args, function (err, value) {
      update(val)
    })
    if(val != null) update(val)
  }

  set.listen = function (listener) {
    listeners.push(listener)
  }

  process.nextTick(function () {
    set(value)
  })

  return set
}

function isNode (n) {
  return n && n.tagName
}

//very simple html constructor
function html(list) {
  var el = document.createElement('div')
  if('function' === typeof list)
    list.listen(function (_el) {
      el.innerHTML = ''
      el.appendChild(_el)
    })
  else if('string' === typeof list)
    return document.createTextNode(list)
  else if(isNode(list)) {
    console.log('isNode', list)
    return list
  }
  else {
    el.className = list[0]
    for(var i = 1 ; i < list.length; i++)
      el.appendChild(html(list[i]))
  }

  return el
}

function clone (val) {
  if('function' == typeof val)
    return val()

  //if a val is a input type, take the val.value.
  if(isNode(val) && val.value)
    return val.value

  if('object' === typeof val) {
    _val = {}
    for(var k in val)
      _val[k] = clone(val[k])
    return _val
  }

  return val
}

function link (text, target, value) {
  var el = document.createElement('a')
  el.href = '#'
  el.onclick = function (){
    target(clone(value))
  }
  el.textContent = text
  return el
}

function input () {
  return document.createElement('input')
}

module.exports = html

html.input = input
html.link = link
html.widget = widget



