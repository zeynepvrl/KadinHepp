import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"                                   //npm i bcrypt  veritabanında şifreyi doğrudan göstermek yerine şifreli kaydetmek için

const userSchema = new Schema({
    name: {                                //şemadaki birimlerin isimleri formdaki(register.ejs ve login.ejs) birimlerin isimleri ile aynı olmalıdır!
        type: String,
        required: true,
        lowercase:true
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
    location:{
        type:Schema.Types.ObjectId,
        ref:'location'
    },
    photo:{
        type:Schema.Types.ObjectId,
        ref:'photo'
    },

    /* ,
    followers:[                               // [] takipçi birden fazla olabileceği için array içine alıyoruz
        {
            type: Schema.Types.ObjectId,
            ref:"User"                       //followersların kendisi yine bir user olduğu için User modelini referans veriyoruz. user model içinde referansı yine user modele veriyoruz
        }
    ],
    followings:[                              // followers ve following bilgileri dashboard da gösterileceği için UserControllerdaki getDashboard fonksiyonunda mongoDb den user Modelinden uygun user ı çekip bu ikisini populate etmeliyiz ki dashboard.ejs de kullanabilelim
        {
            type: Schema.Types.ObjectId,
            ref:"User"
        }
    ] */
}/* ,
    {
        timestamps: true                //created time ve uploaded time şeklinde iki tane üretiyor veri tabanında
    } */
)

userSchema.pre("save", function (next) {               //kaydedilmeden önce (pre-save hook) belirli bir işlem gerçekleştirmek üzere Mongoose kullanarak MongoDB'de bir şema (schema) için belirlenmiş bir ön işlemi temsil eder.
    const user = this                                  // bu ön işlem sırasında kullanılacak olan "user" değişkenini tanımlar. Bu değişken, belgeyi temsil eder.
    bcrypt.hash(user.password, 10, (err, hash) => {    // user.password kullanıcının orijinal şifresini temsil eder. 10 ikinci argüman, hash için kullanılacak olan "salt rounds" veya tuz sayısını belirtir. Daha yüksek bir tuz sayısı, daha güvenli bir hash elde etmek için kullanılır.(err, hash) => {: Bu bir callback fonksiyonudur. Hash işlemi tamamlandığında bu fonksiyon çağrılır.
        user.password = hash                           //Oluşturulan hash, kullanıcının şifresiyle değiştirilir. Yani, artık kullanıcının şifresi açık metin halinde değil, güvenli bir şekilde hashlenmiş haldedir.
        next()                                         //bu işlevi çağırmak, bu ön işlemin tamamlandığını ve ardından asıl kaydetme işleminin devam edebileceğini belirtir.
    })
})

const user = mongoose.model("user", userSchema)           //yukardaki next() olmasaydı bu satıra geçmezdi. 

export default user