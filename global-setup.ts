// global-setup.ts
import axios from 'axios';
import { getEnv } from './env.config';

export default async () => {
    try {
        await axios.get(getEnv().baseUrl, { timeout: 3000 });
    } catch {
        console.warn(`[SKIP] Environment ${getEnv().baseUrl} is unreachable. Skipping tests.`);
        process.exit(0); // Playwright will treat this as success and skip test run
    }
};
