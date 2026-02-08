import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// Temporary fake database
const users = [
    {
        email: "test@gmail.com",
        password: "$2b$10$8r6fwv7CuZy6kSNBTfJrGewz3OTM9qnUEXFJRTiE0uaUhx2UK32VW"
    }
];

const JWT_SECRET = "mysecretkey";

router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    // 1️⃣ Empty check
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and Password are required"
        });
    }

    // 2️⃣ User find
    const user = users.find((u) => u.email === email);

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User not found"
        });
    }

    // 3️⃣ Password compare
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({
            success: false,
            message: "Invalid password"
        });
    }

    // 4️⃣ JWT token generate
    const token = jwt.sign(
        { email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    // 5️⃣ Final success response
    res.json({
        success: true,
        message: "Login successful",
        token: token
    });
});

export default router;
