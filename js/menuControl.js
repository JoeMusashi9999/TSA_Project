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
    document.querySelector('nav.sticky-top').classList.add('menu-hidden');
    timeout = setTimeout(showMenu, 10000);
  }
}

function showMenu() {
  if (menuHidden) {
    menuHidden = false;
    document.querySelector('nav.sticky-top').classList.remove('menu-hidden');
  }
}
