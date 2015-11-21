# Vue Tables

This Vue component offers an easy and intuitive way of creating and displaying data tables with data coming from the client or from the server using AJAX requests.
It includes all the usual features: a search field, limit select, total records, sorting and pagination.
The Styling is based on Bootstrap, but of course you can write your own.

*This is a new pacakge and as such it is constantly evolving. Please help me improve it by submitting bug reports, enhancment requests, questions and other issues.*

- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
    - [Client Side](#client-side)
    - [Server Side](#server-side)
- [Options](#options)

# Dependencies

* JQuery. Required.
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

  [Check out the live client-side demo](https://jsfiddle.net/matfish2/tgp2vrh5/)

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

  All the data is passed in the following GET parameters: `query`,`limit`,`page`,`orderBy`,`ascending`.
  You need to return a JSON object with two properties:

  `data` `array` - An array of row objects with identical keys.

  `count` `number` - Total count before limit.

At times you might want to refresh the data, as a reaction to data alteration on the server. To do so hunt down the component's instance using `$parent` and `$children` and call the `refresh()` method on it.

  [Check out the live server-side demo, including a code sample](http://ucantourit.co.il/vt-demo.php)

### Implementations

  I have included [an Eloquent implementation](https://github.com/matfish2/vue-tables/tree/master/server/PHP) for Laravel Users.
  If you happen to write other implementations for PHP or other languages, a pull request would be most welcome, under the following guidelines:

  a. Include the class under `./server/{language}`.

  b. Name it according to convention: `{concrete}VueTables`.

  c. if this is the first implementation in this language add an interface and an abstract parent class, similar to the ones found in the PHP folder.

  d. Have it implement the interface and extend the parent class.

  e. TEST IT.

----------------------

Note: If your server requests are relatively slow you can latch a loading gif or animated CSS into the `.VueTables__loading-icon` element, which is conditionally added as a child of `.VueTables__search__input`.

## Options

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

* `perPage`  `number`

Default records-per-page are set to 10. Acceptable values are 5,10,20,50.

* `templates`  `Object`

Use this to wrap your cell content with a template using wildcards. You can also create new custom columns. e.g:

    templates: {
      name:"<b>{name}</b>",
      edit:"<a href='{id}'><i class='fa fa-edit'></i></a>"
    }

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
  On the server-side component the query string needs to be decoded back to an array. Check out the [PHP implementation](https://github.com/matfish2/vue-tables/tree/master/server/PHP/VueTables.php) for a hint.

* `delay` `number` (server-side only)

In order to avoid redundant server requests and data rendering, a 300ms delay is set to detect when the user has ended his query.
Use this option to set your own delay value. (e.g adapt the value to the average typing speed of your intended audience).

* `dateFormat`  `string` (client-side only)

When passing dates to the client-side component pass a `Date` object rather than a plain string.

This results in two benefits:

1. Dates are always correctly sorted regardless of their presentation.
2. You are not hardcoding the format into each date property.

By default date will be presented using the native `toLocaleDateString()` function.
To override this behaviour specify your own format:

    {
        dateFormat: "M-Y" // e.g "11-2015"
    }

The conventions are:

#### Date:

`Y` or `y` - full year

`M` - Month with leading zeros

`m` - Month without leading zeros.

`D` - Day with leading zeros.

`d` - Day without leading zeros.


#### Time (separate from date by a single space):

`H` - 24-hour format of an hour with leading zeros  00 through 23

`h` -  12-hour format of an hour with leading zeros  01 through 12

`G` - 24-hour format of an hour without leading zeros

`g` - 12-hour format of an hour without leading zeros

`i` -  Minutes with leading zeros

`s` - Seconds, with leading zeros

Spearators:

Date: `-`, `.` , `/`
Time : `:`

If an invalid format was passed it will resort to the default format and spit out a warning to the console.

-----------------
CSS Note: to center the pagination apply `text-align:center` to the wrapping element
