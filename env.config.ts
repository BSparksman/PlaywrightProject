export const environments = {
    dev: {
        baseUrl: 'https://automationexercise.com/',
        password: 'D3v3nv1r0m3nt',
    },
    test: {
        baseUrl: 'https://test.automationexercise.com/',
        password: 'T35t3nv1r0m3nt',
    },
};

export const getEnv = () => {
    const env = process.env.TEST_ENV || 'dev';
    return environments[env];
};
