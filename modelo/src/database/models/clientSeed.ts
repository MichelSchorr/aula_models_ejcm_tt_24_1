import { PrismaClient } from "@prisma/client"
import { faker } from "@faker-js/faker/locale/pt_BR"
import crypto from "crypto"

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
			cpf: faker.string.numeric({ length: 11, allowLeadingZeros: false }),
			hash: crypto.createHash.toString(),
			salt: faker.string.alphanumeric(16),
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			phone: [faker.phone.number.toString(), faker.phone.number.toString(), faker.phone.number.toString()]
		})
}

export async function clientSeed() {
    await prisma.client.createMany({ data })
}
