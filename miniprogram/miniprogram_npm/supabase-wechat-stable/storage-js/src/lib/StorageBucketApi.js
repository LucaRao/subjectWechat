"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageBucketApi = void 0;
const fetch_1 = require("./fetch");
class StorageBucketApi {
    constructor(url, headers = {}) {
        this.url = url;
        this.headers = headers;
    }
    /**
     * Retrieves the details of all Storage buckets within an existing product.
     */
    listBuckets() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fetch_1.get(`${this.url}/bucket`, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                return { data: null, error };
            }
        });
    }
    /**
     * Retrieves the details of an existing Storage bucket.
     *
     * @param id The unique identifier of the bucket you would like to retrieve.
     */
    getBucket(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fetch_1.get(`${this.url}/bucket/${id}`, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                return { data: null, error };
            }
        });
    }
    /**
     * Creates a new Storage bucket
     *
     * @param id A unique identifier for the bucket you are creating.
     * @returns newly created bucket id
     */
    createBucket(id, options = { public: false }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fetch_1.post(`${this.url}/bucket`, { id, name: id, public: options.public }, { headers: this.headers });
                return { data: data.name, error: null };
            }
            catch (error) {
                return { data: null, error };
            }
        });
    }
    /**
     * Updates a new Storage bucket
     *
     * @param id A unique identifier for the bucket you are creating.
     */
    updateBucket(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fetch_1.put(`${this.url}/bucket/${id}`, { id, name: id, public: options.public }, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                return { data: null, error };
            }
        });
    }
    /**
     * Removes all objects inside a single bucket.
     *
     * @param id The unique identifier of the bucket you would like to empty.
     */
    emptyBucket(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fetch_1.post(`${this.url}/bucket/${id}/empty`, {}, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                return { data: null, error };
            }
        });
    }
    /**
     * Deletes an existing bucket. A bucket can't be deleted with existing objects inside it.
     * You must first `empty()` the bucket.
     *
     * @param id The unique identifier of the bucket you would like to delete.
     */
    deleteBucket(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fetch_1.remove(`${this.url}/bucket/${id}`, {}, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                return { data: null, error };
            }
        });
    }
}
exports.StorageBucketApi = StorageBucketApi;
//# sourceMappingURL=StorageBucketApi.js.map