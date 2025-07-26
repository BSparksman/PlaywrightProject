import { request } from '@playwright/test';

export async function isSiteUp(url: string): Promise<boolean> {
    const context = await request.newContext();
    try {
        const response = await context.get(url);
        return response.ok();
    } catch (error) {
        console.warn(`[ENV CHECK] Failed to reach ${url}: ${error.message}`);
        return false;
    } finally {
        await context.dispose();
    }
}
