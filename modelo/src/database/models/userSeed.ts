import { PrismaClient } from "@prisma/client"
import { faker } from "@faker-js/faker/locale/pt-BR"

const prisma = new PrismaClient()

interface Client {
    email: string
		cpf: string 
		hash: string 
		salt: string
		firstName: string
		lastName: string
		phone: string[]
}

let data: Client[] = []

for(let i = 0; i < 20; i++) {
    data.push({
			email: faker.internet.email(),
			cpf: faker.br.cpf(),
			hash: "",
			salt: "",
			firstName: "",
			lastName: "",
			phone: []
		})
}

export async function userSeed() {
    await prisma.client.createMany({ data })
}
