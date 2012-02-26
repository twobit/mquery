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

Not yet

## Demos

Not yet