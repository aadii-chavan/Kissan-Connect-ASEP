document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("error-message");

    if (!email || !password) {
        errorMessage.textContent = "⚠ Please enter email and password!";
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token); // Store token for authentication
            alert("✅ Login Successful! Redirecting to Dashboard...");
            window.location.href = "index.html"; // Redirect to home page
        } else {
            errorMessage.textContent = data.error || "❌ Login failed!";
        }
    } catch (error) {
        errorMessage.textContent = "❌ Server error! Please try again later.";
    }
});
