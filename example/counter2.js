var h = require('../')

var _count = 0
function count (n) {
  return _count += n
}

var counter2 = h.widget(function (n) {
  return h(['number', ''+count(n||0)])
})

document.body.appendChild(
  h(['content2', 
    h.link('++', counter2, 1),
    counter2,
    h.link('--', counter2, -1)
  ])
)
