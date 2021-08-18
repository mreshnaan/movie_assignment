import express from "express";
const router = express.Router();
import authmiddleware from "../middlewares/authenticationMiddleware";
import {getAllData,addMovie,deleteMovie,updateMovie} from "../controllers/movieController"



router.get('/', authmiddleware,getAllData);
router.post('/',authmiddleware,addMovie);
router.put('/:id', authmiddleware,updateMovie);
router.delete('/:id', authmiddleware,deleteMovie);


export default router;
