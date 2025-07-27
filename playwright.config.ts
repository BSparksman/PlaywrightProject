import { defineConfig, devices } from '@playwright/test';
import { getEnvConfig } from './config/env.config';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
    globalSetup: require.resolve('./global-setup'),

    use: {
        baseURL: getEnvConfig().baseUrl,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        }
        // Uncomment the following lines to enable Firefox testing
        /*{
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        }*/
    ],
});
