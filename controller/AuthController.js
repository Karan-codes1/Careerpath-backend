import bcrypt from 'bcrypt';
import User from "../models/User.js";

export const signup = async (req,res)=>{
    try {
        const {name, email, password} = req.body
        const user = await User.findOne({email});
        if(user){
            return res.status('409')
               .json({message : 'User already exist, you can login',success:false})
        }
        
        console.log("usersdoes not exist");
        const usermodel = new User({name, email, password});

         // Before saving into the database we encrypt the password
        usermodel.password = await bcrypt.hash(password,10)

        await usermodel.save()
       res.status(201)
          .json({message:'SignUp success', success: true})
    }catch(err){
        res.status(500)
          .json({message:'Internal server error', success: false})
    }
} 