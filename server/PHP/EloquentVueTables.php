<?php
/**
 *  VueTables server-side component Eloquent implementation
 */

namespace App\Services\VueTables;

use Input;

Class EloquentVueTables implements VueTablesInterface  {

  public function get($model, Array $fields) {

    extract(Input::all());

    $data = $model->select($fields);

    if (isset($query) && $query) {

      if ($byColumn==1):
       foreach ($query as $field=>$q):
         if (is_string($query)) {
         $data->where($field,'LIKE',"%{$query}%");
        } else {
          $data->whereBetween($field,[$query['start'], $query['end']]);
        }
       endforeach;
       else:
        foreach ($fields as $index=>$field):
          $method = $index?"orWhere":"where";
          $data->{$method}($field,'LIKE',"%{$query}%");
        endforeach;
        endif;
      }

      $count = $data->count();

      $data->limit($limit)
      ->skip($limit * ($page-1));

      $direction = $ascending==1?"ASC":"DESC";
      $data->orderBy($orderBy,$direction);

      $results = $data->get()->toArray();

      return ['data'=>$results,
              'count'=>$count];

    }

  }
