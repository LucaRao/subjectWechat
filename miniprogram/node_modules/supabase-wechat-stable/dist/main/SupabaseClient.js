"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./lib/constants");
const SupabaseAuthClient_1 = require("./lib/SupabaseAuthClient");
const SupabaseQueryBuilder_1 = require("./lib/SupabaseQueryBuilder");
const index_1 = require("./storage-js/src/index");
const index_2 = require("./postgrest-js/src/index");
const DEFAULT_OPTIONS = {
    schema: 'public',
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    localStorage: globalThis.localStorage,
    headers: constants_1.DEFAULT_HEADERS,
};
/**
 * Supabase Client.
 *
 * An isomorphic Javascript client for interacting with Postgres.
 */
class SupabaseClient {
    /**
     * Create a new client for use in the browser.
     * @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
     * @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
     * @param options.schema You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
     * @param options.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
     * @param options.persistSession Set to "true" if you want to automatically save the user session into local storage.
     * @param options.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
     * @param options.headers Any additional headers to send with each network request.
     * @param options.realtime Options passed along to realtime-js constructor.
     */
    constructor(supabaseUrl, supabaseKey, options) {
        this.supabaseUrl = supabaseUrl;
        this.supabaseKey = supabaseKey;
        if (!supabaseUrl)
            throw new Error('supabaseUrl is required.');
        if (!supabaseKey)
            throw new Error('supabaseKey is required.');
        const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
        this.restUrl = `${supabaseUrl}/rest/v1`;
        this.realtimeUrl = `${supabaseUrl}/realtime/v1`.replace('http', 'ws');
        this.authUrl = `${supabaseUrl}/auth/v1`;
        this.storageUrl = `${supabaseUrl}/storage/v1`;
        this.schema = settings.schema;
        this.auth = this._initSupabaseAuthClient(settings);
        // In the future we might allow the user to pass in a logger to receive these events.
        // this.realtime.onOpen(() => console.log('OPEN'))
        // this.realtime.onClose(() => console.log('CLOSED'))
        // this.realtime.onError((e: Error) => console.log('Socket error', e))
    }
    /**
     * Supabase Storage allows you to manage user-generated content, such as photos or videos.
     */
    get storage() {
        return new index_1.SupabaseStorageClient(this.storageUrl, this._getAuthHeaders());
    }
    /**
     * Perform a table operation.
     *
     * @param table The table name to operate on.
     */
    from(table) {
        const url = `${this.restUrl}/${table}`;
        return new SupabaseQueryBuilder_1.SupabaseQueryBuilder(url, {
            headers: this._getAuthHeaders(),
            schema: this.schema,
            table,
        });
    }
    /**
     * Perform a function call.
     *
     * @param fn  The function name to call.
     * @param params  The parameters to pass to the function call.
     * @param count  Count algorithm to use to count rows in a table.
     *
     */
    rpc(fn, params, { count = null } = {}) {
        const rest = this._initPostgRESTClient();
        return rest.rpc(fn, params, { count });
    }
    _initSupabaseAuthClient({ autoRefreshToken, persistSession, detectSessionInUrl, localStorage, headers, }) {
        const authHeaders = {
            Authorization: `Bearer ${this.supabaseKey}`,
            apikey: `${this.supabaseKey}`,
        };
        return new SupabaseAuthClient_1.SupabaseAuthClient({
            url: this.authUrl,
            headers: Object.assign(Object.assign({}, headers), authHeaders),
            autoRefreshToken,
            persistSession,
            detectSessionInUrl,
            localStorage,
        });
    }
    _initPostgRESTClient() {
        return new index_2.PostgrestClient(this.restUrl, {
            headers: this._getAuthHeaders(),
            schema: this.schema,
        });
    }
    _getAuthHeaders() {
        var _a, _b;
        const headers = {};
        const authBearer = (_b = (_a = this.auth.session()) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : this.supabaseKey;
        headers['apikey'] = this.supabaseKey;
        headers['Authorization'] = `Bearer ${authBearer}`;
        return headers;
    }
}
exports.default = SupabaseClient;
//# sourceMappingURL=SupabaseClient.js.map