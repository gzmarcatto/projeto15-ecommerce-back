import { sessionsCollection, usersCollection } from "../database/db.js";


export async function userSchemaValidation(req, res, next){
    const user = req.body;

    const { error } = userSchema.validate(user, { abortEarly: false });

    if(error){
        const errorMessage = error.details.map( detail => detail.message);
        return res.status(400).send(errorMessage);
    }

    const checkUser = await usersCollection.findOne({ email: user.email });
    if(checkUser){
        return res.status(400).send("Usuário já cadastrado!");
    }

    res.locals.user = user;

    next();

}


export async function signInBodyValidation(req, res, next) {
    const { email, password } = req.body;

    try{
        const user = await usersCollection.findOne({ email });
        if(!user){
            return res.status(401).send("Não autorizado");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(401).send("Não autorizado");
        }

        res.locals.user = user;
    } catch (err){
        return res.status(500).send("Erro interno no servidor");
    }

    next();

}

export async function authRoutesValidation(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if(!token){
        return res.status(401).send("Não autorizado");
    }

    try{
        const session = await sessionsCollection.findOne({ token });
        if(!session){
            return res.status(401).send("Não autorizado");
        }

        const user = await usersCollection.findOne({ _id: session.userId });

        if(!user){
            return res.status(401).send("Não autorizado");
        }

        res.locals.user = user;
    }catch (err){
        return res.status(500).send("Erro interno no servidor");
    }

    next();
}