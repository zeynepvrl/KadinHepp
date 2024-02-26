import userModel from "./Models/userModel.js"
import bcrypt from "bcrypt"                          //npm install bcrypt        şifrelerin veri tabanında doğrudan görünmemesi için 
import jwt from "jsonwebtoken";                    //npm install jsonwebtoken   kullanıcı authorization için
import Photo from "../Models/photoModel.js";
import User from "../Models/userModel.js";

const userCreate = async (req, res) => {
    try {
        await userModel.create(req.body)
        .then(data=>res.send(data))
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}


const userLogin = async (req, res) => {
    try {
        const { name, password } = req.body                    //burdaki requestten gelen name ile formlardaki(register login dashboard .ejs) name  ve userModel deki Schema daki name ismi aynı olmalıdır
        const user = await userModel.findOne({ name })       //modeldeki name burdaki req.body den aldığımız username e eşit olan= user a atanacak, burdaki username ismi formlardaki ve modeldekilerile aynı olmalı veya uygun şekilde username:name şeklinde eşleştirilmeli
        let same = false                                             // veri tabanında yapılan işlemlerin (örn findOne) önüne await eklemezsen, user boş yani false olarak döner

        if (user) {
            same = await bcrypt.compare(password, user.password)     //parametrenin ilki req.body den aldığımız password , ikincisi veritabanından çektiğimiz user ın passwordu
        } else {
            return res.status(401).json({                          // return olmasının sebebi: böyle bir kullanıcı yoksa ikinci if i çalıştırmasına gerek yoktur
                succeded: false,
                error: 'There is no such user'
            })
        }

        if (same) {

            //token ı cookie ile taşıma=>
            const token = createToken(user._id)
            res.cookie('jwt', token, {//bu parantezler configuration objects için parantezler     //jwt cokkie deki taşınanın ismi
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24
            })

            res.status(200).json({
               user,
               //token:createToken(user._id)                 //login yapmak için bilgilerini giren userın vertabanındaki _id değeri ile bir token oluştur ki, sonra ben bu kullanıcının yetkisi olup olmadığını kontrol edebileyim     
           }) 

        } else {
            res.status(401).json({
                succeded: false,
                error: 'Password are not matched'
            })
        }

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

const createToken = (userId) => {                             //tokenın payload kısmında saklanamsını istediğimiz data vardı, burda saklanmasını istediğimiz data:userId
    return jwt.sign({ userId }, process.env.JWT_SECRETKEY, {   //ilk parametre payload ikincisi .env dosyasında tanımladığımız secretkey, üçüncü ise oluşturduğumuz tokenın geçerlilik süresi
        expiresIn: "1d"                                       //bir token oluşturup bunu return edecek bu fonksiyon
    })                                                       //bu fonksiyon yukarıda login fonksiyonunun başarılı olduğu if bölümünde response olarak döndürülenler arasında kullanılacak
}


export { userCreate, userLogin}     // default ile export etmediğin için *as olarak import etmelisin, default ile export edip *as olarak import edersen görmez!
