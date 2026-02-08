import express from "express";
import bcrypt from "bcrypt";
import loginRoute from "./routes/login.js";
import authMiddleware from "./middleware/auth.js";
import connectDB  from "./config/db.js";

const app = express();
app.use(express.json());
connectDB();

// Login Route Connect

app.use("/api", loginRoute);


app.get("/", (req, res) => {
    res.send("Backend is Running");
});

app.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    //  Empty field validation
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    //  Email validation (CORRECT)
    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Email is not valid"
        });
    }

    //  Password length validation
    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters"
        });
    }


    // password hashing

    const hashedPassword = await bcrypt.hash(password, 10);

    //  If all validations pass
    res.status(200).json({
        success: true,
        message: "Register data ok",
        hashedPassword: hashedPassword
    });
});

app.get("/profile", authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to profile",
        user: req.user
    });
})

const PORT = 5000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
