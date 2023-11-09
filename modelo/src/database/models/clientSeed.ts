import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker/locale/pt_BR";
import crypto from "crypto";

const prisma = new PrismaClient();

interface Client {
    email: string
	cpf: string 
	hash: string 
	salt: string
	firstName: string
	lastName: string
	phone: string[]
}

let data: Client[] = [];

for(let i = 0; i < 20; i++) {
	  // const password = faker.string.alphanumeric({ length: 8 });
		// const salt = crypto.randomBytes(32).toString("hex");
		// const hash = crypto
		//   	.pbkdf2Sync(password, salt, 10000, 64, "sha512")
		// 		.toString("hex");

    data.push({
			email: faker.internet.email(),
			cpf: faker.string.numeric({ length: 11, allowLeadingZeros: false }),
			// hash: hash,
			// salt: salt,
			hash: faker.string.alphanumeric(30),
			salt: faker.string.alphanumeric(30),
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			phone: [faker.string.numeric({ length: 14, allowLeadingZeros: false })]
		});
}

export async function clientSeed() {
    await prisma.client.createMany({ data });
}
