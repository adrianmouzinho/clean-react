import type { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import type { Account } from '@/domain/entities/account'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import type { AuthenticationParams } from '@/domain/use-cases/authentication'

export class RemoteAuthentication {
	constructor(
		private url: string,
		private httpPostClient: HttpPostClient<AuthenticationParams, Account>,
	) {}

	async auth(params: AuthenticationParams): Promise<void> {
		const response = await this.httpPostClient.post({
			url: this.url,
			body: params,
		})

		switch (response.statusCode) {
			case HttpStatusCode.ok:
				break

			case HttpStatusCode.unauthorized:
				throw new InvalidCredentialsError()

			default:
				throw new UnexpectedError()
		}
	}
}
