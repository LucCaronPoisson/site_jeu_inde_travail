
/* =====================================
   HEADER - ATELIER NORD
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector("#header");
    const menuToggle = document.querySelector("#menu-toggle");
    const navigation = document.querySelector("#navigation");
    const navLinks = document.querySelectorAll(".nav-link, .nav-contact");

    // HEADER AU DÉFILEMENT

    function updateHeader() {
        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    // OUVERTURE / FERMETURE DU MENU

    function toggleMenu(forceClose = false) {

        const isOpen = menuToggle.classList.contains("active");
        const shouldOpen = forceClose ? false : !isOpen;

        menuToggle.classList.toggle("active", shouldOpen);
        navigation.classList.toggle("open", shouldOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(shouldOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            shouldOpen ? "Fermer le menu" : "Ouvrir le menu"
        );
    }

    menuToggle.addEventListener("click", () => {
        toggleMenu();
    });


    // FERMETURE APRÈS UN CLIC SUR UN LIEN

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            toggleMenu(true);

            // Gestion du lien actif
            document.querySelectorAll(".nav-link").forEach(nav => {
                nav.classList.remove("active");
            });

            if (link.classList.contains("nav-link")) {
                link.classList.add("active");
            }

        });

    });


    // FERMETURE AVEC ÉCHAP

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            toggleMenu(true);
            menuToggle.focus();
        }

    });


    // FERMETURE SI ON REPASSE EN VERSION DESKTOP

    window.addEventListener("resize", () => {

        if (window.innerWidth > 850) {
            toggleMenu(true);
        }

    });

});


// Apparition progressive des éléments de présentation

const studioElements = document.querySelectorAll(
    ".studio-heading, .studio-intro, .studio-description, .value-item"
);

const studioObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            studioObserver.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.15
});

studioElements.forEach((element) => {
    element.classList.add("reveal");
    studioObserver.observe(element);
});


const animatedElements = document.querySelectorAll(
    ".studio-heading, .studio-intro, .studio-description, " +
    ".value-item, .games-heading, .game-card"
);

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.15
});

animatedElements.forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
});


// Mise à jour automatique de l'année dans le footer

const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!contactForm.reportValidity()) {
            return;
        }
        const formData = new FormData(contactForm);
        const name = formData.get("name");
        const email = formData.get("email");
        const subject = formData.get("subject");
        const requestType = formData.get("request-type");
        const message = formData.get("message");
        const recipient = "contact@atelier-nord.fr";
        const emailSubject = encodeURIComponent(subject);
        const emailBody = encodeURIComponent(
            `Nom : ${name}\n` +
            `Email : ${email}\n` +
            `Type de demande : ${requestType}\n\n` +
            `Message :\n${message}`
        );

        const mailtoLink =
            `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;
        formMessage.textContent =
            "Votre logiciel de messagerie va s'ouvrir pour envoyer votre demande.";
        formMessage.className = "form-message success";
        window.location.href = mailtoLink;

    });

}
// Filtre des jeux par genre
const gamesGrid = document.querySelector("#jeux .games-grid");

if (gamesGrid) {
    const games = Array.from(gamesGrid.querySelectorAll(".game-card"), card => ({
        card,
        genre: card.querySelector(".game-meta span").textContent.trim()
    }));

    const filter = document.createElement("select");
    filter.add(new Option("Tous les genres", ""));

    const genres = new Set(games.map(game => game.genre));
    for (const genre of genres) {
        filter.add(new Option(genre, genre));
    }

    const label = document.createElement("label");
    label.append("Filtrer par genre ", filter);
    gamesGrid.before(label);

    filter.addEventListener("change", () => {
        for (const { card, genre } of games) {
            card.hidden = filter.value !== "" && filter.value !== genre;
        }
    });
}
