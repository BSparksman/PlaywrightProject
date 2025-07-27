export type EnvConfig = {
    name: 'dev' | 'test';
    baseUrl: string;
    password: string;
};


const envs: Record<string, EnvConfig> = {
    dev: {
        name: 'dev',
        baseUrl: 'https://automationexercise.com/',
        password: 'D3v3nv1r0m3nt',
    },
    test: {
        name: 'test',
        baseUrl: 'https://test.automationexercise.com/',
        password: 'T35t3nv1r0m3nt',
    },
};

export const getEnvConfig = (): EnvConfig => {
    const envName = process.env.ENV_NAME ?? 'dev';
    const config = envs[envName];
    if (!config) {
        throw new Error(`Unknown environment: ${envName}`);
    }
    return config;
};
