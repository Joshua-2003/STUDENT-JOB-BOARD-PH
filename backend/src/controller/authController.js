import { signUp } from '../services/authService.js';

export const handleSignUp = async (req, res) => {
    try {
        const user = await signUp(req.body);
        res.status(201).json({ success: true, message: "User signed up successfully", data: user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}