import { faker } from '@faker-js/faker'
import type { AuthenticationParams } from 'domain/use-cases/authentication'

export function mockAuthentication(): AuthenticationParams {
	return {
		email: faker.internet.email(),
		password: faker.internet.password(),
	}
}
