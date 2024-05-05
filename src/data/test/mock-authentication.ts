import { faker } from '@faker-js/faker'

import type { Account } from '@/domain/entities/account'
import type { AuthenticationCredentials } from '@/domain/use-cases/authentication'

export function mockAuthenticationCredentials(): AuthenticationCredentials {
	return {
		email: faker.internet.email(),
		password: faker.internet.password(),
	}
}

export function mockAccount(): Account {
	return {
		accessToken: faker.string.uuid(),
	}
}
