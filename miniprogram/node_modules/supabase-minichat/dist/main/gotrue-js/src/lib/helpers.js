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
exports.removeItemAsync = exports.getItemSynchronously = exports.getItemAsync = exports.setItemAsync = exports.resolveFetch = exports.getParameterByName = exports.isBrowser = exports.uuid = exports.expiresAt = void 0;
function expiresAt(expiresIn) {
    const timeNow = Math.round(Date.now() / 1000);
    return timeNow + expiresIn;
}
exports.expiresAt = expiresAt;
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
exports.uuid = uuid;
const isBrowser = () => typeof window !== 'undefined';
exports.isBrowser = isBrowser;
function getParameterByName(name, url) {
    var _a;
    if (!url)
        url = ((_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.href) || '';
    // eslint-disable-next-line no-useless-escape
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&#]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
exports.getParameterByName = getParameterByName;
const resolveFetch = (customFetch) => {
    let _fetch = require('wefetch');
    // if (customFetch) {
    //   _fetch = customFetch
    // } else if (typeof fetch === 'undefined') {
    //   const wf = require('wefetch')
    //   _fetch = wf
    // } else {
    //   _fetch = fetch
    // }
    return (...args) => _fetch(...args);
};
exports.resolveFetch = resolveFetch;
// LocalStorage helpers
const setItemAsync = (storage, key, data) => __awaiter(void 0, void 0, void 0, function* () {
    (0, exports.isBrowser)() && (yield (storage === null || storage === void 0 ? void 0 : storage.setItem(key, JSON.stringify(data))));
});
exports.setItemAsync = setItemAsync;
const getItemAsync = (storage, key) => __awaiter(void 0, void 0, void 0, function* () {
    const value = (0, exports.isBrowser)() && (yield (storage === null || storage === void 0 ? void 0 : storage.getItem(key)));
    if (!value)
        return null;
    try {
        return JSON.parse(value);
    }
    catch (_a) {
        return value;
    }
});
exports.getItemAsync = getItemAsync;
const getItemSynchronously = (storage, key) => {
    const value = (0, exports.isBrowser)() && (storage === null || storage === void 0 ? void 0 : storage.getItem(key));
    if (!value || typeof value !== 'string') {
        return null;
    }
    try {
        return JSON.parse(value);
    }
    catch (_a) {
        return value;
    }
};
exports.getItemSynchronously = getItemSynchronously;
const removeItemAsync = (storage, key) => __awaiter(void 0, void 0, void 0, function* () {
    (0, exports.isBrowser)() && (yield (storage === null || storage === void 0 ? void 0 : storage.removeItem(key)));
});
exports.removeItemAsync = removeItemAsync;
//# sourceMappingURL=helpers.js.map