import type { HttpPostClient } from 'data/protocols/http/http-post-client'

export class RemoteAuthentication {
	constructor(
		private url: string,
		private httpPostClient: HttpPostClient,
	) {}

	async auth(): Promise<void> {
		return this.httpPostClient.post({
			url: this.url,
		})
	}
}
