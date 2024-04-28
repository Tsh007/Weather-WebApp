import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    city:{
        type:String,
        required: true
    },
    temp:{
        type:String,
        requires:true
    }
})


export default mongoose.model("User", userSchema);