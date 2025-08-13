const express = require("express");
const cors = require("cors");
require("dotenv").config();

// In-memory data stores
let users = [];
let schemes = [];
let expenses = [];

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
        return res.status(400).json({ error: " Invalid amount" });
    }
    next();
};

// Scheme Routes
app.get("/api/schemes", (req, res) => {
    try {
        res.json(schemes);
    } catch (error) {
        console.error(" Get Schemes Error:", error);
        res.status(500).json({ error: " Failed to fetch schemes" });
    }
});

app.post("/api/schemes", validateSchemeInput, (req, res) => {
    try {
        const newScheme = {
            id: Date.now().toString(),
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        schemes.push(newScheme);
        res.status(201).json({ message: " Scheme Added Successfully!" });
    } catch (error) {
        console.error(" Add Scheme Error:", error);
        res.status(500).json({ error: " Failed to add scheme" });
    }
});

app.delete("/api/schemes/:id", (req, res) => {
    try {
        const schemeIndex = schemes.findIndex(scheme => scheme.id === req.params.id);
        if (schemeIndex === -1) {
            return res.status(404).json({ error: " Scheme not found" });
        }
        schemes.splice(schemeIndex, 1);
        res.json({ message: " Scheme Deleted Successfully!" });
    } catch (error) {
        console.error(" Delete Scheme Error:", error);
        res.status(500).json({ error: " Failed to delete scheme" });
    }
});

// Expense Routes
app.post("/api/expenses", validateExpenseInput, (req, res) => {
    try {
        const { type, name, category, amount, description, date } = req.body;
        
        // Create a new expense
        const newExpense = {
            id: Date.now().toString(),
            type,
            name,
            category,
            amount: Number(amount),
            description: description || '',
            date: new Date(date),
            createdAt: new Date()
        };
        
        expenses.push(newExpense);
        res.status(201).json({ message: " Expense added successfully!" });
    } catch (error) {
        console.error(" Add Expense Error:", error);
        res.status(500).json({ error: " Failed to add expense" });
    }
});

app.get("/api/expenses", (req, res) => {
    try {
        res.json(expenses);
    } catch (error) {
        console.error(" Get Expenses Error:", error);
        res.status(500).json({ error: " Failed to fetch expenses" });
    }
});

app.delete("/api/expenses/:expenseId", (req, res) => {
    try {
        const expenseIndex = expenses.findIndex(expense => expense.id === req.params.expenseId);
        if (expenseIndex === -1) {
            return res.status(404).json({ error: "❌ Expense not found" });
        }

        expenses.splice(expenseIndex, 1);
        res.json({ message: "✅ Expense Deleted Successfully!" });
    } catch (error) {
        console.error("❌ Delete Expense Error:", error);
        res.status(500).json({ error: "❌ Failed to delete expense" });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

