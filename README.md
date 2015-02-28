Event delegation library on plain JavaScript.

> Simple, small only 1.2kb compressed and about 620 bytes gzipped.

Tested on latest Chrome, Firefox, Safari, Opera, IE9+.

## Instalation

You can use Dega as global object, AMD or CommonJS module.

#### Install as Bower Package:
```
bower install dega --save
```

#### Install as NPM Module:
```
npm install dega --save
```

#### Loading as CommonJS module:

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

## Performance

Dega vs jQuery 2.1.3 comparsion — [jsperf](http://jsperf.com/dega-vs-jquery-v2).

I don't know how long link will work, so there are some screenshots:

![Chrome 42](https://cloud.githubusercontent.com/assets/200119/6426771/a9029e30-bf7b-11e4-9285-101ce2d483db.png)
![Firefox 36](https://cloud.githubusercontent.com/assets/200119/6426772/a902a178-bf7b-11e4-8f66-62783b11801d.png)
![Opera 27](https://cloud.githubusercontent.com/assets/200119/6426774/a9076f78-bf7b-11e4-8c19-f39901181a89.png)
![Safari 8](https://cloud.githubusercontent.com/assets/200119/6426773/a902c338-bf7b-11e4-98ed-e49e272b8f7a.png)

## TODO
* Remove All Events by Selector
* Remove All Events by Type
* Use querySelectorAll instead of querySelector
* Add more test cases
