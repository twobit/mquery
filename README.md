# mQuery

## More Powerful Media Queries

Scriptable media queries. Simple, lightweight, no dependencies.

## Documentation

### mQuery()

#### mQuery(query [, features])
#### mQuery(features)

```
> mQuery("screen")
"screen"
> mQuery("not screen")
"not screen"
> mQuery("only screen")
"only screen"
> mQuery("screen", {maxWidth: "600px"})
"screen and (max-width:600px)"
> mQuery("screen", {"min-width": "600px"})
"screen and (min-width:600px)"
> mQuery({"min-width": "600px"})
"(min-width:600px)"
> mQuery({"color": ""})
"(color)"
```

#### media()

#### match()
#### match(function())

## Browser Support

mQuery uses window.matchMedia.

window.matchMedia is available in:
 * Chrome 9
 * Firefox (Gecko) 6.0
 * Internet Explorer 10 PP3
 * Safari 5.1
 * Safari Mobile 5
 * Firefox Mobile (Gecko) 6.0

[MDC window.matchMedia](https://developer.mozilla.org/en/DOM/window.matchMedia)

## Demos

Not yet