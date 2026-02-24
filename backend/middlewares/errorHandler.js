const errorHandler = (err, req, res, next) => {
    // Konsola hatayı yazdır (Geliştirme ortamı için faydalı)
    console.error(`[HATA]: ${err.message}`);

    // Eğer hatanın özel bir durum kodu yoksa, varsayılan olarak 500 (Sunucu Hatası) kullan
    const statusCode = err.statusCode || 500;

    // İstemciye standart bir JSON formatında yanıt dön
    res.status(statusCode).json({
        success: false,
        error: {
            message: err.message || "Sunucuda beklenmeyen bir hata oluştu.",
        }
    });
};

export default errorHandler;