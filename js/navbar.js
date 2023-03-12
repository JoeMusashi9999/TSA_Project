const hamburger = document.querySelector(".hamburger");
      const navLinks = document.querySelector(".nav-links");
      const links = document.querySelectorAll(".nav-links li");
      const line1 = document.querySelector('.line-1');
      const line2 = document.querySelector('.line-2');
      const line3 = document.querySelector('.line-3');


      hamburger.addEventListener("click", () => {
        // Toggle Nav
        navLinks.classList.toggle("active");

        // Animate Links
        links.forEach((link, index) => {
          if (link.style.animation) {
            link.style.animation = "";
          } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 7 + 0.3
            }s`;
          }
        });

        // Hamburger Animation
        line1.classList.toggle("change");
        line2.classList.toggle("change");
        line3.classList.toggle("change");
      });