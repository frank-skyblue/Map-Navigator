/// <reference types="vite/client" />
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            GOOGLE_MAPS_API_KEY: string;
        }
    }
}