const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            // Senin yazdığın controller fonksiyonunu çalıştırır
            await fn(req, res, next);
        } catch (error) {
            // Bir hata olursa bunu Express'in hata yakalayıcısına (next ile) ilet
            next(error); 
        }
    };
};

export default asyncWrapper;