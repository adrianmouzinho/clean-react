import type { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import type { Account } from '@/domain/entities/account'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import type {
	Authentication,
	AuthenticationCredentials,
} from '@/domain/use-cases/authentication'

export class RemoteAuthentication implements Authentication {
	constructor(
		private url: string,
		private httpPostClient: HttpPostClient<AuthenticationCredentials, Account>,
	) {}

	async authenticate(credentials: AuthenticationCredentials): Promise<Account> {
		const response = await this.httpPostClient.post({
			url: this.url,
			body: credentials,
		})

		switch (response.statusCode) {
			case HttpStatusCode.ok:
				return response.body

			case HttpStatusCode.unauthorized:
				throw new InvalidCredentialsError()

			default:
				throw new UnexpectedError()
		}
	}
}
