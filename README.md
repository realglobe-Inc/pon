pon
==========

<!---
This file is generated by ape-tmpl. Do not update manually.
--->

<!-- Badge Start -->
<a name="badges"></a>

[![Build Status][bd_travis_shield_url]][bd_travis_url]
[![Build Status][bd_travis_com_shield_url]][bd_travis_com_url]
[![npm Version][bd_npm_shield_url]][bd_npm_url]
[![JS Standard][bd_standard_shield_url]][bd_standard_url]

[bd_repo_url]: https://github.com/realglobe-Inc/pon
[bd_travis_url]: http://travis-ci.org/realglobe-Inc/pon
[bd_travis_shield_url]: http://img.shields.io/travis/realglobe-Inc/pon.svg?style=flat
[bd_travis_com_url]: http://travis-ci.com/realglobe-Inc/pon
[bd_travis_com_shield_url]: https://api.travis-ci.com/realglobe-Inc/pon.svg?token=aeFzCpBZebyaRijpCFmm
[bd_license_url]: https://github.com/realglobe-Inc/pon/blob/master/LICENSE
[bd_codeclimate_url]: http://codeclimate.com/github/realglobe-Inc/pon
[bd_codeclimate_shield_url]: http://img.shields.io/codeclimate/github/realglobe-Inc/pon.svg?style=flat
[bd_codeclimate_coverage_shield_url]: http://img.shields.io/codeclimate/coverage/github/realglobe-Inc/pon.svg?style=flat
[bd_gemnasium_url]: https://gemnasium.com/realglobe-Inc/pon
[bd_gemnasium_shield_url]: https://gemnasium.com/realglobe-Inc/pon.svg
[bd_npm_url]: http://www.npmjs.org/package/pon
[bd_npm_shield_url]: http://img.shields.io/npm/v/pon.svg?style=flat
[bd_standard_url]: http://standardjs.com/
[bd_standard_shield_url]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

Simple task runner to make you happy.

<!-- Description End -->


<!-- Overview Start -->
<a name="overview"></a>



<!-- Overview End -->


<!-- Sections Start -->
<a name="sections"></a>

<!-- Section from "doc/guides/00.TOC.md.hbs" Start -->

<a name="section-doc-guides-00-t-o-c-md"></a>

Table of Contents
----------------

- [pon](#pon)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Advanced Usage](#advanced-usage)
    + [Defining task in various ways](#defining-task-in-various-ways)
  * [CLI Usage](#cli-usage)
  * [Develop Own Plugin](#develop-own-plugin)
    + [Install scaffold CLI](#install-scaffold-cli)
    + [Task Plugin](#task-plugin)
  * [License](#license)
  * [Links](#links)


<!-- Section from "doc/guides/00.TOC.md.hbs" End -->

<!-- Section from "doc/guides/01.Installation.md.hbs" Start -->

<a name="section-doc-guides-01-installation-md"></a>

Installation
-----

```bash
$ npm install pon --save
```


<!-- Section from "doc/guides/01.Installation.md.hbs" End -->

<!-- Section from "doc/guides/02.Usage.md.hbs" Start -->

<a name="section-doc-guides-02-usage-md"></a>

Usage
---------

Create runner with tasks and pass task names to run

```javascript
'use strict'

const pon = require('pon')

const css = require('pon-task-css')
const browser = require('pon-task-browser')

async function tryExample () {
  const run = pon({
    'ui:css': css('ui/stylesheets', 'public'),
    'ui:browser': browser('shim/entrypoints', 'public')
  })

  // Execute task by names
  await run('ui:css', 'ui:browser')
}

tryExample()

```


<!-- Section from "doc/guides/02.Usage.md.hbs" End -->

<!-- Section from "doc/guides/03.Advanced Usage.md.hbs" Start -->

<a name="section-doc-guides-03-advanced-usage-md"></a>

Advanced Usage
---------

### Defining task in various ways

* Task is just an async function
* Task can be a string which is the name of another task
* Tasks can be nested
* Task can be array of function (or string)


```javascript
'use strict'

const pon = require('pon')

async function tryNested () {
  const run = pon({
    // Just pass a async function to define custom task
    async yell () { /* ... */ },
    // Arrayed functions runs sequentially
    swing: [ async function up () { /* ... */ }, async function down () { /* ... */ } ],
    fitness: {
      async walk () { /* ... */ },
      async run () { /* ... */ },
      // Default call
      default: [ 'fitness/walk', 'fitness/run' ]
    },
    // Call another tasks
    yellAndRun: [ 'yell', 'fitness/run' ]
  })

  await run('yell', 'swing') // Runs tasks sequentially
  await run('fitness/*') // By pattern
  await run('fitness') // Same as call `await run('fitness.default')
  await run('yellAndRun') // Call another tasks
}

tryNested()

```


<!-- Section from "doc/guides/03.Advanced Usage.md.hbs" End -->

<!-- Section from "doc/guides/04.CLI Usage.md.hbs" Start -->

<a name="section-doc-guides-04-c-l-i-usage-md"></a>

CLI Usage
---------

Install [pon-cli](https://github.com/realglobe-Inc/pon-cli#readme) as global module.

```bash
$ npm install pon-cli -g
```

Create **Ponfile.js** at your project root and define tasks there.

```javascript
'use strict'

const pon = require('pon')

module.exports = pon({
  'myapp:do-something': async function doSomething () {
    /* ... */
  }
})

```

Then, call task from command line


```bash
pon "myapp:*"

```


<!-- Section from "doc/guides/04.CLI Usage.md.hbs" End -->

<!-- Section from "doc/guides/10.Develop Own Plugin.md.hbs" Start -->

<a name="section-doc-guides-10-develop-own-plugin-md"></a>

Develop Own Plugin
---------

Use [pon-scaffold](https://github.com/realglobe-Inc/pon-scaffold) to generate your own plugin.

### Install scaffold CLI

```bash
npm i pon-scaffold -g
```



### Task Plugin

Pass the task name to generate

```bash
pon-scaffold task "pon-task-my-own"
```

Then, edit ***lib/define.js*** under the generated project.


<!-- Section from "doc/guides/10.Develop Own Plugin.md.hbs" End -->


<!-- Sections Start -->


<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [Apache-2.0 License](https://github.com/realglobe-Inc/pon/blob/master/LICENSE).

<!-- LICENSE End -->


<!-- Links Start -->
<a name="links"></a>

Links
------

+ [Pon][pon_url]
+ [Realglobe, Inc.][realglobe,_inc__url]

[pon_url]: https://github.com/realglobe-Inc/pon
[realglobe,_inc__url]: http://realglobe.jp

<!-- Links End -->
