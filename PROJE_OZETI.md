# Task Manager App - Proje Analizi ve Kod Özeti

## Genel Bakış
Bu proje, modern ve kullanıcı dostu bir görev yönetim uygulamasıdır. Hem frontend (HTML/CSS/JS) hem de backend (Node.js/Express/MongoDB) içerir. Kullanıcılar görev ekleyebilir, silebilir, düzenleyebilir ve tamamlayabilir. Tüm işlemler RESTful API üzerinden gerçekleşir.

---

## Proje Yapısı

- **backend/**: Sunucu tarafı kodları (API, veritabanı, iş mantığı)
  - **app.js**: Express sunucu, middleware ve route tanımları, MongoDB bağlantısı
  - **controller/**: CRUD işlemlerini yöneten controller fonksiyonları
  - **db/**: MongoDB bağlantı fonksiyonu
  - **middlewares/**: Hata yönetimi ve async işlemler için yardımcı fonksiyonlar
  - **models/**: Görev (Task) şeması ve modeli
  - **routes/**: API endpoint tanımları
- **frontend/**: Kullanıcı arayüzü (HTML, CSS, JS)
  - **index.html**: Ana sayfa
  - **style.css**: Özel stiller ve animasyonlar
  - **app.js**: Tüm frontend mantığı (görev ekleme, silme, filtreleme, animasyonlar)
- **images/**: Uygulama ekran görüntüleri
- **README.md**: Proje açıklaması ve kurulum talimatları

---

## Backend (Sunucu)

### app.js
- Express sunucusu başlatılır.
- CORS ve JSON parse middleware'leri eklenir.
- Statik olarak frontend dosyaları sunulur.
- `/api/v1/tasks` endpoint'i ile görev API'si sağlanır.
- Hatalar için özel middleware'ler (notFound, errorHandler) kullanılır.
- MongoDB bağlantısı kurulur ve sunucu başlatılır.

### controller/tasksController.js
- **getAllTasks**: Tüm görevleri getirir.
- **createTasks**: Yeni görev ekler.
- **getSingleTasks**: Belirli bir görevi ID ile getirir.
- **updateTasks**: Görevi günceller.
- **deleteTask**: Görevi siler.
- Tüm fonksiyonlar asyncWrapper ile sarılıp hata yönetimi sağlanır.

### models/taskModel.js
- Görevler için Mongoose şeması:
  - `name`: String, zorunlu, max 20 karakter
  - `completed`: Boolean, varsayılan false

### routes/tasks.js
- `/` GET: Tüm görevler
- `/` POST: Yeni görev ekle
- `/:id` GET: Tek görev getir
- `/:id` PATCH: Görev güncelle
- `/:id` DELETE: Görev sil

### db/connectDB.js
- MongoDB bağlantısı kurar.

### middlewares/
- **asyncWrapper.js**: Async fonksiyonları try/catch ile saran yardımcı.
- **errorHandler.js**: Hataları standart formatta döner.
- **not-found.js**: Bulunamayan endpoint'ler için 404 döner.

---

## Frontend (Kullanıcı Arayüzü)

### index.html
- Modern ve responsive arayüz.
- Görev ekleme formu, istatistik kartları, filtreler, görev listesi, boş/animasyonlu durumlar.
- Tailwind CSS CDN ile stillendirme.

### style.css
- Temiz ve modern stiller.
- Animasyonlar (fade, slide, toast, check, task-exit, shimmer, pulse-ring)
- Form, buton, kart, görev, toast ve loading için özel CSS.

### app.js
- API ile iletişim: Görevleri getir, ekle, güncelle, sil.
- Görevler filtrelenebilir (tümü, aktif, tamamlanan).
- İstatistikler ve ilerleme çubuğu dinamik güncellenir.
- Görevler üzerinde animasyonlu işlemler (ekle, sil, düzenle, tamamla).
- Toast bildirimleri ile kullanıcıya geri bildirim.
- Çift tıklama ile hızlı düzenleme.

---

## API Akışı
- **GET /api/v1/tasks**: Tüm görevleri getirir.
- **POST /api/v1/tasks**: Yeni görev ekler.
- **PATCH /api/v1/tasks/:id**: Görev günceller.
- **DELETE /api/v1/tasks/:id**: Görev siler.

---

## Kullanıcı Akışı
1. Kullanıcı yeni görev ekler (max 20 karakter).
2. Görevler listelenir, filtrelenebilir.
3. Görev tamamlanınca işaretlenir, istatistikler güncellenir.
4. Görev silinebilir veya çift tıklayarak düzenlenebilir.
5. Tüm işlemler animasyonlu ve bildirimli şekilde gerçekleşir.

---

## Kısa Kod Akışı
- Frontend, API'ye fetch ile istek atar.
- Backend, Express ile isteği karşılar, MongoDB'den veri çeker/günceller.
- Sonuçlar JSON olarak frontend'e döner.
- Frontend, gelen veriyi ekrana işler ve kullanıcıya gösterir.

---

## Notlar
- Proje tamamen modüler ve okunabilir şekilde yazılmıştır.
- Hata yönetimi ve kullanıcı deneyimi ön planda tutulmuştur.
- Modern JavaScript ve CSS teknikleri kullanılmıştır.

---

Bu dosyayı bir yapay zekaya verirsen, projeyi baştan sona detaylıca anlatabilir ve kodun genel mantığını, akışını, kullanılan teknolojileri rahatça özetleyebilir.