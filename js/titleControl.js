let completedUp=false; 
window.addEventListener("scroll", function() {
  const scrollPosition = window.scrollY;
  const companyNameSection = document.querySelector(".company-name-section");
  const distanceFromTop = companyNameSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (distanceFromTop <= 50 && distanceFromTop >= -windowHeight && !completedUp) {
    companyNameSection.classList.add("float-up");
    completedUp=true;
  } else if (scrollPosition<=10 && completedUp){
    companyNameSection.classList.add("float-down");
    completedUp = false;
  }

});









