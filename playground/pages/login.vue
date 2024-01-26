<script lang="ts" setup>
import {
    definePageMeta,
    reactive,
    ref,
    useRoute,
    useSanctumAuth,
} from '#imports';

definePageMeta({
    middleware: ['sanctum:guest'],
});

const { login, twoFactorRequired, twoFactor } = useSanctumAuth();
const route = useRoute();

const credentials = reactive({
    email: '',
    password: '',
    remember: false,
});

const useRecoveryCode = ref(false);
const twoFactorCredentials = reactive({
    code: '',
    recovery_code: '',
    remember: false,
});

const loginError = ref('');
const twoFactorError = ref('');

async function onFormSubmit() {
    try {
        await login(credentials);
    } catch (error) {
        loginError.value = error as string;
    }
}

async function onTwoFactorSubmit() {
    try {
        await twoFactor(twoFactorCredentials);
    } catch (error) {
        twoFactorError.value = error as string;
    }
}

const toggleRecoveryCode = () => {
    useRecoveryCode.value ^= true;
}
</script>

<template>
    <div v-if="route.query.redirect">
        Hmmm, looks like you tried to open
        <em>"{{ route.query.redirect }}"</em> page, login first to access it and
        we can redirect you there
    </div>

    <div>two factor required? {{twoFactorRequired}}</div>
    <h2>Login form</h2>

    <p v-if="loginError" class="error-message">Error - {{ loginError }}</p>

    <form v-if="!twoFactorRequired" class="login-form" @submit.prevent="onFormSubmit">
        <div class="input-group">
            <label for="email">User email</label>
            <input
                id="email"
                v-model="credentials.email"
                type="text"
                name="email"
            />
        </div>

        <div class="input-group">
            <label for="password">Password</label>
            <input
                id="password"
                v-model="credentials.password"
                type="password"
                autocomplete="current-password"
                name="password"
            />
        </div>

        <div class="input-group">
            <label for="remember">Remember me</label>
            <input
                id="remember"
                v-model="credentials.remember"
                type="checkbox"
                name="remember"
            />
        </div>

        <button type="submit">Log in</button>


    </form>

    <p v-if="twoFactorError" class="error-message">Error - {{ twoFactorError }}</p>

    <form v-if="twoFactorRequired" @submit.prevent="onTwoFactorSubmit">
        <div v-if="useRecoveryCode" class="input-group">
            <label for="email">Recovery Code</label>
            <input

                id="recovery_code"
                v-model="twoFactorCredentials.recovery_code"
                type="text"
                name="recovery_code"
            />
        </div>
        <div  v-else class="input-group">
            <label for="email">Auth Code</label>
            <input
                id="code"
                v-model="twoFactorCredentials.code"
                type="text"
                name="code"
            />

        </div>
        <a v-if="!useRecoveryCode" href="#" @click.prevent="toggleRecoveryCode">use recovery code instead?</a>
        <a v-else href="#" @click.prevent="toggleRecoveryCode">use Authentication code</a>
        <div class="input-group">
            <label for="remember">Remember me</label>
            <input
                id="remember"
                v-model="twoFactorCredentials.remember"
                type="checkbox"
                name="remember"
            />
        </div>
        <button type="submit">Log in</button>

    </form>
</template>

<style scoped>
.login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: fit-content;
}

.input-group {
    display: flex;
    gap: 0.5rem;
}

.error-message {
    color: red;
}
</style>
