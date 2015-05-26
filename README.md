# Lang.js
a powerful JavaScript localization

## Install
### Easy Install:
use this code in your `<head>` tag:
```html
<script src="https://raw.githubusercontent.com/ATofighi/Lang.js/master/src/lang.js"></script>
```
### Bower:
you can also use bower with this command line:
```
bower install atofighi/Lang.js
```

## How to use?
### Add resources:
you can use `Lang.addResource` method to add your tranlations:
```js
Lang.addResources({
  hi: 'Hi',
  welcome: 'Welcome :name!',
  downloads: '{0}No Downloads|[1, 5]afew downloads|[6, 10] About 7 Downloads|[10, Inf] :count Downloads',
  apples: 'There is one apple|There are many apples',
  fileType: {
    php: 'PHP',
    js: 'JavaScript',
    html: 'HTML'
  }
});
```

### Basic usage:
```js
Lang.get('hi'); // Hi
Lang.get('fileType.js'); // JavaScript
```

### Pluralization
Pluralization is a complex problem, as different languages have a variety of complex rules for pluralization. You may easily manage this in your language files. By using a "pipe" character, you may separate the singular and plural forms of a string:
```
apples: 'There is one apple|There are many apples',
```
Now, you can use `Lang.choice` method:
```js
Lang.choice('apples', 1); // There is one apple
Lang.choice('apples', 2); // There are many apples
Lang.choice('apples', 20); // There are many apples
```

You can also use rules for pluralization like this:
```
downloads: '{0}No downloads|{1} One download|[2, 5]a few downloads|[6, 10] About 7 downloads|[10, Inf] :count downloads',
```
And use this code:
```js
Lang.choice('downloads', 0); // No downloads
Lang.choice('downloads', 1); // One download
Lang.choice('downloads', 2); // a few downloads
Lang.choice('downloads', 3); // a few downloads
Lang.choice('downloads', 5); // a few downloads
Lang.choice('downloads', 8); // About 7 downloads
Lang.choice('downloads', 10); // 10 downloads
Lang.choice('downloads', 100); // 100 downloads
```


### Parameters
You can also use some parameters in you languages:
```js
Lang.get('welcome', {'name': 'ATofighi'}); // Welcome ATofighi!
```
