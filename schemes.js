document.addEventListener("DOMContentLoaded", async function () {
    const schemesContainer = document.querySelector(".wrap-blog-list");
    if (!window.db) {
        console.error('Firestore (db) not initialized');
        schemesContainer.innerHTML = "<p>⚠ Schemes unavailable right now.</p>";
        return;
    }

    try {
        // If rules block unauthenticated read, sign in anonymously for read-only access
        try {
            if (firebase && firebase.auth) {
                await firebase.auth().signInAnonymously();
            }
        } catch (e) {
            // ignore if disabled
        }
        const snapshot = await window.db.collection('schemes').orderBy('createdAt', 'desc').get();
        const schemes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (schemes.length === 0) {
            schemesContainer.innerHTML = "<p>No schemes available at the moment.</p>";
            return;
        }

        schemesContainer.innerHTML = "";
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
