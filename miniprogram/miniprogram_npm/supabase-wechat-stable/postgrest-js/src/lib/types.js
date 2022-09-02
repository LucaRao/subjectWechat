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
exports.PostgrestBuilder = void 0;
let _fetch = require('wefetch');
class PostgrestBuilder {
    constructor(builder) {
        Object.assign(this, builder);
    }
    /**
     * If there's an error with the query, throwOnError will reject the promise by
     * throwing the error instead of returning it as part of a successful response.
     *
     * {@link https://github.com/supabase/supabase-js/issues/92}
     */
    throwOnError() {
        this.shouldThrowOnError = true;
        return this;
    }
    then(onfulfilled, onrejected) {
        // https://postgrest.org/en/stable/api.html#switching-schemas
        if (typeof this.schema === 'undefined') {
            // skip
        }
        else if (['GET', 'HEAD'].includes(this.method)) {
            this.headers['Accept-Profile'] = this.schema;
        }
        else {
            this.headers['Content-Profile'] = this.schema;
        }
        if (this.method !== 'GET' && this.method !== 'HEAD') {
            this.headers['Content-Type'] = 'application/json';
        }
        return _fetch(this.url.toString(), {
            method: this.method,
            header: this.headers,
            data: JSON.stringify(this.body),
        })
            .then((res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            let error = null;
            let data = null;
            let count = null;
            if (res.statusCode == 200) {
                const isReturnMinimal = (_a = this.headers['Prefer']) === null || _a === void 0 ? void 0 : _a.split(',').includes('return=minimal');
                if (this.method !== 'HEAD' && !isReturnMinimal) {
                    const text = yield res;
                    if (!text) {
                        // discard `text`
                    }
                    else if (this.headers['Accept'] === 'text/csv') {
                        data = text;
                    }
                    else {
                        data = text;
                    }
                }
                // const countHeader = this.headers['Prefer']?.match(/count=(exact|planned|estimated)/)
                // const contentRange = res.headers.get('content-range')?.split('/')
                // if (countHeader && contentRange && contentRange.length > 1) {
                //   count = parseInt(contentRange[1])
                // }
            }
            else {
                error = yield res;
                if (error && this.shouldThrowOnError) {
                    throw error;
                }
            }
            const postgrestResponse = {
                error,
                data,
                count,
                status: res.status,
                statusText: res.statusText,
                body: data,
            };
            return postgrestResponse;
        }))
            .then(onfulfilled, onrejected);
    }
}
exports.PostgrestBuilder = PostgrestBuilder;
//# sourceMappingURL=types.js.map