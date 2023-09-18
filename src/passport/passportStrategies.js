import passport from 'passport';
import { usersModel } from '../Dao/models/users.model.js';
import { usersManager } from '../Dao/usersManagers/usersManager.js';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { compareData } from '../utils.js';

passport.use('login', new LocalStrategy(

    async function (username, password, done) {

        try {

            const userDb = await usersManager.findUser(username);

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

        const userDB = await usersManager.findUser(profile.username);

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
            username: profile.username,
            password: ' ',
            fromGithub: true            
        };

        const successResult = await usersManager.create(newUser);

        return done(null, successResult);

    } catch (error) {
        done(error);   
    }
  }
));


// user => id
passport.serializeUser((usuario, done) => {
    done(null, usuario._id)
})

// id => user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await usersModel.findById(id);
        done(null, user)
    } catch (error) {
        done(error)
    }

})