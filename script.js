const revealItems = document.querySelectorAll(".reveal");

revealItems.forEach((item) => {
  const delay = item.dataset.delay;
  if (delay) {
    item.style.setProperty("--delay", `${delay}ms`);
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));

const campaignLinks = document.querySelectorAll(".js-campaign-link");
const campaignSelect = document.querySelector("#campaign");

campaignLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (campaignSelect) {
      campaignSelect.value = link.dataset.campaign;
    }
  });
});

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name") || "";
    const phone = formData.get("phone") || "";
    const email = formData.get("email") || "";
    const campaign = formData.get("campaign") || "";
    const preferredDate = formData.get("preferred_date") || "Not provided";
    const message = formData.get("message") || "";
    const subject = `Diamond Canvassing enquiry - ${campaign}`;
    const body = [
      "New Diamond Canvassing enquiry",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Campaign: ${campaign}`,
      `Preferred start date: ${preferredDate}`,
      "",
      "Message:",
      message
    ].join("\n");

    const mailto = `mailto:Diamondcanvassingltd@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const note = contactForm.querySelector(".form-note");

    if (note) {
      note.textContent = "Opening your email app with the enquiry ready to send.";
    }

    window.location.href = mailto;
  });
}
