import { faker } from '@faker-js/faker';
import { getEnvConfig } from '../config/env.config';

export const createUser = () => {
    const { password } = getEnvConfig();
    const title = faker.helpers.arrayElement(['Mr', 'Mrs']);
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
        title,
        name: `${firstName} ${lastName}`,
        firstName,
        lastName,
        email: faker.internet.email(),
        mobileNumber: faker.phone.number(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        password,
    };
};
