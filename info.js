let completedUp=false; 
window.addEventListener("scroll", function() {
  const companyNameSection = document.querySelector(".company-name-section");
  const distanceFromTop = companyNameSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (distanceFromTop <= 0 && distanceFromTop >= -windowHeight && !completedUp) {
    companyNameSection.classList.add("float-up");
    completedUp=true;
  }
  

});




//menu:
let prevScrollpos = window.pageYOffset;
let menuHidden = false;
let timeout = 0;

window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    // User is scrolling up
    showMenu();
  } else {
    // User is scrolling down
    hideMenu();
  }
  prevScrollpos = currentScrollPos;
}

function hideMenu() {
  if (!menuHidden) {
    menuHidden = true;
    clearTimeout(timeout);
    document.querySelector('nav').classList.add('menu-hidden');
    timeout = setTimeout(showMenu, 10000);
  }
}

function showMenu() {
  if (menuHidden) {
    menuHidden = false;
    document.querySelector('nav').classList.remove('menu-hidden');
  }
}
