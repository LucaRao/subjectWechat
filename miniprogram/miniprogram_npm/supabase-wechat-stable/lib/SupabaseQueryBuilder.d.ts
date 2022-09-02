import { PostgrestQueryBuilder } from '../postgrest-js/src/index';
export declare class SupabaseQueryBuilder<T> extends PostgrestQueryBuilder<T> {
    constructor(url: string, { headers, schema, table, }: {
        headers?: {
            [key: string]: string;
        };
        schema: string;
        table: string;
    });
}
//# sourceMappingURL=SupabaseQueryBuilder.d.ts.map