import express from 'express';
import userModel from '../model/userModel';
import { responseHandler, errorResponseHandler } from '../helpers/customHandlers';
import bcrypt from "bcrypt"
import jwtToken from "jsonwebtoken";
import config from "../configs/serverConfig";

//using for add user request types 
interface IAddUser extends Express.Request {
    body: {
        name: string,
        email: string,
        password: string
    }

}
//using for login request types
interface ILogin extends express.Request {
    body: {
        email: string,
        password: string
    }

}
interface IUserResponce {
    "_id": string,
    name: string,
    email: string

}

export async function getAllUser(_: express.Request, res: express.Response, __: express.NextFunction) {

    try {

        let data: IUserResponce[] = await userModel.find({}).select({ password: 0 })
        return responseHandler(res, 201, "Success", data, "User Data Successfuly Retrieve")

    } catch (error) {

        return errorResponseHandler(res, 401, "User Data Retrieve Failed", "Failed", error.message);
    }
}

export async function adduser(req: IAddUser, res: express.Response, __: express.NextFunction) {

    try {

        let userData = req.body
        // if user email exists throw error
        let data = await userModel.findOne({ email: userData.email });

        if (data) {
            return errorResponseHandler(res, 401, "User Already Exists", "Failed", "");
        }

        let hashpass = await bcrypt.hash(userData.password, 10);
        //if not add new user
        let newUser = await new userModel({
            name: userData.name,
            email: userData.email,
            password: hashpass,

        }).save()

        return responseHandler(res, 201, "Success", newUser, "User Data Successfuly Inserted")
    } catch (error) {

        return errorResponseHandler(res, 401, "Movie Data Retrieve Failed", "Failed", error.message);
    }
}

export async function login(req: ILogin, res: express.Response, _: express.NextFunction) {

    try {
        let userData = req.body
        // check if the user email is correct
        const user = await userModel.findOne({ email: userData.email });
        console.log({ user })
        //if not throw error
        if (!user) {
            return errorResponseHandler(res, 401, "Incorrect Email or password", "Failed", "");
        }
        console.log(userData.password, user.password);
        //if correct login and 
        const isValid = await bcrypt.compare(userData.password, user.password);
        //and check if the password is correct if not throw error
        if (!isValid) {
            return errorResponseHandler(res, 401, "Incorrect Email or password", "Failed", "");

        }
        //generate token

        let token = jwtToken.sign(
            {//payload
                id: user._id,
                email: user.email,
            },
            //secreat or private key
            config.jwt,
            // token expire in 1 day
            { expiresIn: "1d" }
        );
        // return user datas with genereate token

        return responseHandler(res, 201, "Success", {
            name: user.name,
            email: user.email,
            token
        }, "User Data Successfuly Inserted")

    } catch (error) {
        return errorResponseHandler(res, 401, "User Login Failed", "Failed", error.message);

    }

}
