const notFound = (req, res, next) => {
    // req.originalUrl ile kullanıcının gitmeye çalıştığı adresi yakalıyoruz
    res.status(404).json({
        success: false,
        message: `Aradığınız yol (${req.originalUrl}) sunucuda bulunamadı.`
    });
};

export default notFound;