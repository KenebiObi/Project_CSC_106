// Custom JavaScript for loading header and footer
async function loadHTML(id, file) {
  const el = document.getElementById(id);
  if (!el) return;

  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`${file} not found`);
    el.innerHTML = await res.text();
  } catch (e) {
    console.error(e);
    el.innerHTML = "<!-- include failed -->";
  }
}

// Custom JavaScript for product filtering
function filterItems(category) {
  const items = document.querySelectorAll(".product-item");
  const buttons = {
    all: document.getElementById("filter-all"),
    Yoruba: document.getElementById("filter-yoruba"),
    Igbo: document.getElementById("filter-igbo"),
    Hausa: document.getElementById("filter-hausa"),
  };

  Object.values(buttons)
    .filter(Boolean)
    .forEach((btn) => {
      btn.classList.remove("filter-active");
      btn.classList.add("text-slate-400");
    });

  if (buttons[category]) {
    buttons[category].classList.add("filter-active");
    buttons[category].classList.remove("text-slate-400");
  }

  items.forEach((item) => {
    const matches = category === "all" || item.getAttribute("data-category") === category;
    item.style.display = matches ? "block" : "none";
  });
}

function initGreeting() {
  const greetingElement = document.getElementById("greeting");
  if (!greetingElement) return;

  const hour = new Date().getHours();
  let greetingText = "Good Evening";

  if (hour < 12) {
    greetingText = "Good Morning";
  } else if (hour < 18) {
    greetingText = "Good Afternoon";
  }

  greetingElement.textContent = `${greetingText}. Celebrate Culture in Style.`;
}

function initBookingForm() {
  const bookingForm = document.getElementById("bookingForm");
  if (!bookingForm) return;

  const emailInput = document.getElementById("email");
  const dateInput = document.getElementById("date");
  const emailError = document.getElementById("emailError");
  const dateError = document.getElementById("dateError");
  const successState = document.getElementById("successState");

  if (!emailInput || !dateInput || !emailError || !dateError || !successState) return;

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;

    if (!emailInput.value.includes("@")) {
      emailError.classList.remove("hidden");
      emailInput.classList.add("border-red-500");
      isValid = false;
    } else {
      emailError.classList.add("hidden");
      emailInput.classList.remove("border-red-500");
    }

    const selectedDate = new Date(dateInput.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      dateError.classList.remove("hidden");
      dateInput.classList.add("border-red-500");
      isValid = false;
    } else {
      dateError.classList.add("hidden");
      dateInput.classList.remove("border-red-500");
    }

    if (isValid) {
      bookingForm.classList.add("hidden");
      successState.classList.remove("hidden");
    }
  });

  const minDate = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", minDate);
}

function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  const htmlEl = document.documentElement;
  const iconEl =
    toggleBtn.querySelector(".material-symbols-outlined") ||
    toggleBtn.appendChild(document.createElement("span"));

  iconEl.classList.add("material-symbols-outlined");

  function setTheme(theme) {
    const isDark = theme === "dark";
    htmlEl.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
    iconEl.textContent = isDark ? "light_mode" : "dark_mode";
    toggleBtn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    toggleBtn.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
  }

  const savedTheme = localStorage.getItem("theme");
  const initialTheme =
    savedTheme ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  setTheme(initialTheme);

  toggleBtn.addEventListener("click", () => {
    const nextTheme = htmlEl.classList.contains("dark") ? "light" : "dark";
    setTheme(nextTheme);
  });
}

function initMobileMenu() {
  const menuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  if (!menuButton || !mobileMenu) return;

  menuButton.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");
    mobileMenu.classList.toggle("hidden", isOpen);
    menuButton.setAttribute("aria-expanded", String(!isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

// Custom JavaScript for event countdown timer
function initEventCountdown() {
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  // Main event: Lagos Heritage Runway on March 15, 2026 (WAT).
  const targetTime = new Date("2026-04-15T18:00:00+01:00").getTime();

  function updateCountdown() {
    const now = Date.now();
    const remaining = Math.max(targetTime - now, 0);

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((remaining / (1000 * 60)) % 60);
    const seconds = Math.floor((remaining / 1000) % 60);

    daysEl.textContent = String(days);
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");

    if (remaining <= 0) {
      clearInterval(timer);
    }
  }

  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);
}

document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([loadHTML("header", "inc/header.html"), loadHTML("footer", "inc/footer.html")]);

  initMobileMenu();
  initThemeToggle();
  initGreeting();
  initBookingForm();
  initEventCountdown();
});

