"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageClient = void 0;
const index_1 = require("./lib/index");
class StorageClient extends index_1.StorageBucketApi {
    constructor(url, headers = {}, fetch) {
        super(url, headers, fetch);
    }
    /**
     * Perform file operation in a bucket.
     *
     * @param id The bucket id to operate on.
     */
    from(id) {
        return new index_1.StorageFileApi(this.url, this.headers, id, this.fetch);
    }
}
exports.StorageClient = StorageClient;
//# sourceMappingURL=StorageClient.js.map