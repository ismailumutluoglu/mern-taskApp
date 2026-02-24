const notFound = (req, res, next) => {
    // 1. Gidilmek istenen URL'yi (req.originalUrl) alıp bir hata mesajı oluşturuyoruz
    const error = new Error(`Aradığınız "${req.originalUrl}" adresi sunucuda bulunamadı!`);
    
    // 2. HTTP durum kodunu 404 (Not Found) olarak ayarlıyoruz
    error.statusCode = 404;
    
    // 3. Hatayı fırlatıp Error Handler'a (Müdüre) gönderiyoruz. 
    // DİKKAT: Burada res.send() veya res.json() YOK!
    next(error); 
};

// Modülü dışa aktarıyoruz ki app.js'te kullanabilelim
export default notFound;