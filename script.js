/* =========================================
   01. INITIALISATION
========================================= */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    console.log("--------------------------------");
    console.log("PORTFOLIO DE MOUHAMED SALL");
    console.log("Bienvenue sur mon espace professionnel");
    console.log("--------------------------------");

    console.log("Technologies : HTML, CSS, JavaScript, Java, Python, GitHub");

    // Lancement des différentes fonctionnalités

    initializePreloader();
    initializeNavigation();
    initializeScroll();
    initializeReveal();
    initializeTyping();
    initializeCounters();
    initializeSkills();
    initializeProjectFilters();
    initializeContactForm();
    initializeCurrentYear();
    initializeBackToTop();
    initializeParallax();
    initializeActiveLinks();

});


/* =========================================
   02. PRELOADER
========================================= */

function initializePreloader() {

    const preloader = document.getElementById("preloader");

    if (!preloader) return;

    window.addEventListener("load", function () {

        setTimeout(function () {

            preloader.classList.add("hide");

            console.log("Portfolio entièrement chargé.");

        }, 800);

    });

}


/* =========================================
   03. MENU DE NAVIGATION
========================================= */

function initializeNavigation() {

    const menuToggle = document.getElementById("menuToggle");

    const navLinks = document.getElementById("navLinks");

    const links = document.querySelectorAll(".nav-link");

    if (!menuToggle || !navLinks) return;

    function closeMenu() {

        menuToggle.classList.remove("active");

        navLinks.classList.remove("open");

        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");

    }

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", function () {

        menuToggle.classList.toggle("active");

        navLinks.classList.toggle("open");

        const isOpen = navLinks.classList.contains("open");

        document.body.classList.toggle("menu-open", isOpen);

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        console.log("Menu mobile :", isOpen ? "Ouvert" : "Fermé");

    });

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            closeMenu();

            links.forEach(function (item) {
                item.classList.remove("active");
            });

            link.classList.add("active");

        });

    });

    document.addEventListener("click", function (event) {

        const clickedInsideMenu = navLinks.contains(event.target);

        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {

            closeMenu();

        }

    });

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeMenu();

        }

    });

    window.addEventListener("resize", function () {

        if (window.innerWidth > 768) {

            closeMenu();

        }

    });

}


/* =========================================
   04. HEADER AU DÉFILEMENT
========================================= */

function initializeScroll() {

    const header = document.getElementById("header");

    if (!header) return;

    function updateHeader() {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();

}


/* =========================================
   05. ANIMATIONS REVEAL
========================================= */

function initializeReveal() {

    const elements = document.querySelectorAll(".reveal, .reveal-left");

    if (!("IntersectionObserver" in window)) {

        elements.forEach(function (element) {

            element.classList.add("visible");

        });

        return;

    }

    const observer = new IntersectionObserver(function (entries, observer) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"

    });

    elements.forEach(function (element) {

        observer.observe(element);

    });

    console.log("Animations au défilement activées.");

}


/* =========================================
   06. ANIMATION DU TEXTE
========================================= */

function initializeTyping() {

    const typingText = document.getElementById("typingText");

    if (!typingText) return;

    const words = [

        "Web",
        "Mobile",
        "JavaScript",
        "Python",
        "Applications"

    ];

    let wordIndex = 0;

    let letterIndex = 0;

    let deleting = false;

    function type() {

        const currentWord = words[wordIndex];

        if (deleting) {

            letterIndex--;

        } else {

            letterIndex++;

        }

        typingText.textContent = currentWord.substring(0, letterIndex);

        let speed = deleting ? 55 : 105;

        if (!deleting && letterIndex === currentWord.length) {

            speed = 1400;

            deleting = true;

        } else if (deleting && letterIndex === 0) {

            deleting = false;

            wordIndex = (wordIndex + 1) % words.length;

            speed = 400;

        }

        setTimeout(type, speed);

    }

    type();

}


/* =========================================
   07. COMPTEURS ANIMÉS
========================================= */

