document.addEventListener("DOMContentLoaded", function () {
    // Add reset icon style dynamically
    const style = document.createElement('style');
    style.textContent = `
        .icon-reset {
            display: inline-block;
            margin-right: 6px;
            font-size: 16px;
        }
        .icon-reset:before {
            content: "↺";
            font-weight: bold;
        }
        .filter-controls {
            margin-bottom: 20px;
            background-color: rgba(13, 64, 28, 0.05);
            padding: 15px;
            border-radius: 8px;
        }
        .filter-row {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            align-items: center;
        }
        .filter-group {
            flex: 1;
            min-width: 200px;
        }
        .filter-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
        }
        .filter-select {
            width: 100%;
            padding: 8px 10px;
            border: 1px solid rgba(13, 64, 28, 0.2);
            border-radius: 4px;
        }
        .reset-filter-btn {
            background-color: #f8c32c;
            color: #0d401c;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 600;
            display: flex;
            align-items: center;
            transition: all 0.3s ease;
        }
        .reset-filter-btn:hover {
            background-color: #e9b41d;
        }
    `;
    document.head.appendChild(style);

    const generalBtn = document.getElementById("general-btn");
    const plotBtn = document.getElementById("plot-btn");
    const generalTracker = document.getElementById("general-tracker");
    const plotTracker = document.getElementById("plot-tracker");
    const plotDropdown = document.getElementById("plot-dropdown");
    const filterPlot = document.getElementById("filter-plot");
    const filterCategory = document.getElementById("filter-category");
    const resetFilters = document.getElementById("reset-filters");
    
    // Initialize data storage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let plots = JSON.parse(localStorage.getItem('plots')) || {};
    // Track custom categories
    let customCategories = new Set();

    // Load existing expenses and plots when page loads
    loadExpenses();
    loadPlots();
    updateFilterDropdowns();

    // 🟢 Toggle Between General & Plot-wise Trackers
    generalBtn.addEventListener("click", function () {
        generalTracker.classList.remove("hidden");
        plotTracker.classList.add("hidden");
        generalBtn.classList.add("active");
        plotBtn.classList.remove("active");
    });

    plotBtn.addEventListener("click", function () {
        generalTracker.classList.add("hidden");
        plotTracker.classList.remove("hidden");
        plotBtn.classList.add("active");
        generalBtn.classList.remove("active");
    });

    // 🟢 General Expense Tracker: Add Expense
    document.getElementById("general-expense-form").addEventListener("submit", function (event) {
        event.preventDefault();
        let name = document.getElementById("gen-expense-name").value.trim();
        let amount = document.getElementById("gen-expense-amount").value.trim();
        let date = document.getElementById("gen-expense-date").value.trim();
        let description = document.getElementById("gen-expense-desc").value.trim();

        if (!name || !amount || !date) {
            alert("⚠ Please fill all required fields (Name, Amount, Date)!");
            return;
        }

        const expenseData = {
            id: Date.now().toString(), // Unique ID for the expense
            type: "General",
            name: name,
            category: "General Expense",
            amount: amount,
            description: description,
            date: date
        };

        // Add to expenses array
        expenses.push(expenseData);
        
        // Save to localStorage
        localStorage.setItem('expenses', JSON.stringify(expenses));
        
        // Clear fields after adding
        document.getElementById("gen-expense-name").value = "";
        document.getElementById("gen-expense-amount").value = "";
        document.getElementById("gen-expense-date").value = "";
        document.getElementById("gen-expense-desc").value = "";
        
        alert("✅ Expense Added Successfully!");
        loadExpenses(); // Refresh the table
    });

    // 🟢 Save New Plot
    document.getElementById("save-plot-btn").addEventListener("click", function () {
        let plotName = document.getElementById("plot-name").value.trim();
        let plotDesc = document.getElementById("plot-desc").value.trim();

        if (!plotName) {
            alert("⚠ Plot name is required!");
            return;
        }

        if (plots[plotName]) {
            alert("⚠ A plot with this name already exists!");
            return;
        }

        plots[plotName] = {
            name: plotName,
            description: plotDesc,
            expenses: [],
        };

        // Save plots to localStorage
        localStorage.setItem('plots', JSON.stringify(plots));

        // Add to dropdown
        addPlotToDropdown(plotName);
        
        // Update filter dropdowns
        updateFilterDropdowns();

        // Clear form after adding plot
        document.getElementById("plot-name").value = "";
        document.getElementById("plot-desc").value = "";

        alert("✅ Plot Added Successfully!");
    });

    // 🟢 Enable Expense Box When Selecting a Plot
    plotDropdown.addEventListener("change", function () {
        if (plotDropdown.value) {
            document.getElementById("expense-box").classList.remove("hidden");
        } else {
            document.getElementById("expense-box").classList.add("hidden");
        }
    });

    // 🟢 Add Expense to Selected Plot
    document.getElementById("add-plot-expense-btn").addEventListener("click", function () {
        let selectedPlot = plotDropdown.value;
        if (!selectedPlot) {
            alert("⚠ Please select a plot first.");
            return;
        }

        let category = document.getElementById("expense-category").value;
        let customCategory = document.getElementById("custom-category").value.trim();
        let amount = document.getElementById("plot-expense-amount").value.trim();
        let date = document.getElementById("plot-expense-date").value.trim();
        let description = document.getElementById("plot-expense-desc").value.trim();

        if (!category) {
            alert("⚠ Please select a category!");
            return;
        }

        if (!amount || !date) {
            alert("⚠ Amount and Date are required!");
            return;
        }

        if (category === "Custom" && !customCategory) {
            alert("⚠ Please enter a custom category!");
            return;
        }

        let finalCategory = category === "Custom" ? customCategory : category;
        
        const expenseData = {
            id: Date.now().toString(), // Unique ID for the expense
            type: "Plot-wise",
            name: selectedPlot,
            category: finalCategory,
            amount: amount,
            description: description || "N/A",
            date: date
        };

        // Add to expenses array
        expenses.push(expenseData);
        
        // If it's a custom category, update our tracking
        if (category === "Custom") {
            customCategories.add(customCategory);
            updateFilterDropdowns();
        }
        
        // Save to localStorage
        localStorage.setItem('expenses', JSON.stringify(expenses));
        
        // Clear inputs
        document.getElementById("plot-expense-amount").value = "";
        document.getElementById("plot-expense-desc").value = "";
        document.getElementById("plot-expense-date").value = "";
        document.getElementById("custom-category").value = "";
        
        alert("✅ Expense Added Successfully!");
        loadExpenses(); // Refresh the table
    });

    // 🟢 Export General Expenses to PDF
    document.getElementById("export-general-pdf").addEventListener("click", function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.text("General Expenses Report", 14, 10);

        let data = [];
        expenses.filter(exp => exp.type === "General").forEach((expense) => {
            data.push([
                expense.name, 
                expense.description || "", 
                `₹${expense.amount}`, 
                expense.date
            ]);
        });

        if (data.length === 0) {
            alert("No expenses to export!");
            return;
        }

        doc.autoTable({
            head: [["Expense Name", "Description", "Amount (₹)", "Date"]],
            body: data,
            startY: 20,
        });

        doc.save("General_Expenses_Report.pdf");
    });

    // 🟢 Export Plot-wise Expenses to PDF (Updated to respect filters)
    document.getElementById("export-plot-pdf").addEventListener("click", function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const selectedPlot = filterPlot.value;
        const selectedCategory = filterCategory.value;
        
        let title = "Plot-wise Expenses Report";
        if (selectedPlot !== "all") {
            title += ` - Plot: ${selectedPlot}`;
        }
        if (selectedCategory !== "all") {
            title += ` - Category: ${selectedCategory}`;
        }
        
        doc.text(title, 14, 10);

        let filteredExpenses = expenses.filter(exp => exp.type === "Plot-wise");
        
        // Apply filters
        if (selectedPlot !== "all") {
            filteredExpenses = filteredExpenses.filter(exp => exp.name === selectedPlot);
        }
        
        if (selectedCategory !== "all") {
            filteredExpenses = filteredExpenses.filter(exp => exp.category === selectedCategory);
        }

        let data = [];
        filteredExpenses.forEach((expense) => {
            data.push([
                expense.name,
                expense.category,
                expense.description || "",
                `₹${expense.amount}`,
                expense.date
            ]);
        });

        if (data.length === 0) {
            alert("No plot expenses to export with the selected filters!");
            return;
        }

        doc.autoTable({
            head: [["Plot Name", "Category", "Description", "Amount (₹)", "Date"]],
            body: data,
            startY: 20,
        });

        doc.save("Plot_Expenses_Report.pdf");
    });

    // 🟢 Show/hide custom category input
    document.getElementById("expense-category").addEventListener("change", function () {
        let customCategoryInput = document.getElementById("custom-category");
        if (this.value === "Custom") {
            customCategoryInput.classList.remove("hidden");
        } else {
            customCategoryInput.classList.add("hidden");
        }
    });

    // 🟢 Delete expense function
    function deleteExpense(id) {
        // Filter out the deleted expense
        expenses = expenses.filter(expense => expense.id !== id);
        
        // Save updated expenses to localStorage
        localStorage.setItem('expenses', JSON.stringify(expenses));
        
        // Reload the expenses tables
        loadExpenses();
        
        // Update filters as custom categories might have changed
        updateFilterDropdowns();
    }

    // Helper function to add a plot to the dropdown
    function addPlotToDropdown(plotName) {
        let option = document.createElement("option");
        option.value = plotName;
        option.textContent = plotName;
        plotDropdown.appendChild(option);
    }

    // Load plots into dropdown
    function loadPlots() {
        // Clear existing options except the default one
        while (plotDropdown.options.length > 1) {
            plotDropdown.remove(1);
        }
        
        // Add plots from localStorage
        for (const plotName in plots) {
            addPlotToDropdown(plotName);
        }
    }

    // Global handler for delete buttons
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('delete-expense-btn')) {
            const expenseId = e.target.getAttribute('data-id');
            if (confirm('Are you sure you want to delete this expense?')) {
                deleteExpense(expenseId);
            }
        }
    });
    
    // 🟢 Filter change event handlers
    filterPlot.addEventListener('change', function() {
        loadExpenses();
    });
    
    filterCategory.addEventListener('change', function() {
        loadExpenses();
    });
    
    // 🟢 Reset filters button
    resetFilters.addEventListener('click', function() {
        filterPlot.value = "all";
        filterCategory.value = "all";
        loadExpenses();
    });
    
    // 🟢 Update filter dropdowns with plots and categories
    function updateFilterDropdowns() {
        // Update plot filter dropdown
        while (filterPlot.options.length > 1) { // Keep "All Plots" option
            filterPlot.remove(1);
        }
        
        // Add plots to filter
        for (const plotName in plots) {
            let option = document.createElement("option");
            option.value = plotName;
            option.textContent = plotName;
            filterPlot.appendChild(option);
        }
        
        // Update category filter dropdown with custom categories
        // First, scan expenses to find all custom categories
        customCategories.clear();
        expenses.filter(exp => exp.type === "Plot-wise").forEach(expense => {
            const category = expense.category;
            if (!["Seeds", "Fertilizers", "Water", "Labor", "Equipment", 
                  "Fuel", "Transportation", "Insurance"].includes(category)) {
                customCategories.add(category);
            }
        });
        
        // Remove existing custom categories from dropdown
        const defaultCategories = ["all", "Seeds", "Fertilizers", "Water", "Labor", 
                                 "Equipment", "Fuel", "Transportation", "Insurance"];
                                 
        // Keep default categories, remove everything else
        while (filterCategory.options.length > defaultCategories.length) {
            filterCategory.remove(defaultCategories.length);
        }
        
        // Add custom categories to filter
        customCategories.forEach(category => {
            let option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            filterCategory.appendChild(option);
        });
    }

    // Load and display expenses from localStorage
    function loadExpenses() {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        
        const generalTableBody = document.querySelector("#general-expense-table tbody");
        const plotTableBody = document.querySelector("#plot-expense-table tbody");
        const generalEmptyState = document.getElementById("general-empty-state");
        const plotEmptyState = document.getElementById("plot-empty-state");
        
        // Clear previous entries
        generalTableBody.innerHTML = ""; 
        plotTableBody.innerHTML = ""; 
        
        // Filter expenses by type
        const generalExpenses = expenses.filter(exp => exp.type === "General");
        
        // Get selected filter values
        const selectedPlot = filterPlot.value;
        const selectedCategory = filterCategory.value;
        
        // Apply filters to plot expenses
        let plotExpenses = expenses.filter(exp => exp.type === "Plot-wise");
        
        if (selectedPlot !== "all") {
            plotExpenses = plotExpenses.filter(exp => exp.name === selectedPlot);
        }
        
        if (selectedCategory !== "all") {
            plotExpenses = plotExpenses.filter(exp => exp.category === selectedCategory);
        }
        
        // Show/hide empty states
        generalEmptyState.style.display = generalExpenses.length ? 'none' : 'block';
        plotEmptyState.style.display = plotExpenses.length ? 'none' : 'block';
        
        // Populate general expenses table
        generalExpenses.forEach(expense => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${expense.name}</td>
                <td>${expense.description || "-"}</td>
                <td class="amount">₹${expense.amount}</td>
                <td class="date">${expense.date}</td>
                <td class="actions">
                    <button class="delete-expense-btn" data-id="${expense.id}">Delete</button>
                </td>
            `;
            generalTableBody.appendChild(row);
        });
        
        // Populate plot expenses table
        plotExpenses.forEach(expense => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${expense.name}</td>
                <td>${expense.category}</td>
                <td>${expense.description || "-"}</td>
                <td class="amount">₹${expense.amount}</td>
                <td class="date">${expense.date}</td>
                <td class="actions">
                    <button class="delete-expense-btn" data-id="${expense.id}">Delete</button>
                </td>
            `;
            plotTableBody.appendChild(row);
        });
    }
});


