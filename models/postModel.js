import mongoose from "mongoose";
import { Schema } from "mongoose";


const postSchema = new Schema({
    user:{                           //her fotoğraf hangi user a ait olduğuna dair bilgi taşıyacak  , üstteki 3 bilgiyi fotoğrafın oluşturulduğu formdan olacağız ama user bilgisini req.locals.user dan alacağız, tokenı decode edip buraya user ı yerleştirmiştik zaten
        type:Schema.Types.ObjectId,
        ref:'User'                  //User modelini referans gösterdik
    },
    content: {
        type: String,
        trim: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now 
    },                                                                                                        //bunu zaten photoCreate de belirteceğiz <=
    category:{
        type:Schema.Types.ObjectId,
        ref:'category'
    },
    location:{
        type:String,
        required:true
    },
    /* location:{
        type:Schema.Types.ObjectId,
        ref:'Location'
    }, */
    photo:{
        type:Schema.Types.ObjectId,
        ref:'Photo'
    }
})

const Post = mongoose.model("Post", postSchema)        //photoM adında modeli oluşturur, photoSchemayı kullanrak, Photo adında

export default Post