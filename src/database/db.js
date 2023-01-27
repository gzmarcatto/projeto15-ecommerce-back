import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI)

try{
    await mongoClient.connect();
    console.log("Connected to database");
} catch(err){
    console.log(err);
}

const db = mongoClient.db();

export const productsColletion = db.collection("products");
export const usersCollection = db.collection("users");
export const sessionsCollection = db.collection("sessions");

