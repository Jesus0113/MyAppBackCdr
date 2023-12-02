import { Router } from "express";
import passport from "passport";
import { usersController } from "../controllers/users.controller.js";

const router = Router();

// ** Registro y Login **
//Registro
//lleva al registro
router.get('/registro', usersController.redirectRegister);
//Login
//lleva al login
router.get('/', usersController.redirectLogin);
//envia login
router.post('/login', usersController.findAndLogin);
//Agrega al usuario
router.post('/registro', usersController.createOneUser);

//passport github
// router.get('/login/github', usersController.loginUserGithub);

router.get('/login/github', passport.authenticate('github', { scope: ['user:email'] }));

//callBack github
// router.get('/github', usersController.callBackLoginGithub
//router.get('/github', passport.authenticate('github',{ failureRedirect: '/', successRedirect: '/api/products/AdminUser' })

 router.get('/github', passport.authenticate('github', { failureRedirect: '/' }), usersController.callBackLoginGithub
    // ,(req, res )=>{
    // req.session['username'] = req.user.username
    // req.session['isArmin'] = req.user.isAdmin
    // }
);

//jwt validation
// router.get('validation', jwtValidation, (req, res)=>{
//     res.send('prueba')
// })

//jwt validation passport
router.get('/validation', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.user);
    res.send('Probando')
});


export default router;