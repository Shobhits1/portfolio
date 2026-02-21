/* ============================================
   PORTFOLIO — Shobhit Singh
   Sidebar + Tabs JS
   ============================================ */

/* ======== TAB NAVIGATION ======== */
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;

    // Update active button
    tabBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Update active content
    tabContents.forEach((tc) => tc.classList.remove("active"));
    document.getElementById(`tab-${target}`).classList.add("active");

    // Scroll to top of main content
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

/* ======== PROJECT FILTERS ======== */
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    // Update active filter button
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Filter project cards
    projectCards.forEach((card) => {
      const category = card.dataset.category;
      if (filter === "all" || category === filter) {
        card.classList.remove("hidden");
        card.style.animation = "fadeIn 0.4s ease forwards";
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

/* ======== SIDEBAR TOGGLE (Mobile) ======== */
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const menuToggle = document.getElementById("menuToggle");
const sidebarClose = document.getElementById("sidebarClose");

function openSidebar() {
  sidebar.classList.add("open");
  sidebarOverlay.classList.add("active");
  document.body.classList.add("no-scroll");
}

function closeSidebar() {
  sidebar.classList.remove("open");
  sidebarOverlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
}

menuToggle.addEventListener("click", openSidebar);
sidebarClose.addEventListener("click", closeSidebar);
sidebarOverlay.addEventListener("click", closeSidebar);

/* ======== CONTACT FORM (Web3Forms) ======== */
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector("button[type='submit']");
  const originalText = btn.innerHTML;

  // Loading state
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  try {
    const formData = new FormData(contactForm);
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();

    if (result.success) {
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.classList.add("btn-success");
      contactForm.reset();
    } else {
      btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed. Try again.';
      btn.style.background = "#ef4444";
    }
  } catch (error) {
    btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Network Error';
    btn.style.background = "#ef4444";
  }

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.classList.remove("btn-success");
    btn.style.background = "";
    btn.disabled = false;
  }, 3000);
});

/* ======== SCROLL ANIMATIONS ======== */
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -30px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe cards that should animate in
document.querySelectorAll(".glass-card").forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
  observer.observe(card);
});

/* ======== KEYBOARD NAV ======== */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeSidebar();
  }
});
