import mongoose from "mongoose";
import { Schema } from "mongoose";


const locationSchema = new Schema({                                                                                          //bunu zaten photoCreate de belirteceğiz <=
    name:{
        type:String,
        required:true
    }
})

const location = mongoose.model("location", locationSchema)        //photoM adında modeli oluşturur, photoSchemayı kullanrak, Photo adında

export default location