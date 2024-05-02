import type { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentials } from '@/domain/errors/invalid-credentials'
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
				throw new InvalidCredentials()

			default:
				return Promise.resolve()
		}
	}
}
