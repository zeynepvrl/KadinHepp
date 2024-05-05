import mongoose from "mongoose";
import bcrypt from "bcrypt";

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


const avatarURLs = [
    "https://avatar.iran.liara.run/public/63",
    "https://avatar.iran.liara.run/public/99",
    "https://avatar.iran.liara.run/public/81",
    "https://avatar.iran.liara.run/public/57",
    "https://avatar.iran.liara.run/public/68",
    "https://avatar.iran.liara.run/public/85",
    "https://avatar.iran.liara.run/public/84",
    "https://avatar.iran.liara.run/public/67",
    "https://avatar.iran.liara.run/public/78",
    "https://avatar.iran.liara.run/public/61",
    "https://avatar.iran.liara.run/public/95",
    "https://avatar.iran.liara.run/public/93",
    "https://avatar.iran.liara.run/public/74",
    "https://avatar.iran.liara.run/public/73",
    "https://avatar.iran.liara.run/public/89",
    "https://avatar.iran.liara.run/public/62",
    "https://avatar.iran.liara.run/public/71",
    "https://avatar.iran.liara.run/public/52",
    "https://avatar.iran.liara.run/public/94",
    "https://avatar.iran.liara.run/public/86",
    "https://avatar.iran.liara.run/public/75",
    "https://avatar.iran.liara.run/public/96",
    "https://avatar.iran.liara.run/public/55",
    "https://avatar.iran.liara.run/public/88",
    "https://avatar.iran.liara.run/public/80",
    "https://avatar.iran.liara.run/public/56",
    "https://avatar.iran.liara.run/public/82",
    "https://avatar.iran.liara.run/public/95",
    "https://avatar.iran.liara.run/public/95",
    "https://avatar.iran.liara.run/public/95",
    "https://avatar.iran.liara.run/public/95",

];
function getRandomAvatar() {
    const randomIndex = Math.floor(Math.random() * avatarURLs.length);
    return avatarURLs[randomIndex];
}

userSchema.pre("save", async function (next) {
    const user = this;

    try {
        // Şifre hash'leniyor
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;

        // Fotoğraf atanmamışsa varsayılan fotoğraf atanıyor
        if (user.photo==undefined) {
            user.photo =getRandomAvatar();
        }
    } catch (error) {
        return next(error);
    }
    next();
});


const User = mongoose.model("User", userSchema);
export default User;
