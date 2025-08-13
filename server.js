const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import models
const User = require("./models/user");
const Scheme = require("./models/scheme");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Input validation middleware
const validateSchemeInput = (req, res, next) => {
    const { scheme_name, description } = req.body;
    if (!scheme_name || !description) {
        return res.status(400).json({ error: "❌ Scheme name and description are required" });
    }
    next();
};

const validateExpenseInput = (req, res, next) => {
    const { type, name, category, amount, date } = req.body;
    if (!type || !name || !category || !amount || !date) {
        return res.status(400).json({ error: "❌ All expense fields are required" });
    }
    if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: "❌ Invalid amount" });
    }
    next();
};

// Connect to MongoDB
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    }
}
connectDB();

// Scheme Routes
app.get("/api/schemes", async (req, res) => {
    try {
        const schemes = await Scheme.find();
        res.json(schemes);
    } catch (error) {
        console.error("❌ Get Schemes Error:", error);
        res.status(500).json({ error: "❌ Failed to fetch schemes" });
    }
});

app.post("/api/schemes", validateSchemeInput, async (req, res) => {
    try {
        const newScheme = new Scheme(req.body);
        await newScheme.save();
        res.status(201).json({ message: "✅ Scheme Added Successfully!" });
    } catch (error) {
        console.error("❌ Add Scheme Error:", error);
        res.status(500).json({ error: "❌ Failed to add scheme" });
    }
});

app.delete("/api/schemes/:id", async (req, res) => {
    try {
        const deletedScheme = await Scheme.findByIdAndDelete(req.params.id);
        if (!deletedScheme) {
            return res.status(404).json({ error: "❌ Scheme not found" });
        }
        res.json({ message: "✅ Scheme Deleted Successfully!" });
    } catch (error) {
        console.error("❌ Delete Scheme Error:", error);
        res.status(500).json({ error: "❌ Failed to delete scheme" });
    }
});

// Expense Routes - Modified to work without authentication
app.post("/api/expenses", validateExpenseInput, async (req, res) => {
    try {
        const { type, name, category, amount, description, date } = req.body;
        
        // Create a new user document if it doesn't exist, or use the existing one
        let user = await User.findOne();
        if (!user) {
            user = new User({
                name: "Default User",
                expenses: []
            });
        }

        user.expenses.push({ type, name, category, amount, description, date });
        await user.save();

        res.json({ message: "✅ Expense Added Successfully!" });
    } catch (error) {
        console.error("❌ Add Expense Error:", error);
        res.status(500).json({ error: "❌ Failed to add expense" });
    }
});

app.get("/api/expenses", async (req, res) => {
    try {
        const user = await User.findOne();
        if (!user) {
            return res.json([]);  // Return empty array if no expenses exist
        }
        res.json(user.expenses);
    } catch (error) {
        console.error("❌ Get Expenses Error:", error);
        res.status(500).json({ error: "❌ Failed to fetch expenses" });
    }
});

app.delete("/api/expenses/:expenseId", async (req, res) => {
    try {
        const user = await User.findOne();
        if (!user) {
            return res.status(404).json({ error: "❌ No expenses found" });
        }

        const expenseIndex = user.expenses.findIndex(exp => exp._id.toString() === req.params.expenseId);
        
        if (expenseIndex === -1) {
            return res.status(404).json({ error: "❌ Expense not found" });
        }

        user.expenses.splice(expenseIndex, 1);
        await user.save();

        res.json({ message: "✅ Expense Deleted Successfully!" });
    } catch (error) {
        console.error("❌ Delete Expense Error:", error);
        res.status(500).json({ error: "❌ Failed to delete expense" });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