function initializeCounters() {

    const counters = document.querySelectorAll(".counter");

    if (!counters.length) return;

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = Number(counter.dataset.target);

            if (!Number.isFinite(target)) return;

            let current = 0;

            const duration = 1600;

            const startTime = performance.now();

            function animateCounter(currentTime) {

                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

                const eased = 1 - Math.pow(1 - progress, 4);

                current = Math.floor(target * eased);

                counter.textContent = current;

                if (progress < 1) {

                    requestAnimationFrame(animateCounter);

                } else {

                    counter.textContent = target;

                }

            }

            requestAnimationFrame(animateCounter);

            observer.unobserve(counter);

        });

    }, {

        threshold: 0.5

    });

    counters.forEach(function (counter) {

        observer.observe(counter);

    });

}


/* =========================================
   08. ANIMATION DES COMPÉTENCES
========================================= */

function initializeSkills() {

    const skillBars = document.querySelectorAll(".skill-progress");

    if (!skillBars.length) return;

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (!entry.isIntersecting) return;

            const bar = entry.target;

            const percentage = Number(bar.dataset.progress);

            if (
                Number.isFinite(percentage) &&
                percentage >= 0 &&
                percentage <= 100
            ) {

                bar.style.width = percentage + "%";

                console.log("Compétence animée :", percentage + "%");

            }

            observer.unobserve(bar);

        });

    }, {

        threshold: 0.4

    });

    skillBars.forEach(function (bar) {

        observer.observe(bar);

    });

}


/* =========================================
   09. FILTRES DES PROJETS
========================================= */

function initializeProjectFilters() {

    const buttons = document.querySelectorAll(".filter-btn");

    const projects = document.querySelectorAll(".project-card");

    if (!buttons.length || !projects.length) return;

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const filter = button.dataset.filter;

            buttons.forEach(function (item) {

                item.classList.remove("active");

            });

            button.classList.add("active");

            let visibleCount = 0;

            projects.forEach(function (project) {

                const category = project.dataset.category;

                const matches =
                    filter === "all" || category === filter;

                if (matches) {

                    project.classList.remove("hidden");

                    visibleCount++;

                } else {

                    project.classList.add("hidden");

                }

            });

            console.log("Filtre sélectionné :", filter);

            console.log("Projets affichés :", visibleCount);

        });

    });

}


/* =========================================
   10. FORMULAIRE DE CONTACT
========================================= */

function initializeContactForm() {

    const form = document.getElementById("contactForm");

    const status = document.getElementById("formStatus");

    if (!form || !status) return;

    const emailDestination = "mouhamadsall2004@gmail.com";

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const subject = document.getElementById("subject").value.trim();

        const message = document.getElementById("message").value.trim();

        status.className = "form-status";

        if (
            name.length < 2 ||
            email.length < 5 ||
            subject.length < 2 ||
            message.length < 10
        ) {

            status.textContent =
                "Veuillez remplir correctement tous les champs.";

            status.classList.add("error");

            return;

        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            status.textContent =
                "Veuillez saisir une adresse email valide.";

            status.classList.add("error");

            return;

        }

        const emailSubject = encodeURIComponent(subject);

        const emailBody = encodeURIComponent(

            "Bonjour Mouhamed,\n\n" +

            "Nom : " + name + "\n" +

            "Email : " + email + "\n\n" +

            "Message :\n" + message + "\n\n" +

            "Envoyé depuis votre portfolio."

        );

        const mailtoLink =
            "mailto:" + emailDestination +
            "?subject=" + emailSubject +
            "&body=" + emailBody;

        status.textContent =
            "Votre logiciel de messagerie va s'ouvrir.";

        status.classList.add("success");

        console.log("Nouveau message préparé.");

        console.log("Expéditeur :", name);

        console.log("Email :", email);

        console.log("Sujet :", subject);

        window.location.href = mailtoLink;

    });

}


/* =========================================
   11. ANNÉE AUTOMATIQUE
========================================= */

function initializeCurrentYear() {

    const yearElement = document.getElementById("currentYear");

    if (!yearElement) return;

    const currentYear = new Date().getFullYear();

    yearElement.textContent = currentYear;

    console.log("Année du portfolio :", currentYear);

}


