"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveFetch = void 0;
const resolveFetch = (customFetch) => {
    let _fetch;
    const wf = require('wefetch');
    _fetch = wf;
    return (...args) => _fetch(...args);
};
exports.resolveFetch = resolveFetch;
//# sourceMappingURL=helpers.js.map