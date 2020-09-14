var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    nama: String,
    alamat: String,
    tarif: Number
});

module.exports = mongoose.model('Users', UserSchema);
/**
 * @swagger
 * definitions:
 *  user:
 *   type: object
 *   required:
 *   - nama
 *   - alamat
 *   - tarif
 *   properties:
 *    nama:
 *     type: string
 *    alamat:
 *     type: string
 *    tarif:
 *     type: number
 *  users:
 *   type: array
 *   items:
 *    $ref: '#/definitions/user'
 */