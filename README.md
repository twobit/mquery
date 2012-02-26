# mQuery

## More Powerful Media Queries

Scriptable media queries. Simple, lightweight, no dependencies.

## Documentation

### mQuery()

#### mQuery(query [, features])
#### mQuery(features)

```
> mQuery("screen").media()
"screen"
> mQuery("not screen").media()
"not screen"
> mQuery("only screen").media()
"only screen"
> mQuery("screen", {maxWidth: "600px"}).media()
"screen and (max-width:600px)"
> mQuery("screen", {"min-width": "600px"}).media()
"screen and (min-width:600px)"
> mQuery({"min-width": "600px"}).media()
"(min-width:600px)"
> mQuery({"color": ""}).media()
"(color)"
```

#### query()

See mQuery().

#### media()

Output media query string.

#### match()
#### match(function())

Evaluate the media query. Accepts a callback fired when media query dynamically updates.

## Browser Support

mQuery uses [window.matchMedia](https://developer.mozilla.org/en/DOM/window.matchMedia).

window.matchMedia is available in:

  * Chrome 9
  * Firefox (Gecko) 6.0
  * Internet Explorer 10 PP3
  * Safari 5.1
  * Safari Mobile 5
  * Firefox Mobile (Gecko) 6.0



## Demos

Not yet