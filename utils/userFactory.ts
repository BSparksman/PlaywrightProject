import { faker } from '@faker-js/faker';
import { getEnvConfig } from '../config/env.config';

export const createUser = () => {
    const { password } = getEnvConfig();

    return {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password,
    };
};
