import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: ['cypress/e2e/*.ts', 'cypress/e2e/**/*.ts'],
  },
});
