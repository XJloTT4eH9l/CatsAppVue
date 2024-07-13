/// <reference types="vite/client" />

declare namespace NodeJS {
    interface ProcessEnv {
        VUE_APP_API_KEY: string;
    }
}
