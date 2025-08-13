document.addEventListener("DOMContentLoaded", async function () {
    const schemeDropdown = document.getElementById("scheme-dropdown");
    const deleteBtn = document.getElementById("delete-btn");
    const messageBox = document.getElementById("delete-message");
    const singleDeleteView = document.getElementById("single-delete-view");
    const bulkDeleteView = document.getElementById("bulk-delete-view");
    const showBulkDeleteBtn = document.getElementById("show-bulk-delete");
    const showSingleDeleteBtn = document.getElementById("show-single-delete");
    const selectAllCheckbox = document.getElementById("select-all");
    const schemesList = document.getElementById("schemes-list");
    const bulkDeleteBtn = document.getElementById("bulk-delete-btn");
    const cancelBtn = document.getElementById("cancel-btn");
    
    // Store all schemes for reference
    let allSchemes = [];

    // 🟢 Fetch All Schemes and Populate Dropdown and List
    async function loadSchemes() {
        try {
            const response = await fetch("http://localhost:5000/api/schemes");
            allSchemes = await response.json();

            // Clear and populate dropdown
            schemeDropdown.innerHTML = `<option value="">Select a Scheme</option>`;
            allSchemes.forEach(scheme => {
                let option = document.createElement("option");
                option.value = scheme._id; 
                option.textContent = scheme.scheme_name;
                schemeDropdown.appendChild(option);
            });
            
            // Populate schemes list for bulk delete
            populateSchemesList();
            
        } catch (error) {
            showMessage("❌ Error loading schemes!", "error");
            console.error(error);
        }
    }
    
    // 🟢 Populate Schemes List for Bulk Delete
    function populateSchemesList() {
        schemesList.innerHTML = '';
        
        if (allSchemes.length === 0) {
            schemesList.innerHTML = '<div class="no-schemes">No schemes available</div>';
            return;
        }
        
        allSchemes.forEach(scheme => {
            const schemeItem = document.createElement('div');
            schemeItem.className = 'scheme-item';
            schemeItem.innerHTML = `
                <input type="checkbox" class="scheme-checkbox" data-id="${scheme._id}">
                <div class="scheme-name">${scheme.scheme_name}</div>
            `;
            schemesList.appendChild(schemeItem);
        });
    }

    // 🟢 Delete Selected Scheme
    deleteBtn.addEventListener("click", async function () {
        const schemeId = schemeDropdown.value;
        if (!schemeId) {
            showMessage("⚠ Please select a scheme!", "error");
            return;
        }

        if (!confirm("Are you sure you want to delete this scheme?")) return;

        try {
            const response = await fetch(`http://localhost:5000/api/schemes/${schemeId}`, {
                method: "DELETE",
            });

            const data = await response.json();
            if (response.ok) {
                showMessage("✅ Scheme Deleted Successfully!", "success");
                await loadSchemes(); // Refresh dropdown
            } else {
                showMessage("❌ Failed to Delete Scheme!", "error");
            }
        } catch (error) {
            showMessage("❌ Server Error!", "error");
            console.error(error);
        }
    });
    
    // 🟢 Select All Checkbox Functionality
    selectAllCheckbox.addEventListener("change", function() {
        const checkboxes = document.querySelectorAll('.scheme-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
    });
    
    // 🟢 Bulk Delete Functionality
    bulkDeleteBtn.addEventListener("click", async function() {
        const selectedCheckboxes = document.querySelectorAll('.scheme-checkbox:checked');
        
        if (selectedCheckboxes.length === 0) {
            showMessage("⚠ Please select at least one scheme to delete!", "error");
            return;
        }
        
        if (!confirm(`Are you sure you want to delete ${selectedCheckboxes.length} scheme(s)?`)) return;
        
        const selectedIds = Array.from(selectedCheckboxes).map(checkbox => checkbox.getAttribute('data-id'));
        let successCount = 0;
        let failCount = 0;
        
        // Show processing message
        showMessage("⏳ Processing deletion...", "info");
        
        // Delete each selected scheme
        for (const id of selectedIds) {
            try {
                const response = await fetch(`http://localhost:5000/api/schemes/${id}`, {
                    method: "DELETE",
                });
                
                if (response.ok) {
                    successCount++;
                } else {
                    failCount++;
                }
            } catch (error) {
                failCount++;
                console.error(`Error deleting scheme ${id}:`, error);
            }
        }
        
        // Report results
        if (failCount === 0) {
            showMessage(`✅ Successfully deleted ${successCount} scheme(s)!`, "success");
        } else {
            showMessage(`⚠ Deleted ${successCount} scheme(s), but failed to delete ${failCount} scheme(s).`, "info");
        }
        
        // Reload schemes
        await loadSchemes();
        
        // Reset select all checkbox
        selectAllCheckbox.checked = false;
    });
    
    // 🟢 Cancel Button
    cancelBtn.addEventListener("click", function() {
        // Uncheck all checkboxes
        selectAllCheckbox.checked = false;
        const checkboxes = document.querySelectorAll('.scheme-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Clear any messages
        messageBox.style.display = "none";
    });
    
    // 🟢 Toggle between single and bulk delete views
    showBulkDeleteBtn.addEventListener("click", function() {
        singleDeleteView.classList.add("hidden");
        bulkDeleteView.classList.remove("hidden");
        messageBox.style.display = "none"; // Hide any messages
    });
    
    showSingleDeleteBtn.addEventListener("click", function() {
        bulkDeleteView.classList.add("hidden");
        singleDeleteView.classList.remove("hidden");
        messageBox.style.display = "none"; // Hide any messages
    });
    
    // 🟢 Helper function to show messages
    function showMessage(message, type) {
        messageBox.textContent = message;
        messageBox.className = "";
        
        if (type === "success") {
            messageBox.classList.add("message-success");
        } else if (type === "error") {
            messageBox.classList.add("message-error");
        }
        
        messageBox.style.display = "block";
    }

    // Load schemes when the page loads
    loadSchemes();
});
