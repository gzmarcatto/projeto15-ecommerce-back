import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import { sessionsCollection, usersCollection } from "../database/db.js";


export async function signUp(req, res) {
    const newUser = res.locals.user;
    const passwordHash = await bcrypt.hash(newUser.password, 10);

    try {
        await usersCollection.insertOne({ ...newUser, password: passwordHash });
        res.status(201).send("Usuário cadastrado com sucesso!");
    } catch (err) {
        res.status(500).send("Erro interno no servidor");
    }
}

export async function signIn(req, res) {
    const user = res.locals.user;
    const token = uuidV4();

    try {
        await sessionsCollection.insertOne({ userId: user._id, token });
        res.status(200).send({ token });
    } catch (err) {
        res.status(500).send("Erro interno no servidor");
    }
}
