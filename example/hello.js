var h = require('../')
var hello =
  h.widget(function (n) {
    if(!n) {
      var name = h.input()
      return h(['div',
        'what is your name?', name,
        h.link('okay', hello, name)
      ])
    }
    else
      return h(['div',
        'hello, ' + n,
        h.link('again', hello, '')
      ])
  })

document.body.appendChild(h(hello))

//some ideas about what this could look like in other possible syntaxes
/*
//pure JSON. ugly, but parser already exists.
{hello: [{name: ''},
  {'$':['?',
    {$:'name'},
    ['div', 'what is your name', {name_input: ['input']},
      ['link', {$:'hello'}, {$:'name_input'}]],
    ['div',
      'hello, ', {$:'name'},
      ['link', {$:'hello'}, 'again']
    ]
  ]}
]}

//lisp
(let hello (name) (
  (? name
    (div 'what is your name?'
      (let name_input (input))
      (link hello 'okay' name_input)
    )
    (div 'hello, ' name (link hello 'again'))
  )))

//: for assignment, ; marks end of argument list
//argument lists don't need a comma separator.

hello: { name;
  name
  ? div(
      'what is your name?'
      name_input: input ()
      link(hello 'okay' name_input)
    )
  : div ('hello, ' name link(hello 'again'))
}
*/

