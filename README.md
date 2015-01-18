# DEGA

Event delegation library on plain JavaScript.

> Simple, small only 1.2kb compressed and about 620 bytes gzipped.

Tested on latest Chrome, Firefox, Safari.

## Instalation

You can use Dega as global object, AMD or CommonJS module.

### Install as Bower Package:
```
bower install dega --save
```

### Install as NPM Module:
```
npm install dega --save
```

### Loading as CommonJS module:

```js
Dega = require('dega');
```

## Usage

```js
var handler = function(e) {
    e.preventDefault();

    console.log('event');
};

// Subscribe
Dega(document).on('click', '.link', handler);

// Unsubscribe
Dega(document).off('click', '.link', handler);
```

Dega is a self-invoking constructor, that means you **shouldn't** call it with ```new``` keyword.

Dega constructor accepts 2 kind of arguments:

1. HTMLElement
```js
Dega(document)
```
2. String — selector which will be used in document.querySelector:
```js
Dega('.class')
Dega('#id')
Dega('tag')
```

## TODO
* Remove All Events by Selector
* Remove All Events by Type
