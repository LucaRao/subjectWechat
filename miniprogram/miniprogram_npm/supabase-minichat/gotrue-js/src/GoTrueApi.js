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
const fetch_1 = require("./lib/fetch");
const constants_1 = require("./lib/constants");
const cookies_1 = require("./lib/cookies");
const helpers_1 = require("./lib/helpers");
class GoTrueApi {
    constructor({ url = '', headers = {}, cookieOptions, fetch, }) {
        this.url = url;
        this.headers = headers;
        this.cookieOptions = Object.assign(Object.assign({}, constants_1.COOKIE_OPTIONS), cookieOptions);
        this.fetch = (0, helpers_1.resolveFetch)(fetch);
    }
    /**
     * Create a temporary object with all configured headers and
     * adds the Authorization token to be used on request methods
     * @param jwt A valid, logged-in JWT.
     */
    _createRequestHeaders(jwt) {
        const headers = Object.assign({}, this.headers);
        headers['Authorization'] = `Bearer ${jwt}`;
        return headers;
    }
    cookieName() {
        var _a;
        return (_a = this.cookieOptions.name) !== null && _a !== void 0 ? _a : '';
    }
    /**
     * Generates the relevant login URL for a third-party provider.
     * @param provider One of the providers supported by GoTrue.
     * @param redirectTo A URL or mobile address to send the user to after they are confirmed.
     * @param scopes A space-separated list of scopes granted to the OAuth application.
     */
    getUrlForProvider(provider, options) {
        const urlParams = [`provider=${encodeURIComponent(provider)}`];
        if (options === null || options === void 0 ? void 0 : options.redirectTo) {
            urlParams.push(`redirect_to=${encodeURIComponent(options.redirectTo)}`);
        }
        if (options === null || options === void 0 ? void 0 : options.scopes) {
            urlParams.push(`scopes=${encodeURIComponent(options.scopes)}`);
        }
        if (options === null || options === void 0 ? void 0 : options.queryParams) {
            const query = new URLSearchParams(options.queryParams);
            urlParams.push(`${query}`);
        }
        return `${this.url}/authorize?${urlParams.join('&')}`;
    }
    /**
     * Creates a new user using their email address.
     * @param email The email address of the user.
     * @param password The password of the user.
     * @param redirectTo A URL or mobile address to send the user to after they are confirmed.
     * @param data Optional user metadata.
     * @param captchaToken Verification token received when the user completes the captcha on your site.
     *
     * @returns A logged-in session if the server has "autoconfirm" ON
     * @returns A user if the server has "autoconfirm" OFF
     */
    signUpWithEmail(email, password, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = Object.assign({}, this.headers);
                let queryString = '';
                if (options.redirectTo) {
                    queryString = '?redirect_to=' + encodeURIComponent(options.redirectTo);
                }
                const data = yield (0, fetch_1.post)(`${this.url}/signup${queryString}`, {
                    email,
                    password,
                    data: options.data,
                    gotrue_meta_security: { captcha_token: options.captchaToken },
                }, { headers });
                const session = Object.assign({}, data);
                if (session.expires_in)
                    session.expires_at = (0, helpers_1.expiresAt)(data.expires_in);
                return { data: session, error: null };
            }
            catch (e) {
                return { data: null, error: e };
            }
        });
    }
    /**
     * Logs in an existing user using their email address.
     * @param email The email address of the user.
     * @param password The password of the user.
     * @param redirectTo A URL or mobile address to send the user to after they are confirmed.
     * @param captchaToken Verification token received when the user completes the captcha on your site.
     */
    signInWithEmail(email, password, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = Object.assign({}, this.headers);
                let queryString = '?grant_type=password';
                if (options.redirectTo) {
                    queryString += '&redirect_to=' + encodeURIComponent(options.redirectTo);
                }
                const data = yield (0, fetch_1.post)(`${this.url}/token${queryString}`, { email, password, gotrue_meta_security: { captcha_token: options.captchaToken } }, { headers });
                const session = Object.assign({}, data);
                if (session.expires_in)
                    session.expires_at = (0, helpers_1.expiresAt)(data.expires_in);
                return { data: session, error: null };
            }
            catch (e) {
                return { data: null, error: e };
            }
        });
    }
    /**
     * Signs up a new user using their phone number and a password.
     * @param phone The phone number of the user.
     * @param password The password of the user.
     * @param data Optional user metadata.
     * @param captchaToken Verification token received when the user completes the captcha on your site.
     */
    signUpWithPhone(phone, password, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = Object.assign({}, this.headers);
                const data = yield (0, fetch_1.post)(`${this.url}/signup`, {
                    phone,
                    password,
                    data: options.data,
                    gotrue_meta_security: { captcha_token: options.captchaToken },
                }, { headers });
                const session = Object.assign({}, data);
                if (session.expires_in)
                    session.expires_at = (0, helpers_1.expiresAt)(data.expires_in);
                return { data: session, error: null };
            }
            catch (e) {
                return { data: null, error: e };
            }
        });
    }
    /**
     * Logs in an existing user using their phone number and password.
     * @param phone The phone number of the user.
     * @param password The password of the user.
     * @param captchaToken Verification token received when the user completes the captcha on your site.
     */
    signInWithPhone(phone, password, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = Object.assign({}, this.headers);
                const queryString = '?grant_type=password';
                const data = yield (0, fetch_1.post)(`${this.url}/token${queryString}`, { phone, password, gotrue_meta_security: { captcha_token: options.captchaToken } }, { headers });
                const session = Object.assign({}, data);
                if (session.expires_in)
                    session.expires_at = (0, helpers_1.expiresAt)(data.expires_in);
                return { data: session, error: null };
            }
            catch (e) {
                return { data: null, error: e };
            }
        });
    }
    /**
     * Logs in an OpenID Connect user using their id_token.
     * @param id_token The IDToken of the user.
     * @param nonce The nonce of the user. The nonce is a random value generated by the developer (= yourself) before the initial grant is started. You should check the OpenID Connect specification for details. https://openid.net/developers/specs/
     * @param provider The provider of the user.
     * @param client_id The clientID of the user.
     * @param issuer The issuer of the user.
     */
    signInWithOpenIDConnect({ id_token, nonce, client_id, issuer, provider, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = Object.assign({}, this.headers);
                const queryString = '?grant_type=id_token';
                const data = yield (0, fetch_1.post)(`${this.url}/token${queryString}`, { id_token, nonce, client_id, issuer, provider }, { headers });
                const session = Object.assign({}, data);
                if (session.expires_in)
                    session.expires_at = (0, helpers_1.expiresAt)(data.expires_in);
                return { data: session, error: null };
            }
            catch (e) {
                return { data: null, error: e };
            }
        });
    }
    /**
     * Sends a magic login link to an email address.
     * @param email The email address of the user.
     * @param shouldCreateUser A boolean flag to indicate whether to automatically create a user on magiclink / otp sign-ins if the user doesn't exist. Defaults to true.
     * @param redirectTo A URL or mobile address to send the user to after they are confirmed.
     * @param captchaToken Verification token received when the user completes the captcha on your site.
     */
    sendMagicLinkEmail(email, options = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = Object.assign({}, this.headers);
                let queryString = '';
                if (options.redirectTo) {
                    queryString += '?redirect_to=' + encodeURIComponent(options.redirectTo);
                }
                const shouldCreateUser = (_a = options.shouldCreateUser) !== null && _a !== void 0 ? _a : true;
                const data = yield (0, fetch_1.post)(`${this.url}/otp${queryString}`, {
                    email,
                    create_user: shouldCreateUser,
                    gotrue_meta_security: { captcha_token: options.captchaToken },
                }, { headers });
                return { data, error: null };
            }
            catch (e) {
                return { data: null, error: e };
            }
        });
    }
    /**
     * Sends a mobile OTP via SMS. Will register the account if it doesn't already exist
     * @param phone The user's phone number WITH international prefix
     * @param shouldCreateUser A boolean flag to indicate whether to automatically create a user on magiclink / otp sign-ins if the user doesn't exist. Defaults to true.
     * @param captchaToken Verification token received when the user completes the captcha on your site.
     */
    sendMobileOTP(phone, options = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const shouldCreateUser = (_a = options.shouldCreateUser) !== null && _a !== void 0 ? _a : true;
                const headers = Object.assign({}, this.headers);
                const data = yield (0, fetch_1.post)(`${this.url}/otp`, {
                    phone,
                    create_user: shouldCreateUser,
                    gotrue_meta_security: { captcha_token: options.captchaToken },
                }, { headers });
                return { data, error: null };
            }
            catch (e) {
                return { data: null, error: e };
            }
        });
    }
    /**
     * Removes a logged-in session.
     * @param jwt A valid, logged-in JWT.
     */
    signOut(jwt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, fetch_1.post)(`${this.url}/logout`, {}, { headers: this._createRequestHeaders(jwt), noResolveJson: true });
                return { error: null };
            }
            catch (e) {
                return { error: e };
            }
        });
    }
    /**
     * @deprecated Use `verifyOTP` instead!
     * @param phone The user's phone number WITH international prefix
     * @param token token that user was sent to their mobile phone
     * @param redirectTo A URL or mobile address to send the user to after they are confirmed.
     */
    verifyMobileOTP(phone, token, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = Object.assign({}, this.headers);
                const data = yield (0, fetch_1.post)(`${this.url}/verify`, { phone, token, type: 'sms', redirect_to: options.redirectTo }, { headers });
                const session = Object.assign({}, data);
                if (session.expires_in)
                    session.expires_at = (0, helpers_1.expiresAt)(data.expires_in);
                return { data: session, error: null };
            }
            catch (e) {
                return { data: null, error: e };
            }
        });
    }
    /**
     * Send User supplied Email / Mobile OTP to be verified
     * @param email The user's email address
     * @param phone The user's phone number WITH international prefix
     * @param token token that user was sent to their mobile phone
     * @param type verification type that the otp is generated for
     * @param redirectTo A URL or mobile address to send the user to after they are confirmed.
     */
    verifyOTP({ email, phone, token, type = 'sms' }, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = Object.assign({}, this.headers);
                const data = yield (0, fetch_1.post)(`${this.url}/verify`, { email, phone, token, type, redirect_to: options.redirectTo }, { headers });
                const session = Object.assign({}, data);
                if (session.expires_in)
                    session.expires_at = (0, helpers_1.expiresAt)(data.expires_in);
                return { data: session, error: null };
            }
            catch (e) {
                return { data: null, error: e };
            }
        });
    }
    /**
     * Sends an invite link to an email address.
     * @param email The email address of the user.
     * @param redirectTo A URL or mobile address to send the user to after they are confirmed.
     * @param data Optional user metadata
     */
    inviteUserByEmail(email, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = Object.assign({}, this.headers);
                let queryString = '';
                if (options.redirectTo) {
                    queryString += '?redirect_to=' + encodeURIComponent(options.redirectTo);
                }
                const data = yield (0, fetch_1.post)(`${this.url}/invite${queryString}`, { email, data: options.data }, { headers });
                return { data, error: null };
            }
            catch (e) {
                return { data: null, error: e };
            }
        });
    }
    /**
     * Sends a reset request to an email address.
     * @param email The email address of the user.
     * @param redirectTo A URL or mobile address to send the user to after they are confirmed.
     * @param captchaToken Verification token received when the user completes the captcha on your site.
     */
    resetPasswordForEmail(email, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = Object.assign({}, this.headers);
                let queryString = '';
                if (options.redirectTo) {
                    queryString += '?redirect_to=' + encodeURIComponent(options.redirectTo);
                }
                const data = yield (0, fetch_1.post)(`${this.url}/recover${queryString}`, { email, gotrue_meta_security: { captcha_token: options.captchaToken } }, { headers });
                return { data, error: null };
            }
            catch (e) {
                return { data: null, error: e };
            }
        });
    }
    /**
     * Generates a new JWT.
     * @param refreshToken A valid refresh token that was returned on login.
     */
    refreshAccessToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, fetch_1.post)(`${this.url}/token?grant_type=refresh_token`, { refresh_token: refreshToken }, { headers: this.headers });
                const session = Object.assign({}, data);
                if (session.expires_in)
                    session.expires_at = (0, helpers_1.expiresAt)(data.expires_in);
                return { data: session, error: null };
            }
            catch (e) {
                return { data: null, error: e };
            }
        });
    }
    /**
     * Set/delete the auth cookie based on the AuthChangeEvent.
     * Works for Next.js & Express (requires cookie-parser middleware).
     * @param req The request object.
     * @param res The response object.
     */
    setAuthCookie(req, res) {
        if (req.method !== 'POST') {
            res.setHeader('Allow', 'POST');
            res.status(405).end('Method Not Allowed');
        }
        const { event, session } = req.body;
        if (!event)
            throw new Error('Auth event missing!');
        if (event === 'SIGNED_IN') {
            if (!session)
                throw new Error('Auth session missing!');
            (0, cookies_1.setCookies)(req, res, [
                { key: 'access-token', value: session.access_token },
                { key: 'refresh-token', value: session.refresh_token },
            ].map((token) => {
                var _a;
                return ({
                    name: `${this.cookieName()}-${token.key}`,
                    value: token.value,
                    domain: this.cookieOptions.domain,
                    maxAge: (_a = this.cookieOptions.lifetime) !== null && _a !== void 0 ? _a : 0,
                    path: this.cookieOptions.path,
                    sameSite: this.cookieOptions.sameSite,
                });
            }));
        }
        if (event === 'SIGNED_OUT') {
            (0, cookies_1.setCookies)(req, res, ['access-token', 'refresh-token'].map((key) => ({
                name: `${this.cookieName()}-${key}`,
                value: '',
                maxAge: -1,
            })));
        }
        res.status(200).json({});
    }
    /**
     * Deletes the Auth Cookies and redirects to the
     * @param req The request object.
     * @param res The response object.
     * @param options Optionally specify a `redirectTo` URL in the options.
     */
    deleteAuthCookie(req, res, { redirectTo = '/' }) {
        (0, cookies_1.setCookies)(req, res, ['access-token', 'refresh-token'].map((key) => ({
            name: `${this.cookieName()}-${key}`,
            value: '',
            maxAge: -1,
        })));
        return res.redirect(307, redirectTo);
    }
    /**
     * Helper method to generate the Auth Cookie string for you in case you can't use `setAuthCookie`.
     * @param req The request object.
     * @param res The response object.
     * @returns The Cookie string that needs to be set as the value for the `Set-Cookie` header.
     */
    getAuthCookieString(req, res) {
        if (req.method !== 'POST') {
            res.setHeader('Allow', 'POST');
            res.status(405).end('Method Not Allowed');
        }
        const { event, session } = req.body;
        if (!event)
            throw new Error('Auth event missing!');
        if (event === 'SIGNED_IN') {
            if (!session)
                throw new Error('Auth session missing!');
            return (0, cookies_1.getCookieString)(req, res, [
                { key: 'access-token', value: session.access_token },
                { key: 'refresh-token', value: session.refresh_token },
            ].map((token) => {
                var _a;
                return ({
                    name: `${this.cookieName()}-${token.key}`,
                    value: token.value,
                    domain: this.cookieOptions.domain,
                    maxAge: (_a = this.cookieOptions.lifetime) !== null && _a !== void 0 ? _a : 0,
                    path: this.cookieOptions.path,
                    sameSite: this.cookieOptions.sameSite,
                });
            }));
        }
        if (event === 'SIGNED_OUT') {
            return (0, cookies_1.getCookieString)(req, res, ['access-token', 'refresh-token'].map((key) => ({
                name: `${this.cookieName()}-${key}`,
                value: '',
                maxAge: -1,
            })));
        }
        return res.getHeader('Set-Cookie');
    }
    /**
     * Generates links to be sent via email or other.
     * @param type The link type ("signup" or "magiclink" or "recovery" or "invite").
     * @param email The user's email.
     * @param password User password. For signup only.
     * @param data Optional user metadata. For signup only.
     * @param redirectTo The link type ("signup" or "magiclink" or "recovery" or "invite").
     */
    generateLink(type, email, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, fetch_1.post)(`${this.url}/admin/generate_link`, {
                    type,
                    email,
                    password: options.password,
                    data: options.data,
                    redirect_to: options.redirectTo,
                }, { headers: this.headers });
                return { data, error: null };
            }
            catch (e) {
                return { data: null, error: e };
            }
        });
    }
    // User Admin API
    /**
     * Creates a new user.
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     *
     * @param attributes The data you want to create the user with.
     */
    createUser(attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, fetch_1.post)(`${this.url}/admin/users`, attributes, {
                    headers: this.headers,
                });
                return { user: data, data, error: null };
            }
            catch (e) {
                return { user: null, data: null, error: e };
            }
        });
    }
    /**
     * Get a list of users.
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */
    listUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, fetch_1.get)(`${this.url}/admin/users`, {
                    headers: this.headers,
                });
                return { data: data.users, error: null };
            }
            catch (e) {
                return { data: null, error: e };
            }
        });
    }
    /**
     * Get user by id.
     *
     * @param uid The user's unique identifier
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */
    getUserById(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, fetch_1.get)(`${this.url}/admin/users/${uid}`, {
                    headers: this.headers,
                });
                return { data, error: null };
            }
            catch (e) {
                return { data: null, error: e };
            }
        });
    }
    /**
     * Get user by reading the cookie from the request.
     * Works for Next.js & Express (requires cookie-parser middleware).
     */
    getUserByCookie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.cookies) {
                    throw new Error('Not able to parse cookies! When using Express make sure the cookie-parser middleware is in use!');
                }
                const access_token = req.cookies[`${this.cookieName()}-access-token`];
                const refresh_token = req.cookies[`${this.cookieName()}-refresh-token`];
                if (!access_token) {
                    throw new Error('No cookie found!');
                }
                const { user, error: getUserError } = yield this.getUser(access_token);
                if (getUserError) {
                    if (!refresh_token)
                        throw new Error('No refresh_token cookie found!');
                    if (!res)
                        throw new Error('You need to pass the res object to automatically refresh the session!');
                    const { data, error } = yield this.refreshAccessToken(refresh_token);
                    if (error) {
                        throw error;
                    }
                    else if (data) {
                        (0, cookies_1.setCookies)(req, res, [
                            { key: 'access-token', value: data.access_token },
                            { key: 'refresh-token', value: data.refresh_token },
                        ].map((token) => {
                            var _a;
                            return ({
                                name: `${this.cookieName()}-${token.key}`,
                                value: token.value,
                                domain: this.cookieOptions.domain,
                                maxAge: (_a = this.cookieOptions.lifetime) !== null && _a !== void 0 ? _a : 0,
                                path: this.cookieOptions.path,
                                sameSite: this.cookieOptions.sameSite,
                            });
                        }));
                        return { token: data.access_token, user: data.user, data: data.user, error: null };
                    }
                }
                return { token: access_token, user: user, data: user, error: null };
            }
            catch (e) {
                return { token: null, user: null, data: null, error: e };
            }
        });
    }
    /**
     * Updates the user data.
     *
     * @param attributes The data you want to update.
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */
    updateUserById(uid, attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this; //
                const data = yield (0, fetch_1.put)(`${this.url}/admin/users/${uid}`, attributes, {
                    headers: this.headers,
                });
                return { user: data, data, error: null };
            }
            catch (e) {
                return { user: null, data: null, error: e };
            }
        });
    }
    /**
     * Delete a user. Requires a `service_role` key.
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     *
     * @param uid The user uid you want to remove.
     */
    deleteUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, fetch_1.remove)(`${this.url}/admin/users/${uid}`, {}, {
                    headers: this.headers,
                });
                return { user: data, data, error: null };
            }
            catch (e) {
                return { user: null, data: null, error: e };
            }
        });
    }
    /**
     * Gets the current user details.
     *
     * This method is called by the GoTrueClient `update` where
     * the jwt is set to this.currentSession.access_token
     * and therefore, acts like getting the currently authenticated user
     *
     * @param jwt A valid, logged-in JWT. Typically, the access_token for the currentSession
     */
    getUser(jwt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, fetch_1.get)(`${this.url}/user`, {
                    headers: this._createRequestHeaders(jwt),
                });
                return { user: data, data, error: null };
            }
            catch (e) {
                return { user: null, data: null, error: e };
            }
        });
    }
    /**
     * Updates the user data.
     * @param jwt A valid, logged-in JWT.
     * @param attributes The data you want to update.
     */
    updateUser(jwt, attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, fetch_1.put)(`${this.url}/user`, attributes, {
                    headers: this._createRequestHeaders(jwt),
                });
                return { user: data, data, error: null };
            }
            catch (e) {
                return { user: null, data: null, error: e };
            }
        });
    }
}
exports.default = GoTrueApi;
//# sourceMappingURL=GoTrueApi.js.map