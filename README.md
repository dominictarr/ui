# ui

In REST, we build applications where a Representation of the State
is Transferred.

Here, I experiment with the same idea, except that state representations
can be nested.

In rest, web pages represent states, and links take you between states.
Forms are also used to transfer between states, but do not really change
the model, they essentially just allow you to create parametric links.

So, instead of transiting state at the scale of an entire page at once,
transit the state of _individual widgets_. The web did have some support
for this, via frames/iframes but they layouts possible with frames
are limited because you need a special frameset document, and each
widget must be defined in it's own file which makes maintanence awkward.

This prototype allows multiple widgets to be nested, following scoping rules
just like javascript. (this prototype is implemented _as javascript_ but
it's intended to work like this)

So, this extends the notion of a link - a link html link has a href,
link text, and _link target_. On a html link, the target can only have a
[few possible values](http://www.w3schools.com/tags/att_link_target.asp)

In our prototype, the link target is a function to be called to retrive
a new state, and the href is a value to pass to that function, similar
to a URL.

## Example - counter

Here, we create a counter widget that has a number (the current value of the
counter) and two links to update the current state. As described above,
the links do not take you to a whole new page, they just take you to a
new partial state - namely, incrementing the counter!

```
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
```

## Example -- hello world

create a widget that asks for a name, and then says hello to the name given.
```
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
        h.link('goodbye', hello, '')
      ])
  })
```

Again, this creating an widget, and then triggering it's own rendering
again with new arguments.

## API

### h(array)

convert an array into ui elements (for now, html)
the first element is the classname, and the rest should be either
strings or other elements.

### h.widget(fun)

create a widget. this takes a function that can be called with arguments,
that returns ui elements.

### h.link(text, target, value)

create a link with the given link `text`, and when it's clicked,
call the `target` with `value`. `value` may be a input (see below),
or an object which may contain inputs as properties. i.e. `{name: input}`

### h.input()

create a input field. inputs are used to parameterize links.
in the hello example, the user inputs a name, and then that is used
to link update it's current state (links with parameters are similar
to http POSTs, and links without are similar to http GETs)

## Potential

My aim here, is to create something slightly more sophisticated than
a template system, so that you can realistically create dynamic
applications without _actually_ doing any "programming".

Once the backend apis are provided (which is the part that involves
real programming) the front end can be generated from a non-turing complete
description - obviously, some recursion is involved, but since each
iteration depends on a user input (a link click) then there is not a risk
of infinite loops.

My hope is that this could be simple enough that it would be accessible
to someone with basic computer skills, say, someone who could write
html, but not requiring the breath of knowledge of say, a computer science
degree.

This is just a basic proof of concept written as a js api.
Using JS directly makes it very easy create this prototype, but means
there are quite a few syntaxical edgecases, and you still have
the full power of javascript - which is a bad thing. The next step,
is to make a new syntax that is easier to get right, and has less cruft.

here is one sketch of what that syntax might look like:

```
hello: { name;
  name
  ? div(
      'what is your name?'
      name_input: input ()
      link(hello 'okay' name_input)
    )
  : div ('hello, ' name link(hello 'again'))
}
```

`:` is assignment, `;` marks end of argument list
argument lists don't need a comma separator.
string literals and ternaries are the same as in javascript.
(possibly ternaries ought to be replaced with `if then else`)

## License

MIT
