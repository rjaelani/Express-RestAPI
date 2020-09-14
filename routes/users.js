var express = require('express');
var router = express.Router();
var User = require('../models/Users.js');
var jwt = require('jsonwebtoken');

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/


function isAuth(req,res,next){
  var token1 = req.header('sebuah-header-token')
  jwt.verify(token1, 'rahasia',function(err,decoded){
    if(err) return res.status(500).send({ auth:false, message:'gagal autentikasi token.'});
    req.decoded=decoded
    next();
  })
};

router.post('/auth', function(req, res, next){
  const{name}=req.body
  if(name!='admin')return res.send({message: 'name salah'})
  var token = jwt.sign({ name}, 'rahasia', {
    expiresIn: 86400})
    res.send(token)
})

/**
 * @swagger
 * /users:
 *  get:
 *   tags:
 *    - Users
 *   description: Return all users
 *   produces:
 *    - application/json
 *   responses:
 *    200:
 *     description: An array of users
 *     schema:
 *      $ref: '#/definitions/users' 
 */
router.get('/', /*isAuth ,*/ function(req, res, next){
  User.find(function(err, user){
    if(err) return next(err);
    res.json(user);
  });
});

/**
 * @swagger
 * /users:
 *  post:
 *   tags:
 *    - Users
 *   description: create a new user
 *   produces:
 *    - application/json
 *   parameters:
 *    - name: user
 *      description: user object
 *      in: body
 *      required: true
 *      schema:
 *       $ref: '#/definitions/user'
 *   responses:
 *    200:
 *     description: new user
 *     schema:
 *      $ref: '#/definitions/user'
 */
router.post('/', function(req, res, next){
  User.create(req.body, function(err, post){
    if(err) return next(err);
    res.json(post);
  });
});

/**
 * @swagger
 * /users/{nama}:
 *  get:
 *   tags:
 *    - Users
 *   description: returns a single user
 *   produces:
 *    - application/json
 *   parameters:
 *    - name: nama
 *      description: name of the user to return
 *      in: path
 *      required: true
 *      type: string
 *   responses:
 *    200:
 *     description: user
 *     schema:
 *      $ref: '#/definitions/user'
 */
router.get('/:nama', function(req, res, next){
  User.findOne({nama:req.params.nama}, req.body, function(err, post){
    if(err) return next(err);
    res.json(post);
  });
});

/**
 * @swagger
 * /users/{nama}:
 *  put:
 *   tags:
 *    - Users
 *   description: Update of user
 *   produces:
 *    - application/json
 *   parameters:
 *    - name: nama
 *      description: name of the user to update
 *      in: path
 *      required: true
 *      type: string
 *   responses:
 *    200:
 *     description: updated user
 *     schema:
 *      $ref: '#/definitions/user'
 */
router.put('/:nama', function(req, res, next){
  User.findOneAndUpdate(req.params.nama, req.body, function(err, post){
    if(err) return next(err);
    res.json(post);
  });
});

/**
 * @swagger
 * /users/{nama}:
 *  delete:
 *   tags:
 *    - Users
 *   description: delete user
 *   produces:
 *    - application/json
 *   parameters:
 *    - name: nama
 *      description: name of user to delete
 *      in: path
 *      required: true
 *      type: string
 *   responses:
 *    200:
 *     description: deleted user
 *     schema:
 *      $ref: '#/definitions/user'
 */
router.delete('/:nama', function(req, res, next){
  User.findOneAndRemove(req.params.nama, req.body, function(err, post){
    if(err) return next(err);
    res.json(post);
  });
});

module.exports = router;
