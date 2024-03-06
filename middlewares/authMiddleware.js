import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

//şimdi cookies de taşınan token yardımıyla o anki kullanıcının bilgilerine app.js den yani her yerden ulaşmak için res.locals.user a atama durumu fonksiyonu=>
const checkUser= async (req,res,next)=>{
    const token=req.cookies.jwt
    if(token){
        jwt.verify(token, process.env.JWT_SECRETKEY, async (err,decodedToken)=>{        //aşağıdakine await ekleyebilmek için bunu async yapmalısın
            if(err){
                console.log(err.message)
                res.locals.user=null          //herhangi bir kullanıcı giriş yapmadı kullanıcı yok anlamında 
                next()                        //bir sonraki işleme gitmesi için 
            }else{
                const user= await User.findById(decodedToken.userId)         //tokenı userControllerda creat eden fonksiyon parametre olarak userId aldığı için burdaki de aynı olmalı
                res.locals.user=user
                console.log(res.locals.user)
                next()
            }
        })
    }else{
        res.locals.user=null
        next()
    }
}
/* Bu fonksiyon, gelen isteklerdeki JSON Web Token'ı (JWT) kontrol eder ve bu token geçerliyse, token içindeki kullanıcı kimliğini kullanarak veritabanından
 ilgili kullanıcıyı bulur. Bulunan kullanıcı bilgisini res.locals.user değişkenine ekler ve bir sonraki middleware veya route'a geçer. Eğer token geçerli değilse
veya token yoksa, res.locals.user'ı null yapar ve bir sonraki middleware veya route'a geçer. */


//uygulamada herhangi bir yerde tokenın varlığını kontrol edilecekse yani yetki var mı yok mu kontrol edilip ulaşılacak bir yer varsa onun yüklenmesi işleminden hemen önce bu fonksiyonu çağırıyoruz, yetki varsa next() ediyor ve sonraki aıma geçiyor, örn: userRoute /dashboard
const authenticateToken = async (req, res, next) => {
    try {
        const token= req.cookies.jwt    //bu jwt userControllerda create edilen tokenın login işlemi sırasında if(same) ise cookies e taşınması sırasında verilen ismi olan jwt, yukarda import edilen değil ama bağlantılı

        if(token){
            jwt.verify(token, process.env.JWT_SECRETKEY, (err)=>{//token ın verify işleminde bir hata varsa
                if(err){
                    console.log(err.message)    //login sayfasına yönlendirme olmalı
                }else{
                    next()
                }
            })
        }else{
            console.log("token yok")      //login sayfasına yönlendirme olmalı
        }
    } catch (error) {
        res.status(401).json({
            succeded:false,
            error:"Not authorized"     //yanlış token gelirse
        })
    }
};
/* Bu fonksiyon ise gelen isteğin JWT ile doğrulanıp doğrulanmadığını kontrol eder. Eğer token varsa ve geçerliyse, bir sonraki
 middleware veya route'a geçer. Eğer token geçerli değilse veya token yoksa, kullanıcıyı "/login" sayfasına yönlendirir.
  Eğer bir hata oluşursa, HTTP 401 durumu ile birlikte bir JSON yanıtı gönderir. */

  
export { authenticateToken, checkUser }        //checkUser ı app.js e doğrudan import edip bütün get isteklerinde çalışacak şekilde kullanacağız





//token ı cookies den değil de req.headers dan alırken
/* try {
        //token ı artık header dan değil cokkie den alacağımız için bunlara gerek yok
        //const authHeader = req.headers['authorization'];          // Gelen isteğin başlıklarını içeren headers nesnesinden 'authorization' başlığını alıyoruz. // Şimdi bu değeri kullanarak token doğrulama işlemlerine devam edebilirsiniz.
        //const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]  //&& 'dan öncesi eğer varsa token, && dan sonrası , split et boşlupa göre ve birinci elemanı tokendır, token a eşitle, 0. elemanın bareer yazısı
        if (!token) {
            return res.status(401).json({
                succeded: false,
                error: 'No token available'     //token olmazsa
            })
        }
        //eğer token varsa =>
        req.user = await User.findById(                           //req.user o an tokenla giriş yapan kullanıcıya eşit olması için=>
            jwt.verify(token, process.env.JWT_SECRETKEY).userId  //doğrulanan token'dan elde edilen kullanıcı kimliği.  tokenın işerisinde userId koyduk zaten
        );

        next();  //işlemler tamam sen bir sonraki işlemine gidebilirsin demek, yanı mesela route içindeki pageController.getIndexPage e geçebilirsin
    } */
/* Bu kod, bir JWT (JSON Web Token) ile kullanıcı kimlik doğrulama işlemi yapmak için kullanılır. İsteğin 'Authorization' başlığını kontrol eder,
 eğer token yoksa veya başlık içinde hatalı bir yapı varsa isteği yetkilendirmeksizin durdurur. Eğer token varsa, token'ı çözümleyerek içindeki kullanıcı kimliğini 
 kullanarak veritabanından ilgili kullanıcıyı bulur ve req.user üzerinden diğer middleware veya işlemlerde kullanılabilir. */