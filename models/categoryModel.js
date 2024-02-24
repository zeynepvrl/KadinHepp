import mongoose from "mongoose";
import { Schema } from "mongoose";


const categorySchema = new Schema({                                                                                          //bunu zaten photoCreate de belirteceğiz <=
    name:{
        type:String,
        required:true
    }
})

const category = mongoose.model("category", categorySchema)        //photoM adında modeli oluşturur, photoSchemayı kullanrak, Photo adında

export default category