if ($(".slider-home-1").length > 0) {
    var swiper = new Swiper(".slider-home-1", {
        slidesPerView: 1,
        centeredSlides: true,
        loop: true,
        effect: "fade",
        speed: 900,
        fadeEffect: {
            crossFade: true,
        },
        grabCursor: true,

        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".btn-slide-home-1.btn-next",
            prevEl: ".btn-slide-home-1.btn-prev",
        },
    });
}
if (".slider-home-2".length > 0) {
    var swiper = new Swiper(".slider-home-2", {
        slidesPerView: 1,
        centeredSlides: true,
        loop: true,
        effect: "fade",
        speed: 900,
        navigation: {
            nextEl: ".btn-slide-home-2.btn-next",
            prevEl: ".btn-slide-home-2.btn-prev",
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
    });
}
if (".slider-home-3".length > 0) {
    var swiper = new Swiper(".slider-home-3", {
        slidesPerView: 1,
        centeredSlides: true,
        loop: true,
        effect: "fade",
        speed: 900,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".btn-slide-home-3.btn-next",
            prevEl: ".btn-slide-home-3.btn-prev",
        },
    });
}
if (".slider-provide".length > 0) {
    var swiper = new Swiper(".slider-provide", {
        slidesPerView: 3,
        loop: true,
        spaceBetween: 30,
        navigation: {
            nextEl: ".btn-slider-provide.style-2.btn-next",
            prevEl: ".btn-slider-provide.style-2.btn-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            700: {
                slidesPerView: 2,
            },
            991: {
                slidesPerView: 3
            },
        },
        pagination: {
            el: ".swiper-pagination.pagination-slider-provide",
            clickable: true,
        },
    });
}
if (".slider-why-us".length > 0) {
    var swiper = new Swiper(".slider-why-us", {
        slidesPerView: 4,
        loop: true,
        spaceBetween: 30,
    });
}

if (".slider-partner".length > 0) {
    var swiper = new Swiper(".slider-partner", {
        slidesPerView: 6,
        loop: true,
        spaceBetween: 70,
        autoplay: {
            pauseOnMouseEnter: true,
            delay: 0,
            disableOnInteraction: false,
        },
        speed: 7000,
        breakpoints: {
            0: {
                spaceBetween: 20,
                slidesPerView: 1.5,
            },
            450: {
                spaceBetween: 20,
                slidesPerView: 2.5,
            },
            550: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1600: {
                slidesPerView: 6,
            },
        },
    });
}

if ($(".thumbs-slider").length > 0) {
    var direction = $(".tf-product-media-thumbs").data("direction");
    var thumbs = new Swiper(".tf-product-media-thumbs", {
        spaceBetween: 20,
        slidesPerView: "3",
        initialSlide: 1,
        slideTo: 1,
        direction: "horizontal",
        observer: true,
        observeParents: true,
        breakpoints: {
            0: {
                direction: "horizontal",
                slidesPerView: 3,
            },
            991: {
                direction: "horizontal",
            },
            1150: {
                direction: "horizontal",
                direction: direction,
            },
        },
    });
    var main = new Swiper(".tf-product-media-main", {
        spaceBetween: 0,
        observer: true,
        observeParents: true,
        thumbs: {
            swiper: thumbs,
        },
    });
}
if ($(".testimonial-thumbs").length > 0) {
    var direction = $(".slider-testimonial-3-thumb").data("direction");
    var thumbs = new Swiper(".slider-testimonial-3-thumb", {
        spaceBetween: 30,
        slidesPerView: 3,
        direction: "horizontal",
    });
    var main = new Swiper(".slider-testimonial-3", {
        spaceBetween: 0,
        observer: true,
        observeParents: true,
        thumbs: {
            swiper: thumbs,
        },
        navigation: {
            nextEl: ".btn-slide-testimonial-3.btn-next",
            prevEl: ".btn-slide-testimonial-3.btn-prev",
        },
    });
}

if (".slider-s-project".length > 0) {
    var swiper = new Swiper(".slider-s-project", {
        slidesPerView: 2,
        loop: true,
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination.pagination-s-project",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            850: {
                slidesPerView: 2
            },
        },
    });
}

if (".slider-s-testimonial".length > 0) {
    var swiper = new Swiper(".slider-s-testimonial", {
        slidesPerView: 1,
        loop: true,
        navigation: {
            nextEl: ".btn-s-testimonial.btn-next",
            prevEl: ".btn-s-testimonial.btn-prev",
        },
    });
}

if (".slider-box-event".length > 0) {
    var swiper = new Swiper(".slider-box-event", {
        slidesPerView: 3,
        loop: true,
        spaceBetween: 28,
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            991: {
                slidesPerView: 2,
            },
            1440: {
                slidesPerView: 3
            },
        },
    });
}

