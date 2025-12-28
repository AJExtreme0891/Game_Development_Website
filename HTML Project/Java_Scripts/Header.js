const wrapper = document.getElementById('Header_Wrapper');

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    wrapper.classList.add('shrunk');
  } else if (currentScrollY < lastScrollY) {
    wrapper.classList.remove('shrunk');
  }

  lastScrollY = currentScrollY;
});



const bottom_button = document.getElementById("Back_To_Top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 1000) {
    bottom_button.classList.add("show");
  } else {
    bottom_button.classList.remove("show");
  }
});

