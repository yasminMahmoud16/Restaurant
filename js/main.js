'use strict';

/*
'use strict'; use it at the first of script to prevent the error

preload 
loading will be end after the decoment is loaded 
*/

const preloader = document.querySelector("[data-preload]");
let timeId;
window.addEventListener('load', function () {
    timeId = setTimeout(function () {
        
        preloader.classList.add('loaded')
        document.body.classList.add('loaded');

    },2000)

    preloader.addEventListener('click', function () {
        clearTimeout(timeoutId);
    });
});

// navbar scrolling


document.addEventListener('DOMContentLoaded', function(){
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('.navbar-link');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach((section) => {
            let sectionTop = section.offsetTop;
            let sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - sectionHeight) {
                current = section.getAttribute('id')
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');

            if (link.getAttribute('href').includes(current)){
                link.classList.add('active')
            }
        })


    });


});

// event listener on multiple elemnts

const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
    };
};


const navBar = document.querySelector('[data-navbar]');
const navTogglers = document.querySelectorAll('[data-nav-toggler]');
const overlay = document.querySelector('[data-overlay]');

const toggleNavbar = function () {
    navBar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('active');
}

addEventOnElements(navTogglers, 'click', toggleNavbar);



// HIDE HEADER
let lastScrollPas =0;
const headerMenu = document.querySelector('[data-header]');
const backTop = document.querySelector('[data-back-top-btn]');


const hideHeader = function () {
    const isScrollBottom = lastScrollPas < window.scrollY;

    if (isScrollBottom) {
        headerMenu.classList.add('hide');
    } else {
        headerMenu.classList.remove('hide');
    }

    lastScrollPas = window.scrollY;
}



// SHOW HEADER



window.addEventListener('scroll', function () {
    if (this.window.scrollY >= 50) {
        headerMenu.classList.add('active')
        backTop.classList.add('active')
        hideHeader();
    } else {
        headerMenu.classList.remove('active')
        backTop.classList.remove('active')
    }
});



// HERO SLIDER

const heroSlider = document.querySelector('[data-hero-slider]');
const heroSliderItems = document.querySelectorAll('[data-hero-slider-item]');
const heroSliderPrevBtn = document.querySelector('[data-prev-btn]');
const heroSliderNextvBtn = document.querySelector('[data-next-btn]');

// track the  index of the current slide 
let currentSlidePas = 0;
// store the refrence to this var 
let lastActiveSliderItem = heroSliderItems[0];


// remove the acitve class from the slide active and added to the other sliders
const updateSlider = function () {
    lastActiveSliderItem.classList.remove('active');
    heroSliderItems[currentSlidePas].classList.add('active');
    lastActiveSliderItem = heroSliderItems[currentSlidePas];
};

const slideNext = function () {
    if (currentSlidePas >= heroSliderItems.length -1) {
        currentSlidePas = 0;
    } else {
        currentSlidePas++;
    }

    updateSlider();
};

heroSliderNextvBtn.addEventListener('click', slideNext);


const slidePrev = function () {
    if (currentSlidePas <= 0) {
        currentSlidePas = heroSliderItems.length - 1;
    } else {
        currentSlidePas--;
    }

    updateSlider();
};

heroSliderPrevBtn.addEventListener('click', slidePrev);

// auto sliders

let autoSliderInterval;

const autoSlide = function () {
    autoSliderInterval = setInterval(function () {
        slideNext();
    }, 7000)
};

addEventOnElements([heroSliderNextvBtn, heroSliderPrevBtn], 'mouseover', function () {
    clearInterval(autoSliderInterval);
});


addEventOnElements([heroSliderNextvBtn, heroSliderPrevBtn], 'mouseout', autoSlide);

// we call auto slide() when the window load
window.addEventListener('load', autoSlide);


// PARALAX EFFECT

const parallaxItems = document.querySelectorAll('[data-parallax-item]');


// store the calculated positions based on the mouse movement.
let x, y;
window.addEventListener('mousemove', function (event) {


    /*
        clientX /clientY  -> give the mouse postion related to the viewPort 
     */
    x = (event.clientX / window.innerWidth * 10) - 5;
    y = (event.clientY / window.innerHeight * 10) - 5;

    x = x - (x * 2);
    y = y - (y * 2);



    parallaxItems.forEach(item => {
        let itemX = x * Number(item.dataset.parallaxSpeed)
        let itemY = y * Number(item.dataset.parallaxSpeed)

        item.style.transform = `translate3d(${x}px, ${y}px, 0px)`
    });

    
    // for (var i = 0, len = parallaxItems.length; i < len; i++){
    //     x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    //     y = y * Number(parallaxItems[i].dataset.parallaxSpeed);

    //     parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`
    // }
});