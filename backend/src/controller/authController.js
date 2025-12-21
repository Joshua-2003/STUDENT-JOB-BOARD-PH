import { signUp, login } from '../services/authService.js';

export const handleSignUp = async (req, res, next) => {
    try {
        const user = await signUp(req.body);
        res.status(201).json({ success: true, message: "User signed up successfully", data: user });
    } catch (error) {
        next(error);
    }
}

export const handleLogin = async (req, res, next) => {
    try {
        const { email, password, type } = req.body;
        const { token, user } = await login(email, password, type);
        res.status(200).json({ success: true, message: "User logged in successfully", data: { token, user } });
    } catch (error) {
        next(error);
    }
}