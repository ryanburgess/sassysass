# SassySass
[![npm version](https://badge.fury.io/js/sassysass.svg)](http://badge.fury.io/js/sassysass)

With a simple command, add a well-structured architecture for your project's CSS. Based off the [SMACSS](https://smacss.com/) methodology, SassySass creates a simple, maintainable structure for your Sass files.

![SassySass in the terminal](https://raw.github.com/ryanburgess/sassysass/master/sassysass.gif)

## Install

```js
npm install sassysass -g
```
## Use
Run ```sassysass``` in your project directory.

To create new individual Sass files run ```sassysass-page```. If the name isn't set the file will be named 'page' and if the path isn't set it assumes the directory is 'sass'.

To create new Sass module run ```sassysass-module```. If the name isn't set the file will be named 'module' and if the path isn't set it assumes the directory is 'sass/modules'.

SassySass Architecture
----------
1.  Utils
  The utils directory contains Sass partials like:
  * Vendor dependancies (Compass, Foundation)
  * Authored dependancies (Mixins, Extends)

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

## Release History
* 1.0.9: [Issue 8](https://github.com/ryanburgess/sassysass/issues/8) Update translate mixin to use a axis variable.
* 1.0.8: [Issue 2](https://github.com/ryanburgess/sassysass/issues/2) add import reference to root SCSS files when creating a new module.
* 1.0.7: Add modules to a page when creating the page SCSS file.
* 1.0.6: add description question for creating a module.
* 1.0.5: [Issue 1](https://github.com/ryanburgess/sassysass/issues/1) - prevent overwriting files.
* 1.0.4: [Pull 4](https://github.com/ryanburgess/sassysass/pull/4) - added some "sass" to the prompts.
* 1.0.3: [Issue 3](https://github.com/ryanburgess/sassysass/issues/3) - add prompts for setting up modules and pages.
* 1.0.2: Add animated terminal gif to demonstrate SassySass in use.
* 1.0.1: Update documentation.
* 1.0.0: Initial release.

## Contributing
1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## License
MIT © [Ryan Burgess](http://github.com/ryanburgess)
