document.addEventListener("DOMContentLoaded", async function () {
    const schemesContainer = document.querySelector(".wrap-blog-list");

    try {
        const response = await fetch("http://localhost:5000/api/schemes");
        const schemes = await response.json();

        // Check if there are schemes
        if (schemes.length === 0) {
            schemesContainer.innerHTML = "<p>No schemes available at the moment.</p>";
            return;
        }

        // Clear previous content
        schemesContainer.innerHTML = "";

        // Loop through schemes and add them dynamically
        schemes.forEach(scheme => {
            const schemeHTML = `
                <article class="article-blog-item mb-35 wow fadeInUp" data-wow-delay="0s">
                    <div class="content">
                        <h3 class="title fw-7">
                            <a href="${scheme.read_more_link}" target="_blank">
                                ${scheme.scheme_name}
                            </a>
                        </h3>
                        <p class="text">
                            ${scheme.description}
                        </p>
                        <div class="bot">
                            <a class="tf-btn gap-35" href="${scheme.read_more_link}" target="_blank">
                                <span class="text-style">
                                    Read More
                                </span>
                                <div class="icon">
                                    <i class="icon-arrow_right"></i>
                                </div>
                            </a>
                        </div>
                    </div>
                </article>
            `;

            schemesContainer.innerHTML += schemeHTML;
        });

    } catch (error) {
        console.error("❌ Error fetching schemes:", error);
        schemesContainer.innerHTML = "<p>⚠ Unable to load schemes. Please try again later.</p>";
    }
});
