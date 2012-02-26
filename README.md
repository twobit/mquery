# mQuery

## More Powerful Media Queries

Scriptable media queries. Simple, lightweight, no dependencies.

## Quick Examples

```
> mQuery("screen", {"min-width": "600px"}).media()
"screen and (min-width:600px)"
```

## Documentation

### Operators
<a name="operators" />
```
only | not
```

---------------------------------------

### Media Types
<a name="media_types" />
```
all | aural | braille | handheld | print | projection | screen | tty | tv | embossed
```

---------------------------------------

<a name="mQuery" />
### mQuery()

 * mQuery(query [, features])
 * mQuery(features)

__Arguments__

 * query - [Media type](#media_types) optionally preceded by an [operator](#operators).
 * features -

__Example__

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

---------------------------------------

### query()

 * query(query [, features])
 * query(features)

Allows for multiple media queries to be combined. See [mQuery()](#mQuery) for usage.

__Example__

```
> mQuery('print').query('screen').query('tv').media()
"print,screen,tv"
```

---------------------------------------

### media()

Returns the media query string.

__Example__

```
> mQuery('print').media()
"print"
```

---------------------------------------

### match()

 * match()
 * match(function())

Execute the media query and return match success. Accepts an optional callback parameter. Browser will fire the callback when the media query match changes.

__Example__

```
> mQuery('all').match()
true
```

---------------------------------------

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

## References

  * [W3C Media Query Specification](http://www.w3.org/TR/css3-mediaqueries/)
  * [MDN CSS Media Queries](https://developer.mozilla.org/En/CSS/Media_queries)

#### BNF Grammar
```
media_query_list: <media_query> [, <media_query> ]*
media_query: [[only | not]? <media_type> [ and <expression> ]*]
  | <expression> [ and <expression> ]*
expression: ( <media_feature> [: <value>]? )
media_type: all | aural | braille | handheld | print |
  projection | screen | tty | tv | embossed
media_feature: width | min-width | max-width
  | height | min-height | max-height
  | device-width | min-device-width | max-device-width
  | device-height | min-device-height | max-device-height
  | aspect-ratio | min-aspect-ratio | max-aspect-ratio
  | device-aspect-ratio | min-device-aspect-ratio | max-device-aspect-ratio
  | color | min-color | max-color
  | color-index | min-color-index | max-color-index
  | monochrome | min-monochrome | max-monochrome
  | resolution | min-resolution | max-resolution
  | scan | grid
```