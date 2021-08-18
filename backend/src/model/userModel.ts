import mongoose from 'mongoose';
//define a user data table structure
const schema = new mongoose.Schema({
    name: String,
    password: { type: String,  select: true },//You can change the default behavior at the schema definition level using the select attribute of the field
    email: String,


}, {
    timestamps: true
})

 const userModel = mongoose.model('User', schema);
 export default userModel;

