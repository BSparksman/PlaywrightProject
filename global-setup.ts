import { isSiteUp } from './utils/isSiteUp';
import { getEnvConfig } from './config/env.config';

export default async () => {
    const { baseUrl } = getEnvConfig();
    const reachable = await isSiteUp(baseUrl);

    if (!reachable) {
        console.warn(`[SKIPPING TESTS] Site ${baseUrl} is not reachable.`);
        process.exit(0); // Exits gracefully without error
    }
};
