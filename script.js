
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
