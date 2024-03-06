import mongoose from "mongoose";
import { Schema } from "mongoose";


const categorySchema = new Schema({                                                                                          //bunu zaten photoCreate de belirteceğiz <=
    name:{
        type:String,
        required:true
    }
})

const Category = mongoose.model("Category", categorySchema)        //photoM adında modeli oluşturur, photoSchemayı kullanrak, Photo adında

export default Category