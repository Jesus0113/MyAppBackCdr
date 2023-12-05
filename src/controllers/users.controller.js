import { usersService } from "../services/users.service.js";
import { compareData, generateToken, verifyToken } from "../utils.js";
import CustomError from "../error/CustomError.js";
import { ErrorMessages } from "../error/error.enum.js";


class UsersController {

    async redirectRegister(req, res) {
        try {
            res.render('registro');
        } catch (error) {
            CustomError.createError(ErrorMessages.ROUTE_NOT_FOUND)
            // res.status(500).json({ error: "Hubo un error al acceder al Registro" });
        }
    }

    async redirectLogin(req, res) {
        try {
            res.render('login');
        } catch (error) {
            CustomError.createError(ErrorMessages.ROUTE_NOT_FOUND)
            // res.status(500).json({ error: "Hubo un error al acceder al Login" });
        }
    }

    async findAllUsers(req, res) {
        try {
            const allUsers = await usersService.findAll();
            res.status(200).json({ message: "Success", allUsers });
        } catch (error) {
            CustomError.createError(ErrorMessages.USER_NOT_FOUND)
            // res.status(500).json({ message: error.message });
        }
    }

    async findAndLogin(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            CustomError.createError(ErrorMessages.DATA_MISSING)
            // return res.status(400).json({ message: 'Some data is missing' });
        }
        try {
            const userDb = await usersService.findUserByEmail(email);
            if (!userDb) {
                return res.status(400).json({ message: 'Signup first' });
            }
            const validPassword = await compareData(password, userDb.password);
            if (!validPassword) {
                return res.status(401).json({ message: 'Username or Password not valid' });
            }
            const token = generateToken(userDb);
            // req.session['username'] = username;
            res.status(200).cookie('token', token).redirect('/api/products/adminUser');
        } catch (error) {

            CustomError.createError(ErrorMessages.USER_NOT_FOUND);
            // res.status(500).json({ message: error.message });
        }
    }

    async findUserByEmail(req, res) {
        const { email } = req.body;
        try {
            const user = await usersService.findUserByEmail(email);

            res.status(200).json({ message: "Success", user });
        } catch (error) {


            CustomError.createError(ErrorMessages.USER_NOT_FOUND);
            // res.status(500).json({ message: error.message });
        }
    }

    async createOneUser(req, res) {
        const { first_name, last_name, email, password, age } = req.body;

        if (!first_name || !last_name || !email || !password || !age) {

            // sCustomError.createError(ErrorMessages.DATA_MISSING)
            return res.status(400).json({ message: 'Some data is missing' });
        }
        try {
            const userFind = await usersService.findUserByEmail(email);
            if (userFind) {
                return res.status(400).json({ message: 'User already used' });
            }
            const createUser = await usersService.createOne(req.body);
            res.status(200).json({ message: "User created", user: createUser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteUser(req, res) {
        const { idUser } = req.params;
        try {
            const deleteUser = await usersService.deleteOne(idUser);
            res.status(200).json({ message: "User deleted", user: deleteUser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


    async callBackLoginGithub(req, res) {
        const { email } = req.user
        try {
            const userDb = await usersService.findUserByEmail(email);

            if (userDb.fromGithub) {
                const token = generateToken(userDb);
                res.status(200).cookie('token', token).redirect('/api/products/AdminUser');
            } else {
                res.status(200).redirect('/')
            }

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async renderResetPassword(req, res) {
        try {
            res.render('passwordReset')
        } catch (error) {
            CustomError.createError(ErrorMessages.ROUTE_NOT_FOUND);
        }
    }

    async validateUSer(req, res) {
        const { email } = req.body;
        try {
            const validUser = await usersService.validateUser(email);
            if (validUser) {
                const token = generateToken(validUser);
                const confirmation = await usersService.emailConfirmation(email, token);
                res.render('confirmation')
            } else {
                res.render('registro')
            }
        } catch (error) {
            CustomError.createError(ErrorMessages.ACTION_NOT);
        }
    }

    async resetPassword(req, res) {

        const { token } = req.params
        const checkToken = verifyToken(token);
        try {
        if (!checkToken) {
            res.render('passwordReset');
        }else{
            res.render('changePassword')
        }
        } catch (error) {
            CustomError.createError(ErrorMessages.ACTION_NOT);
        }
    }

    async newPassword (req, res){

        const { email, newPassword, repeatPassword } = req.body
        if (!email || !newPassword || !repeatPassword) {
            // CustomError.createError(ErrorMessages.DATA_MISSING)      
            res.status(400).json({ message: 'Some data is missing' });
        }
        if (newPassword !== repeatPassword) {
            res.status(400).json({ message: 'Passwords must match' });
        }
        try {
            const user = await usersService.findUserByEmail(email)
            if (!user) {
                return res.status(400).json({ message: 'Email or Password not valid' });
            }
            const validPassword = await compareData(newPassword, user.password);
            if (validPassword) {
                return res.status(401).json({ message: 'No se puede colocar la misma contraseña' });
            }
             const reset = await usersService.resetPassword(user._id, req.body);
             res.status(200).json({ message: "Success", user: reset });  
        } catch (error) {
            CustomError.createError(ErrorMessages.ACTION_NOT);  
        }
    }
}

export const usersController = new UsersController();




