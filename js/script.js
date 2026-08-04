/* ============================================================
   DUNE — BAR & KITCHEN — site script
   ============================================================ */

/* ---------------------------------------------------------------
   ⚠️ IMPORTANT — SET YOUR WHATSAPP NUMBER BEFORE DEPLOYING
   Use the full number with country code, digits only, no + or spaces.
   Example for an Indian number +91 98765 43210 -> "919876543210"
--------------------------------------------------------------- */
const DUNE_WHATSAPP_NUMBER = "919999999999"; // <-- REPLACE with Dune's real WhatsApp number

(function(){
  "use strict";

  document.documentElement.classList.remove("no-js");

  /* ---------- Preloader ---------- */
  window.addEventListener("load", () => {
    const pre = document.getElementById("preloader");
    setTimeout(() => pre.classList.add("done"), 450);
  });

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header scroll behaviour ---------- */
  const header = document.getElementById("siteHeader");
  let lastY = window.scrollY;

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 40);
    if (y > lastY && y > 200) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }
    lastY = y;
  }, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  navToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  mainNav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Hero parallax ---------- */
  const heroImg = document.getElementById("heroImg");
  if (heroImg) {
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.2) {
        heroImg.style.transform = `translateY(${y * 0.28}px) scale(${1.08 + y * 0.00015})`;
      }
    }, { passive: true });
  }

  /* ---------- Scroll reveal (with safe fallback) ---------- */
  const revealEls = document.querySelectorAll(".reveal-up");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
    revealEls.forEach(el => io.observe(el));

    // Safety net: if anything is ever missed (e.g. a resize edge case), reveal it after a delay.
    setTimeout(() => revealEls.forEach(el => el.classList.add("in")), 4000);
  } else {
    // No IntersectionObserver support — just show everything.
    revealEls.forEach(el => el.classList.add("in"));
  }

  /* ---------- Gallery filter ---------- */
  const tabs = document.querySelectorAll(".tab");
  const galleryItems = document.querySelectorAll(".g-item");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const filter = tab.dataset.filter;
      galleryItems.forEach(item => {
        const cats = item.dataset.cat || "";
        const show = filter === "all" || cats.split(" ").includes(filter);
        item.classList.toggle("hidden", !show);
      });
    });
  });

  /* ---------- Reservation form -> WhatsApp ---------- */
  const form = document.getElementById("reserveForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("rName").value.trim();
      const phone = document.getElementById("rPhone").value.trim();
      const date = document.getElementById("rDate").value;
      const time = document.getElementById("rTime").value;
      const guests = document.getElementById("rGuests").value;
      const occasion = document.getElementById("rOccasion").value;
      const notes = document.getElementById("rNotes").value.trim();

      const prettyDate = date ? new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
        weekday: "long", day: "numeric", month: "long", year: "numeric"
      }) : "-";
      const prettyTime = time ? formatTime(time) : "-";

      let message = `Hi Dune! I'd like to reserve a table.\n\n`;
      message += `Name: ${name}\n`;
      message += `Phone: ${phone}\n`;
      message += `Date: ${prettyDate}\n`;
      message += `Time: ${prettyTime}\n`;
      message += `Guests: ${guests}\n`;
      if (occasion) message += `Occasion: ${occasion}\n`;
      if (notes) message += `Notes: ${notes}\n`;
      message += `\nPlease confirm my reservation. Thank you!`;

      const url = `https://wa.me/${DUNE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    });
  }

  function formatTime(t) {
    const [h, m] = t.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const hour = ((h + 11) % 12) + 1;
    return `${hour}:${String(m).padStart(2, "0")} ${period}`;
  }

})();
