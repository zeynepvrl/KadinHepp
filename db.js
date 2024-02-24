import mongoose from 'mongoose';

const conn = () => {
    mongoose.connect(process.env.DB_URL, {
        dbName: 'KadinHepp'
    })
        .then(() => {
            console.log("DB'ye başarıyla bağlanıldı")
        })
        .catch((err) => {
            console.log(`DB bağlantı hatası:${err}`)
        })
}

export default conn;
