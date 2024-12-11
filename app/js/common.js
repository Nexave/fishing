"use strict"

function initMainSlider() {
    let mainSlider = document.querySelector(".main-slider")
    if (mainSlider) {
        let swiper = new Swiper(mainSlider, {
            loop: true,
            disableOnInteraction: false,
            speed: 3000,
            spaceBetween: 20,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".slider-block .slider-pagination",
                type: 'fraction',
            },
            navigation: {
                nextEl: ".slider-block .next-slide",
                prevEl: ".slider-block .prev-slide",
            },

        })
    }
}

initMainSlider()
Fancybox.bind('.fancybox')

function initImageSlider() {
    let slider = document.querySelector('.image-slider')
    if (slider) {
        let swiper = new Swiper(slider, {
            variableWidth: true,
            loop: true,
            disableOnInteraction: false,
            speed: 3000,
            spaceBetween: 20,
            slidesPerView: 'auto',
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".image-slider-block .next-slide",
                prevEl: ".image-slider-block .prev-slide",
            },
        })
    }
}

initImageSlider()

function initReviewsSlider() {
    let slider = document.querySelector('.reviews-slider')
    if (slider) {
        let swiper = new Swiper(slider, {
            loop: true,
            disableOnInteraction: false,
            speed: 3000,
            spaceBetween: 20,
            slidesPerView: 1,
            watchOverflow: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".reviews-block .next-slide",
                prevEl: ".reviews-block .prev-slide",
            },
        })
    }
}

initReviewsSlider()

function initLanguagePopup() {
    document.addEventListener('click', function (e) {

        if (e.target.closest('.current-language')) {
            let parent = e.target.closest('.language-wrapper')
            if (parent.classList.contains('open')) {
                parent.classList.remove('open')
                let activeMenu = document.querySelector('.language-wrapper.open')
                if (activeMenu) {
                    activeMenu.classList.remove('open')
                }
            } else {
                parent.classList.add('open')
            }
        }
        if (document.querySelector('.language-wrapper.open') && !e.target.closest(".language-wrapper")) {
            document.querySelector('.language-wrapper.open').classList.remove('open')
        }
    })
}

initLanguagePopup()

function initMobileMenu() {
    let mobileMenu = document.querySelector('.mobile-menu-wrapper')

    if (mobileMenu) {
        let body = document.querySelector('body')
        document.addEventListener('click', function (e) {
            if (e.target.closest('.menu-button')) {
                e.target.closest('.menu-button').classList.toggle('open')
                mobileMenu.classList.toggle('open')
                body.classList.toggle('no-scroll')
            }
            if (!e.target.closest('.mobile-menu-wrapper.open') && !e.target.closest('.menu-button')  && document.querySelector('.mobile-menu-wrapper.open') ) {
                document.querySelector('.menu-button').classList.remove('open')
                mobileMenu.classList.remove('open')
                body.classList.remove('no-scroll')
            }

        })

        window.addEventListener('resize', function () {
            if (window.innerWidth > 1200 && mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open')
                body.classList.remove('no-scroll')

            }
        })
    }
}

initMobileMenu()

function openLoginPopup() {
    let popup = document.querySelector('.login-popup')
    if (popup) {
        popup.classList.add('active')
    }
}


