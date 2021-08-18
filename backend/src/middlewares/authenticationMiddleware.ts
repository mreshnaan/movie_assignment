import express from "express";
import jwtToken from "jsonwebtoken"
import { errorResponseHandler } from "../helpers/customHandlers";
import config from "../configs/serverConfig"

//using for addMovie request types
interface IAuthenticatedRequest extends Express.Request {
    //make every key string type to any
    [key: string]: any
  
}

export default async function checkIfAuthenticated(req: IAuthenticatedRequest, res: express.Response, next: express.NextFunction) {
    try {
        //check if the authorization token exitst 
        // if not throw error
        if (!req.headers.authorization) {

            return errorResponseHandler(res, 401, "Failed", "You are not Authorized or Missing token", "")
        }
        //request the authorization token
        //split Bearer from the token 
        const token: string = req.headers.authorization.split('Bearer')[1].trim();
        //decode the token 
        const decoded = jwtToken.decode(token, config.jwt);
        //check if the decoded token exitst
        // if its a null throw error 
        if (decoded == null) {

            return errorResponseHandler(res, 401, "Failed", "You are not Authorized or Missing token", "")
        }
        console.log(decoded);
        req.jwt = decoded;

       return next();
       
    } catch (error) {
        return errorResponseHandler(res, 401, "Failed", "Invalid Token", error.message)
    }
}