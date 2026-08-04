/* ============================================================
   DUNE — BAR & KITCHEN — site script
   Enhanced animations & interactions
   ============================================================ */

/* ---------------------------------------------------------------
   IMPORTANT — SET YOUR WHATSAPP NUMBER BEFORE DEPLOYING
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
    setTimeout(() => pre.classList.add("done"), 500);
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
        heroImg.style.transform = `translateY(${y * 0.25}px) scale(${1.08 + y * 0.00012})`;
      }
    }, { passive: true });
  }

  /* ---------- Scroll reveal (IntersectionObserver with stagger) ---------- */
  const revealEls = document.querySelectorAll(".reveal-up, .reveal-scale");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add a small stagger based on position
          const el = entry.target;
          const siblings = el.parentElement.querySelectorAll(".reveal-up, .reveal-scale");
          let delay = 0;
          siblings.forEach((sib, i) => {
            if (sib === el) delay = i * 80;
          });
          el.style.transitionDelay = delay + "ms";
          el.classList.add("in");
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });

    revealEls.forEach(el => io.observe(el));

    // Safety net: reveal everything after 4 seconds
    setTimeout(() => revealEls.forEach(el => el.classList.add("in")), 4000);
  } else {
    revealEls.forEach(el => el.classList.add("in"));
  }

  /* ---------- Gallery filter with fade animation ---------- */
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

        if (!show) {
          item.style.opacity = "0";
          item.style.transform = "scale(0.95)";
          setTimeout(() => {
            item.classList.toggle("hidden", !show);
          }, 300);
        } else {
          item.classList.remove("hidden");
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              item.style.opacity = "1";
              item.style.transform = "scale(1)";
            });
          });
        }
      });
    });
  });

  /* ---------- Smooth anchor scrolling with offset ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  /* ---------- Active nav link highlight on scroll ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".main-nav a");

  function updateActiveNav() {
    const scrollPos = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute("id");
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(link => {
          link.style.color = "";
          if (link.getAttribute("href") === "#" + id) {
            link.style.color = "var(--primary)";
          }
        });
      }
    });
  }
  window.addEventListener("scroll", updateActiveNav, { passive: true });

  /* ---------- Counter animation for stats ---------- */
  function animateCounters() {
    const counters = document.querySelectorAll(".stat strong");
    counters.forEach(counter => {
      if (counter.dataset.animated) return;
      const rect = counter.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        counter.dataset.animated = "true";
        counter.style.animation = "fadeInUp .6s var(--ease) forwards";
      }
    });
  }
  window.addEventListener("scroll", animateCounters, { passive: true });

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
