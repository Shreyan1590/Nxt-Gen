document.addEventListener("DOMContentLoaded", function () {
    // Initialize GSAP
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }

    // ==========================================
    // ✨ PLASMA CURSOR TRAIL
    // ==========================================
    const cursorFollower = document.querySelector('.cursor-follower');
    const cursorDot = document.querySelector('.cursor-dot');
    const trailContainer = document.body;

    let trails = [];
    const maxTrails = 15;

    if (cursorFollower && window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (cursorDot) {
                cursorDot.style.left = mouseX + 'px';
                cursorDot.style.top = mouseY + 'px';
            }

            // Create plasma trail
            createTrail(mouseX, mouseY);
        });

        function createTrail(x, y) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.left = x + 'px';
            trail.style.top = y + 'px';
            trail.style.background = Math.random() > 0.5 ? '#00eaff' : '#7b2fff';
            trailContainer.appendChild(trail);
            trails.push(trail);

            gsap.to(trail, {
                opacity: 0,
                scale: 0,
                duration: 0.8,
                onComplete: () => {
                    trail.remove();
                    trails = trails.filter(t => t !== trail);
                }
            });

            if (trails.length > maxTrails) {
                const oldTrail = trails.shift();
                oldTrail.remove();
            }
        }

        function animateCursor() {
            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .faculty-card, .research-card, .gallery-item, input, textarea, .swiper-slide');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(2)';
                cursorFollower.style.background = 'radial-gradient(circle, #7b2fff 0%, transparent 70%)';
            });
            el.addEventListener('mouseleave', () => {
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.background = 'radial-gradient(circle, #00eaff 0%, transparent 70%)';
            });
        });
    }

    // ==========================================
    // 📊 SCROLL PROGRESS BAR
    // ==========================================
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY / scrollHeight;
            scrollProgress.style.transform = `scaleX(${scrolled})`;
        });
    }

    // ==========================================
    // 🔄 HOLOGRAM PRELOADER
    // ==========================================
    const preloader = document.getElementById("preloader");

    gsap.to(preloader, {
        opacity: 0,
        duration: 1,
        delay: 1.5,
        ease: "power2.out",
        onComplete: () => {
            preloader.classList.add("preloader-hidden");
            animateHero();
        }
    });

    // ==========================================
    // 🚀 HERO HOLOGRAM MATERIALIZE
    // ==========================================
    function animateHero() {
        const tl = gsap.timeline();

        tl.from(".glitch-text", {
            duration: 1.5,
            y: 100,
            opacity: 0,
            scale: 0.8,
            filter: "blur(20px)",
            ease: "power4.out"
        })
            .from(".hero-subtext", {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: "power3.out"
            }, "-=0.8")
            .from(".hero-btn", {
                duration: 0.8,
                y: 30,
                opacity: 0,
                scale: 0.9,
                stagger: 0.15,
                ease: "back.out(1.7)"
            }, "-=0.5");
    }

    // ==========================================
    // 📌 SIDEBAR ANIMATIONS
    // ==========================================
    const checkbox = document.getElementById("checkbox");
    const sidebar = document.getElementById("sidebar");
    const layout = document.querySelector(".layout");
    const menuItems = document.querySelectorAll(".menu li");

    menuItems.forEach(item => {
        gsap.set(item, { opacity: 0, x: -30 });
    });

    checkbox.addEventListener("change", function () {
        if (this.checked) {
            sidebar.classList.add("active");
            layout.classList.add("active");

            gsap.to(menuItems, {
                opacity: 1,
                x: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: "back.out(1.7)"
            });
        } else {
            closeSidebar();
        }
    });

    function closeSidebar() {
        sidebar.classList.remove("active");
        layout.classList.remove("active");

        gsap.to(menuItems, {
            opacity: 0,
            x: -30,
            duration: 0.3,
            stagger: 0.03
        });
    }

    document.querySelectorAll(".menu li a").forEach(link => {
        link.addEventListener("click", () => {
            checkbox.checked = false;
            closeSidebar();
        });
    });

    layout.addEventListener("click", () => {
        checkbox.checked = false;
        closeSidebar();
    });

    // ==========================================
    // 🎨 SECTION REVEAL ANIMATIONS
    // ==========================================

    // Titles with neon glow
    gsap.utils.toArray("section h2").forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            duration: 1,
            y: 60,
            opacity: 0,
            filter: "blur(10px)",
            ease: "power3.out"
        });
    });

    // Vision & Mission glass panels
    gsap.utils.toArray(".vision, .mission").forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            duration: 1,
            y: 80,
            opacity: 0,
            rotateX: 15,
            ease: "power3.out",
            delay: i * 0.2
        });
    });

    // About section holographic reveal
    const aboutImage = document.querySelector(".about-image");
    if (aboutImage) {
        gsap.from(aboutImage, {
            scrollTrigger: {
                trigger: "#about",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            duration: 1.2,
            x: 100,
            opacity: 0,
            filter: "blur(10px)",
            ease: "power3.out"
        });

        gsap.from(".about-text", {
            scrollTrigger: {
                trigger: "#about",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            duration: 1,
            x: -100,
            opacity: 0,
            ease: "power3.out"
        });
    }

    // Research cards - staggered hover glow
    gsap.utils.toArray(".research-card").forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none reverse"
            },
            duration: 0.8,
            y: 60,
            opacity: 0,
            scale: 0.9,
            ease: "back.out(1.5)",
            delay: i * 0.1
        });
    });

    // Achievement section
    const achievementImage = document.querySelector(".achievement-image");
    if (achievementImage) {
        gsap.from(achievementImage, {
            scrollTrigger: {
                trigger: "#achievements",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            duration: 1.2,
            scale: 0.8,
            opacity: 0,
            rotateY: -15,
            ease: "power3.out"
        });

        gsap.from(".achievement-details", {
            scrollTrigger: {
                trigger: "#achievements",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            duration: 1,
            x: 80,
            opacity: 0,
            ease: "power3.out",
            delay: 0.3
        });
    }

    // Contact form scanline animation
    gsap.from(".contact-form", {
        scrollTrigger: {
            trigger: "#contact",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        duration: 1,
        y: 60,
        opacity: 0,
        rotateY: -10,
        ease: "power3.out"
    });

    gsap.from(".contact-info", {
        scrollTrigger: {
            trigger: "#contact",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        duration: 1,
        y: 60,
        opacity: 0,
        rotateY: 10,
        ease: "power3.out",
        delay: 0.2
    });

    // Footer fade-in scanline
    gsap.from(".footer-main > *", {
        scrollTrigger: {
            trigger: ".footer",
            start: "top 90%",
            toggleActions: "play none none reverse"
        },
        duration: 0.8,
        y: 40,
        opacity: 0,
        stagger: 0.15,
        ease: "power3.out"
    });

    // ==========================================
    // 👨‍🏫 FACULTY DATA & 3D CARDS
    // ==========================================
    fetch("faculty.json")
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            const facultyList = document.getElementById("faculty-list");
            facultyList.innerHTML = "";

            data.forEach((faculty, index) => {
                const card = document.createElement("div");
                card.classList.add("faculty-card");

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
                                ${faculty.google_scholar ? `<a href="${faculty.google_scholar}" target="_blank">📚 Scholar</a>` : ""}
                            </div>
                        </div>
                    </div>
                `;

                facultyList.appendChild(card);

                // Staggered float-up animation
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 88%",
                        toggleActions: "play none none reverse"
                    },
                    duration: 0.8,
                    y: 80,
                    opacity: 0,
                    rotateY: -20,
                    ease: "power3.out",
                    delay: index * 0.1
                });
            });
        })
        .catch(error => console.error("Error loading faculty:", error));

    // ==========================================
    // 📅 EVENTS - AUTO-CLASSIFY SYSTEM
    // ==========================================
    const eventsGrid = document.getElementById('events-grid');
    const eventFilterBtns = document.querySelectorAll('.event-filter-btn');
    let allEvents = [];

    // Classify event based on dates
    function classifyEvent(event) {
        const now = new Date();
        const start = new Date(event.eventStart);
        const end = new Date(event.eventEnd);

        if (start > now) return 'upcoming';
        if (start <= now && end >= now) return 'ongoing';
        return 'completed';
    }

    // Format date for display
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Render event cards
    function renderEvents(filter = 'upcoming') {
        if (!eventsGrid) return;

        eventsGrid.innerHTML = '';

        const filteredEvents = allEvents.filter(event => classifyEvent(event) === filter);

        if (filteredEvents.length === 0) {
            eventsGrid.innerHTML = `<div class="no-events">No ${filter} events at the moment.</div>`;
            return;
        }

        filteredEvents.forEach((event, index) => {
            const status = classifyEvent(event);
            const card = document.createElement('div');
            card.className = 'event-card';

            card.innerHTML = `
                <span class="event-status ${status}">${status}</span>
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <div class="event-meta">
                    <span><i class="fas fa-calendar"></i> ${formatDate(event.eventStart)}</span>
                    <span><i class="fas fa-clock"></i> ${formatDate(event.eventEnd)}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${event.venue}</span>
                </div>
            `;

            eventsGrid.appendChild(card);

            // Animate card entrance
            gsap.from(card, {
                opacity: 0,
                y: 50,
                duration: 0.6,
                delay: index * 0.1,
                ease: "power3.out"
            });
        });
    }

    // Fetch and initialize events
    fetch("events.json")
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            allEvents = data;
            renderEvents('upcoming');
        })
        .catch(error => console.error("Error loading events:", error));

    // Event filter buttons
    eventFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            eventFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderEvents(btn.dataset.filter);
        });
    });

    // ==========================================
    // 🖼️ GALLERY SWIPER CAROUSEL
    // ==========================================
    const galleryData = [
        { id: 1, src: "images/Events/Dubai.jpg", title: "Dubai Event", category: "events" },
        { id: 2, src: "images/Events/GoldenBookAward.jpg", title: "Golden Book Award", category: "achievements" },
        { id: 3, src: "images/Events/GroupDiscussion.jpg", title: "Group Discussion", category: "events" },
        { id: 4, src: "images/Events/Coyotech1.jpg", title: "Coyotech Event", category: "events" },
        { id: 5, src: "images/Events/Coyotech2.jpg", title: "Coyotech Workshop", category: "events" },
        { id: 6, src: "images/Events/CoyotechGroupPhoto.jpg", title: "Coyotech Group", category: "events" },
        { id: 7, src: "images/SimatsEngineering.jpg", title: "Campus View", category: "campus" },
        { id: 8, src: "images/Events/CoyotechCollage1.jpg", title: "Coyotech Collage", category: "events" },
        { id: 9, src: "images/Events/Event1.jpg", title: "Department Event", category: "events" },
        { id: 10, src: "images/Events/CoyotechSowndaryaAward.jpg", title: "Sowndarya Award", category: "achievements" },
        { id: 11, src: "images/Events/CoyotechSowndarya.jpg", title: "Award Ceremony", category: "achievements" },
        { id: 12, src: "images/Events/Coyotech0Nirmal.jpg", title: "Student Achievement", category: "achievements" },
        { id: 13, src: "images/Events/SIH2025.jpeg", title: "SIH 2025", category: "achievements" }
    ];

    const galleryWrapper = document.getElementById('gallery-wrapper');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightboxBtn = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev-lightbox');
    const nextBtn = document.querySelector('.next-lightbox');

    let currentImageIndex = 0;
    let filteredImages = galleryData;
    let gallerySwiper = null;

    function renderGallerySwiper(images) {
        if (!galleryWrapper) return;

        galleryWrapper.innerHTML = '';

        images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.dataset.index = index;

            slide.innerHTML = `
                <img src="${image.src}" alt="${image.title}" loading="lazy">
                <div class="overlay">
                    <div class="title">${image.title}</div>
                    <div class="category">${image.category.charAt(0).toUpperCase() + image.category.slice(1)}</div>
                </div>
            `;

            slide.addEventListener('click', () => openLightbox(index, images));
            galleryWrapper.appendChild(slide);
        });

        if (gallerySwiper) {
            gallerySwiper.destroy(true, true);
        }

        gallerySwiper = new Swiper('.gallery-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1400: { slidesPerView: 4 }
            }
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            filteredImages = filter === 'all' ? galleryData : galleryData.filter(img => img.category === filter);

            renderGallerySwiper(filteredImages);
        });
    });

    function openLightbox(index, images) {
        currentImageIndex = index;
        const image = images[index];

        lightboxImg.src = image.src;
        lightboxCaption.textContent = image.title;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        gsap.from(lightboxImg, {
            scale: 0.8,
            opacity: 0,
            duration: 0.4,
            ease: "back.out(1.5)"
        });
    }

    function closeLightboxFunc() {
        gsap.to(lightboxImg, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
        updateLightboxImage();
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
        updateLightboxImage();
    }

    function updateLightboxImage() {
        gsap.to(lightboxImg, {
            opacity: 0,
            x: 30,
            duration: 0.2,
            onComplete: () => {
                lightboxImg.src = filteredImages[currentImageIndex].src;
                lightboxCaption.textContent = filteredImages[currentImageIndex].title;
                gsap.fromTo(lightboxImg,
                    { opacity: 0, x: -30 },
                    { opacity: 1, x: 0, duration: 0.3 }
                );
            }
        });
    }

    closeLightboxBtn.addEventListener('click', closeLightboxFunc);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightboxFunc(); });

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightboxFunc();
            else if (e.key === 'ArrowLeft') showPrevImage();
            else if (e.key === 'ArrowRight') showNextImage();
        }
    });

    // Initialize gallery with dynamic data on page load
    renderGallerySwiper(galleryData);

    // ==========================================
    // 🧲 MAGNETIC BUTTON EFFECT (Neon Ripple)
    // ==========================================
    const magneticButtons = document.querySelectorAll('.hero-btn, .btn-about, .contact-form .btn');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.25,
                y: y * 0.25,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.5)"
            });
        });
    });

    // ==========================================
    // 🎯 NAVBAR SCROLL EFFECT
    // ==========================================
    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // ==========================================
    // ✨ 3D TILT EFFECT FOR CARDS
    // ==========================================
    const tiltCards = document.querySelectorAll('.vision, .mission, .research-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ==========================================
    // 🌊 PARALLAX DEPTH SCROLLING
    // ==========================================
    gsap.utils.toArray("section").forEach(section => {
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            },
            backgroundPosition: "50% 100%",
            ease: "none"
        });
    });

    // ==========================================
    // 📜 SMOOTH SCROLL
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: { y: target, offsetY: 70 },
                    ease: "power3.inOut"
                });
            }
        });
    });
});