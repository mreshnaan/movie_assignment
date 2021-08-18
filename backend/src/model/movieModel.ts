import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: String,
    imageURL: String,
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
})

const movieModel = mongoose.model('Movie', schema);
export default movieModel;
