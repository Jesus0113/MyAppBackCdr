import passport from 'passport';
import { usersService } from '../../services/users.service.js';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GitHubStrategy } from 'passport-github2';
import {ExtractJwt, Strategy as JwtStrategy} from 'passport-jwt'
import { compareData } from '../../utils.js';
import config from '../../config.dotenv.js';


const JWT_SECRET_KEY = config.jwt_secret_key

passport.use('login', new LocalStrategy(

    async function (email, password, done) {

        try {
            const userDb = await usersService.findUserByEmail(email);
            if (!userDb) {
                return done(null, false);
            }
            const isPasswordValid = await compareData(password, userDb.password)
            if (!isPasswordValid) {
                return done(null, false)
            }
            return done(null, userDb)
        } catch (error) {
            done(error);
        }
    }
))

passport.use(new GitHubStrategy({
    clientID: config.client_id_github,
    clientSecret: config.client_secret_github,
    callbackURL: config.callback_url_github
  },
  async function(accessToken, refreshToken, profile, done) {

    try {
        const userDB = await usersService.findUserByEmail(profile.email);

        if(userDB){
            if(userDB.fromGithub){
                return done(null, userDB);
            }else{
                return done(null, false);
            }
        }

        const newUser = {
            first_name:  profile.displayName.split(' ') [0],
            last_name: profile.displayName.split(' ') [1] ,
            email: profile.email,
            password: ' ',
            fromGithub: true            
        };

        const successResult = await usersService.createOne(newUser);

        return done(null, successResult);

    } catch (error) {
        done(error);   
    }
  }
));

//Headers passport
// passport.use('jwt', new JwtStrategy({
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() ,
//     secretOrKey: JWT_SECRET_KEY

// }, async (jwt_payload, done)=>{
//     done(null, jwt_payload.user)
// }))

//Cookies passport

const cookieExtractor = (req)=>{
    return req.cookies.token
}

passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]) ,
    secretOrKey: JWT_SECRET_KEY

}, async (jwt_payload, done)=>{
    done(null, jwt_payload.user)
}))


// user => id
passport.serializeUser((usuario, done) => {
    done(null, usuario._id)
})

// id => user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await usersService.findUserById(id);
        done(null, user)
    } catch (error) {
        done(error)
    }
})