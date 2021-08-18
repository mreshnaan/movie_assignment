import mongoose from "mongoose";
import config from "../configs/serverConfig"

export async function dbConnection() {
    try {
        //start using your models immediately, without waiting for mongoose to establish a connection to MongoDB.
        await mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database Connected");
    } catch (error) {
        console.log("Database connection error", error);
    }
}