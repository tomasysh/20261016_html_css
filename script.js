// Animate content only after it enters the viewport. Without this file,
// every section stays visible in its normal document flow.
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!motionPreference.matches && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  document.querySelectorAll("[data-reveal]").forEach((element, index) => {
    const delay = Math.min(index % 5, 4) * 65;
    element.style.setProperty("--reveal-delay", `${delay}ms`);
    revealObserver.observe(element);
  });
}

const registrationForm = document.querySelector("#regForm");

if (registrationForm) {
  const submitButton = registrationForm.querySelector("[data-demo-submit]");
  const successMessage = document.querySelector("#formSuccess");

  // Keep submission disabled until the local handler is attached, so the
  // example cannot accidentally post the password to a static host.
  if (submitButton) submitButton.disabled = false;

  registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!registrationForm.reportValidity()) return;
    successMessage?.classList.remove("d-none");
  });

  registrationForm.addEventListener("reset", () => {
    successMessage?.classList.add("d-none");
  });

  registrationForm.addEventListener("input", () => {
    successMessage?.classList.add("d-none");
  });

  registrationForm.addEventListener("change", () => {
    successMessage?.classList.add("d-none");
  });
}
