window.addEventListener("scroll", function() {
  const companyNameSection = document.querySelector(".company-name-section");
  const distanceFromTop = companyNameSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (distanceFromTop <= 0 && distanceFromTop >= -windowHeight) {
    companyNameSection.classList.add("float-up");
  } else {
    companyNameSection.classList.remove("float-up");
  }
});
