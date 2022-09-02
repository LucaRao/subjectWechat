import { Fetch, SupabaseClientOptions } from './lib/types';
import { SupabaseAuthClient } from './lib/SupabaseAuthClient';
import { SupabaseQueryBuilder } from './lib/SupabaseQueryBuilder';
import { SupabaseStorageClient } from './storage-js/src/index';
import { FunctionsClient } from './functions-js/src/index';
/**
 * Supabase Client.
 *
 * An isomorphic Javascript client for interacting with Postgres.
 */
export default class SupabaseClient {
    protected supabaseUrl: string;
    protected supabaseKey: string;
    /**
     * Supabase Auth allows you to create and manage user sessions for access to data that is secured by access policies.
     */
    auth: SupabaseAuthClient;
    protected schema: string;
    protected restUrl: string;
    protected authUrl: string;
    protected storageUrl: string;
    protected functionsUrl: string;
    protected multiTab: boolean;
    protected fetch?: Fetch;
    protected changedAccessToken: string | undefined;
    protected shouldThrowOnError: boolean;
    protected headers: {
        [key: string]: string;
    };
    /**
     * Create a new client for use in the browser.
     * @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
     * @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
     * @param options.schema You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
     * @param options.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
     * @param options.persistSession Set to "true" if you want to automatically save the user session into local storage.
     * @param options.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
     * @param options.headers Any additional headers to send with each network request.
     * @param options.multiTab Set to "false" if you want to disable multi-tab/window events.
     * @param options.fetch A custom fetch implementation.
     */
    constructor(supabaseUrl: string, supabaseKey: string, options?: SupabaseClientOptions);
    /**
     * Supabase Functions allows you to deploy and invoke edge functions.
     */
    get functions(): FunctionsClient;
    /**
     * Supabase Storage allows you to manage user-generated content, such as photos or videos.
     */
    get storage(): SupabaseStorageClient;
    /**
     * Perform a table operation.
     *
     * @param table The table name to operate on.
     */
    from<T = any>(table: string): SupabaseQueryBuilder<T>;
    /**
     * Perform a function call.
     *
     * @param fn  The function name to call.
     * @param params  The parameters to pass to the function call.
     * @param head   When set to true, no data will be returned.
     * @param count  Count algorithm to use to count rows in a table.
     *
     */
    rpc<T = any>(fn: string, params?: object, { head, count, }?: {
        head?: boolean;
        count?: null | 'exact' | 'planned' | 'estimated';
    }): import("./postgrest-js/src/index").PostgrestFilterBuilder<T>;
    private _initSupabaseAuthClient;
    private _initPostgRESTClient;
    private _getAuthHeaders;
    private _listenForMultiTabEvents;
    private _listenForAuthEvents;
    private _handleTokenChanged;
}
//# sourceMappingURL=SupabaseClient.d.ts.map