if (".slider-blog-post".length > 0) {
    var swiper = new Swiper(".slider-blog-post", {
        slidesPerView: 3,
        loop: true,
        spaceBetween: 30,
        navigation: {
            nextEl: ".btn-s-blog-post.btn-next",
            prevEl: ".btn-s-blog-post.btn-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            651: {
                slidesPerView: 1.5,
            },

            850: {
                slidesPerView: 2,
            },
            991: {
                slidesPerView: 2.5,
            },
            1200: {
                slidesPerView: 3
            },
        },
    });
}
if (".slider-s-service-2".length > 0) {
    var swiper = new Swiper(".slider-s-service-2", {
        slidesPerView: 2.7,
        spaceBetween: 30,
        navigation: {
            nextEl: ".btn-s-service-2.btn-next",
            prevEl: ".btn-s-service-2.btn-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            550: {
                slidesPerView: 1.5,
            },
            767: {
                slidesPerView: 2,
            },
            1500: {
                slidesPerView: 2.7
            },
        },
    });
}
if (".slider-s-testimonial-2".length > 0) {
    var swiper = new Swiper(".slider-s-testimonial-2", {
        slidesPerView: 2,
        loop: true,
        spaceBetween: 30,
        navigation: {
            nextEl: ".btn-slide-testimonial-2.btn-next",
            prevEl: ".btn-slide-testimonial-2.btn-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },

            767: {
                slidesPerView: 2
            },
        },
    });
}

if (".slider-s-our-mission".length > 0) {
    var swiper = new Swiper(".slider-s-our-mission", {
        slidesPerView: 1,
        loop: true,
        navigation: {
            nextEl: ".btn-slide-our-mission.btn-next",
            prevEl: ".btn-slide-our-mission.btn-prev",
        },
    });
}

if (".slider-project-2".length > 0) {
    var swiper = new Swiper(".slider-project-2", {
        slidesPerView: 2.188235294117647,
        loop: true,
        spaceBetween: 30,
        centeredSlides: true,
        navigation: {
            nextEl: ".btn-slide-project-2.btn-next",
            prevEl: ".btn-slide-project-2.btn-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            767: {
                slidesPerView: 1.5,
            },
            1440: {
                slidesPerView: 2.188235294117647
            },
        },
    });
}

if (".slider-shopping-card".length > 0) {
    var swiper = new Swiper(".slider-shopping-card", {
        slidesPerView: 2,
        loop: true,
        spaceBetween: 30,
        navigation: {
            nextEl: ".btn-slider-shopping.btn-next",
            prevEl: ".btn-slider-shopping.btn-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            550: {
                slidesPerView: 1.5,
            },
            767: {
                slidesPerView: 2,
            },
            991: {
                slidesPerView: 1.5,
            },
            1200: {
                slidesPerView: 1.5,
            },
            1440: {
                slidesPerView: 2
            },
        },
    });
}
if (".slider-gallery".length > 0) {
    var swiper = new Swiper(".slider-gallery", {
        slidesPerView: 4,
        loop: true,
        spaceBetween: 30,
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            450: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 2.5,
            },
            991: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3.5,
            },
            1440: {
                slidesPerView: 4
            },
        },
    });
}

if (".slider-event-detail".length > 0) {
    var swiper = new Swiper(".slider-event-detail", {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 0,

        navigation: {
            nextEl: ".btn-event-detail.btn-next",
            prevEl: ".btn-event-detail.btn-prev",
        },
    });
}
if (".slider-portfolio".length > 0) {
    var swiper = new Swiper(".slider-portfolio", {
        slidesPerView: 2.2,
        loop: true,
        spaceBetween: 30,
        centeredSlides: true,
        navigation: {
            nextEl: ".btn-portfolio.btn-next",
            prevEl: ".btn-portfolio.btn-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            767: {
                slidesPerView: 1.5
            },

            991: {
                slidesPerView: 2.2
            },
        },
    });
}
if (".slider-service-detail".length > 0) {
    var swiper = new Swiper(".slider-service-detail", {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 0,

        navigation: {
            nextEl: ".btn-service-detail.btn-next",
            prevEl: ".btn-service-detail.btn-prev",
        },
    });
}
if (".slider-relate-product".length > 0) {
    var swiper = new Swiper(".slider-relate-product", {
        slidesPerView: 4,
        loop: true,
        spaceBetween: 30,
        navigation: {
            nextEl: ".btn-slide-product.btn-next",
            prevEl: ".btn-slide-product.btn-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            578: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 2.5,
            },
            930: {
                slidesPerView: 3,
            },
            1070: {
                slidesPerView: 3.5,
            },

            1300: {
                slidesPerView: 4
            },
        },
    });
}
if (".slider-box-list".length > 0) {
    var swiper = new Swiper(".slider-box-list", {
        slidesPerView: 4,
        loop: true,
        spaceBetween: 30,
        navigation: {
            nextEl: ".btn-slide-box-list.btn-next",
            prevEl: ".btn-slide-box-list.btn-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            578: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 2.5,
            },
            930: {
                slidesPerView: 3,
            },
            1070: {
                slidesPerView: 3.5,
            },

            1300: {
                slidesPerView: 4
            },
        },
    });
}
if (".slider-box-icon".length > 0) {
    var swiper = new Swiper(".slider-box-icon", {
        slidesPerView: 1,
        loop: true,
        breakpoints: {
            0: {
                slidesPerView: 0.4,
            },
            400: {
                slidesPerView: 0.6,
            },
            600: {
                slidesPerView: 0.8,
            },
            850: {
                slidesPerView: 1
            },
        },
    });
}
if (".slider-boxicon-2".length > 0) {
    var swiper = new Swiper(".slider-boxicon-2", {
        slidesPerView: 4,
        loop: true,
        freeMode: true,
        spaceBetween: 30,
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            578: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 2.5,
            },
            930: {
                slidesPerView: 3,
            },
            1070: {
                slidesPerView: 3.5,
            },

            1300: {
                slidesPerView: 4
            },
        },
    });
}