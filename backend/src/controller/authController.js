import { signUp, login } from '../services/authService.js';

export const handleSignUp = async (req, res, next) => {
    try {
        console.log("req.file:", req.file);
        const userData = req.body;

        if (userData.type === 'STUDENT' && req.file) {
            userData.resume_url = req.file.path; // Save the file path to resume_url
        }
        const newUser = await signUp(userData);
        res.status(201).json({ success: true, message: "User signed up successfully", data: newUser });
    } catch (error) {
        next(error);
    }
};

export const handleLogin = async (req, res, next) => {
    try {
        const { email, password, type } = req.body;
        const { token, user } = await login(email, password, type);

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,  // Set to true if using HTTPS in production only
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        res.status(200).json({ success: true, message: "User logged in successfully", data: { user } });
    } catch (error) {
        next(error);
    }
};

export const handleLogout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
    });

    res.json({ success: true, message: "Logged out" });
};

export const getMe = async (req, res) => {
    res.json({
        success: true,
        data: req.user,
    });
};