/* =========================================
   12. BOUTON RETOUR EN HAUT
========================================= */

function initializeBackToTop() {

    const button = document.getElementById("backToTop");

    if (!button) return;

    function updateButton() {

        if (window.scrollY > 500) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    }

    window.addEventListener("scroll", updateButton, {
        passive: true
    });

    button.addEventListener("click", function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

        console.log("Retour en haut.");

    });

    updateButton();

}


/* =========================================
   13. EFFET PARALLAX
========================================= */

function initializeParallax() {

    const circles = document.querySelectorAll(".hero-circle");

    if (!circles.length) return;

    let ticking = false;

    window.addEventListener("scroll", function () {

        if (ticking) return;

        ticking = true;

        requestAnimationFrame(function () {

            const scrollPosition = window.scrollY;

            if (scrollPosition < 900) {

                circles.forEach(function (circle, index) {

                    const speed = index === 0 ? 0.12 : -0.08;

                    circle.style.transform =
                        "translateY(" +
                        scrollPosition * speed +
                        "px)";

                });

            }

            ticking = false;

        });

    }, {

        passive: true

    });

}


/* =========================================
   14. LIENS ACTIFS
========================================= */

function initializeActiveLinks() {

    const sections = document.querySelectorAll("main section[id]");

    const links = document.querySelectorAll(".nav-link");

    if (!sections.length || !links.length) return;

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (!entry.isIntersecting) return;

            const currentId = entry.target.id;

            links.forEach(function (link) {

                link.classList.remove("active");

                if (link.getAttribute("href") === "#" + currentId) {

                    link.classList.add("active");

                }

            });

        });

    }, {

        rootMargin: "-30% 0px -60% 0px"

    });

    sections.forEach(function (section) {

        observer.observe(section);

    });

}


/* =========================================
   15. EFFET HOVER SUR LES CARTES
========================================= */

function initializeCardEffects() {

    const cards = document.querySelectorAll(
        ".service-card, .technology-card, .process-item"
    );

    cards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {

            card.style.willChange = "transform";

        });

        card.addEventListener("mouseleave", function () {

            card.style.willChange = "auto";

        });

    });

}

initializeCardEffects();


/* =========================================
   16. VALIDATION DES CHAMPS
========================================= */

function validateInput(input) {

    if (!input) return false;

    const value = input.value.trim();

    if (input.required && value === "") {

        return false;

    }

    if (input.type === "email") {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    }

    if (input.minLength > 0 && value.length < input.minLength) {

        return false;

    }

    return true;

}

const contactInputs = document.querySelectorAll(
    "#contactForm input, #contactForm textarea"
);

contactInputs.forEach(function (input) {

    input.addEventListener("blur", function () {

        const valid = validateInput(input);

        input.classList.toggle("input-valid", valid);

        input.classList.toggle("input-invalid", !valid);

        console.log(
            "Validation du champ :",
            input.name,
            valid ? "Valide" : "À vérifier"
        );

    });

});


/* =========================================
   17. GESTION DU CHARGEMENT
========================================= */

window.addEventListener("load", function () {

    document.body.classList.add("page-loaded");

    console.log("Toutes les ressources sont chargées.");

    console.log("Portfolio de Mouhamed Sall opérationnel.");

});


/* =========================================
   18. INFORMATIONS DU DÉVELOPPEUR
========================================= */

const developerInformation = {

    name: "Mouhamed Sall",

    profession: "Étudiant développeur",

    specialization: [
        "Développement web",
        "Développement mobile",
        "Applications web",
        "E-commerce",
        "Portfolio professionnel"
    ],

    technologies: [
        "HTML",
        "CSS",
        "JavaScript",
        "Java",
        "Python",
        "GitHub"
    ],

    contact: {

        telephone: "+221779872822",

        email: "mouhamadsall2004@gmail.com",

        instagram: "mouhamad__sall"

    }

};

console.log("Informations développeur :", developerInformation);
