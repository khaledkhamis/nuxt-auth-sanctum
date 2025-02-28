/**
 * Definition of Laravel Sanctum endpoints to be used by the client.
 */
export interface SanctumEndpoints {
    /**
     * The endpoint to request a new CSRF token.
     */
    csrf: string;
    /**
     * The endpoint to send user credentials to authenticate.
     */
    login: string;
    /**
     * The endpoint to destroy current user session.
     */
    logout: string;
    /**
     * The endpoint to fetch current user data.
     */
    user: string;
    /**
     * The endpoint to submit Two factor authentication code or recovery code.
     */
    twoFactorChallenge: string;
}

/**
 * CSRF token specific options.
 */
export interface CsrfOptions {
    /**
     * Name of the CSRF cookie to extract from server response.
     */
    cookie: string;
    /**
     * Name of the CSRF header to pass from client to server.
     */
    header: string;
}

/**
 * OFetch client specific options.
 */
export interface ClientOptions {
    /**
     * The number of times to retry a request when it fails.
     */
    retry: number | false;
}

/**
 * Behavior of the plugin redirects when user is authenticated or not.
 */
export interface RedirectOptions {
    /**
     * Determines whether to keep the requested route when redirecting after login.
     */
    keepRequestedRoute: boolean;
    /**
     * Route to redirect to when user is authenticated.
     * If set to false, do nothing.
     */
    onLogin: string | false;
    /**
     * Route to redirect to when user is not authenticated.
     * If set to false, do nothing.
     */
    onLogout: string | false;
    /**
     * Route to redirect to when user has to be authenticated.
     * If set to false, the plugin will throw an 403 error.
     */
    onAuthOnly: string | false;
    /**
     * Route to redirect to when user has to be a guest.
     * If set to false, the plugin will throw an 403 error.
     */
    onGuestOnly: string | false;
}

/**
 * Options to be passed to the plugin.
 */
export interface SanctumModuleOptions {
    /**
     * The base URL of the Laravel API.
     */
    baseUrl: string;
    /**
     * The URL of the current application to use in Referrer header. (Optional)
     */
    origin?: string;
    /**
     * The key to use to store the user identity in the `useState` variable.
     */
    userStateKey: string;
    /**
     * The key to use to check if two-factor challenge is required.
     */
    twoFactorResponseKey: string;
    /**
     * Determine to redirect when user is authenticated.
     */
    redirectIfAuthenticated: boolean;
    /**
     * Determine to whether two-factor authentication is enabled.
     */
    enableTwoFactorAuthentication: boolean;
    /**
     * Laravel Sanctum endpoints to be used by the client.
     */
    endpoints: SanctumEndpoints;
    /**
     * CSRF token specific options.
     */
    csrf: CsrfOptions;
    /**
     * OFetch client specific options.
     */
    client: ClientOptions;
    /**
     * Behavior of the plugin redirects when user is authenticated or not.
     */
    redirect: RedirectOptions;
}
