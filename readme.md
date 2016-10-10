# Vue Tables

Note: using strings as templates is deprecated and will be removed in an upcoming release. Please use functions instead.

[![npm version](https://badge.fury.io/js/vue-tables.svg)](https://badge.fury.io/js/vue-tables) [![Build Status](https://travis-ci.org/matfish2/vue-tables.svg?branch=master)](https://travis-ci.org/matfish2/vue-tables)

Users of VueJs 2 please use [this package](https://github.com/matfish2/vue-tables-2) instead.

This Vue package offers an easy and intuitive way of displaying Bootstrap-styled grids with data coming either from the client or from the server.

- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
    - [Client Side](#client-side)
    - [Server Side](#server-side)
- [Methods](#methods)
- [Events](#events)
- [Custom Filters](#custom-filters)
- [List Filters](#list-filters)
- [Options](#options)

# Dependencies

* Vue.js (>=1.0). Required. ([NOT 1.0.27](https://github.com/matfish2/vue-tables/issues/107))
* Bootstrap (CSS). Optional.
* vue-resource (>=0.9.0) (server-side component only)

# Installation

## Option 1

Compile the code using `browserify` with the `stringify` transform, or [webpack](https://github.com/matfish2/vue-tables/issues/23)

    npm install vue-tables

Require the script:

    var VueTables = require('vue-tables');

## Option 2

Import the [compiled standalone file](https://raw.githubusercontent.com/matfish2/vue-tables/master/dist/vue-tables.min.js) into your HTML, which will expose a global `VueTables` variable.

# Usage

## Register the component(s)

    Vue.use(VueTables.client, options);

  Or/And

    Vue.use(require('vue-resource'));
    Vue.use(VueTables.server, options);

If you wish to customize the table template itself, pass the altered version as the third argument, like so:

    Vue.use(VueTables.client, {}, { template: require('./my-template.html') });

## Client Side

Add the following element to your page wherever you want it to render.
Make sure to wrap it with a parent element you can latch your vue instance into.

    <div id="people">
      <v-client-table :data="tableData" :columns="columns" :options="options"></v-client-table>
    </div>

Create a new Vue instance (You can also nest it within other components). An example works best to illustrate the syntax:

    new Vue({
      el:"#people",
      data: {
        columns:['id','name','age'],
        tableData: [
          {id:1, name:"John",age:"20"},
          {id:2, name:"Jane",age:"24"},
          {id:3, name:"Susan",age:"16"},
          {id:4, name:"Chris",age:"55"},
          {id:5, name:"Dan",age:"40"}
        ],
        options: {
          // see the options API
        }
      }
    });

  Important: when loading data asynchronously add a `v-if` conditional to the component along with some `loaded` flag, so it will only compile once the data is attached.

  [Check out the live client-side demo](https://jsfiddle.net/matfish2/f5h8xwgn/)

## Server side

    <div id="people">
      <v-server-table url="/people" :columns="columns" :options="options"></v-server-table>
    </div>

Javascript:

    new Vue({
        el:"#people",
        data: {
          columns:['id','name','age'],
          options: {
           // see the options API
         }
      }
    });

  All the data is passed in the following GET parameters: `query`,`limit`,`page`,`orderBy`,`ascending`,`byColumn`.
  You need to return a JSON object with two properties:

  `data` `array` - An array of row objects with identical keys.

  `count` `number` - Total count before limit.


### Implementations

  I have included [an Eloquent implementation](https://github.com/matfish2/vue-tables/tree/master/server/PHP) for Laravel Users.
  If you happen to write other implementations for PHP or other languages, a pull request would be most welcome, under the following guidelines:

  a. Include the class under `./server/{language}`.

  b. Name it according to convention: `{concrete}VueTables`.

  c. if this is the first implementation in this language add an interface similar to the one found in the PHP folder.

  d. Have it implement the interface.

  e. TEST IT.

## Methods

Use [refs](https://vuejs.org/api/#v-ref) to get the instance.

* `setPage(page)`
* `refresh()` - server component only

## Events

`vue-tables.loading` (server-side)

Fires off when a request is sent to the server. Sends through the request data.

`vue-tables.loaded` (server-side)

Fires off after the response data has been attached to the table. Sends through the response.

You can listen to those two complementary events on a parent component and use them to add and remove a *loading indicator*, respectively.

`vue-tables.error` (server-side)

Fires off if the server returns an invalid code. Sends through the error

`vue-tables.row-click`

Fires off after a row was clicked. sends through the row

`vue-tables.filtered` (client-side)

Fires off after a filter was applied to the dataset. Send through the filtered subset.


# Custom Filters

Custom filters allow you to integrate your own filters into the plugin using Vue's events system.

## Client Side Filters

A. use the `customFilters` option to declare your filters, following this syntax:

      customFilters: [
        {
          name:'alphabet',
          callback: function(row, query) {
            return row.name[0] == query;
        }
        }
      ]

B. On your application broadcast an event when a filter was applied, and pass the query:

      this.$broadcast('vue-tables.filter::alphabet', query);

## Server Side Filters

A. use the `customFilters` option to declare your filters, following this syntax:

      customFilters: ['alphabet','age-range']

B. the same as in the client component.

# List Filters

When filtering by column, the `listColumns` option allows for filtering columns whose values are part of a list, using a select box instead of the default free-text filter.

For example:

      options: {
        listColumns:{
          animal: [
            {id:1, text:'Dog'},
            {id:2, text:'Cat'},
            {id:3, text:'Tiger'},
            {id:4, text:'Bear'}
          ]
        }
      }

The values of this column should correspond to the values (`id`) passed to the list.
They will be automatically converted to their textual representation.

# Options

Options are set in three layers, where the more particular overrides the more general.

1. Pre-defined component defaults.
2. Applicable user-defined defaults for the global Vue Instance. Passed as the second paramter to the `Use` statement.
3. Options for a single table, passed through the `options` prop.

[EXPLORE OPTIONS](//jsfiddle.net/matfish2/bp1g4khr/embedded/result/)

-----------------
CSS Note: to center the pagination apply `text-align:center` to the wrapping element
