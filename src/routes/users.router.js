import { Router } from "express";
import passport from "passport";
import { usersController } from "../controllers/users.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";

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

//Change Password

router.get('/renderReset', usersController.renderResetPassword );
router.post('/validateUser', usersController.validateUSer);
router.get('/resetPassword/:token', usersController.resetPassword);
router.post('/resetPassword', usersController.newPassword);

//User premium
router.get('/api/users/premium',jwtValidation ,authMiddleware(['premium']), usersController.premiumRender);
//enviar por body role = user o premium
router.post('/api/users/premium/:userId', authMiddleware(['premium']), usersController.premiumUser);


//jwt validation
// router.get('validation', jwtValidation, (req, res)=>{
//     res.send('prueba')
// })

//jwt validation passport
router.get('/validation', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('Probando')
});


export default router;