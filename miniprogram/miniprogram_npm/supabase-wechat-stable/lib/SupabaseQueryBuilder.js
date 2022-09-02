"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseQueryBuilder = void 0;
const index_1 = require("../postgrest-js/src/index");
class SupabaseQueryBuilder extends index_1.PostgrestQueryBuilder {
    constructor(url, { headers = {}, schema, table, }) {
        super(url, { headers, schema });
    }
}
exports.SupabaseQueryBuilder = SupabaseQueryBuilder;
//# sourceMappingURL=SupabaseQueryBuilder.js.map