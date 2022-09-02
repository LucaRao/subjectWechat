import { PostgrestQueryBuilder } from '../postgrest-js/src/index'
import { Fetch, GenericObject } from './types'

export class SupabaseQueryBuilder<T> extends PostgrestQueryBuilder<T> {
  private _headers: GenericObject
  private _schema: string
  private _table: string

  constructor(
    url: string,
    {
      headers = {},
      schema,
      table,
      fetch,
      shouldThrowOnError,
    }: {
      headers?: GenericObject
      schema: string
      table: string
      fetch?: Fetch
      shouldThrowOnError?: boolean
    }
  ) {
    super(url, { headers, schema, fetch, shouldThrowOnError })
    this._headers = headers
    this._schema = schema
    this._table = table
  }
}
