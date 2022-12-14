import { Fetch, PostgrestBuilder } from './types';
import PostgrestFilterBuilder from './PostgrestFilterBuilder';
export default class PostgrestRpcBuilder<T> extends PostgrestBuilder<T> {
    constructor(url: string, { headers, schema, fetch, shouldThrowOnError, }?: {
        headers?: {
            [key: string]: string;
        };
        schema?: string;
        fetch?: Fetch;
        shouldThrowOnError?: boolean;
    });
    /**
     * Perform a function call.
     */
    rpc(params?: object, { head, count, }?: {
        head?: boolean;
        count?: null | 'exact' | 'planned' | 'estimated';
    }): PostgrestFilterBuilder<T>;
}
//# sourceMappingURL=PostgrestRpcBuilder.d.ts.map