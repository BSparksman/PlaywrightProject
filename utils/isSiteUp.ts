import { request } from '@playwright/test';

export async function isSiteUp(url: string): Promise<boolean> {
    const context = await request.newContext();
    const response = await context.get(url);
    await context.dispose();
    return response.ok();
}
