
var h = require('../')

var counter = h.widget(function (val) {
  val = val || 0
  return h(['counter',
    h(['h1',
      h.link('++', counter, val + 1),
      ''+val,
      h.link('--', counter, val - 1)
    ])
  ])
})

document.body.appendChild(
  h(['content', counter])
)

//
//{$: [defun, 'count', ['n'], [
//  header, [
//    [link, {target: [$count, {$: ['+', {$:'n'}, 1]}]}, '++'],
//    {$: 'n'},
//    [link, {target: [$count, {$: ['-', {$:'n'}, 1]}]}, '--'],
//
//]}
//
//(defun count (n) (
//  (header (
//    (link (lambda (count (+ n 1))) '++')
//    n
//    (link (lambda (count (- n 1))) '--')
//  ))
//))
//
//
//def count (n) {
//  header (
//    link('++'){count(n + 1)}
//    number({min: -100 max: 100} n)
//    link('--'){count(n - 1)}
//  )
//}
//
//body(count(0))
//
//


