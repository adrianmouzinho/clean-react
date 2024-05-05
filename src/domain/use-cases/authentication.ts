import type { Account } from '@/domain/entities/account'

export type AuthenticationCredentials = {
	email: string
	password: string
}

export interface Authentication {
	authenticate(credentials: AuthenticationCredentials): Promise<Account>
}
