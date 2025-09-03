document.addEventListener("DOMContentLoaded", function () {
    const schemesContainer = document.querySelector(".wrap-blog-list");
    const searchInput = document.getElementById("scheme-search");
    const tagsFilterContainer = document.getElementById("tags-filter");
    if (!schemesContainer) return;

    const schemes = [
        {
            name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
            description: "Provides direct financial assistance of Rs 6,000 per year to small and marginal farmers in three installments every 4 months.\nAims to promote farmers' income and self-reliance, with eligibility for landowners up to 2 hectares.",
            link: "https://pmkisan.gov.in/",
            remarks: ["nationwide", "small-farmers", "income-support", "wheat", "rice"]
        },
        {
            name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
            description: "Offers crop insurance to protect farmers against losses due to natural calamities, pests, and diseases, launched in 2016.\nMandatory for notified crops, with premium shared between government and farmers, administered by NIAC.",
            link: "https://www.pmfby.gov.in/",
            remarks: ["crop-insurance", "all-crops", "natural-disasters", "Maharashtra", "Odisha"]
        },
        {
            name: "Pradhan Mantri Krishi Sinchai Yojana (PMKSY)",
            description: "Provides financial assistance for micro-irrigation systems to farmers owning less than 2 hectares, launched in 2015.\nOffers interest-free loans for 5 years to increase water use efficiency and crop production.",
            link: "https://pmksy.gov.in/",
            remarks: ["irrigation", "water-efficiency", "small-farmers", "cotton", "sugarcane"]
        },
        {
            name: "Ayushman Sahakar Scheme",
            description: "Provides financial assistance to cooperative societies for improving health infrastructure, launched in 2023 with Rs. 10,000 crore budget.\nSupports construction of hospitals, purchase of equipment, and training, aiming to benefit over 100 million people.",
            link: "N/A",
            remarks: ["cooperatives", "health-infrastructure", "rural", "dairy", "poultry"]
        },
        {
            name: "E-NAM (National Agriculture Market)",
            description: "A pan-India electronic trading portal launched in 2016, networking APMC mandis for a unified national market.\nOffers real-time price discovery, reduced transaction costs, and increased market access for farmers and traders.",
            link: "https://enam.gov.in/",
            remarks: ["market-access", "electronic-trading", "nationwide", "fruits", "vegetables"]
        },
        {
            name: "Pradhan Mantri Kisan Maan-Dhan Yojana (PM-KMY)",
            description: "A voluntary pension scheme for small and marginal farmers, launched in 2019, guaranteeing Rs. 3,000 monthly pension post-60 years.\nRequires contributions from farmers aged 18-40 with land up to 2 hectares, matched by government up to Rs. 1,000 monthly.",
            link: "https://maandhan.in/",
            remarks: ["pension", "small-farmers", "old-age-security", "Maharashtra", "Uttar-Pradesh"]
        },
        {
            name: "Krishi Kalyan Abhiyan",
            description: "A centrally sponsored scheme launched in 2018 to improve farmer income in 112 aspirational districts.\nIncludes activities like soil health cards, livestock vaccination, and training, implemented demand-driven with farmer participation.",
            link: "N/A",
            remarks: ["income-improvement", "aspirational-districts", "training", "livestock", "pulses"]
        },
        {
            name: "Soil Health Cards (SHC) Scheme",
            description: "Launched in 2015 to analyze soil nutrient content and provide recommendations for improving soil health and productivity.\nIssues cards based on 12 parameters, helping farmers save on fertilizers and increase crop yields.",
            link: "https://soilhealth.dac.gov.in/",
            remarks: ["soil-health", "nutrient-management", "productivity", "Odisha", "Punjab"]
        },
        {
            name: "National Bamboo Mission",
            description: "Launched in 2018 to promote bamboo cultivation, improve product quality, and create employment in the bamboo sector.\nProvides financial assistance for plantation, nurseries, training, and development of bamboo-based industries.",
            link: "https://nbm.nic.in/",
            remarks: ["bamboo-cultivation", "employment", "sustainable", "North-East", "Assam"]
        },
        {
            name: "Green Revolution – Krishonnati Yojana",
            description: "Introduced in 2005, an umbrella scheme with 11 sub-schemes to enhance agricultural production and farmer incomes using scientific approaches.\nIncludes missions like horticulture development, sustainable agriculture, and agricultural mechanization for holistic growth.",
            link: "N/A",
            remarks: ["agricultural-production", "scientific-approaches", "umbrella-scheme", "rice", "wheat"]
        },
        {
            name: "Yuva Sahakar-Cooperative Enterprise Support and Innovation Scheme",
            description: "Launched in 2018 to promote youth entrepreneurship in cooperatives, offering financial assistance up to Rs. 3 crore.\nProvides loans at reduced interest rates, training, and support for setting up or expanding cooperative enterprises.",
            link: "N/A",
            remarks: ["youth-entrepreneurship", "cooperatives", "financial-assistance", "dairy", "fisheries"]
        },
        {
            name: "Pradhan Mantri Annadata Aay SanraksHan Abhiyan (PM-AASHA)",
            description: "Launched in 2018 to provide price support for farmers' produce, ensuring minimum prices for notified crops like wheat and rice.\nAims to stabilize farmer income, reduce production costs, and benefit around 120 million farmers with Rs. 20,000 crore allocation.",
            link: "N/A",
            remarks: ["price-support", "minimum-prices", "income-stabilization", "wheat", "rice"]
        },
        {
            name: "Modified Interest Subvention Scheme (MISS)",
            description: "Provides concessional short-term agri-loans at 7% interest, reducing to 4% for timely repayment, for crop husbandry and allied activities.\nBenefits include post-harvest loans for six months against NWRs, with 465.42 lakh new KCC applications sanctioned as of 05-01-2024.",
            link: "N/A",
            remarks: ["interest-subvention", "short-term-loans", "timely-repayment", "crop-husbandry", "allied-activities"]
        },
        {
            name: "Agriculture Infrastructure Fund (AIF)",
            description: "A medium-long term debt financing facility for post-harvest management and community farming assets, with Rs. 1 lakh crore fund from FY 2020-21 to FY2025-26.\nOffers 3% interest subvention and credit guarantee for loans up to Rs. 2 crores, with Rs. 33.209 crores sanctioned for 44,912 projects as of 31-12-2023.",
            link: "https://agriinfra.dac.gov.in/",
            remarks: ["infrastructure", "post-harvest", "debt-financing", "community-assets", "nationwide"]
        },
        {
            name: "Formation & Promotion of new 10,000 FPOs",
            description: "Aims to form and promote 10,000 Farmer Producer Organizations with a budgetary outlay of Rs. 6865 crores, providing financial and handholding support for 5 years.\nOffers Rs. 18.00 lakh per FPO for 3 years, equity grants, and credit guarantees, with 7,774 FPOs registered as of 31.12.2023.",
            link: "N/A",
            remarks: ["FPOs", "financial-support", "handholding", "equity-grants", "credit-guarantees"]
        },
        {
            name: "National Beekeeping and Honey Mission (NBHM)",
            description: "Promotes scientific beekeeping for \"Sweet Revolution,\" approving honeybees as the 5th agricultural input and establishing testing labs.\nIncludes online registration via Madhukranti portal, with 23 lakh bee colonies registered and 100 honey FPOs targeted.",
            link: "https://nbb.gov.in/",
            remarks: ["beekeeping", "honey-production", "sweet-revolution", "testing-labs", "FPOs"]
        },
        {
            name: "Market Intervention Scheme and Price Support Scheme (MIS-PSS)",
            description: "Procures pulses, oilseeds, copra, and perishable commodities to prevent distress sales during bumper crops, ensuring economic prices.\nAims to protect growers from price falls below cost during peak arrival periods.",
            link: "N/A",
            remarks: ["price-support", "procurement", "pulses", "oilseeds", "perishables"]
        },
        {
            name: "Namo Drone Didi",
            description: "Provides drones to 15,000 Women SHGs for rental services to farmers for fertilizer and pesticide application, with an outlay of Rs. 1261 crores for 2024-25 to 2025-26.\nOffers 80% subsidy on drone costs up to Rs. 8.0 lakhs, with interest subvention on loans, aiming for additional income of Rs. 1.0 lakh per annum for SHGs.",
            link: "https://www.india.gov.in/",
            remarks: ["drones", "women-SHGs", "fertilizer-application", "pesticide", "subsidy"]
        },
        {
            name: "Rashtriya Krishi Vikas Yojana-Detailed Project Report based schemes (RKVY-DPR)",
            description: "Focuses on creating pre and post-harvest infrastructure, providing flexibility to states for projects based on local farmer needs.\nSupports Agri-startup Programme, with Rs. 106.25 crore released for 1524 startups since 2019-20.",
            link: "N/A",
            remarks: ["infrastructure", "state-flexibility", "agri-startups", "pre-harvest", "post-harvest"]
        },
        {
            name: "Kisan Credit Card (KCC) Scheme",
            description: "Introduced in 1998, it offers short-term credit at affordable rates for purchasing seeds, fertilizers, and other inputs.\nProvides timely financial support, flexible repayment, and covers allied activities like animal husbandry and fisheries.",
            link: "N/A",
            remarks: ["credit", "short-term", "affordable-rates", "seeds", "fertilizers"]
        },
        {
            name: "Paramparagat Krishi Vikas Yojana (PKVY)",
            description: "Promotes organic farming by encouraging farmers to form clusters and adopt traditional methods.\nProvides INR 20,000 per acre over three years, covering certification costs for 50-acre clusters.",
            link: "N/A",
            remarks: ["organic-farming", "clusters", "traditional-methods", "certification", "financial-aid"]
        },
        {
            name: "Subsidy on Fertilizers and Seeds",
            description: "The government provides subsidies on fertilizers, seeds, and other essential inputs to reduce production costs.\nAffordable inputs enable farmers to maintain productivity, with subsidized high-yielding seeds boosting crop output.",
            link: "N/A",
            remarks: ["subsidies", "fertilizers", "seeds", "production-costs", "productivity"]
        },
        {
            name: "National Mission For Sustainable Agriculture (NMSA)",
            description: "Focuses on enhancing agricultural productivity in rainfed areas through integrated farming and water use efficiency.\nPromotes soil health management and livelihood diversification using environmental-friendly technologies.",
            link: "N/A",
            remarks: ["sustainable-agriculture", "rainfed-areas", "integrated-farming", "soil-health", "water-efficiency"]
        },
        {
            name: "Rainfed Area Development (RAD)",
            description: "A scheme under NMSA implemented by RFS Division, focusing on development in rainfed areas.\nAims to improve agricultural productivity and sustainability in such regions.",
            link: "N/A",
            remarks: ["rainfed-development", "productivity", "sustainability", "integrated-farming", "horticulture"]
        },
        {
            name: "Soil Health Management (SHM)",
            description: "A scheme under NMSA implemented by INM Division, focusing on soil health improvement.\nPromotes nutrient management and sustainable agricultural practices.",
            link: "N/A",
            remarks: ["soil-improvement", "nutrient-management", "sustainable-practices", "fertilizers", "crops"]
        },
        {
            name: "Sub Mission on Agro Forestry (SMAF)",
            description: "A scheme under NMSA implemented by NRM Division, promoting agroforestry practices.\nAims to integrate trees into farming systems for enhanced sustainability.",
            link: "N/A",
            remarks: ["agroforestry", "tree-integration", "sustainability", "biodiversity", "income-diversification"]
        },
        {
            name: "Soil and Land Use Survey of India (SLUSI)",
            description: "A scheme under NMSA implemented by RFS Division, conducting surveys for soil and land use.\nAims to provide data for better agricultural planning and management.",
            link: "N/A",
            remarks: ["soil-survey", "land-use", "planning", "management", "data"]
        },
        {
            name: "National Rainfed Area Authority (NRAA)",
            description: "A scheme under NMSA implemented by RFS Division, focusing on rainfed area development.\nWorks towards policy and program implementation for sustainable agriculture in rainfed regions.",
            link: "N/A",
            remarks: ["rainfed-authority", "policy", "sustainable-agriculture", "rainfed-regions", "programs"]
        },
        {
            name: "Mission Organic Value Chain Development in North Eastern Region (MOVCDNER)",
            description: "A scheme under NMSA implemented by INM Division, promoting organic value chains in the Northeast.\nAims to enhance organic farming and market linkages in the region.",
            link: "N/A",
            remarks: ["organic-value-chain", "North-East", "market-linkages", "organic-farming", "certification"]
        },
        {
            name: "National Centre of Organic Farming (NCOF)",
            description: "A scheme under NMSA implemented by INM Division, focusing on organic farming promotion.\nProvides training and support for organic agriculture practices.",
            link: "N/A",
            remarks: ["organic-farming", "training", "support", "promotion", "practices"]
        },
        {
            name: "Central Fertilizer Quality Control and Training Institute (CFQC&TI)",
            description: "A scheme under NMSA implemented by INM Division, ensuring fertilizer quality control.\nOffers training and testing for maintaining fertilizer standards.",
            link: "N/A",
            remarks: ["fertilizer-quality", "control", "training", "testing", "standards"]
        },
        {
            name: "Gramin Bhandaran Yojna",
            description: "Creates scientific storage capacity with allied facilities in rural areas for farm produce.\nPrevents distress sale by providing pledge financing and improving marketability through grading and standardization.",
            link: "N/A",
            remarks: ["storage", "rural-areas", "pledge-financing", "grading", "marketability"]
        },
        {
            name: "Livestock Insurance Scheme",
            description: "Provides protection to farmers against loss of livestock due to death, demonstrating insurance benefits.\nAims to improve livestock quality and promote risk management in animal husbandry.",
            link: "N/A",
            remarks: ["livestock-insurance", "protection", "animal-husbandry", "dairy", "poultry"]
        },
        {
            name: "Per Drop More Crop (PDMC)",
            description: "Supports micro irrigation technologies to reduce fertilizer usage, input costs, and labor.\nFocuses on efficient water usage, especially for small and marginal farmers.",
            link: "N/A",
            remarks: ["micro-irrigation", "water-efficiency", "cost-reduction", "small-farmers", "labor-saving"]
        },
        {
            name: "APEDA’s Export Promotion Scheme",
            description: "Aims to increase the export of agricultural and processed food products by providing financial and logistical support.\nRegistered exporters can apply for benefits like assistance for packaging, branding, and product promotion.",
            link: "https://apeda.gov.in/",
            remarks: ["export-promotion", "agricultural-products", "financial-support", "packaging", "branding"]
        },
        {
            name: "Urea Subsidy Scheme",
            description: "Provides farmers with urea at affordable prices by subsidizing the difference between market price and MRP.\nEligible for all farmers across India, reducing financial burden and promoting sustainable farming practices.",
            link: "N/A",
            remarks: ["urea-subsidy", "affordable-prices", "sustainable-farming", "all-farmers", "fertilizers"]
        },
        {
            name: "Subsidy Schemes for Tractors and Machinery",
            description: "Provides subsidies to farmers for purchasing tractors and other agriculture-related machinery.\nAims to ease farming practices through access to modern equipment.",
            link: "N/A",
            remarks: ["machinery-subsidy", "tractors", "modern-equipment", "farming-ease", "mechanization"]
        },
        {
            name: "Operation Greens",
            description: "Aims to balance and maintain the supply of tomato, onion, and potato (TOP) crops.\nFocuses on stabilizing prices and ensuring availability of these essential crops.",
            link: "N/A",
            remarks: ["supply-balance", "TOP-crops", "price-stabilization", "tomato", "onion"]
        },
        {
            name: "National Food Security Mission (NFSM)",
            description: "Aims to increase production of wheat, rice, pulses, and cereals by expanding agricultural land and productivity.\nFocuses on enhancing food security through improved agricultural output.",
            link: "https://nfsm.gov.in/",
            remarks: ["food-security", "production-increase", "wheat", "rice", "pulses"]
        },
        {
            name: "Rashtriya Gokul Mission (RGM)",
            description: "Aims to conserve and develop indigenous bovine breeds and enhance milk production and productivity.\nFocuses on genetic upgradation and establishment of integrated cattle development centers.",
            link: "https://dahd.gov.in/",
            remarks: ["bovine-conservation", "milk-production", "genetic-upgradation", "cattle", "dairy"]
        },
        {
            name: "National Livestock Mission (NLM)",
            description: "Promotes entrepreneurship in livestock sector, focusing on fodder production, breed improvement, and skill development.\nProvides subsidies and support for sheep, goat, pig, and poultry farming.",
            link: "https://dahd.gov.in/",
            remarks: ["livestock-entrepreneurship", "fodder-production", "breed-improvement", "sheep", "goat"]
        },
        {
            name: "Livestock Health Disease Control Program (LHDCP)",
            description: "Aims to prevent, control, and eradicate animal diseases through vaccination and surveillance.\nFocuses on improving animal health to enhance productivity and reduce economic losses.",
            link: "https://dahd.gov.in/",
            remarks: ["animal-health", "disease-control", "vaccination", "surveillance", "productivity"]
        },
        {
            name: "National Programme for Dairy Development",
            description: "Supports dairy cooperatives for infrastructure development, milk processing, and marketing.\nAims to increase milk production and provide better returns to dairy farmers.",
            link: "https://dahd.gov.in/",
            remarks: ["dairy-development", "infrastructure", "milk-processing", "marketing", "cooperatives"]
        },
        {
            name: "Agri Clinics and Agri Business Centres Scheme (ACABC)",
            description: "Provides training to agriculture graduates to set up agri-clinics and businesses for extension services.\nOffers financial support and subsidies to promote rural entrepreneurship.",
            link: "https://www.nabard.org/",
            remarks: ["agri-clinics", "business-centres", "training", "extension-services", "entrepreneurship"]
        },
        {
            name: "National Horticulture Mission (NHM)",
            description: "Promotes holistic growth of horticulture sector through area expansion and productivity improvement.\nProvides technical and financial assistance for fruits, vegetables, spices, and flowers.",
            link: "https://nhm.nic.in/",
            remarks: ["horticulture", "area-expansion", "productivity", "fruits", "vegetables"]
        },
        {
            name: "Sub-Mission on Agricultural Mechanization (SMAM)",
            description: "Promotes farm mechanization through subsidies on machinery and equipment.\nAims to reduce drudgery, improve efficiency, and enhance agricultural productivity.",
            link: "N/A",
            remarks: ["mechanization", "subsidies", "machinery", "efficiency", "productivity"]
        },
        {
            name: "Integrated Scheme on Agriculture Marketing (ISAM)",
            description: "Develops agricultural marketing infrastructure, including storage, grading, and market intelligence.\nAims to reduce post-harvest losses and ensure better prices for farmers.",
            link: "N/A",
            remarks: ["marketing-infrastructure", "storage", "grading", "market-intelligence", "post-harvest"]
        },
        {
            name: "Krishi Unnati Yojana (KUY)-MOVCDNER",
            description: "Promotes organic farming and value chain development in North Eastern Region.\nProvides support for certification, marketing, and infrastructure for organic produce.",
            link: "N/A",
            remarks: ["organic-farming", "value-chain", "North-East", "certification", "marketing"]
        },
        {
            name: "Sub-Mission on Seeds and Planting Material",
            description: "Ensures availability of quality seeds and planting material to farmers.\nFocuses on seed production, certification, and distribution for improved crop yields.",
            link: "N/A",
            remarks: ["seeds", "planting-material", "quality", "production", "certification"]
        }
    ];

    // --- Filtering/Search State and Helpers ---
    let selectedTags = new Set();
    let searchQuery = "";

    const getAllTags = () => {
        const tagSet = new Set();
        schemes.forEach(s => (s.remarks || []).forEach(t => tagSet.add(String(t))));
        return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
    };

    const debounce = (fn, ms) => {
        let t;
        return (...args) => {
            clearTimeout(t);
            t = setTimeout(() => fn(...args), ms);
        };
    };

    const createRemarks = (remarks) => {
        if (!remarks || remarks.length === 0) return "";
        return `<ul class="list-inline scheme-tags mb-2">${remarks.map(r => `<li class=\"d-inline-block me-2 badge bg-light text-dark\" data-tag=\"${r}\">${r}</li>`).join("")}</ul>`;
    };

    const renderSchemes = (list) => {
        schemesContainer.innerHTML = "";
        list.forEach((scheme) => {
            const hasLink = scheme.link && scheme.link !== "N/A";
            const href = hasLink ? scheme.link : "#";
            const targetRel = hasLink ? " target=\"_blank\" rel=\"noopener\"" : "";
            const schemeHTML = `
                <article class=\"article-blog-item mb-35 wow fadeInUp\" data-wow-delay=\"0s\">
                    <div class=\"content\">
                        <h3 class=\"title fw-7\">
                            <a href=\"${href}\"${targetRel}>${scheme.name}</a>
                        </h3>
                        <p class=\"text\">${scheme.description.replace(/\n/g, '<br/>')}</p>
                        ${createRemarks(scheme.remarks)}
                        ${hasLink ? `<div class=\"bot mt-2\"><a class=\"tf-btn gap-35\" href=\"${href}\" target=\"_blank\" rel=\"noopener\"><span class=\"text-style\">Read More</span><div class=\"icon\"><i class=\"icon-arrow_right\"></i></div></a></div>` : ""}
                    </div>
                </article>
            `;
            schemesContainer.innerHTML += schemeHTML;
        });
    };

    const matchesFilters = (scheme) => {
        for (const t of selectedTags) {
            if (!scheme.remarks || !scheme.remarks.includes(t)) return false;
        }
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        const hay = [scheme.name, scheme.description, (scheme.remarks || []).join(" ")]
            .join(" \n ")
            .toLowerCase();
        return hay.includes(q);
    };

    const applyAndRender = () => {
        const filtered = schemes.filter(matchesFilters);
        renderSchemes(filtered);
    };

    const renderTagFilters = () => {
        if (!tagsFilterContainer) return;
        const tags = getAllTags();
        const controls = `
            <div class=\"d-flex justify-content-between align-items-center mb-2\">
                <strong>Filter by tags</strong>
                <button type=\"button\" class=\"btn btn-sm btn-link p-0\" id=\"clear-tags\">Clear</button>
            </div>
            <div class=\"form-check mb-2\">
                <input class=\"form-check-input\" type=\"checkbox\" value=\"__select_all__\" id=\"select-all-tags\">
                <label class=\"form-check-label\" for=\"select-all-tags\">Select all</label>
            </div>
            <div class=\"border-top pt-2\"></div>
        `;
        const list = tags.map(tag => `
            <div class=\"form-check mb-1\">
                <input class=\"form-check-input tag-check\" type=\"checkbox\" value=\"${tag}\" id=\"tag-${tag.replace(/[^a-z0-9_-]/gi,'_')}\">
                <label class=\"form-check-label\" for=\"tag-${tag.replace(/[^a-z0-9_-]/gi,'_')}\">${tag}</label>
            </div>
        `).join("");
        tagsFilterContainer.innerHTML = controls + list;

        const dropdownEl = tagsFilterContainer.closest('.dropdown');
        if (dropdownEl) {
            dropdownEl.addEventListener('hide.bs.dropdown', function (e) {
                // Keep dropdown open when interacting inside
                if (tagsFilterContainer.contains(e.clickEvent && e.clickEvent.target)) {
                    e.preventDefault();
                }
            });
        }

        const updateButtonLabel = () => {
            const btn = document.getElementById('tagsFilterDropdown');
            if (!btn) return;
            const count = selectedTags.size;
            btn.textContent = count > 0 ? `Filter Tags (${count})` : 'Filter Tags';
        };

        tagsFilterContainer.addEventListener("change", (e) => {
            const target = e.target;
            if (target.id === 'select-all-tags') {
                const checked = target.checked;
                tagsFilterContainer.querySelectorAll('.tag-check').forEach(cb => {
                    cb.checked = checked;
                    const t = cb.value;
                    if (checked) selectedTags.add(t); else selectedTags.delete(t);
                });
                updateButtonLabel();
                applyAndRender();
                return;
            }
            if (target.classList.contains('tag-check')) {
                const tag = target.value;
                if (target.checked) selectedTags.add(tag); else selectedTags.delete(tag);
                updateButtonLabel();
                applyAndRender();
            }
        });

        const clearBtn = document.getElementById('clear-tags');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                selectedTags.clear();
                const selectAll = document.getElementById('select-all-tags');
                if (selectAll) selectAll.checked = false;
                tagsFilterContainer.querySelectorAll('.tag-check').forEach(cb => { cb.checked = false; });
                updateButtonLabel();
                applyAndRender();
            });
        }

        updateButtonLabel();
    };

    // Initialize UI
    renderTagFilters();

    if (searchInput) {
        const onSearch = debounce((ev) => {
            searchQuery = ev.target.value || "";
            applyAndRender();
        }, 300);
        searchInput.addEventListener("input", onSearch);
    }

    // Initial render
    applyAndRender();
});
