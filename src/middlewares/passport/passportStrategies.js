import passport from 'passport';
import { usersManager } from '../../DAL/DAOs/mongoDAOs/usersManager.js';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GitHubStrategy } from 'passport-github2';
import {ExtractJwt, Strategy as JwtStrategy} from 'passport-jwt'
import { compareData } from '../../utils.js';


const JWT_SECRET_KEY = 'secretJWT'

passport.use('login', new LocalStrategy(

    async function (email, password, done) {

        try {
            const userDb = await usersManager.findUser(email);
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
    clientID: 'Iv1.cd2483c680728702',
    clientSecret: '06feea24d454e8d062c41824306448653601030a',
    callbackURL: "http://localhost:8080/github"
  },
  async function(accessToken, refreshToken, profile, done) {

    try {
        const userDB = await usersManager.findUser(profile.email);

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

        const successResult = await usersManager.addUser(newUser);

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
        const user = await usersManager.findUserById(id);
        done(null, user)
    } catch (error) {
        done(error)
    }
})