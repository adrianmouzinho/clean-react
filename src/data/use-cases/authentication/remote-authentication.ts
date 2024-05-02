import type { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import type { AuthenticationParams } from '@/domain/use-cases/authentication'

export class RemoteAuthentication {
	constructor(
		private url: string,
		private httpPostClient: HttpPostClient,
	) {}

	async auth(params: AuthenticationParams): Promise<void> {
		const response = await this.httpPostClient.post({
			url: this.url,
			body: params,
		})

		switch (response.statusCode) {
			case HttpStatusCode.unauthorized:
				throw new InvalidCredentialsError()

			default:
				return Promise.resolve()
		}
	}
}