function initAuthPopup() {
    window.addEventListener('click', function (e) {
        if (e.target.closest('.header .user-icon-wrapper')) {
            let activeRegistry = document.querySelector('.register-popup')
            if (activeRegistry) {
                activeRegistry.classList.remove('active')
            }
            let activeMobileMenu = document.querySelector('.mobile-menu-wrapper.open')
            if (activeMobileMenu) {
                activeMobileMenu.classList.remove('open')
                let body = document.querySelector('body')
                body.classList.remove('no-scroll')
            }
            if (document.querySelector('.login-popup.active')) {
                document.querySelector('.login-popup.active').classList.remove('active')
            } else {
                openLoginPopup()
            }

        }
        if(e.target.closest('.user-icon-logged')){
            let activeMobileMenu = document.querySelector('.mobile-menu-wrapper.open')
            let loggedPopup = document.querySelector(".logged-popup")
            if (activeMobileMenu) {
                activeMobileMenu.classList.remove('open')
                let body = document.querySelector('body')
                body.classList.remove('no-scroll')
            }
            loggedPopup.classList.toggle('active')

        }

        if (e.target.closest('.auth-popup .close-button')) {
            let popup = e.target.closest('.auth-popup')
            popup.classList.remove('active')
        }
        if (e.target.closest('.register-link')) {
            e.preventDefault()
            let activeLogin = document.querySelector('.login-popup.active')
            let registerPopup = document.querySelector('.register-popup')
            if (activeLogin) {
                activeLogin.classList.remove('active')
            }

            registerPopup.classList.add('active')
        }
        if (e.target.closest('.login-link')) {
            e.preventDefault()
            let activeRegister = document.querySelector('.register-popup.active')
            if (activeRegister) {
                activeRegister.classList.remove('active')
            }

            openLoginPopup()
        }

    })
}

initAuthPopup()

function initwhySlider() {
    let whySlider = document.querySelector('.why-slider')
    if (whySlider) {
        let newSlider = new Swiper(whySlider, {
            variableWidth: true,
            loop: false,
            watchOverflow: true,
            disableOnInteraction: false,
            speed: 3000,
            spaceBetween: 30,
            slidesPerView: 'auto',
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".image-slider-block .next-slide",
                prevEl: ".image-slider-block .prev-slide",
            },
        })
    }
}

initwhySlider()


function initcabinetMenu() {
    let button = document.querySelector('.current-page-mobile')
    if (button) {
        button.addEventListener('click', function () {
            button.classList.toggle('open')
        })
        document.addEventListener('click', function (e) {
            if ((!e.target.closest('.current-page-mobile') || e.target.closest('.cabinet-page-menu')) && document.querySelector('.current-page-mobile.open')) {
                let button = document.querySelector('.current-page-mobile.open')
                button.classList.remove('open')

            }
        })
    }

}

initcabinetMenu()


function initFileLoader() {
    let customInput = document.querySelector(".custom-file-upload input")
    if (customInput) {
        customInput.addEventListener("change", function () {
            if (this.files[0]) {
                let fr = new FileReader();

                fr.addEventListener("load", function () {
                    let label = document.querySelector(".custom-file-upload label")
                    label.innerHTML = ""
                    label.style.backgroundImage = "url(" + fr.result + ")";
                    label.classList.add('loaded')
                }, false);

                fr.readAsDataURL(this.files[0]);
            }
        });
    }

}

initFileLoader()

function sectorPopupClose() {
    window.addEventListener('click', function (e) {
        if (e.target.closest('.sector-popup .close-button')) {
            let popup = e.target.closest('.popup')
            let body = document.querySelector('body')
            popup.classList.remove('open')
            body.classList.remove('no-scroll')
        }
    })
}
sectorPopupClose()
const container = document.getElementById("myPanzoom");
if(container){
    container.addEventListener("wheel", function (e) {
        e.preventDefault()
    });
    const options = {
        click: "false",
        startScale: 1.5,
        Toolbar: {
            display: ["zoomIn", "zoomOut"],
        },
    };
    new Panzoom(container, options);
}

function initSuccesPopup(text,timeout) {
    let succesPopup = document.querySelector('.notification-popup.success')
    if(succesPopup){
        succesPopup.classList.add('open')
        let popupText = succesPopup.querySelector('.popup-text')
        popupText.textContent = text
        setTimeout(
            ()=>{
                succesPopup.classList.remove('open')
            }
            ,timeout
        )
    }
}
function initErrorPopup(text,timeout) {
    let succesPopup = document.querySelector('.notification-popup.error')
    if(succesPopup){
        succesPopup.classList.add('open')
        let popupText = succesPopup.querySelector('.popup-text')
        popupText.textContent = text
        setTimeout(
            ()=>{
                succesPopup.classList.remove('open')
            }
            ,timeout
        )
    }
}

function closeNotification() {
    window.addEventListener("click", function (e) {
        if(e.target.closest('.notification-popup')){
            e.target.closest('.notification-popup').classList.remove('open')
        }
    })
}
closeNotification()
