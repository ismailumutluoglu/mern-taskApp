import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,     // Veri tipi metin
    required: true,   // Bu alan zorunlu (boş bırakılamaz)
    trim: true        // Başındaki ve sonundaki boşlukları otomatik temizler
  },
  description: {
    type: String,
    trim: true
  },
  isCompleted: {
    type: Boolean,    // Veri tipi doğru/yanlış
    default: false    // Yeni görev eklendiğinde varsayılan olarak "tamamlanmadı" (false) olur
  },
  dueDate: {
    type: Date        // Görevin bitiş tarihi (opsiyonel)
  }
}, 
{
  timestamps: true    // Bu ayar MongoDB'de otomatik olarak 'createdAt' ve 'updatedAt' alanları oluşturur
});

export default TaskSchema;