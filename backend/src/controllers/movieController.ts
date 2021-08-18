import express from 'express'
import movieModel from '../model/movieModel'
import { responseHandler, errorResponseHandler } from '../helpers/customHandlers';


//using for addMovie request types
interface IAddMovie extends Express.Request {
    body: {
        name: string,
        imageURL:string
    },
    jwt?: {
        id: string,
        email: string
    } | any

}
//using for updateMovie request types
interface IUpdateMovie extends Express.Request {
    params: {
        id: String
    },
    body: {
        name: String,
        imageURL: String
    },


}
//using for deleteMovie request types
interface IDeleteMovie extends Express.Request {
    params: {
        id: String
    },

}

// get all movies
// _ underscore for unused parameters it wont show error in typescript

export async function getAllData(_: express.Request, res: express.Response, __: express.NextFunction) {

    try {

        let data = await movieModel.find({})
        return responseHandler(res, 201, "Success", data, "Movie Data Successfuly Retrieve")

    } catch (error) {

        return errorResponseHandler(res, 401, "Movie Data Retrieve Failed", "Failed", error.message);
    }
}


export async function addMovie(req: IAddMovie, res: express.Response, __: express.NextFunction) {
    try {

        const reqUserId = req.jwt.id;
        // requesting movie data from body 
        const reqBodyData = req.body;
        // first check the movie name already exists 
     
        // if movie name exists throw error
        let movieName = await movieModel.findOne({ name: reqBodyData.name });

        if (movieName) {
            return errorResponseHandler(res, 401, "Movie Already Exists", "Failed", "");
        }
        // if it exists throw error
    
        // if not add the movie
        let data = await new movieModel({

            name: reqBodyData.name,
            imageURL: reqBodyData.imageURL,
            createdBy: reqUserId

        }).save();
        return responseHandler(res, 201, "Success", data, "Movie Data Successfuly Inseted")


    } catch (error) {
        return errorResponseHandler(res, 401, "Oops, Cant Add Movie Data Something went wrong", "Failed", error.message);

    }
}

export async function updateMovie(req: IUpdateMovie, res: express.Response, __: express.NextFunction) {
    try {
        //request the movie id
        const movieId = req.params.id;
        //request movie body data name,imageUrl
        const reqBodyData = req.body
        // check the movie id already exists 
        const movieData = await movieModel.findById(movieId)
        console.log("movie :", movieData);
        //if not exists then throw error
        if (!movieData) {
            throw new Error("Could not find Movie");
        }
        const data = await movieModel.findByIdAndUpdate(movieId,
            {
                name: reqBodyData.name,
                imageURL: reqBodyData.imageURL,
            },
            { new: true });
        console.log("update Movie Data : ", data);
        return responseHandler(res, 201, "Success", data, "Movie Successfuly Updated")

    } catch (error) {

        return errorResponseHandler(res, 401, "Movie Cant Update Something went wrong ", "Failed", error.message)

    }

}

export async function deleteMovie(req: IDeleteMovie, res: express.Response, __: express.NextFunction) {

    try {
        //request the movie id
        const movieId = req.params.id;
        // check the movie id already exists 
        const movieData = await movieModel.findById(movieId)
        console.log("movie :", movieData);
        //if not exists then throw error
        if (!movieData) {
            throw new Error("Could not find Movie");
        }
        const data = await movieModel.findByIdAndDelete(movieId);

        console.log("Deleted Movie Data : ", data);

        return responseHandler(res, 201, "Success", data, "Movie Successfuly Deleted")

    } catch (error) {

        return errorResponseHandler(res, 401, "Movie Cant Deleted Something went wrong ", "Failed", error.message)

    }

}




