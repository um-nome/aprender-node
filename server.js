import express from "express"
const app = express()
app.listen(3000)
app.use(express.json())

import { PrismaClient } from "./generated/prisma/client.js"
const prisma = new PrismaClient()

const users = []

app.get("/users", async (req, res) => {

    const users = await prisma.user.findMany()

    res.status(200).json(users)

})

app.post("/users", async (req, res) => {

    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
        }
    })

    res.status(201).json(user)

})

app.put("/users/:id", async (req, res) => {

    const user = await prisma.user.update({

        where: {

            id: req.params.id

        },

        data: {

            email: req.body.email,
            name: req.body.name,
            age: req.body.age,

        }
    })

    res.status(200).json(user)

})

app.delete("/users/:id", async (req, res) => {

    const user = await prisma.user.delete({

        where: {

            id: req.params.id

        }

    })

    res.status(200).json(user)

})