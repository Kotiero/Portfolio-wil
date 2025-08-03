"use strict";

// 🔄 Bascule d'élément
const elementToggleFunc = (elem) => elem.classList.toggle("active");

// 🔹 SIDEBAR
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));
}

// 🔹 MODALE DE TÉMOIGNAGE
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = () => {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

testimonialsItem.forEach((item) => {
  item.addEventListener("click", () => {
    modalImg.src = item.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = item.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = item.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = item.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;
    testimonialsModalFunc();
  });
});

modalCloseBtn?.addEventListener("click", testimonialsModalFunc);
overlay?.addEventListener("click", testimonialsModalFunc);

// 🔹 NORMALISATION (accents, espaces → tirets)
const normalize = (str) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

// 🔹 NAVIGATION ENTRE SECTIONS
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    const clickedText = normalize(navLink.innerText);
    pages.forEach((page) => {
      const pageName = normalize(page.dataset.page);
      if (clickedText === pageName) {
        page.classList.add("active");
        navLink.classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
        const otherNav = Array.from(navigationLinks).find(
          (btn) => normalize(btn.innerText) === pageName
        );
        if (otherNav) otherNav.classList.remove("active");
      }
    });
  });
});

// 🔹 FILTRAGE – BIBLIOTHÈQUE
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

select?.addEventListener("click", () => elementToggleFunc(select));

selectItems.forEach((item) => {
  item.addEventListener("click", () => {
    const selectedValue = item.innerText;
    selectValue.innerText = selectedValue;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

let lastClickedBtn = filterBtn[0];
filterBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selectedValue = btn.innerText;
    selectValue.innerText = selectedValue;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    btn.classList.add("active");
    lastClickedBtn = btn;
  });
});

