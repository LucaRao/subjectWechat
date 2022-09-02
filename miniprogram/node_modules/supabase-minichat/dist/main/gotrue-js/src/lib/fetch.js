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
const constants_1 = require("./constants");
const _getErrorMessage = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
const handleError = (error, reject) => {
    if (!(error === null || error === void 0 ? void 0 : error.status)) {
        return reject({ message: constants_1.NETWORK_FAILURE.ERROR_MESSAGE });
    }
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
const _getRequestParams = (method, options, body) => {
    const params = { method, headers: (options === null || options === void 0 ? void 0 : options.headers) || {} };
    if (method === 'GET') {
        return params;
    }
    params.headers = Object.assign({ 'Content-Type': 'text/plain;charset=UTF-8' }, options === null || options === void 0 ? void 0 : options.headers);
    params.body = JSON.stringify(body);
    return params;
};
let _fetch = require('wefetch');
function _handleRequest(method, url, options, body) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let wfRequestParams = _getRequestParams(method, options, body);
            wfRequestParams = Object.assign(Object.assign({}, wfRequestParams), { header: wfRequestParams.headers, data: JSON.parse(wfRequestParams.body) });
            _fetch(url, wfRequestParams)
                .then((result) => {
                if (result.statusCode != 200)
                    throw result;
                if (options === null || options === void 0 ? void 0 : options.noResolveJson)
                    return resolve;
                return result;
            })
                .then((data) => resolve(data))
                .catch((error) => handleError(error, reject));
        });
    });
}
function get(url, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return _handleRequest('GET', url, options);
    });
}
exports.get = get;
function post(url, body, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return _handleRequest('POST', url, options, body);
    });
}
exports.post = post;
function put(url, body, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return _handleRequest('PUT', url, options, body);
    });
}
exports.put = put;
function remove(url, body, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return _handleRequest('DELETE', url, options, body);
    });
}
exports.remove = remove;
//# sourceMappingURL=fetch.js.map