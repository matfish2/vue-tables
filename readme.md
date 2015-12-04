# Vue Tables

[![Build Status](https://travis-ci.org/matfish2/vue-tables.svg)](https://travis-ci.org/matfish2/vue-tables)

This Vue package offers an easy and intuitive way of displaying Bootstrap-styled grids with data coming either from the client or from the server.

- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
    - [Client Side](#client-side)
    - [Server Side](#server-side)
- [Options](#options)

# Dependencies

* JQuery. Required Globally.
* Vue.js (>=1.0). Required.
* Bootstrap (CSS). Optional.

# Installation

## Option 1

    npm install vue-tables

Require the script:

    var VueTables = require('vue-tables');

## Option 2

Simply import the [compiled standalone file](https://raw.githubusercontent.com/matfish2/vue-tables/master/dist/vue-tables.min.js) into your HTML, which will expose a global `VueTables` variable.

# Usage

## Register the component(s)

    Vue.use(VueTables.client, options);
    Vue.use(VueTables.server, options);

## Client Side

Add the following element to your page wherever you want it to render.
Make sure to wrap it with a parent element you can latch your vue instance into.

    <div id="people">
      <v-client-table :data="tableData" :options="options"></v-client-table>
    </div>

Create a new Vue instance (You can also nest it within other components). An example works best to illustrate the syntax:

    new Vue({
      el:"#people",
      data: {
        tableData: [
          {id:1, name:"John",age:"20"},
          {id:2, name:"Jane",age:"24"},
          {id:3, name:"Susan",age:"16"},
          {id:4, name:"Chris",age:"55"},
          {id:5, name:"Dan",age:"40"}
        ],
        options: {
             headings: {
              id:'ID',
              name:'Name',
              age:'Age'
          }
        }
      }
    });

  Note: you must pass an `id` field as it is used to track the data for faster rendering.
  Of course you don't have to show it. See below the `columns` option.

  [Check out the live client-side demo](https://jsfiddle.net/matfish2/f5h8xwgn/)

## Server side

    <div id="people">
      <v-server-table url="/people" :options="options"></v-server-table>
    </div>

Javascript:

    new Vue({
        el:"#people",
        data: {
          options: {
            headings: {
              id:'ID',
              name:'Name',
              age:'Age'
            }
         }
      }
      });

  All the data is passed in the following GET parameters: `query`,`limit`,`page`,`orderBy`,`ascending`,`byColumn`.
  You need to return a JSON object with two properties:

  `data` `array` - An array of row objects with identical keys.

  `count` `number` - Total count before limit.

### Events

`vue-tables.loading`

Fires off when a request is sent to the server. Sends through the request data.

`vue-tables.loaded`

Fires off after the response data has been attached to the table. Sends through the response.

You can listen to those complementary events on a parent component and use them to add and remove a *loading indicator*, respectively.

### Programmatic reload

At times you might want to refresh the data as a reaction to data alteration on the server-side. To do so hunt down the component's instance using `$parent` and `$children` and call the `refresh()` method on it.

  [Check out the live server-side demo, including a code sample](http://ucantourit.co.il/vt-demo.php)

### Implementations

  I have included [an Eloquent implementation](https://github.com/matfish2/vue-tables/tree/master/server/PHP) for Laravel Users.
  If you happen to write other implementations for PHP or other languages, a pull request would be most welcome, under the following guidelines:

  a. Include the class under `./server/{language}`.

  b. Name it according to convention: `{concrete}VueTables`.

  c. if this is the first implementation in this language add an interface similar to the one found in the PHP folder.

  d. Have it implement the interface.

  e. TEST IT.


# Options

Options are set in three layers, where the more particular overrides the more general.

1. Pre-defined component defaults.
2. Applicable user-defined defaults for the global Vue Instance. Passed as the second paramter to the `Use` statement.
3. Options for a single table, passed through the `options` prop.

----------------

* `headings` `Object`

By default the column names are gleaned from the properties.
Use this to set custom headings.

* `columns`  `Array`

By default all columns passed as data will be displayed.
If you want to set explicitly which columns will show use this option.

* `sortable`  `Array`

By Default all columns (except extras) are sortable. Use this option to explicitly state which columns should be sortable.
Sortable headings will receive a `VueTables__sortable` class.

* `perPage`  `number`

Default records-per-page are set to 10.

* `perPageValues` `Array`

Default: `[10,25,50,100]`

* `templates`  `Object`

Use this to wrap your cell content with a template using wildcards. You can also create new custom columns. e.g:

    templates: {
      name:"<b>{name}</b>",
      edit:"<a href='{id}'><i class='fa fa-edit'></i></a>"
    }

* `compileTemplates` `boolean`

Set this to `true` if your templates contain some vue-specific HTML logic that needs to be compiled.
Note: The logic is attached to *the component's instance*, so don't forget to factor in the scope (e.g `<span @click="$parent.doSomething({id})">Click me</span>`)

* `texts`  `Object`

Override default texts for localization or otherwise. Defaults are:

    texts:{
      count:"{count} Records",
      filter:"Filter Results:",
      filterPlaceholder:"Search query",
      limit:"Records:",
      noResults:"No matching records",
      page:"Page:" // for dropdown pagination,
      filterBy: "Filter by {column}" // Placeholder for search fields when filtering by column
    }

* `pagination`  `object`

  * `dropdown` `boolean`
    For large sets of data you can set this option to `true` to use a dropdown select pagination next to the records-per-page list, instead of links at the bottom of the table.

   * `chunk` `number`
      By Default pagination links are presented in groups of 10, with navigation between the groups.
      Use this option to set your own chunk size.

* `filterByColumn` `boolean`

  When set to `true` a unique per-column filter will appear under each header, instead of the generic one.
  On the server-side component a boolean `byColumn` param is sent along with the request to indicate what type of query was sent.
  Check out the [Eloquent implementation](https://github.com/matfish2/vue-tables/tree/master/server/PHP).

* `highlightMatches` `boolean`

  When set to `true` all texts matching the query will be wrapped with a `b.VueTables__highlight` element.

* `skin` `string`

  space separated Bootstrap table styling classes. Default: `table-striped table-bordered table-hover`

* `orderBy` `object`

  By default the client-side component will initially sort by the first column, and the server-side component by an alleged `id` column, both ascending. use this option to override it.

  * `column` `string`
  * `ascending` `boolean`

* `bottomHeadings` `boolean`

  when set to `true` the headings will be duplicated and displayed at the bottom of the table as well

* `delay` `number` (server-side only)

In order to avoid redundant server requests and data rendering, a 500ms delay is set to detect when the user has ended his query.
Use this option to set your own delay value. (e.g adapt the value to the average typing speed of your intended audience).

* `dateFormat`  `string` (client-side only)

When passing dates to the client-side component pass a `Date` object rather than a plain string.

This results in two benefits:

1. Dates are always correctly sorted regardless of their presentation.
2. You are not hardcoding the format into each date property.


The `dateFormat` option is passed to the popular [dateformat](https://www.npmjs.com/package/dateformat) package for parsing the date, so use its conventions.

-----------------
CSS Note: to center the pagination apply `text-align:center` to the wrapping element
