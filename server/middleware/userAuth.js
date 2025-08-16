import jwt from 'jsonwebtoken';

 const userAuth = (req, res, next) => {
    const { token } = req.cookies

    if (!token) {
        return res.json({ success: false, message: 'Unauthorized Login Again' })
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = tokenDecode
        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id
        } else {
            return res.json({ success: false, message: 'Unauthorized Login Again' })
        }
        next()
    } catch (error) {
        return res.json({ success: false, message:error.message })
    }
}

export default userAuth
