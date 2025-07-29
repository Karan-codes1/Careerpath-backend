import bcrypt from 'bcrypt';
import User from "../models/User.js";
import jwt from 'jsonwebtoken';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};


export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409)
        .json({ message: 'User already exist, you can login', success: false })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const usermodel = new User({ name, email, password: hashedPassword });


    await usermodel.save()

    // Generate JWT token with the new user's info
    const jwtToken = jwt.sign(
      { email: usermodel.email, _id: usermodel._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // ✅ Set the token as a cookie
    res.cookie("token", jwtToken, cookieOptions);

    return res.status(201)
      .json({
        message: 'SignUp success',
        name: usermodel.name,
        email: usermodel.email,
        success: true
      })
  } catch (err) {
    return res.status(500)
      .json({ message: 'Internal server error', success: false })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email });
    const errorMsg = 'Authenticaltion failed, email or password is wrong'

    if (!user) { // User does not exist so they have to signup \
      return res.status(403)
        .json({ message: "User does not exist! Signup now", success: false })
    }


  
    // User exist and we have to check login credentials
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403)
        .json({ message: errorMsg, success: false })
    }


    // User exist and entered the right password so generate a jsonwebtoken which will be used for further api calls

    // Making a jwt token for the user 
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },//payload
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    
     // ✅ Set the token as a cookie
    res.cookie("token", jwtToken, cookieOptions);


    return res.status(200).json({
      message: "Login Success",
      success: true,
      email,
      name: user.name
    })
  } catch (err) {
    return res.status(500)
      .json({ message: 'Internal server error', success: false })
  }
}


export const logout = async(req,res)=>{
  try {
    res.clearCookie('token',{
      httpOnly:true,
      secure:false,
      sameSite:'lax',
      path:'/'
    })

    return res.status(200).json({message:'Logged out successfully'})
  } catch (error) {
    console.error('Logout error:', error)
    return res.status(500).json({ message: 'Something went wrong during logout' })
  }
}
