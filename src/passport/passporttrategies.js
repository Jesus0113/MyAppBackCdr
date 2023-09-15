import passport from 'passport';

import { usersModel } from '../Dao/models/users.model.js';



// user => id
passport.serializeUser((usuario, done)=>{
    done(null, usuario._id)
})

// id => user
passport.deserializeUser(async (id, done)=>{
    try {

        const user = await usersModel.findById(id);
        
        done(null, user)
        
    } catch (error) {
        done(error)        
    }

})