# Vue Tables

This Vue component offers an easy and intuitive way of creating and displaying data tables with data coming for the client or from the server using AJAX requests.
It includes all the usual features: a search field, limit select, total records, sorting and pagination.
The Styling is based on Bootstrap, but of course you can write your own.

# Install

Just grab the minified javascript file from the `build` folder

# Dependencies

* Bootstrap (CSS). Optional.
* Font Awesome (for the sort icons). Optional.
* JQuery. Required only for the server component.
* Vue.js. Required.

# Usage

import the script which lies in `./build/vue-table-min.js` to your HTML.

## Client Side

Add the following element to your page wherever you want it to render
Make sure to wrap it with a parent element you can latch you vue instace into.

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

  ## Server side

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

`columns`
`Array`

by default all columns passed as data will be displayed.
If you want to set explicitly which columns will show use this option.

`templates`
`Object`

Use this to wrap your cell content with a template using wildcards:

    templates: {
      name:"<a href='{id}'>{name}</a>"
    }

`extras`
`Object`

similar to templates, but adds extra column(s). For example:

    extras: {
      edit:"<a href='{id}'>{name}</a>"
    }


Note: to center the pagination add `text-align:center` to the wrapping element
