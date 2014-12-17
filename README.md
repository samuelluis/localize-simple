# Localize Simple

[![Build Status](https://magnum.travis-ci.com/lavaina/shopify-lavaina.svg?token=BauG5YDiPYVqHu1FSQGz&branch=devel)](https://magnum.travis-ci.com/lavaina/shopify-lavaina)
[![Code Climate](https://img.shields.io/codeclimate/github/samuelluis/localize-simple.svg?style=flat)](https://codeclimate.com/github/samuelluis/localize-simple)
[![Codacy Badge](https://img.shields.io/codacy/71f38b9f6d7543cca436eb76627b87d3.svg?style=flat)](https://www.codacy.com/public/samuelluis/localize-simple)
[![NPM downloads](https://img.shields.io/npm/dm/localize-simple.svg?style=flat)](https://www.npmjs.com/package/localize-simple)
[![NPM version](https://img.shields.io/npm/v/localize-simple.svg?style=flat)](https://www.npmjs.com/package/localize-simple)
[![License](https://img.shields.io/npm/l/localize-simple.svg?style=flat)](https://www.npmjs.com/package/localize-simple)

Simple library to localize your app

## It's simple

```html
<%- t("menu.home") %>
```

## Installation

Install node.js library:
```
npm install localize-simple
```

## How to use

```javascript
var localize = require('localize-simple');
```

### Library initialization (express or another router required):
```javascript
//syntax
app.use(localize({ router: router, path: locales_path, default: default_locale }));
//example
app.use(localize({
	router: app,
	path: path.join(__dirname, 'locales'),
	default: "es"
}));
```

#### Options

 - `router`: an express instance or another router like `router.get(url, callback)`.
 - `path`: path to your locales folder which must to contains at least a **.js** file with name of default_locale, e.g.: *en.js*
 - `default`: default value for locale that will be load if there isn't no locale set at session. If not passed ```"en"``` will be taken instead

### What else?

We need to have the same structure between locale files, like this:

```javascript
//en.js
module.exports = {
	menu: {
		home: "Home"
	}
};
```
```javascript
//es.js
module.exports = {
	menu: {
		home: "Inicio"
	}
};
```

So in views you can do:

```html
<%- t("menu.home") %>
```

And that's it!

### Changing locale

To change locale *localize-simple* declares the *get* route ```'/locale/:lang/*'```, **:lang** is the locale to change, e.g.: *en*, *es* or any locale that you've declared. The wildcard ```*``` is the return_url to go after changing the locale.

If we want to have a link to change locales you can have:

```html
<a href="/locale/es/about">ES</a>
<!-- and/or -->
<a href="/locale/en/about">EN</a>
```

Clicking the one of the links above *localize-simple* will change the locale and redirect to **/about**.

### Doing something more complex

If you have a whole partial whose content must change depending on the locale, you also have access to variable called **lang** whose value is the current locale, e.g:

```html
<% if (lang === "en"){ %>
	<%- partial("profile_en") %>
<% } %>

<% if (lang === "es"){ %>
	<%- partial("profile_es") %>
<% } %>

<!-- or just -->

<%- partial("profile_"+lang) %>
```

### Passing params

If you want to have some variable in your translation you can do this:

```javascript
//en.js
module.exports = {
	menu: {
		home: "Home",
		download: "Download our {version} version"
	}
};
```
```javascript
//es.js
module.exports = {
	menu: {
		home: "Inicio",
		download: "Descarga nuestra versión {version}"
	}
};
```

```html
<%- t("menu.download", {version: "2.5"}) %>
```

And you'll get:

for **en**:

*Download our 2.5 version*

for **es**:

*Descarga nuestra versión 2.5*

### About the structure

If you have a structure like this:

```javascript
//en.js
module.exports = {
	menu: {
		home: "Home",
		download: "Download our {version} version"
	}
};
```

But you want to get the locale text for **menu**:

```html
<%- t("menu") %>
```

Right now you'll get the message: **translation missing for: [locale].menu**, but you can't define another **menu** key at the same path, you can do this:

```javascript
//en.js
module.exports = {
	menu: {
		default: "Menu",
		home: "Home",
		download: "Download our {version} version"
	}
};
```

And now you'll get the right text you want.

#### Contact
For support or contact you can write to [samuelluis@outlook.com](mailto:samuelluis@outlook.com). If you found a bug or have any suggestions, please post an [issue](https://github.com/samuelluis/localize-simple/issues).

Thanks for collaborating!
