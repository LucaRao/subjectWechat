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
        let _fetch;
        const wf = require('wefetch');
        _fetch = wf;
        this.fetch = (...args) => _fetch(...args);
        this.shouldThrowOnError = builder.shouldThrowOnError || false;
        this.allowEmpty = builder.allowEmpty || false;
    }
    /**
     * If there's an error with the query, throwOnError will reject the promise by
     * throwing the error instead of returning it as part of a successful response.
     *
     * {@link https://github.com/supabase/supabase-js/issues/92}
     */
    throwOnError(throwOnError) {
        if (throwOnError === null || throwOnError === undefined) {
            throwOnError = true;
        }
        this.shouldThrowOnError = throwOnError;
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
        let res = _fetch(this.url.toString(), {
            method: this.method,
            header: this.headers,
            data: JSON.stringify(this.body),
            signal: this.signal,
        }).then((res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            let error = null;
            let data = null;
            let count = null;
            let status = res.status;
            let statusText = res.statusText;
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
                const body = yield res;
                try {
                    error = body;
                }
                catch (_c) {
                    error = {
                        message: body,
                    };
                }
                if (error && this.allowEmpty && ((_b = error === null || error === void 0 ? void 0 : error.details) === null || _b === void 0 ? void 0 : _b.includes('Results contain 0 rows'))) {
                    error = null;
                    status = 200;
                    statusText = 'OK';
                }
                if (error && this.shouldThrowOnError) {
                    throw error;
                }
            }
            const postgrestResponse = {
                error,
                data,
                count,
                status,
                statusText,
                body: data,
            };
            return postgrestResponse;
        }));
        if (!this.shouldThrowOnError) {
            res = res.catch((fetchError) => ({
                error: {
                    message: `FetchError: ${fetchError.message}`,
                    details: '',
                    hint: '',
                    code: fetchError.code || '',
                },
                data: null,
                body: null,
                count: null,
                status: 400,
                statusText: 'Bad Request',
            }));
        }
        return res.then(onfulfilled, onrejected);
    }
}
exports.PostgrestBuilder = PostgrestBuilder;
//# sourceMappingURL=types.js.map