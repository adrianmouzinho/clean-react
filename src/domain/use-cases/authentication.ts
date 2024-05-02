import type { Account } from '@/domain/entities/account'

export type AuthenticationParams = {
	email: string
	password: string
}

export interface Authentication {
	auth(params: AuthenticationParams): Promise<Account>
}
