export const authMiddleware = (req, res, next) =>{
    const {role} = req.body;

    if(role === 'ADMIN'){
        next();
    }else{
        res.status(401).send('not authorized')
    }
}