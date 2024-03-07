import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Photo from "../models/photoModel.js"

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    /* locationId: {
        type: Schema.Types.ObjectId,
        ref: 'Location', // Referans alınacak schema'nın adı
        required: true
    }, */
    location:{
        type:String,
        required:true
    },
    photo: {
        type:String
    }
});
const defaultPhotoId = "65ea209e4a16d739effdd986";
userSchema.pre("save", async function (next) {
    const user = this;

    try {
        // Şifre hash'leniyor
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;

        // Fotoğraf atanmamışsa varsayılan fotoğraf atanıyor
        if (user.photo==undefined) {
            const defaultPhoto = await Photo.findById(defaultPhotoId);
            user.photo = defaultPhoto.url;
        }
    } catch (error) {
        return next(error);
    }
    next();
});


const User = mongoose.model("User", userSchema);
export default User;
