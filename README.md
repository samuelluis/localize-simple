# Localize Simple

Simple library to localize your app

## It's simple
---

```html
<%- t("menu.home") %>
```

## Installation
---

Install node.js library:
```
npm install localize-simple
```

## How to use
---

```javascript
var localize = require('localize-simple');
```

### Library initialization (express required):
```javascript
app.use(localize(app, path_to_locales, default_locale));
//or exampled
app.use(localize(app, path.join(__dirname, 'locales'), "es"));
```

localize receive 3 params:

 - app: an express instance
 - path_to_locales: path to your locales folder which must to contains at least a **.js** file with name of default_locale, e.g.: *en.js*
 - default_locale: default value for locale that will be load if there isn't no locale set at session. If not passed ```"en"``` will be taken instead

### What else?

In locale files we need to have the same structure like this:

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

Then at view you can do:

```html
<%- t("menu.home") %>
```

And it's all!

### Changing locale

To change locale *localize-simple* declares the *GET* route ```'/locale/:lang/*'```, **:lang** is the locale to change, e.g.: *en*, *es* or any locale that you have declared. The wildcard ```*``` is the return_url to redirect to after changing the locale.

If we want to have a link to change locales you can put this:

```html
<a href="/locale/es/about">ES</a>
<!-- and/or -->
<a href="/locale/en/about">EN</a>
```

Clicking the one of the links above *localize-simple* will change the locale and redirect to **/about**.

### Doing something more complex

If you have a whole partial that have to change depends of the locale, you will be have access to variable called **lang** and it's value is the current local, e.g:

```html
<% if(lang=="en"){ %>
	<%- partial("profile_en") %>
<% } %>

<% if(lang=="es"){ %>
	<%- partial("profile_es") %>
<% } %>

<!-- or just -->

<%- partial("profile_"+lang) %>
```

### Passing params

If you have to use some param for you translation you can do this:

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

### Abount the structure

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

But you want to get the locale for **menu**:

```html
<%- t("menu") %>
```

Right now you'll get a whole content of **menu** key, and you can't define another **menu** key at the same path, you can do this:

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
For support or contact you can write to [samuel@bontix.com](mailto:samuel@bontix.com). If you found a bug or improve to do, post an [issue](https://github.com/samuelluis/localize-simple/issues).

Thanks for colaborate!
