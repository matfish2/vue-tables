<?php

Class LaravelVueTables implements VueTablesInterface  {

  protected $model;
  protected $fields;

  public function __construct($model, $fields)
  {
    $this->model = $model;
    $this->fields = $fields;
  }

  public function get() {

    extract(Input::all());

    $orderBy = $orderBy?:'id';

    $direction = $ascending==1?"ASC":"DESC";

    $data = $this->model->select($this->fields);

    if ($query) {
      foreach ($this->fields as $index=>$field) {
        $method = $index?"orWhere":"where";
        $data->{$method}($field,'LIKE',"%{$query}%");
      }

    }

    $count = $data->count();

    $data->limit($limit)
    ->skip($limit * ($page-1))
    ->orderBy($orderBy,$direction);

    $results = $data->get()->toArray();

    return ['data'=>$results,
            'count'=>$count];

  }

}
