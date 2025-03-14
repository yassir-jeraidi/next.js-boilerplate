import {hash} from "bcryptjs";
import {Role} from "@/enums";
import {prisma} from "@/lib/prisma";

async function main() {
    await prisma.user.createMany(
        {
            data: [
                {
                    name: "Admin",
                    email: "admin2@gmail.com",
                    password: await hash("password", 10),
                    role: Role.ADMIN
                },
                {
                    name: "User",
                    email: "user@gmail.com",
                    password: await hash("password", 10),
                    role: Role.USER
                },
                {
                    name: "Editor",
                    email: "editor@gmail.com",
                    password: await hash("password", 10),
                    role: Role.EDITOR
                }
            ]
        }
    )
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })