# Vue Tables

This Vue component offers an easy and intuitive way of creating and displaying data tables with data coming from the client or from the server using AJAX requests.
It includes all the usual features: a search field, limit select, total records, sorting and pagination.
The Styling is based on Bootstrap, but of course you can write your own.

# Dependencies

* JQuery. Required.
* Vue.js. Required.
* Bootstrap (CSS). Optional.
* Font Awesome (for the sort icons). Optional.

# Installation

## Option 1

    npm install vue-tables

Require the script:

    var VueTables = require('vue-tables');

## Option 2

Simply import the [compiled standalone file](https://raw.githubusercontent.com/matfish2/vue-tables/master/dist/vue-tables.min.js) into your HTML, which will expose a global `VueTables` variable.

# Usage

## Register the component(s)

    Vue.use(VueTables.client);
    Vue.use(VueTables.server);

## Client Side

Add the following element to your page wherever you want it to render.
Make sure to wrap it with a parent element you can latch your vue instance into.

    <div id="people">
      <v-client-table></v-client-table>
    </div>

Create a new Vue instance. An example works best to illustrate the syntax:

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
        headings: {
          id:'ID',
          name:'Name',
          age:'Age'
        }
      }
    });

  Note: you must pass an `id` field as it is used to track the data for faster rendering.
  Of course you don't have to show it. See below the `columns` option.

  [Check out the live demo](https://jsfiddle.net/matfish2/tgp2vrh5/)

## Server side

    <div id="people">
      <v-server-table></v-server-table>
    </div>

Javascript:

    new Vue({
        el:"#people",
        url:"/people"
          headings: {
            id:'ID',
            name:'Name',
            age:'Age'
          }
        }
      });

  All the data is passed as GET parameters.
  You need to return JSON encoded associative array of two items: `data` and `count`. Here is an implemenation in Laravel:

    extract(Input::all());

    $fields = ['id',age','name'];

    $direction = $ascending==1?"ASC":"DESC";

    $people = Person::select($fields);

    if ($query) {
      foreach ($fields as $index=>$field) {
        $method = $index?"orWhere":"where";
        $people = $people->{$method}($field,'LIKE',"%{$query}%");
      }

    }

    $count = $people->count();

    $people->limit($limit)
          ->skip($limit * ($page-1))
          ->orderBy($orderBy,$direction);

    return ['data'=>$people->get(),
           'count'=>$count];

## Options

* `columns`  `Array`

By default all columns passed as data will be displayed.
If you want to set explicitly which columns will show use this option.

* `sortable`  `Array`

By Default all columns but extras are sortable. Use this option to explicitly state which columns should be sortable.
For obvious reasons server-side extras cannot be sorted.

* `limit`  `number`

Default limit is set to 10. The options are 5,10,20,50.

* `templates`  `Object`

Use this to wrap your cell content with a template using wildcards:

    templates: {
      name:"<a href='{id}'>{name}</a>"
    }

* `extras`  `Object`

Similar to templates, but adds extra column(s). For example:

    extras: {
      edit:"<a href='{id}'>{name}</a>"
    }

* `texts`  `Object`

This option allows you to override the defaults texts for localization or otherwise. It defaults to:

    texts:{
      count:"{count} Records",
      filter:"Filter Results:",
      filterPlaceholder:"Search query",
      limit:"Records:",
      page:"Page:" // for dropdown pagination
    }

* `dropdownPagination`  `boolean`

For large sets of data you can set this option to `true` to use a dropdown select pagination next to the records-per-page list, instead of links at the bottom of the table.

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
