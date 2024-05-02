export class InvalidCredentials extends Error {
	constructor() {
		super('Credenciais inválidas')
		this.name = 'InvalidCredentials'
	}
}
