import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js' 
import transporter from '../configs/nodemailer.js'

export const register = async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.json({success: false, message: 'All fields are required' })
    }

    try {
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new userModel({
            name,
            email,
            password: hashedPassword
        })
        await user.save()
       
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite:process.env.NODE_ENV === 'production' ? 'None' : 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 })

        // Send welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to:email,
            subject: 'Welcome to Our Service',
            text: `Hello ${user.name},\n\nThank you for registering!`
        }

        await transporter.sendMail(mailOptions)

        return res.json({ success: true, message: 'User registered successfully', user })

    } catch (error) {
        res.json({ success: false, message: error.message})
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.json({ success: false, message: 'All fields are required' })
    }

    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: 'Invalid email' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid  password' })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite:process.env.NODE_ENV === 'production' ? 'None' : 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 })

        res.json({ success: true, message: 'User logged in successfully', user })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite:process.env.NODE_ENV === 'production' ? 'None' : 'strict' })
        return res.json({ success: true, message: 'User logged out successfully' })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

//send verfication otp to users email
export const sendVerfyOtp =async(req,res)=>{
    try {
        const {userID}=req.body

        const user =await userModel.findById(userID)

        if (user.isAccountVreified) {
            return res.json({success: false, message:"account already verified"})
        }
        const otp = Math.floor(100000 + Math.random() * 900000)

        user.verifyOtp = otp
        user.verifyOtpExpireAt=Date.now()+24*60*60*1000

        await user.save()

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Your OTP for account verification is ${otp}. It is valid for 24 hours.`
        }

        await transporter.sendMail(mailOption)
        res.json({success:true, message:'Verivication OTP Sent on email'})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}
