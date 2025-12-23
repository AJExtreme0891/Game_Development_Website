const header = document.getElementById('Head_Part');
const second_header = document.getElementById('Second_Head');

let lastScrollY = window.scrollY; // previous scroll position

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // scrolling down
        header.style.height = '5%';
        second_header.style.top = '-50%';
    } else if (currentScrollY < lastScrollY) {
        // scrolling up
        header.style.height = '8%';
        second_header.style.top = '8%';
    }

    lastScrollY = currentScrollY; // update for next scroll event
});
