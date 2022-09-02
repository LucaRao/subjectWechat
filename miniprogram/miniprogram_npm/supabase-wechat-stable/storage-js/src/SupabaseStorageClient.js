"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseStorageClient = void 0;
const index_1 = require("./lib/index");
class SupabaseStorageClient extends index_1.StorageBucketApi {
    constructor(url, headers = {}) {
        super(url, headers);
    }
    /**
     * Perform file operation in a bucket.
     *
     * @param id The bucket id to operate on.
     */
    from(id) {
        return new index_1.StorageFileApi(this.url, this.headers, id);
    }
}
exports.SupabaseStorageClient = SupabaseStorageClient;
//# sourceMappingURL=SupabaseStorageClient.js.map