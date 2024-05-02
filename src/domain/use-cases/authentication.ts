import type { Account } from '../entities/account'

export type AuthenticationParams = {
	email: string
	password: string
}

export interface Authentication {
	auth(params: AuthenticationParams): Promise<Account>
}
