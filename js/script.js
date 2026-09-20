/* =========================================================
   BILAWAL KHAN - PORTFOLIO
   MAIN SCRIPT
   ========================================================= */


/* =========================================================
   01. NAVIGATION ACTIVE SECTION ON SCROLL
   ========================================================= */

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 150) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();


/* =========================================================
   02. DARK / LIGHT THEME TOGGLE
   ========================================================= */

const themeToggleBtn = document.querySelector(".theme-toggle");
const body = document.body;

function applyTheme(theme) {

    if (theme === "light") {
        body.setAttribute("data-theme", "light");

        if (themeToggleBtn) {
            themeToggleBtn.textContent = "☀️";
        }
    } else {
        body.removeAttribute("data-theme");

        if (themeToggleBtn) {
            themeToggleBtn.textContent = "🌙";
        }
    }

}

const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
applyTheme(savedTheme);

if (themeToggleBtn) {

    themeToggleBtn.addEventListener("click", () => {

        const isLight = body.getAttribute("data-theme") === "light";
        const newTheme = isLight ? "dark" : "light";

        applyTheme(newTheme);
        localStorage.setItem("portfolio-theme", newTheme);

    });

}


/* =========================================================
   03. FORM SUBMISSION POPUP
   ========================================================= */

const formPopup = document.getElementById("formPopup");
const popupIcon = document.getElementById("popupIcon");
const popupTitle = document.getElementById("popupTitle");
const popupText = document.getElementById("popupText");
const popupCloseBtn = document.getElementById("popupCloseBtn");

function showFormPopup(type, title, text) {
    popupIcon.className = "form-popup-icon " + type;
    popupIcon.textContent = type === "success" ? "✓" : "✕";
    popupTitle.textContent = title;
    popupText.textContent = text;
    formPopup.classList.add("active");
}

if (popupCloseBtn) {
    popupCloseBtn.addEventListener("click", () => {
        formPopup.classList.remove("active");
    });
}


/* =========================================================
   04. CONTACT FORM -> SEND VIA WHATSAPP
   ========================================================= */

/* ---- Your WhatsApp number, country code first, NO + NO spaces ---- */
const WHATSAPP_NUMBER = "923155080011";
/* -------------------------------------------------------------- */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        /* Build the WhatsApp message text */
        const waText =
            `New Portfolio Contact Message\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Subject: ${subject}\n` +
            `Message: ${message}`;

        const waURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

        /* Open WhatsApp with the message pre-filled */
        window.open(waURL, "_blank");

        showFormPopup(
            "success",
            "Redirecting to WhatsApp",
            "A WhatsApp chat has been opened with your message ready. Please press Send in WhatsApp to complete your submission."
        );

        contactForm.reset();

    });







    /* =========================================================
   05. TYPING EFFECT FOR HERO ROLE
   ========================================================= */

const typedRoleEl = document.getElementById("typedRole");

const roles = [
    "Aspiring .NET Backend Developer",
    "C# ASP.NET Core Specialist",
    "Entry-Level .NET Developer",
    "Junior .NET Systems Engineer",
    "Backend .NET Software Engineer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {

    const currentRole = roles[roleIndex];

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typedRoleEl.textContent = currentRole.substring(0, charIndex);

    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
        /* Pause at full word before deleting */
        typingSpeed = 1800;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
    }

    setTimeout(typeRole, typingSpeed);

}

if (typedRoleEl) {
    typeRole();
}



}