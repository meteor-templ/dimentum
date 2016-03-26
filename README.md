# Dimentum

Directed momentum animation.

## Install

```
meteor add templ:dimentum
```

## Documentation

Adds an animation `dimentum` with the ability to configure some properties.

### Properties

* `inX = 0`
* `inY = 0`
* `outX = 0`
* `outY = 0`
* `inScaleX = [1, 0.8]`
* `inScaleY = [1, 0.8]`
* `outScaleX = [0.8, 1]`
* `outScaleY = [0.8, 1]`

### Example

An example of the appearance and disappearance of the item from right.

```html
{{#momentum plugin='dimentum'}}
    {{#each documents}}
        <div style="width: 100px; height: 100px; background-color: black;" class="center-block" data-dimentum='{"inX":2,"inY":0,"outX":2,"outY":0}'>
        </div>
    {{/each}}
{{/momentum}}
```

You can use helpers for generate it:

```js
Template.document.helpers({
    dimentum: function() { return JSON.stringify({ inX: 2, inY: 0, outX: 2, outY: 0 }); }
});
```