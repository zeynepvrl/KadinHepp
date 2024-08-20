# Node.js REST API

Bu proje, ** Node.js, Express.js, MongoDB ve Cloudinary** kullanılarak geliştirilmiş bir REST API'dir. API, kullanıcıların deneyimlerini paylaşabilecekleri, fotoğraflar ekleyebilecekleri ve hesap yönetimi yapabilecekleri bir platform sağlar. JSON Web Token (JWT) ile güvenli kimlik doğrulama sunar ve CRUD (Create, Read, Update, Delete) işlemlerini destekler.

## Özellikler

- **Kullanıcı Yönetimi:** Kullanıcı kaydı, giriş ve hesap yönetimi.
- **JWT ile Kimlik Doğrulama:** JSON Web Token (JWT) kullanılarak güvenli kimlik doğrulama.
- **Gönderi Yönetimi:** Kullanıcılar deneyimlerini paylaşmak için gönderiler oluşturabilir, düzenleyebilir ve silebilir.
- **Fotoğraf Yükleme:** Cloudinary entegrasyonu sayesinde kullanıcılar gönderilerine fotoğraf ekleyebilir ve bu fotoğrafları yönetebilir.
- **Korunan Rotalar (Protected Routes):** Sadece giriş yapmış kullanıcılar belirli rotalara erişebilir.
- **Veritabanı Yönetimi:** MongoDB ile veri saklama ve yönetim işlemleri.

## Kurulum

### Gereksinimler

- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/) (Yerel kurulum veya Atlas kullanımı)
- [Cloudinary Hesabı](https://cloudinary.com/)

### Adımlar

1. **Projeyi Klonlayın:**

   ```bash
   git clone https://github.com/zeynepvrl/nodejs-express-mongodb-rest-api.git
   cd nodejs-express-mongodb-rest-api
