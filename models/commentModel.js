import mongoose from "mongoose";
import { Schema } from "mongoose";


const commentSchema = new Schema({    
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:'post'
    },                                                                                      //bunu zaten photoCreate de belirteceğiz <=
    content:{
        type:String,
        required:true
    }
})

const comment = mongoose.model("comment", commentSchema)        //photoM adında modeli oluşturur, photoSchemayı kullanrak, Photo adında

export default comment