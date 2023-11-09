import { PrismaClient } from "@prisma/client";
import { clientSeed } from "./models/clientSeed";

const prisma = new PrismaClient();

async function main() {
    
    /* funcoes importadas */
    await clientSeed()

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
	});
