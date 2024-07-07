/// <reference types="vite/client" />

declare namespace NodeJS {
    interface ProcessEnv {
        VUE_APP_API_KEY: string;
    }
}

declare var process: {
    env: {
      VUE_APP_API_KEY: string;
      [key: string]: string | undefined;
    };
  };