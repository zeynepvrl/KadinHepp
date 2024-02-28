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
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location', // Referans alınacak schema'nın adı
        required: true
    },
    photo: {
        type: Schema.Types.ObjectId,
        ref: 'Photo'
    }
});

userSchema.pre("save", function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

const User = mongoose.model("User", userSchema);
export default User;
