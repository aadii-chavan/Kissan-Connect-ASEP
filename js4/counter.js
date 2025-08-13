function isElementInViewport($el) {
    var top = $el.offset().top;
    var bottom = top + $el.outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return bottom > viewportTop && top < viewportBottom;
}
if ($(".counter-scroll").length > 0) {
    $(window).on("scroll", function() {
        if ($(".odometer.style-2").length > 0) {
            if (isElementInViewport($(".odometer"))) {
                setTimeout(function() {
                    $(".odometer.style-2").html(12980);
                    $(".odometer.style-4").html(1360);
                    $(".odometer.style-4-2").html(1036);
                    $(".odometer.style-4-3").html(4657);
                }, 0);
            }
        }
        if (isElementInViewport($(".odometer.style-1"))) {
            setTimeout(function() {
                $(".style-1-1").html(1360);
                $(".style-1-2").html(1036);
                $(".style-1-3").html(63);
                $(".style-1-4").html(4657);
            }, 0);
        }
    });
}

if ($(".counter-scroll-2").length > 0) {
    $(window).on("scroll", function() {
        if (isElementInViewport($(".odometer.style-4"))) {
            setTimeout(function() {
                $(".odometer.style-4").html(1360);
                $(".odometer.style-4-2").html(1036);
                $(".odometer.style-4-3").html(4657);
            }, 0);
        }
        if (isElementInViewport($(".odometer.style-6"))) {
            setTimeout(function() {
                $(".odometer.style-6").html(12980);
            }, 0);
        }
    });
}

if ($(".counter-scroll-3").length > 0) {
    $(window).on("scroll", function() {
        if (isElementInViewport($(".odometer.style-5"))) {
            setTimeout(function() {
                $(".odometer.style-5").html(1386);
                $(".odometer.style-5-2").html(12980);
            }, 0);
        }
    });
}
if ($(".counter-scroll-4").length > 0) {
    $(window).on("scroll", function() {
        if (isElementInViewport($(".odometer.style-6"))) {
            setTimeout(function() {
                $(".odometer.style-6").html(12980);
            }, 0);
        }
    });
}
if ($(".counter-scroll-5").length > 0) {
    $(window).on("scroll", function() {
        if (isElementInViewport($(".odometer.style-3"))) {
            setTimeout(function() {
                $(".odometer.style-3").html(13);
            }, 0);
        }
    });
}