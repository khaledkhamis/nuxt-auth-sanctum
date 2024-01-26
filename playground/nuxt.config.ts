export default defineNuxtConfig({
    modules: ['../src/module'],
    typescript: {
        strict: true,
        typeCheck: true,
    },
    ssr: true,
    runtimeConfig: {
        public: {
            sanctum: {
                baseUrl: 'https://equifund-backend.co.cc',
                userStateKey: 'sanctum.user.identity',
            },
        },
    },
    sanctum: {
        baseUrl: 'https://equifund-backend.co.cc',
        origin: 'https://auth.equifund-backend.co.cc',
        userStateKey: 'sanctum.user.identity',
        redirectIfAuthenticated: false,
        enableTwoFactorAuthentication: true,
        client: {
            retry: false,
        },
        csrf: {
            cookie: 'XSRF-TOKEN',
            header: 'X-XSRF-TOKEN',
        },
        redirect: {
            keepRequestedRoute: true,
            onAuthOnly: '/login',
            onGuestOnly: '/profile',
            onLogin: '/welcome',
            onLogout: '/logout',
        },
        endpoints: {
            csrf: '/sanctum/csrf-cookie',
            login: '/login',
            logout: '/logout',
            user: '/user',
            twoFactorChallenge: '/two-factor-challenge',
        },
    },
    devtools: { enabled: true },
});
