export const authMiddleware = roles=> {
    return (req, res, next)=> {
        if( !roles.includes(req.user.role)){
            return res.status(401).json({message: "You are not authorized to access this route"})
        }
        next()
    }
} 