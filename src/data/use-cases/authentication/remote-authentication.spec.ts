import { faker } from '@faker-js/faker'

import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { mockAuthentication } from '@/data/test/mock-authentication'
import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import type { Account } from '@/domain/entities/account'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import type { AuthenticationParams } from '@/domain/use-cases/authentication'
import { RemoteAuthentication } from './remote-authentication'

type SutTypes = {
	sut: RemoteAuthentication
	httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, Account>
}

function makeSut(url = faker.internet.url()): SutTypes {
	const httpPostClientSpy = new HttpPostClientSpy<
		AuthenticationParams,
		Account
	>()
	const sut = new RemoteAuthentication(url, httpPostClientSpy)

	return {
		sut,
		httpPostClientSpy,
	}
}

describe('RemoteAuthentication', () => {
	it('should call RemoteAuthentication with correct URL', async () => {
		const url = faker.internet.url()
		const { sut, httpPostClientSpy } = makeSut(url)
		await sut.auth(mockAuthentication())

		expect(httpPostClientSpy.url).toBe(url)
	})

	it('should call RemoteAuthentication with correct body', async () => {
		const { sut, httpPostClientSpy } = makeSut()
		const authenticationParams = mockAuthentication()
		await sut.auth(authenticationParams)

		expect(httpPostClientSpy.body).toEqual(authenticationParams)
	})

	it('should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
		const { sut, httpPostClientSpy } = makeSut()
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.unauthorized,
		}
		const promise = sut.auth(mockAuthentication())

		expect(promise).rejects.toThrow(InvalidCredentialsError)
	})

	it('should throw UnexpectedError if HttpPostClient returns 400', async () => {
		const { sut, httpPostClientSpy } = makeSut()
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.badRequest,
		}
		const promise = sut.auth(mockAuthentication())

		expect(promise).rejects.toThrow(UnexpectedError)
	})

	it('should throw UnexpectedError if HttpPostClient returns 403', async () => {
		const { sut, httpPostClientSpy } = makeSut()
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.forbidden,
		}
		const promise = sut.auth(mockAuthentication())

		expect(promise).rejects.toThrow(UnexpectedError)
	})

	it('should throw UnexpectedError if HttpPostClient returns 404', async () => {
		const { sut, httpPostClientSpy } = makeSut()
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.notFound,
		}
		const promise = sut.auth(mockAuthentication())

		expect(promise).rejects.toThrow(UnexpectedError)
	})

	it('should throw UnexpectedError if HttpPostClient returns 500', async () => {
		const { sut, httpPostClientSpy } = makeSut()
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.serverError,
		}
		const promise = sut.auth(mockAuthentication())

		expect(promise).rejects.toThrow(UnexpectedError)
	})
})
