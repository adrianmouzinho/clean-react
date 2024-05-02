import type { HttpPostClient } from 'data/protocols/http/http-post-client'
import type { AuthenticationParams } from 'domain/use-cases/authentication'

export class RemoteAuthentication {
	constructor(
		private url: string,
		private httpPostClient: HttpPostClient,
	) {}

	async auth(params: AuthenticationParams): Promise<void> {
		return this.httpPostClient.post({
			url: this.url,
			body: params,
		})
	}
}
