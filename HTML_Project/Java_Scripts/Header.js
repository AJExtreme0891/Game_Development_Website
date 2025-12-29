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
  console.log("Scroll Y:", window.scrollY);  // Debug log
  if (window.scrollY > 1000) {
    bottom_button.classList.add("show");
    console.log("Added show class");  // Debug log
  } else {
    bottom_button.classList.remove("show");
    console.log("Removed show class");  // Debug log
  }
});




const menuButton = document.querySelector('.menu_button');
const popup = document.getElementById('popup_menu');

function updatePopup() {
    const rect = menuButton.getBoundingClientRect();
    
    const offsetY = rect.height * 0.05; // 5% of button height
    const offsetX = rect.width * 0.06;  // 2% of button width

    popup.style.top = `${rect.bottom - offsetY}px`;   
    popup.style.left = `${rect.left}px`;    
    popup.style.width = `${rect.width - offsetX * 2}px`;  
}

// Initial positioning
updatePopup();



window.addEventListener('resize', updatePopup);





