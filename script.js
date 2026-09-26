/* =========================================================
   SAVORÉ RESTAURANT WEBSITE
   Task 18 - SpireX Foundation
========================================================= */


/* ================= MOBILE NAVBAR ================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const spans = menuToggle.querySelectorAll("span");

    if (navLinks.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
    }
});


/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        const spans = menuToggle.querySelectorAll("span");

        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";

    });

});


/* ================= MENU FILTER ================= */

const menuTabs = document.querySelectorAll(".menu-tab");
const foodCards = document.querySelectorAll(".food-card");

menuTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        /* Remove active class from all tabs */

        menuTabs.forEach(item => {
            item.classList.remove("active");
        });

        /* Add active class to clicked tab */

        tab.classList.add("active");

        const category = tab.dataset.category;

        /* Filter food */

        foodCards.forEach(card => {

            if (
                category === "all" ||
                card.dataset.category === category
            ) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }

        });

    });

});


/* ================= BOOKING FORM ================= */

const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");

const successModal = document.getElementById("successModal");
const modalClose = document.getElementById("modalClose");
const modalButton = document.getElementById("modalButton");


/* Set minimum date to today */

const dateInput = document.getElementById("date");

const today = new Date();

const year = today.getFullYear();

const month = String(today.getMonth() + 1).padStart(2, "0");

const day = String(today.getDate()).padStart(2, "0");

dateInput.min = `${year}-${month}-${day}`;


/* Handle booking */

bookingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const date = document.getElementById("date").value;

    const time = document.getElementById("time").value;

    const guests = document.getElementById("guests").value;


    /* Basic validation */

    if (
        name === "" ||
        phone === "" ||
        date === "" ||
        time === "" ||
        guests === ""
    ) {

        bookingMessage.textContent =
            "Please fill in all required fields.";

        bookingMessage.style.display = "block";

        bookingMessage.style.color = "#a32929";

        return;

    }


    /* Show success modal */

    successModal.classList.add("active");

    /* Reset form */

    bookingForm.reset();

    /* Keep today's minimum date */

    dateInput.min = `${year}-${month}-${day}`;

});


/* ================= MODAL CLOSE ================= */

function closeModal() {

    successModal.classList.remove("active");

}


modalClose.addEventListener("click", closeModal);

modalButton.addEventListener("click", closeModal);


/* Close modal when clicking outside */

successModal.addEventListener("click", function(event) {

    if (event.target === successModal) {
        closeModal();
    }

});


/* ================= CURRENT YEAR ================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* ================= NAVBAR SCROLL EFFECT ================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background = "rgba(23, 23, 21, 0.96)";
        header.style.backdropFilter = "blur(10px)";

    } else {

        header.style.background = "transparent";
        header.style.backdropFilter = "none";

    }

});


/* ================= REVEAL ANIMATION ================= */

const revealElements = document.querySelectorAll(
    ".feature-card, .food-card, .service-card, .gallery-item, .about-content"
);

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    revealObserver.observe(element);

});
