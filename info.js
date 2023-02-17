let completedUp=false; 
window.addEventListener("scroll", function() {
  const companyNameSection = document.querySelector(".company-name-section");
  const distanceFromTop = companyNameSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (distanceFromTop <= 0 && distanceFromTop >= -windowHeight && !completedUp) {
    companyNameSection.classList.add("float-up");
    completedUp=true;
  } else if (distanceFromTop == 0 && completedUp){
    companyNameSection.classList.add("float-down");
    completedUp=false;
  }
});
