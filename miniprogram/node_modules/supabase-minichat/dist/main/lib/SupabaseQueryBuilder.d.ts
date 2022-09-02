import { PostgrestQueryBuilder } from '../postgrest-js/src/index';
import { Fetch, GenericObject } from './types';
export declare class SupabaseQueryBuilder<T> extends PostgrestQueryBuilder<T> {
    private _headers;
    private _schema;
    private _table;
    constructor(url: string, { headers, schema, table, fetch, shouldThrowOnError, }: {
        headers?: GenericObject;
        schema: string;
        table: string;
        fetch?: Fetch;
        shouldThrowOnError?: boolean;
    });
}
//# sourceMappingURL=SupabaseQueryBuilder.d.ts.map