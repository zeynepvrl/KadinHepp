import mongoose from "mongoose";
import { Schema } from "mongoose";


const photoSchema = new Schema({                                                                                          //bunu zaten photoCreate de belirteceğiz <=
    url:{
        type:String,
        required:true
    },
    image_id:{                       //cloudinary de oluşturduğumuz fotoğrafı reasul da taşıyorduk, bu resulta taşının foto da image_id adındadaki değeri fotoğrafı silmek için kullanacağımızdan create ederken modelde de taşıyacağız
        type:String
    }
})

const Photo = mongoose.model("Photo", photoSchema)        //photoM adında modeli oluşturur, photoSchemayı kullanrak, Photo adında

export default Photo