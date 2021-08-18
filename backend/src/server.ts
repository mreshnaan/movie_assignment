//imports
import express, { NextFunction } from "express";
import cors from "cors";
const app = express();
//config file for dotenv we can change any env file
import config from "./configs/serverConfig";
//creating a custome response and error response  
import { responseHandler, errorResponseHandler } from "./helpers/customHandlers";
//database connection
import { dbConnection } from "../src/utils/dbConnection";
dbConnection();

//import routes
import userRouter from "../src/routes/userRoute";
import movieRouter from "../src/routes/movieRoute";
// The browser's same-origin policy blocks reading a resource from a different origin.
app.use(cors());
//incoming Request Object as a JSON Object
app.use(express.json());


//this middleware use to where the file will be uploaded
app.use("/uploads", express.static('uploads'));

//base route
app.get("/", (_: express.Request, res: express.Response, __: NextFunction) => {

    try {
        return responseHandler(res, 201, "Success",  "hellow base route" , "Data Successfuly Retrieve");
    } catch (error) {
        return errorResponseHandler(res, 401, " Opps something went wrong", "Failed", error.message)
    }
})

//others routes
app.use('/user',userRouter)
app.use('/movie',movieRouter)


app.listen(config.port, () => console.log(`Server runing on ${config.hostname}:${config.port}`));


