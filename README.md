# mQuery

## More Powerful Media Queries

Scriptable media queries. Simple, lightweight, no dependencies. Abstracts media query browser inconsistencies so you can focus on building a great responsive website.

## Quick Examples

Flexible arguments:

```
> mQuery({minWidth: "600px"}).media()
"(min-width: 600px)"
> mQuery("screen", {"min-width": "600px"}).media()
"screen and (min-width: 600px)"
> mQuery("not screen and (min-width: 600px)").media()
"not screen and (min-width: 600px)"
> mQuery("not screen and (min-width: 600px)", {maxWidth: '800px'}).media()
"screen and (min-width: 600px) and (max-width: 800px)"
```

Chainable:

```
> mQuery("tv").query("screen").query("print").media()
"tv, screen, print"
```

Evaluate media queries:

```
> mQuery({minWidth: "600px"}).matches()
true
```

Bind callbacks to media query updates:

```
> mQuery({minWidth: "600px"}).bind(function() {console.log(this.media());})
Object
```

## Media Query Reference

See [W3C Media Query Specification](http://www.w3.org/TR/css3-mediaqueries/) for more documentation on media queries.

<a name="operators" />
### Operators
```
only | not
```

---------------------------------------

<a name="media_types" />
### Media Types
```
all | aural | braille | handheld | print | projection | screen | tty | tv | embossed
```

---------------------------------------

<a name="media_features" />
### Media Features
```
width | min-width | max-width
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

In addition to these there are also vendor defined features i.g. [Mozilla](https://developer.mozilla.org/En/CSS/Media_queries#Mozilla-specific_media_features). mQuery does not prevent you from using these.

## Documentation

<a name="mQuery" />
### mQuery()

 * mQuery(query [, features])
 * mQuery(features)

__Arguments__

 * query - [Media type](#media_types) optionally preceded by an [operator](#operators).
 * features - Object of [media feature](#media_features)/value pairs. Feature can be camelcase so quotes aren't necessary. Value may be a function(feature) returning a computed value.

__Example__

```
> mQuery("screen").media()
"screen"
> mQuery("not screen").media()
"not screen"
> mQuery("only screen").media()
"only screen"
> mQuery("screen", {maxWidth: "600px"}).media()
"screen and (max-width: 600px)"
> mQuery("screen", {"min-width": "600px"}).media()
"screen and (min-width: 600px)"
> mQuery({"min-width": "600px"}).media()
"(min-width: 600px)"
> mQuery({"color": ""}).media()
"(color)"
> mQuery({maxWidth: function(feature) {return "600px";}}).media()
"(max-width: 600px)"
```

---------------------------------------

### query()

 * query(query [, features])
 * query(features)

Allows for multiple media queries to be chained. See [mQuery()](#mQuery) for usage.

__Example__

```
> mQuery('print').query('screen').query('tv').media()
"print, screen, tv"
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

### matches()

 * matches()

Execute the media query and return match success.

__Example__

```
> mQuery('all').matches()
true
```

---------------------------------------

### bind()

 * bind(callback())

Execute the media query and bind a media query listener. Browser will fire the callback when the media query match updates.

__Example__

```
> mQuery({minWidth: "600px"}).bind(function() {console.log(this.media());})
Object
```

---------------------------------------

### unbind()

 * unbind()

Remove the bound callback.

---------------------------------------

### get()

 * get()

Return the underlying MediaQueryList object.

---------------------------------------

### error()

 * error()

Execute the media query and return possible error condition. Useful for testing.

## Browser Support

[window.matchMedia](https://developer.mozilla.org/en/DOM/window.matchMedia) is supported by current versions of Firefox, Chrome, Safari, iOS Safari, and Android Browser. IE10 has support for matchMedia as [window.msMatchMedia](http://msdn.microsoft.com/en-us/library/windows/apps/hh453838.aspx). mQuery will use either one if available.

See also: [When can I use matchMedia?](http://caniuse.com/matchmedia)

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