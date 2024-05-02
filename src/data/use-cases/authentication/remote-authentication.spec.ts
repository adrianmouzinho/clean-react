import { faker } from '@faker-js/faker'

import { mockAuthentication } from '@/data/test/mock-authentication'
import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'

type SutTypes = {
	sut: RemoteAuthentication
	httpPostClientSpy: HttpPostClientSpy
}

function makeSut(url = faker.internet.url()): SutTypes {
	const httpPostClientSpy = new HttpPostClientSpy()
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
})
