const mongoose = require('mongoose');
const slugify = require('slugify')

const Schema = mongoose.Schema;

const plataformaSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    imagen:{
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
});

// Middleware para generar el slug antes de la validación
plataformaSchema.pre('validate', function (next) {
    if (!this.slug && this.nombre) {
        this.slug = slugify(this.nombre, { lower: true });
    }
    next();
});

module.exports = mongoose.model('Plataforma', plataformaSchema);
