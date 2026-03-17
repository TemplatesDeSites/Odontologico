document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

  const navToggle = document.getElementById("navToggle");
  const nav = document.querySelector(".nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("nav--open");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => nav.classList.remove("nav--open"));
    });
  }

  const header = document.querySelector(".header");
  if (header) {
    const applyHeaderState = () => {
      if (window.scrollY > 24) {
        header.classList.add("header--scrolled");
      } else {
        header.classList.remove("header--scrolled");
      }
    };

    applyHeaderState();
    window.addEventListener("scroll", applyHeaderState);
  }

  const form = document.getElementById("agendarForm");
  const feedback = document.getElementById("formFeedback");

  if (form && feedback) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      feedback.textContent = "Enviando...";
      feedback.style.color = "#c6f5ff";

      setTimeout(() => {
        form.reset();
        feedback.textContent = "Pedido de agendamento enviado com sucesso! Em breve entraremos em contato.";
        feedback.style.color = "#00ffa3";
      }, 700);
    });
  }

  const mobileTrack = document.querySelector(".testimonials-mobile__track");
  const mobileCards = mobileTrack ? mobileTrack.querySelectorAll(".testimonial-card") : [];
  const mobilePrev = document.querySelector(".testimonial-nav--prev");
  const mobileNext = document.querySelector(".testimonial-nav--next");
  const mobileDots = document.querySelectorAll(".testimonial-dots:not(.testimonial-dots--desktop) .testimonial-dot");

  if (mobileTrack && mobileCards.length > 0 && mobilePrev && mobileNext && mobileDots.length === mobileCards.length) {
    let currentMobile = 0;

    const updateMobile = () => {
      mobileTrack.style.transform = `translateX(-${currentMobile * 100}%)`;
      mobileDots.forEach((dot, index) => {
        dot.classList.toggle("testimonial-dot--active", index === currentMobile);
      });
    };

    mobilePrev.addEventListener("click", () => {
      currentMobile = (currentMobile - 1 + mobileCards.length) % mobileCards.length;
      updateMobile();
    });

    mobileNext.addEventListener("click", () => {
      currentMobile = (currentMobile + 1) % mobileCards.length;
      updateMobile();
    });
  }

  const desktopTrack = document.querySelector(".testimonials-desktop__track");
  const desktopSlides = desktopTrack ? desktopTrack.querySelectorAll(".testimonial-slide") : [];
  const desktopPrev = document.querySelector(".testimonial-nav--desktop-prev");
  const desktopNext = document.querySelector(".testimonial-nav--desktop-next");
  const desktopDots = document.querySelectorAll(".testimonial-dots--desktop .testimonial-dot--desktop");

  if (desktopTrack && desktopSlides.length > 0 && desktopPrev && desktopNext && desktopDots.length === desktopSlides.length) {
    let currentDesktop = 0;

    const updateDesktop = () => {
      desktopTrack.style.transform = `translateX(-${currentDesktop * 100}%)`;
      desktopDots.forEach((dot, index) => {
        dot.classList.toggle("testimonial-dot--desktop-active", index === currentDesktop);
      });
    };

    desktopPrev.addEventListener("click", () => {
      currentDesktop = (currentDesktop - 1 + desktopSlides.length) % desktopSlides.length;
      updateDesktop();
    });

    desktopNext.addEventListener("click", () => {
      currentDesktop = (currentDesktop + 1) % desktopSlides.length;
      updateDesktop();
    });
  }

  const serviceButtons = document.querySelectorAll(".card__link");
  const whatsappNumber = "5511999999999"; // coloque aqui o número real com DDD

  serviceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".card");
      if (!card) return;

      const serviceName = card.getAttribute("data-servico") || "serviço odontológico";
      const message = `Olá, gostaria de saber mais sobre ${serviceName}.`;
      const encoded = encodeURIComponent(message);
      const url = `https://wa.me/${whatsappNumber}?text=${encoded}`;

      window.open(url, "_blank");
    });
  });

  const statElements = document.querySelectorAll(".stat__number");
  if (statElements.length > 0) {
    const animateStats = () => {
      statElements.forEach((el) => {
        const target = Number(el.getAttribute("data-target") || "0");
        const suffix = el.getAttribute("data-suffix") || "+";
        let current = 0;
        const duration = 2200;
        const startTime = performance.now();

        const step = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          current = Math.floor(target * eased);
          el.textContent = `${current}${suffix}`;
          if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStats();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(statElements[0].closest(".stats"));
  }

  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  }
});

