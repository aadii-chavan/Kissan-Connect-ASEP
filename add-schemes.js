document.getElementById("scheme-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    let scheme_name = document.getElementById("scheme_name").value.trim();
    let description = document.getElementById("description").value.trim();
    let read_more_link = document.getElementById("read_more_link").value.trim();

    if (!scheme_name || !description || !read_more_link) {
        alert("⚠ Please fill all fields!");
        return;
    }

    let schemeData = { scheme_name, description, read_more_link };

    try {
        let response = await fetch("http://localhost:5000/api/schemes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(schemeData)
        });

        let result = await response.json();
        document.getElementById("response-message").textContent = result.message || "Error adding scheme!";

        if (response.ok) {
            document.getElementById("scheme-form").reset(); // Clear form
        }
    } catch (error) {
        document.getElementById("response-message").textContent = "❌ Server Error!";
    }
});
