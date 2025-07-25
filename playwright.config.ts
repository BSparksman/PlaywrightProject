import { defineConfig, devices } from '@playwright/test';
import { getEnv } from './env.config';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],

    use: {
        baseURL: getEnv().baseUrl,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],

    // Optional: Add global setup for environment reachability
    globalSetup: require.resolve('./global-setup'),
});
