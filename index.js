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

///////////////////////////////////////////////

emailjs.init("58sbKSHw7RiXDWyBC");

const form = document.querySelector("#myForm");
const username = document.querySelector("#username");
const phone = document.querySelector("#phone");
const email = document.querySelector("#email");
function isemail(email) {
  return /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(
    email
  );
}
function validatePhoneNumber(phone) {
  var phoneRegex = /^(\d{3}[-\s]?\d{3}[-\s]?\d{4})$/;
  // var phoneRegex = /^[^a-zA-Z]*$/;
  return phoneRegex.test(phone);
}
const validate = {
  username: (value) => {
    if (!value) {
      return true;
    }
    return false;
  },

  email: (value) => {
    if (!value) {
      return true;
    }
    if (!isemail(value)) {
      return true;
    }
    return false;
  },

  phone: (value) => {
    if (!value) {
      return true;
    }
    if (!validatePhoneNumber(value)) {
      return true;
    }
    return false;
  },
};

const setError = (selector, value) => {
  const error = document.querySelector(`#${selector}`);
  const hasError = validate[selector](value);
  error.parentElement.classList.toggle("form-error", hasError);
  return hasError;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let tempObj = {
    username: username.value,
    phone: phone.value,
    email: email.value,
  };

  let hasError = false;

  Object.keys(tempObj).forEach((key) => {
    if (setError(key, tempObj[key])) {
      hasError = true;
    }
  });

  Object.keys(tempObj).forEach((key) => {
    const node = document.querySelector(`#${key}`);
    node.addEventListener("change", (e) => {
      setError(key, e.target.value);
    });
  });

  if (!hasError) {
    const formData = new FormData(event.target);
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    emailjs.send("service_u9bdohd", "template_jypynkr", data).then(
      function (response) {
        form.reset();
        alert("Form submitted successfully.");
      },
      function (error) {
        alert("Failed to send email:", error);
      }
    );
  }
});
