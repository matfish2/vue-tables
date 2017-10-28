<?php

namespace App;

use Input;
use Carbon\Carbon;

Class EloquentVueTables implements VueTablesInterface
{

    /**
     * Fetch database results for VueTables.
     *
     * Most arguments come from the following query arguments using Input.
     *   - query
     *   - limit
     *   - page
     *   - orderBy
     *   - ascending
     *   - byColumn
     *
     * @param \Illuminate\Database\Query\Builder $model
     *   A Laravel query builder object based on a table or model.
     * @param array $fields
     *   An array of supported fields for searching.
     * @return array
     */
    public function get($model, array $fields)
    {
        extract(Input::only('query', 'limit', 'page', 'orderBy', 'ascending',
            'byColumn'));

        $queryBuilder = $model->select($fields);

        if (!empty($query)) {
            $queryBuilder = $byColumn == 1 ?
                $this->filterByColumn($queryBuilder, $query) :
                $this->filter($queryBuilder, $query, $fields);
        }

        $count = $queryBuilder->count();

        $queryBuilder->limit($limit)
            ->skip($limit * ($page - 1));

        if (!empty($orderBy)) {
            $direction = $ascending == 1 ? 'ASC' : 'DESC';
            $queryBuilder->orderBy($orderBy, $direction);
        }

        $results = $queryBuilder->get()->toArray();

        return [
            'data'  => $results,
            'count' => $count,
        ];
    }

    /**
     * Helper method to search by columns.
     *
     * @param \Illuminate\Database\Query\Builder $queryBuilder
     *   The query builder
     * @param array $queries
     *   Yo dawg, a list of queries from the query query argument.
     * @return \Illuminate\Database\Query\Builder $queryBuilder
     */
    protected function filterByColumn($queryBuilder, $queries)
    {
        foreach ($queries as $field => $query) {
            if (!$query) {
                continue;
            }

            if (is_string($query)) {
                $queryBuilder->where($field, 'LIKE', "%{$query}%");
            } else {
                $start = Carbon::createFromFormat('Y-m-d', $query['start'])
                    ->startOfDay();
                $end = Carbon::createFromFormat('Y-m-d', $query['end'])
                    ->endOfDay();

                $queryBuilder->whereBetween($field, [$start, $end]);
            }
        }

        return $queryBuilder;
    }

    /**
     * A helper method to filter all supported columns.
     *
     * @param \Illuminate\Database\Query\Builder $queryBuilder
     *   The query builder
     * @param $query
     *   The search query.
     * @param $fields
     *   A list of database columns to search.
     * @return \Illuminate\Database\Query\Builder
     */
    protected function filter($queryBuilder, $query, $fields)
    {
        foreach ($fields as $index => $field) {
            $method = $index ? 'orWhere' : 'where';
            $queryBuilder->{$method}($field, 'LIKE', "%{$query}%");
        }

        return $queryBuilder;
    }

}
