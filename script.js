(() => {
  const form = document.querySelector("#consultation-form");
  const message = document.querySelector("#form-message");
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  const backTop = document.querySelector(".back-top");
  const recipient = "patelharsha680@gmail.com";
  const subject = "New Consultation Request - SQUARE ARCHITECTS";

  menuButton?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  }));

  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

  window.addEventListener("scroll", () => backTop?.classList.toggle("visible", window.scrollY > 650), { passive: true });
  backTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    message.textContent = "";
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const number = String(data.get("number") || "").trim();
    const email = String(data.get("email") || "").trim();
    const description = String(data.get("description") || "").trim();
    const fields = [
      [document.querySelector("#name"), name],
      [document.querySelector("#number"), number],
      [document.querySelector("#email"), email],
      [document.querySelector("#description"), description]
    ];
    fields.forEach(([element, value]) => element?.classList.toggle("invalid", !value));
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validNumber = /^[0-9+()\-\s]{7,20}$/.test(number);
    document.querySelector("#email")?.classList.toggle("invalid", !validEmail);
    document.querySelector("#number")?.classList.toggle("invalid", !validNumber);
    if (!name || !number || !email || !description || !validEmail || !validNumber) {
      message.textContent = "Please complete all four fields with a valid email and phone number.";
      return;
    }
    const body = `Name: ${name}\nNumber: ${number}\nEmail: ${email}\nDescription: ${description}`;
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    message.textContent = "Thank you! Your consultation request has been submitted. We will contact you soon. Please press Send in your email app to complete the request.";
    form.reset();
  });
})();