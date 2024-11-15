const path = require('path');
const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/registro', authController.getRegistro)
router.post('/registro', authController.postRegistro)

router.post('/cerrar-sesion', authController.cerrarSesion);
module.exports=router;