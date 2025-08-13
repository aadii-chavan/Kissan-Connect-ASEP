document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form"); // Updated ID
    const btn = document.getElementById("submitButton");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload

        btn.textContent = "Sending..."; // Show sending state

        const serviceID = "service_u7fndmf"; // Replace with your EmailJS service ID
        const templateID = "template_wgkonwl"; // Replace with your EmailJS template ID

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.textContent = "Send Message";
                alert("Message sent successfully!");
                form.reset(); // Clear form after sending
            })
            .catch((error) => {
                btn.textContent = "Send Message";
                alert("Failed to send message. Please try again.");
                console.error("EmailJS Error:", error);
            });
    });
});
