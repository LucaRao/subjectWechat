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
exports.remove = exports.put = exports.post = exports.get = void 0;
const _getErrorMessage = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
const handleError = (error, reject) => {
    if (typeof error.json !== 'function') {
        return reject(error);
    }
    error.json().then((err) => {
        return reject({
            message: _getErrorMessage(err),
            status: (error === null || error === void 0 ? void 0 : error.status) || 500,
        });
    });
};
const _getRequestParams = (method, options, parameters, data) => {
    const params = { method, headers: (options === null || options === void 0 ? void 0 : options.header) || {} };
    if (method === 'GET') {
        return params;
    }
    params.headers = Object.assign({ 'Content-Type': 'application/json' }, options === null || options === void 0 ? void 0 : options.header);
    params.data = JSON.stringify(data);
    return Object.assign(Object.assign({}, params), parameters);
};
let _fetch = require('wefetch');
function _handleRequest(method, url, options, parameters, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let wfRequestParams = _getRequestParams(method, options, parameters, data);
            wfRequestParams = Object.assign(Object.assign({}, wfRequestParams), { header: wfRequestParams.headers, data: JSON.parse(wfRequestParams.body) });
            _fetch(url, wfRequestParams)
                .then((result) => {
                if (result.statusCode == 200)
                    throw result;
                if (options === null || options === void 0 ? void 0 : options.noResolveJson)
                    return resolve(result);
                return result;
            })
                .then((data) => resolve(data))
                .catch((error) => handleError(error, reject));
        });
    });
}
function get(url, options, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
        return _handleRequest('GET', url, options, parameters);
    });
}
exports.get = get;
function post(url, data, options, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
        return _handleRequest('POST', url, options, parameters, data);
    });
}
exports.post = post;
function put(url, data, options, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
        return _handleRequest('PUT', url, options, parameters, data);
    });
}
exports.put = put;
function remove(url, data, options, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
        return _handleRequest('DELETE', url, options, parameters, data);
    });
}
exports.remove = remove;
//# sourceMappingURL=fetch.js.map