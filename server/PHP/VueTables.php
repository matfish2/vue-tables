<?php

namespace App\Services\VueTables;

abstract Class VueTables  {

  public function parseQuery($query, $byColumn) {

    if ($byColumn!=1) return $query;

    $query = parse_url("?$query", PHP_URL_QUERY);
    parse_str($query, $q);

    return $q;

  }

}