const filterFunc = (selectedValue) => {
  filterItems.forEach((item) => {
    const category = normalize(item.dataset.category);
    if (
      normalize(selectedValue) === "tous" ||
      normalize(selectedValue) === category
    ) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

// 🔹 FORMULAIRE DE CONTACT
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach((input) => {
  input.addEventListener("input", () => {
    formBtn.disabled = !form.checkValidity();
  });
});

// 🔹 BLOGUE – Affichage détaillé

// Fonction générique pour afficher n'importe quel livre
function showBookPost(bookId) {
  console.log("Affichage du livre:", bookId); // Debug

  const projectList = document.querySelector(".portfolio .project-list");
  const filterList = document.querySelector(".portfolio .filter-list");
  const selectBox = document.querySelector(".portfolio .filter-select-box");
  const bookPostDetails = document.querySelectorAll(
    ".portfolio .book-post-detail"
  );

  // Masquer la liste et les filtres
  if (projectList) {
    projectList.style.display = "none";
    console.log("Liste des livres masquée"); // Debug
  }
  if (filterList) filterList.style.display = "none";
  if (selectBox) selectBox.style.display = "none";

  // Masquer tous les détails de livres
  bookPostDetails.forEach((d) => (d.style.display = "none"));

  // Afficher le livre spécifique
  const selectedDetail = document.getElementById(
    "book-post-" + bookId + "-detail"
  );
  if (selectedDetail) {
    selectedDetail.style.display = "block";
    console.log("Livre affiché:", selectedDetail); // Debug

    // Scroll vers le livre
    selectedDetail.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    console.error("Livre introuvable:", "book-post-" + bookId + "-detail");
    console.log(
      "IDs disponibles:",
      Array.from(
        document.querySelectorAll('[id*="book-post"][id*="detail"]')
      ).map((el) => el.id)
    );
  }
}

// Fonction pour retourner à la liste des livres
function showBookList() {
  console.log("Retour à la liste des livres"); // Debug

  const projectList = document.querySelector(".portfolio .project-list");
  const filterList = document.querySelector(".portfolio .filter-list");
  const selectBox = document.querySelector(".portfolio .filter-select-box");
  const bookPostDetails = document.querySelectorAll(
    ".portfolio .book-post-detail"
  );

  // Masquer tous les détails
  bookPostDetails.forEach((d) => (d.style.display = "none"));

  // Afficher la liste et les filtres
  if (projectList) {
    projectList.style.display = "grid";
    console.log("Liste des livres affichée"); // Debug
  }
  if (filterList) filterList.style.display = "flex";
  if (selectBox) selectBox.style.display = "block";

  // Scroll vers le haut de la section bibliothèque
  const libraryHeader = document.querySelector(".portfolio header");
  if (libraryHeader) {
    libraryHeader.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  window.dispatchEvent(new Event("resize"));
}

// Test de diagnostic
document.addEventListener("DOMContentLoaded", function () {
  console.log("🔥 PAGE CHARGÉE - TEST LIVRES");

  // Vérifier si tous les éléments existent
  for (let i = 1; i <= 13; i++) {
    const bookDetail = document.getElementById("book-post-" + i + "-detail");
    if (bookDetail) {
      console.log("✅ Livre " + i + " trouvé");
    } else {
      console.log("❌ Livre " + i + " manquant");
    }
  }

  // Vérifier les liens
  const bookLinks = document.querySelectorAll('a[onclick*="showBookPost"]');
  console.log("📚 Liens de livres trouvés:", bookLinks.length);

  // Tester une fonction
  console.log("🧪 Test fonction showBookPost:", typeof showBookPost);
});
function showBlogPost(postId) {
  console.log("Affichage du blog:", postId); // Debug

  const blogPostsList = document.querySelector("#blog-page .blog-posts-list");
  const blogPostDetails = document.querySelectorAll(
    "#blog-page .blog-post-detail"
  );

  if (blogPostsList) {
    blogPostsList.style.display = "none";
    console.log("Liste des blogs masquée"); // Debug
  }

  blogPostDetails.forEach((d) => (d.style.display = "none"));

  const selectedDetail = document.getElementById(
    "blog-post-" + postId + "-detail"
  );
  if (selectedDetail) {
    selectedDetail.style.display = "block";
    console.log("Blog affiché:", selectedDetail); // Debug

    // Scroll vers le blog
    selectedDetail.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    console.error("Blog introuvable:", "blog-post-" + postId + "-detail");
  }
}

function showBlogList() {
  console.log("Retour à la liste des blogs"); // Debug

  const blogPostsList = document.querySelector("#blog-page .blog-posts-list");
  const blogPostDetails = document.querySelectorAll(
    "#blog-page .blog-post-detail"
  );

  blogPostDetails.forEach((d) => (d.style.display = "none"));

  if (blogPostsList) {
    blogPostsList.style.display = "grid"; // Changé pour correspondre au CSS
    console.log("Liste des blogs affichée"); // Debug
  }

  // Scroll vers le haut de la section blogs
  const blogHeader = document.querySelector("#blog-page header");
  if (blogHeader) {
    blogHeader.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  window.dispatchEvent(new Event("resize"));
}

// 🔹 BIBLIOTHÈQUE – Affichage détaillé
function showBookPost(bookId) {
  console.log("Affichage du livre:", bookId); // Debug

  const projectList = document.querySelector("#library-page .project-list");
  const filterList = document.querySelector("#library-page .filter-list");
  const selectBox = document.querySelector("#library-page .filter-select-box");
  const bookPostDetails = document.querySelectorAll(
    "#library-page .book-post-detail"
  );

  // Masquer la liste et les filtres
  if (projectList) {
    projectList.style.display = "none";
    console.log("Liste des livres masquée"); // Debug
  }
  if (filterList) filterList.style.display = "none";
  if (selectBox) selectBox.style.display = "none";

  bookPostDetails.forEach((d) => (d.style.display = "none"));

  const selectedDetail = document.getElementById(
    "book-post-" + bookId + "-detail"
  );
  if (selectedDetail) {
    selectedDetail.style.display = "block";
    console.log("Livre affiché:", selectedDetail); // Debug

    // Scroll vers le livre
    selectedDetail.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    console.error("Livre introuvable:", "book-post-" + bookId + "-detail");
  }
}

function showBookList() {
  console.log("Retour à la liste des livres"); // Debug

  const projectList = document.querySelector("#library-page .project-list");
  const filterList = document.querySelector("#library-page .filter-list");
  const selectBox = document.querySelector("#library-page .filter-select-box");
  const bookPostDetails = document.querySelectorAll(
    "#library-page .book-post-detail"
  );

  bookPostDetails.forEach((d) => (d.style.display = "none"));

  // Afficher la liste et les filtres
  if (projectList) {
    projectList.style.display = "grid"; // Changé pour correspondre au CSS
    console.log("Liste des livres affichée"); // Debug
  }
  if (filterList) filterList.style.display = "flex";
  if (selectBox) selectBox.style.display = "block";

  // Scroll vers le haut de la section bibliothèque
  const libraryHeader = document.querySelector("#library-page header");
  if (libraryHeader) {
    libraryHeader.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  window.dispatchEvent(new Event("resize"));
}

// 🔹 PROJETS – Affichage détaillé (VERSION CORRIGÉE)
function showProjectPost(projectId) {
  console.log("Affichage du projet:", projectId); // Debug

  const projectsList = document.querySelector(
    "#projects-page .blog-posts-list"
  );
  const projectPostDetails = document.querySelectorAll(
    "#projects-page .project-post-detail"
  );

  // Masquer la liste des projets
  if (projectsList) {
    projectsList.style.display = "none";
    console.log("Liste des projets masquée"); // Debug
  }

  // Masquer tous les détails de projets
  projectPostDetails.forEach((d) => (d.style.display = "none"));

  // Afficher le projet spécifique
  const selectedDetail = document.getElementById(
    "project-post-" + projectId + "-detail"
  );
  if (selectedDetail) {
    selectedDetail.style.display = "block";
    console.log("Projet affiché:", selectedDetail); // Debug

    // Scroll vers le projet
    selectedDetail.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    console.error(
      "Projet introuvable:",
      "project-post-" + projectId + "-detail"
    );
  }
}

function showProjectList() {
  console.log("Retour à la liste des projets"); // Debug

  const projectsList = document.querySelector(
    "#projects-page .blog-posts-list"
  );
  const projectPostDetails = document.querySelectorAll(
    "#projects-page .project-post-detail"
  );

  // Masquer tous les détails
  projectPostDetails.forEach((d) => (d.style.display = "none"));

  // Afficher la liste
  if (projectsList) {
    projectsList.style.display = "grid"; // Changé de "" à "grid" pour correspondre au CSS
    console.log("Liste des projets affichée"); // Debug
  }

  // Scroll vers le haut de la section projets
  const projectsHeader = document.querySelector("#projects-page header");
  if (projectsHeader) {
    projectsHeader.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  window.dispatchEvent(new Event("resize"));
}

// 🔹 COMPÉTENCES – Détails des boutons
function toggleDescription(button) {
  const wrapper = button.closest(".skills-item");
  const descriptions = wrapper.querySelectorAll("div");
  const description = Array.from(descriptions).find(
    (div) => div.style.display === "none" || div.style.display === "block"
  );

  if (description) {
    const isVisible = description.style.display === "block";
    description.style.display = isVisible ? "none" : "block";
    button.innerText = isVisible ? "Détails +" : "Fermer ✖";
  }
}
