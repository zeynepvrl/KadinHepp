import Photo from "../models/photoModel"
import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

const createPhoto = async (req, res) => {                      /*  satır 4 de req.body den gelen bilgilerle veri tabanında Photo modelini kullanrak üretim yaptı => bunlardan sonra üretileni geri reponse etmesi lazım 5. satırdı- fotoğrafı yükledikten sonra görmemiz gibi*/

    const result = await cloudinary.uploader.upload(     //burdaki image dashboard.ejs deki resmi yüklediğimiz formdan gelecek, type ı file şuan , name ine image yazmamız gerekiyor
        req.files.image.tempFilePath,                    //oluşturduğum göreselin geçiçi path i  Bu ifade, express-fileupload middleware'i ile yüklenen dosyanın geçici olarak diskte saklandığı yolunu temsil eder
        {
            use_filename: true,                          //Cloudinary'ye yüklenen dosyanın adının, yerel dosyanın adına eşit olmasını sağlar
            folder: "lenslight"                          // Cloudinary'de dosyanın saklanacağı klasörü belirtir
        }
    )//cloudinary de yüklenen görseli oluşturuyor, yukardaki bilgileri kullanarak. result ın içinde secure_url var bu url ile görsele clodinaryden erişebileceğiz, photoModel de bu url için yeni bir özellik ekliyoruz ve aşağıda create de bunu burdaki resultın içinden atıyoruz ona

    try {
        const photo = await Photo.create({                                 /* req.body şeklinde yazıp kontrol edecek templateimiz henüz hazır olmadı için: thunderClient kullanabiliriz */
            url: result.secure_url,                                 //url i artık clodinary den alıyor ama sayfada bastırırken de doğru alabilmesi için template lerdeki linkleri de bunlara uygun yapman gerekir, statik olmamalı
            image_id: result.public_id                                //cloudinary den silerken kullanacağımız id, 
        })

        fs.unlinkSync(req.files.image.tempFilePath)

        res.status(201).json({ photo })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}