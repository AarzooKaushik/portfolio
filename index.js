const navList = document.querySelector(".navlist");

function windowScroll() {
  const navbar = document.querySelector("nav");
  if (
    document.body.scrollTop >= 70 ||
    document.documentElement.scrollTop >= 70
  ) {
    navbar.classList.add("nav-sticky");
  } else {
    navbar.classList.remove("nav-sticky");
  }
}

window.addEventListener("scroll", (ev) => {
  ev.preventDefault();
  windowScroll();
});
const filterItem = document.querySelector(".project-category");
const projectItem = document.querySelectorAll(".project-container");

filterItem.addEventListener("click", (e) => {
  if (e.target.classList.contains("item")) {
    filterItem.querySelectorAll(".item").forEach((item) => {
      item.classList.remove("active-project");
    });

    e.target.classList.add("active-project");

    let filterName = e.target.getAttribute("data-type");
    projectItem.forEach((item) => {
      let filtered = item.getAttribute("data-type");
      if (filtered === filterName) {
        item.classList.remove("hidden");
        item.classList.add("show");
      } else {
        item.classList.add("hidden");
        item.classList.remove("show");
      }
    });
  }
});

/////////// menu /////////////

const navLinks = document.querySelectorAll(".navLink");
const menuButton = document.querySelector(".menu-btn");
const hideMenu = document.querySelector(".hide-menu-btn");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navList.classList.remove("active-menu");
  });
});

menuButton.addEventListener("click", () => {
  navList.classList.add("active-menu");
});

hideMenu.addEventListener("click", () => {
  navList.classList.remove("active-menu");
});

/////////// form validation /////////////
document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var message = document.getElementById("message").value;
  var errorMessage = document.querySelector(".error-message");
  var isValid = true;

  errorMessage.innerHTML = "";

  if (
    name.trim() === "" ||
    email.trim() === "" ||
    phone.trim() === "" ||
    message.trim() === "" ||
    !validateEmail(email)
  ) {
    errorMessage.innerHTML = "Please check your inputs .";
    isValid = false;
  }

  if (isValid) {
    errorMessage.innerHTML = "";

    this.submit();
    this.reset();
    alert("Form submitted successfully!");
  }
});

function validateEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
/////////// animation /////////////

const timeline = gsap.timeline();
timeline
  .to(".overlay-text", {
    opacity: 0,
    y: -60,
    delay: 0.5,
    ease: "expo.inOut",
  })
  .to(".overlay-1", {
    y: "-100%",
    ease: "expo.inOut",
  })
  .to(
    ".overlay-2",
    {
      y: "-100%",
      ease: "expo.inOut",
    },
    "-=.3"
  )
  .from(".home-image", {
    scale: 0,
    ease: "power1.out",
  })
  .to(".content-overlay-1", {
    x: "-100%",
    ease: "expo.inOut",
  })
  .to(
    ".content-overlay-2",
    {
      x: "-100%",
      ease: "expo.inOut",
    },
    "-=.3"
  );

const sections = document.querySelectorAll(".section-animation");
sections.forEach((section) => {
  gsap.fromTo(
    section,
    { opacity: 0, y: "100", scale: 0.7 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      },
    }
  );
});
gsap.registerPlugin(ScrollTrigger);

/////////// links /////////////

const menuLinks = document.querySelectorAll(".navLink");

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop - 100 &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      const sectionId = section.getAttribute("id");

      menuLinks.forEach((link) => {
        link.classList.remove("active");
      });

      const activeLink = document.querySelector(
        `nav ul li a[href="#${sectionId}"]`
      );
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
});
