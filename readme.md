# Vue Tables

[![npm version](https://badge.fury.io/js/vue-tables.svg)](https://badge.fury.io/js/vue-tables) [![Build Status](https://travis-ci.org/matfish2/vue-tables.svg)](https://travis-ci.org/matfish2/vue-tables)

This Vue package offers an easy and intuitive way of displaying Bootstrap-styled grids with data coming either from the client or from the server.

- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
    - [Client Side](#client-side)
    - [Server Side](#server-side)
- [Custom Filters](#custom-filters)
- [Options](#options)

# Dependencies

* Vue.js (>=1.0). Required.
* Bootstrap (CSS). Optional.
* vue-resource (server-side component only)

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
          columns:['id','name','age']
        }
      }
    });

  Note: you must pass an `id` field as it is used to track the data for faster rendering.

  Important: when loading data asynchronously add a `v-if` conditional to the component along with some `loaded` flag, so it will only compile once the data is attached.

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
           columns:['id','name','age']
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

### Implementations

  I have included [an Eloquent implementation](https://github.com/matfish2/vue-tables/tree/master/server/PHP) for Laravel Users.
  If you happen to write other implementations for PHP or other languages, a pull request would be most welcome, under the following guidelines:

  a. Include the class under `./server/{language}`.

  b. Name it according to convention: `{concrete}VueTables`.

  c. if this is the first implementation in this language add an interface similar to the one found in the PHP folder.

  d. Have it implement the interface.

  e. TEST IT.

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

The queries will be sent as part of the request in a `customQueries` array, where the key is the filter name, and the value is the current query.

# Options

Options are set in three layers, where the more particular overrides the more general.

1. Pre-defined component defaults.
2. Applicable user-defined defaults for the global Vue Instance. Passed as the second paramter to the `Use` statement.
3. Options for a single table, passed through the `options` prop.

[EXPLORE OPTIONS](//jsfiddle.net/matfish2/bp1g4khr/embedded/result/)

-----------------
CSS Note: to center the pagination apply `text-align:center` to the wrapping element
