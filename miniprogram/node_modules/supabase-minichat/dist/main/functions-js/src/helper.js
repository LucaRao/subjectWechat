"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveFetch = void 0;
const resolveFetch = (customFetch) => {
    const wf = require('wefetch');
    let _fetch = wf;
    return (...args) => _fetch(...args);
};
exports.resolveFetch = resolveFetch;
//# sourceMappingURL=helper.js.map