import jwt from "jsonwebtoken";

const ensureAuthenticated = (req,res,next)=>{
    const auth = req.headers['authorization']
    if(!auth){
        return res.json({
            message:'Unauthorized, JWT token is required'
        })
    }
    try {
        const decoded = jwt.verify(auth,process.env.JWT_SECRET)
        req.user= decoded // by doing this we make a user paramter inside the req object
        next();
    } catch (error) {
        return res.json({
            message: 'Unauthorized, JWT token is wrong or expired'
        })
    }
}
export default ensureAuthenticated