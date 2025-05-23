document.addEventListener("DOMContentLoaded", function () {
    // 1. Preloader
    setTimeout(() => {
        document.getElementById("preloader").classList.add("preloader-hidden");
    }, 2000);

    // 2. Sidebar
        const checkbox = document.getElementById("checkbox");
        const sidebar = document.getElementById("sidebar");
    
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                sidebar.classList.add("active");
            } else {
                sidebar.classList.remove("active");
            }
    
        // Close sidebar when clicking a link
        document.querySelectorAll(".menu li a").forEach(link => {
            link.addEventListener("click", function () {
                checkbox.checked = false;
                sidebar.classList.remove("active");
            });
        });
    });

        const content = document.getElementById("content");
    
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                sidebar.classList.add("active");
                content.style.marginLeft = "250px"; // Shift content when sidebar opens
            } else {
                sidebar.classList.remove("active");
                content.style.marginLeft = "0"; // Reset content position when sidebar closes
            }
    
        // Close sidebar when clicking a link
            link.addEventListener("click", function () {
                checkbox.checked = false;
                sidebar.classList.remove("active");
                content.style.marginLeft = "0";
            });
        });

        document.getElementById("menuToggle").addEventListener("click", function () {
            document.querySelector(".sidebar").classList.toggle("active");
            document.querySelector(".content").classList.toggle("shifted"); // Move content
        });
        
    
    // 3. Faculty JSON Fetch
    fetch("faculty.json")
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
    })
    .then(data => {
        console.log("Faculty Data Loaded:", data);
        const facultyList = document.getElementById("faculty-list");
        facultyList.innerHTML = "";

        data.forEach(faculty => {
            const card = document.createElement("div");
            card.classList.add("faculty-card");

            // Ensure default image if missing
            const imagePath = faculty.image && faculty.image.trim() !== "" ? faculty.image : "images/default.png";

            card.innerHTML = `
                <div class="faculty-card-inner">
                    <div class="faculty-card-front">
                        <div class="faculty-image-container">
                            <img src="${imagePath}" alt="${faculty.name}" class="faculty-image">
                        </div>
                        <h3>${faculty.name}</h3>
                        <h4>${faculty.position}</h4>
                    </div>
                    <div class="faculty-card-back">
                        <h3>${faculty.name}</h3>
                        <h4>${faculty.position}</h4>
                        <p><strong>Qualification:</strong> ${faculty.qualification}</p>
                        <p><strong>Experience:</strong> ${faculty.experience}</p>
                        <p><strong>Industry Exp.:</strong> ${faculty.industry_experience || "N/A"}</p>
                        <p><strong>Research:</strong> ${faculty.research_focus || "N/A"}</p>
                        <p><strong>Email:</strong> <a href="mailto:${faculty.email}">${faculty.email}</a></p>
                        <div class="faculty-links">
                            ${faculty.linkedin ? `<a href="${faculty.linkedin}" target="_blank">🔗 LinkedIn</a>` : ""}
                            ${faculty.scopus ? `<a href="${faculty.scopus}" target="_blank">📊 Scopus</a>` : ""}
                            ${faculty.google_scholar ? `<a href="${faculty.google_scholar}" target="_blank">📚 Google Scholar</a>` : ""}
                        </div>
                    </div>
                </div>
            `;

            facultyList.appendChild(card);
        });
    })
    .catch(error => console.error("Error loading faculty data:", error));

    // 4. Swiper Carousel Initialization
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });

    // 5. Footer Brand Name Hover Effect
    const brand = document.querySelector(".self-center");
    if (brand) {
        brand.addEventListener("mouseenter", function () {
            this.style.color = "#ff4500";
        });
        brand.addEventListener("mouseleave", function () {
            this.style.color = "#ffffff";
        });
    }

    // 6. Smooth Scroll Effect on Footer Links
    document.querySelectorAll("footer a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            if (this.getAttribute("href").startsWith("#")) {
                e.preventDefault();
                document.querySelector(this.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // 7. Social Media Icon Hover Animation
    document.querySelectorAll(".social-icons a").forEach(icon => {
        icon.addEventListener("mouseover", () => { icon.style.transform = "rotate(10deg)"; });
        icon.addEventListener("mouseout", () => { icon.style.transform = "rotate(0deg)"; });
    });
});