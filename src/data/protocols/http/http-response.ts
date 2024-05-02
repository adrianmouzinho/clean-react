export enum HttpStatusCode {
	noContent = 204,
	unauthorized = 401,
}

export type HttpResponse = {
	statusCode: HttpStatusCode
	// biome-ignore lint/suspicious/noExplicitAny: body should be any
	body?: any
}
