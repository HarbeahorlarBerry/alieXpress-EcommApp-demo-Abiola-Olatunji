import  User  from "../../Models/usersSchema.js";   
import  bcryptjs  from "bcryptjs";
import  jwt  from "jsonwebtoken";
import crypto from "crypto";


export const logginIn = async(req,res) => {
const {gmail, password} = req.body

 const mailObj = {
        mailFrom: `AlieXpressApp ${process.env.EMAIL_USER}`,
        mailTo: gmail,
        subject: 'Successfully created an account',
          body: `
            <h1>Welcome to AlieXpressApp😍</h1>
            <p>you have successfully logged in</p>
            <p>Please proceed to make a post and enjoy the experience</p>
          `
    }

if (!gmail || !password) {
    res.status(400).json({message: "please provide all fields", error: "Gmail or Password is incorrect"})
    return;
} else {
    try {
        const user = await User.findOne({gmail})
        if (!user) {
            res.status(400).json({message: "user not found please register first to continue"})
            return;
        }
        if (!user.isVerified) return res.status(400).json({ message: "OTP is not verified" })
            
        const compared = await bcryptjs.compare(password, user.password)
        if (!compared) {
            res.status(401).json({message: "gmail or password is incorrect"})
            return;
        }

        
        const getToken = (id) => {
            return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "5h"} )
        }

         // send email
        await sendMail(mailObj);

        const token = getToken(user._id)
        return res
        .cookie("token", token, { httpOnly: true, sameSite: "strict" }) // ✅ typo fixed
        .status(200)
        .json({ message: "Login Successful! Proceed to make a post." }); // ✅ fix typo in message

        
    } catch (error) {
        res.status(500).json(error)
    }

}

}

//request password reset
export const passwordResetRequest = async (req, res) => { 
const { gmail } = req.body

    try {
        const user = await User.findOne({ gmail })
        if (!user) {
            res.status(400).json({ message: "User not found please register first to continue" })
            return
        }
        const token = crypto.randomBytes(32).toString('hex')
        
        user.passwordResetToken = token
        user.passwordResetExpires = Date.now() + 20 * 60 * 1000
        await user.save()
         
        await sendMail({
        mailFrom: `AlieXpressApp ${process.env.EMAIL_USER}`,
        mailTo: gmail,
        subject: 'Reset Password Request',
        body:`
            <p>click on the link to reset your password</p>
            <a href="https://localhost:3000/pasword/reset/${token}">Reset Password</a>
          `
    })
     res.status(200).json({ message: "Password reset request sent successfully" })
    } catch (error) {
        console.log(error)
    }
}

//reset password
export const passwordReset = async (req, res) => { 
    const { token, newPassword } = req.body
    
    try {
        const user = await User.findOne({ passwordResetToken: token, passwordResetExpires: { $gt: Date.now() } })
        if (!user) return res.status(400).json({ message: "Password reset token is invalid or expired" })
        
        user.password = bcrypt.hashSync(newPassword, 10)
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined

       await user.save()
       res.status(200).json({ message: "Password reset successfully, proceed to login with your new password" })  
    } catch (error) {
        console.log(error)
    }

}

// Logout
export const logout = async (req, res) => {
  // Clear the cookie
  res.clearCookie("token", { httpOnly: true, sameSite: "strict" }); 
  res.json({ message: "Logged out successfully" });
};




