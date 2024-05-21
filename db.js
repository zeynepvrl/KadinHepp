import mongoose from 'mongoose';

const conn = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            dbName: 'KadinHepp'
        });
        console.log("DB'ye başarıyla bağlanıldı");

        // Aktif koleksiyon isimlerini al
        const collections = await mongoose.connection.db.listCollections({}, { nameOnly: true }).toArray();
        console.log("Aktif Koleksiyonlar:", collections.map(col => col.name));
    } catch (error) {
        console.error(`DB bağlantı hatası: ${error}`);
    }
}

export default conn;
