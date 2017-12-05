# Sassy Sass
[![npm version](https://badge.fury.io/js/sassysass.svg)](http://badge.fury.io/js/sassysass) [![npm](https://img.shields.io/npm/dm/sassysass.svg)](https://github.com/ryanburgess/sassysass) [![Build Status](https://travis-ci.org/ryanburgess/sassysass.svg?branch=master)](https://travis-ci.org/ryanburgess/sassysass)

![Sassy Sass Logo](https://raw.github.com/ryanburgess/sassysass/master/sassysass-logo.png)

Sassy Sass is a scaffolding tool to help you organize your project’s Sass structure.

With a simple command, add a well-structured architecture for your project's CSS. Based off the [SMACSS](https://smacss.com/) methodology, SassySass creates a simple, maintainable structure for your Sass files.

![SassySass in the terminal](https://raw.github.com/ryanburgess/sassysass/master/sassysass.gif)

## Install

```js
npm install sassysass -g
```
## Use
Run ```sassysass install``` in your project directory.

To create new individual Sass files run ```sassysass page```. If the name isn't set the file will be named 'page' and if the path isn't set it assumes the directory is 'sass'.

To create new Sass module run ```sassysass module```. If the name isn't set the file will be named 'module' and if the path isn't set it assumes the directory is 'sass/modules'.

Sassy Sass Architecture
----------
1.  Utils
  The utils directory contains Sass partials like:
  * Vendor dependencies (Compass, Foundation)
  * Authored dependencies (Mixins, Extends)

2.  Base

  The base directory contains Sass partials like:
  * Variables
  * Fonts
  * Reset

3.  Layout

  The layout directory contains Sass partials like:
  * Responsive Grid
  * Page specific layouts

4.  Modules

  The modules directory contains Sass partials like:
  * Header
  * Footer
  * Navigation
  * Content Block

5.  Themes

  The themes directory contains Sass partials that overwrite the styles in layout or modules.

## Contributing
1. Fork it
2. Run `npm install`
3. Run `gulp`
4. Create your feature branch (`git checkout -b my-new-feature`)
5. Commit your changes (`git commit -am 'Add some feature'`)
6. Push to the branch (`git push origin my-new-feature`)
7. Create new Pull Request

## License
MIT © [Ryan Burgess](http://github.com/ryanburgess)
