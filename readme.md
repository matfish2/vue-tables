# Vue Tables

This Vue component offers an easy and intuitive way of creating and displaying data tables with data coming from the client or from the server using AJAX requests.
It includes all the usual features: a search field, limit select, total records, sorting and pagination.
The Styling is based on Bootstrap, but of course you can write your own.

# Dependencies

* Bootstrap (CSS). Optional.
* Font Awesome (for the sort icons). Optional.
* JQuery. Required only for the server component.
* Vue.js. Required.

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

HTML:

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

    $people = App\People::select($fields);

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

`columns`  `Array`

By default all columns passed as data will be displayed.
If you want to set explicitly which columns will show use this option.

`templates`  `Object`

Use this to wrap your cell content with a template using wildcards:

    templates: {
      name:"<a href='{id}'>{name}</a>"
    }

`extras`  `Object`

Similar to templates, but adds extra column(s). For example:

    extras: {
      edit:"<a href='{id}'>{name}</a>"
    }

`texts`  `Object`

This option allows you to override the defaults texts for localization or otherwise. It defaults to:

    texts:{
      count:"{count} Records",
      filter:"Filter Results:",
      filterPlaceholder:"Search query",
      limit:"Records:"
    }


Note: to center the pagination apply `text-align:center` to the wrapping element
