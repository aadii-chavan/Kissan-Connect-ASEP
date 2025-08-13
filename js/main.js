/**

        videoWrap();
        openNavMobile();
        openWelcome();
        btnQuantity();
        tabs();
        changeValue();
        dayTimeInput();
        btnLoadMore();
        colorList();
        rangeslider();
        visibleHeader();
        scollElement();
        goTop();
        animateImgItem();
        animateBoxVideo();
        numberNotNegative();
        ajaxContactForm();
        ajaxSubscribe.eventLoad();
        footer();
        popupProduct();
        animateText();
        preloader();
**/

(function($) {
    ("use strict");

    var videoWrap = function() {
        if ($("div").hasClass("video-wrap")) {
            $(".popup-youtube").magnificPopup({
                type: "iframe",
            });
        }
    };

    var openNavMobile = () => {
        if ($(".header").hasClass("header")) {
            $(".mobile-button").on("click", () => {
                $(".mobile-nav-wrap").toggleClass("active");
                $("body").toggleClass("no-scroll");
            });

            $(".overlay-mobile-nav").on("click", () => {
                $(".mobile-nav-wrap").toggleClass("active");
                $("body").toggleClass("no-scroll");
            });
            $(".mobile-nav-close").on("click", () => {
                $(".mobile-nav-wrap").toggleClass("active");
                $("body").toggleClass("no-scroll");
            });

            $(document).on("click", ".menu-item-has-children-mobile", function() {
                var args = {
                    duration: 200
                };
                if ($(this).hasClass("active")) {
                    $(this).children(".sub-menu-mobile").slideUp(args);
                    $(this).removeClass("active");
                } else {
                    $(".sub-menu-mobile").slideUp(args);
                    $(this).children(".sub-menu-mobile").slideDown(args);
                    $(".menu-item-has-children-mobile").removeClass("active");
                    $(this).addClass("active");
                }
            });
        }
    };

    var openWelcome = function() {
        $(".btn-open-welcome").on("click", () => {
            $(".box-welcome").toggleClass("active");
            $("body").toggleClass("no-scroll");
        });
        $(".btn-close-welcome").on("click", () => {
            $(".box-welcome").toggleClass("active");
            $("body").toggleClass("no-scroll");
        });
        $(".box-welcome .tf-overlay").on("click", () => {
            $(".box-welcome").toggleClass("active");
            $("body").toggleClass("no-scroll");
        });
    };

    //btnQuantity
    var btnQuantity = function() {
        $(".minus-btn").on("click", function(e) {
            e.preventDefault();
            var $this = $(this);
            var $input = $this.closest("div").find("input");
            var value = parseInt($input.val());

            if (value > 1) {
                value = value - 1;
            }

            $input.val(value);
        });

        $(".plus-btn").on("click", function(e) {
            e.preventDefault();
            var $this = $(this);
            var $input = $this.closest("div").find("input");
            var value = parseInt($input.val());

            if (value > 0) {
                value = value + 1;
            }

            $input.val(value);
        });
    };
    var tabs = function() {
        $(".wg-tabs").each(function() {
            $(this).find(".widget-content-tab").children().hide();
            $(this).find(".widget-content-tab").children(".active").show();
            $(this)
                .find(".menu-tab")
                .children(".item")
                .on("click", function() {
                    var liActive = $(this).index();
                    var contentActive = $(this)
                        .siblings()
                        .removeClass("active")
                        .parents(".wg-tabs")
                        .find(".widget-content-tab")
                        .children()
                        .eq(liActive);
                    contentActive.addClass("active").fadeIn("slow");
                    contentActive.siblings().removeClass("active");
                    $(this)
                        .addClass("active")
                        .parents(".wg-tabs")
                        .find(".widget-content-tab")
                        .children()
                        .eq(liActive)
                        .siblings()
                        .hide();
                });
        });
    };
    var changeValue = function() {
        if ($(".tf-dropdown-sort").length > 0) {
            $(".select-item").click(function(event) {
                $(this)
                    .closest(".tf-dropdown-sort")
                    .find(".text-sort-value")
                    .text($(this).find(".text-value-item").text());

                $(this).closest(".dropdown-menu").find(".select-item.active").removeClass("active");

                $(this).addClass("active");
            });
        }
    };

    var dayTimeInput = function() {
        if ($(".choose-date").length > 0) {
            $("#day").on("focus", function() {
                $(".choose-date").addClass("has-value");
            });

            $("#day").on("blur", function() {
                if (!$(this).val()) {
                    $(".choose-date").removeClass("has-value");
                }
            });
        }
        if ($(".choose-date-2").length > 0) {
            $("#time").on("focus", function() {
                $(".choose-date-2").addClass("has-value");
            });

            $("#time").on("blur", function() {
                if (!$(this).val()) {
                    $(".choose-date-2").removeClass("has-value");
                }
            });
        }
        if ($(".amount").length > 0) {
            $("#positiveNumber").on("input", function() {
                let value = $(this).val();

                if (value.includes("-")) {
                    $(this).val(value.replace(/-/g, ""));
                }

                if (value === "0" || value === "") {
                    $(this).val("");
                }

                const numValue = parseInt(value, 10);
                if (numValue < 1) {
                    $(this).val("");
                }
            });
        }
    };

    var btnLoadMore = function() {
        $(".btn-loadMore").click(function() {
            var container = $(this).closest(".container-loadmore");

            var hiddenItems = container.find(".item.hidden");

            hiddenItems.slice(0, 1).each(function(index) {
                $(this)
                    .removeClass("hidden")
                    .hide()
                    .fadeIn(400 * (index + 1));
            });

            if (container.find(".item.hidden").length === 0) {
                $(this).hide();
            }
        });
    };
    var colorList = function() {
        $(".color-list li").on("click", function() {
            $(".color-list li").removeClass("active");
            $(this).addClass("active");
        });
    };
    var rangeslider = function() {
        if ($("#range-two-val").length > 0) {
            var skipSlider = document.getElementById("range-two-val");
            var skipValues = [document.getElementById("skip-value-lower"), document.getElementById("skip-value-upper")];

            noUiSlider.create(skipSlider, {
                start: [1, 500],
                connect: true,
                behaviour: "drag",
                step: 1,
                range: {
                    min: 10,
                    max: 1000,
                },
                format: {
                    to: function(value) {
                        return Math.round(value);
                    },
                    from: function(value) {
                        return Number(value);
                    },
                },
            });

            skipSlider.noUiSlider.on("update", function(values, handle) {
                skipValues[handle].innerHTML = "$" + values[handle];
            });
        }
    };
    var visibleHeader = function() {
        let lastScrollTop = 0;
        $(window).scroll(function() {
            let scrollTop = $(this).scrollTop();
            if (scrollTop < lastScrollTop) {
                if (scrollTop > 0) {
                    $(".fixed-header.style-absolute").addClass("visible");
                }
            } else {
                $(".fixed-header.style-absolute").removeClass("visible");
            }
            if (scrollTop < 350) {
                $(".fixed-header.style-absolute").removeClass("visible");
            }

            lastScrollTop = scrollTop;
        });
    };
    var scollElement = function() {
        if ($(".scroll-element").length > 0) {
            $(document).ready(function() {
                let lastScrollTop = 0;
                const distance = 10;
                $(window).on("scroll", function() {
                    const st = $(this).scrollTop();

                    if (st > lastScrollTop) {
                        $(".scroll-element").css("transform", `translateY(${distance}px)`);
                    } else {
                        $(".scroll-element").css("transform", `translateY(-${distance}px)`);
                    }
                    lastScrollTop = st;
                });
            });
        }

        if ($(".scroll-element-2").length > 0) {
            $(document).ready(function() {
                let lastScrollTop = 0;
                const distance = 10;
                $(window).on("scroll", function() {
                    const st = $(this).scrollTop();

                    if (st > lastScrollTop) {
                        $(".scroll-element-2").css("transform", `translateY(-${distance}px)`);
                    } else {
                        // Cuộn lên
                        $(".scroll-element-2").css("transform", `translateY(${distance}px)`);
                    }
                    lastScrollTop = st;
                });
            });
        }

        if ($(".scroll-element-3").length > 0) {
            $(document).ready(function() {
                let lastScrollTop = 0;
                const distance = 10;

                $(window).on("scroll", function() {
                    const st = $(this).scrollTop();

                    if (st > lastScrollTop) {
                        $(".scroll-element-3").css("transform", `translateX(-${distance}px)`);
                    } else {
                        $(".scroll-element-3").css("transform", `translateX(${distance}px)`);
                    }
                    lastScrollTop = st;
                });
            });
        }

        if ($(".scroll-element-4").length > 0) {
            $(document).ready(function() {
                let lastScrollTop = 0;
                const distance = 10;

                $(window).on("scroll", function() {
                    const st = $(this).scrollTop();

                    if (st > lastScrollTop) {
                        $(".scroll-element-4").css("transform", `translateX(${distance}px)`);
                    } else {
                        $(".scroll-element-4").css("transform", `translateX(-${distance}px)`);
                    }
                    lastScrollTop = st;
                });
            });
        }
    };
    //goTop
    var goTop = function() {
        if ($("div").hasClass("progress-wrap")) {
            var progressPath = document.querySelector(".progress-wrap path");
            var pathLength = progressPath.getTotalLength();
            progressPath.style.transition = progressPath.style.WebkitTransition = "none";
            progressPath.style.strokeDasharray = pathLength + " " + pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect();
            progressPath.style.transition = progressPath.style.WebkitTransition = "stroke-dashoffset 10ms linear";
            var updateprogress = function() {
                var scroll = $(window).scrollTop();
                var height = $(document).height() - $(window).height();
                var progress = pathLength - (scroll * pathLength) / height;
                progressPath.style.strokeDashoffset = progress;
            };
            updateprogress();
            $(window).scroll(updateprogress);
            var offset = 200;
            var duration = 0;
            jQuery(window).on("scroll", function() {
                if (jQuery(this).scrollTop() > offset) {
                    jQuery(".progress-wrap").addClass("active-progress");
                } else {
                    jQuery(".progress-wrap").removeClass("active-progress");
                }
            });
            jQuery(".progress-wrap").on("click", function(event) {
                event.preventDefault();
                jQuery("html, body").animate({
                    scrollTop: 0
                }, duration);
                return false;
            });
        }
    };
    var animateImgItem = function() {
        $(window).on("scroll", function() {
            const isSmallScreen = window.matchMedia("(max-width: 550px)").matches;

            $(".tf-animate-1, .tf-animate-2, .tf-animate-3, .tf-animate-4").each(function() {
                const sectionOffsetTop = $(this).offset().top;
                const sectionHeight = $(this).outerHeight();
                const scrollPosition = $(window).scrollTop();
                const windowHeight = $(window).height();

                if (isSmallScreen) {
                    // Logic cho màn hình nhỏ hơn 550px
                    if (
                        scrollPosition + windowHeight > sectionOffsetTop + 20 &&
                        scrollPosition < sectionOffsetTop + sectionHeight - 20
                    ) {
                        $(this).addClass("active-animate");
                    }
                } else {
                    // Logic cho màn hình lớn hơn hoặc bằng 550px
                    if (
                        scrollPosition + windowHeight > sectionOffsetTop + 100 &&
                        scrollPosition < sectionOffsetTop + sectionHeight - 100
                    ) {
                        $(this).addClass("active-animate");
                    }
                }
            });
        });
    };

    var animateBoxVideo = function() {
        $(window).on("scroll", function() {
            $(".tf-animate__box, .tf-animate__box-2, .tf-animate__rotate-left, .tf-animate__rotate-right").each(
                function() {
                    const sectionOffsetTop = $(this).offset().top;
                    const sectionHeight = $(this).outerHeight();
                    const scrollPosition = $(window).scrollTop();
                    const windowHeight = $(window).height();
                    if (
                        scrollPosition + windowHeight > sectionOffsetTop + 100 &&
                        scrollPosition < sectionOffsetTop + sectionHeight - 100
                    ) {
                        if ($(this).hasClass("tf-animate__box")) {
                            $(this).addClass("animate__animated  animate__zoomInLeft");
                        } else if ($(this).hasClass("tf-animate__box-2")) {
                            $(this).addClass("animate__animated animate__zoomInRight");
                        } else if ($(this).hasClass("tf-animate__rotate-right")) {
                            $(this).addClass("animate__animated animate__rotateInUpRight");
                        } else if ($(this).hasClass("tf-animate__rotate-left")) {
                            $(this).addClass("animate__animated animate__rotateInUpLeft");
                        }
                    }
                }
            );
        });
    };

    var numberNotNegative = function() {
        $('input[type="number"]').on("keypress", function(e) {
            if (e.which === 45) {
                e.preventDefault();
            }
        });

        $('input[type="number"]').on("input", function() {
            if ($(this).val() < 0) {
                $(this).val("");
            }
        });
    };
    var ajaxContactForm = function() {
        $("#contactform,#commentform").each(function() {
            $(this).validate({
                submitHandler: function(form) {
                    var $form = $(form),
                        str = $form.serialize(),
                        loading = $("<div />", {
                            class: "loading"
                        });

                    $.ajax({
                        type: "POST",
                        url: $form.attr("action"),
                        data: str,
                        beforeSend: function() {
                            $form.find(".send-wrap").append(loading);
                        },
                        success: function(msg) {
                            var result, cls;
                            if (msg === "Success") {
                                result = "Message Sent Successfully To Email Administrator";
                                cls = "msg-success";
                            } else {
                                result = "Error sending email.";
                                cls = "msg-error";
                            }

                            $form.prepend(
                                $("<div />", {
                                    class: "flat-alert mb-20 " + cls,
                                    text: result,
                                }).append($('<a class="close mt-0" href="#"><i class="fa fa-close"></i></a>'))
                            );

                            $form.find(":input").not(".submit").val("");
                        },
                        complete: function(xhr, status, error_thrown) {
                            $form.find(".loading").remove();
                        },
                    });
                },
            });
        });
    };
    var ajaxSubscribe = {
        obj: {
            subscribeEmail: $("#subscribe-email"),
            subscribeButton: $("#subscribe-button"),
            subscribeMsg: $("#subscribe-msg"),
            subscribeContent: $("#subscribe-content"),
            dataMailchimp: $("#subscribe-form").attr("data-mailchimp"),
            success_message: '<div class="notification_ok">Thank you for joining our mailing list! Please check your email for a confirmation link.</div>',
            failure_message: '<div class="notification_error">Error! <strong>There was a problem processing your submission.</strong></div>',
            noticeError: '<div class="notification_error">{msg}</div>',
            noticeInfo: '<div class="notification_error">{msg}</div>',
            basicAction: "mail/subscribe.php",
            mailChimpAction: "mail/subscribe-mailchimp.php",
        },

        eventLoad: function() {
            var objUse = ajaxSubscribe.obj;

            $(objUse.subscribeButton).on("click", function() {
                if (window.ajaxCalling) return;
                var isMailchimp = objUse.dataMailchimp === "true";

                if (isMailchimp) {
                    ajaxSubscribe.ajaxCall(objUse.mailChimpAction);
                } else {
                    ajaxSubscribe.ajaxCall(objUse.basicAction);
                }
            });
        },

        ajaxCall: function(action) {
            window.ajaxCalling = true;
            var objUse = ajaxSubscribe.obj;
            var messageDiv = objUse.subscribeMsg.html("").hide();
            $.ajax({
                url: action,
                type: "POST",
                dataType: "json",
                data: {
                    subscribeEmail: objUse.subscribeEmail.val(),
                },
                success: function(responseData, textStatus, jqXHR) {
                    if (responseData.status) {
                        objUse.subscribeContent.fadeOut(500, function() {
                            messageDiv.html(objUse.success_message).fadeIn(500);
                        });
                    } else {
                        switch (responseData.msg) {
                            case "email-required":
                                messageDiv.html(
                                    objUse.noticeError.replace("{msg}", "Error! <strong>Email is required.</strong>")
                                );
                                break;
                            case "email-err":
                                messageDiv.html(
                                    objUse.noticeError.replace("{msg}", "Error! <strong>Email invalid.</strong>")
                                );
                                break;
                            case "duplicate":
                                messageDiv.html(
                                    objUse.noticeError.replace("{msg}", "Error! <strong>Email is duplicate.</strong>")
                                );
                                break;
                            case "filewrite":
                                messageDiv.html(
                                    objUse.noticeInfo.replace(
                                        "{msg}",
                                        "Error! <strong>Mail list file is open.</strong>"
                                    )
                                );
                                break;
                            case "undefined":
                                messageDiv.html(
                                    objUse.noticeInfo.replace("{msg}", "Error! <strong>undefined error.</strong>")
                                );
                                break;
                            case "api-error":
                                objUse.subscribeContent.fadeOut(500, function() {
                                    messageDiv.html(objUse.failure_message);
                                });
                        }
                        messageDiv.fadeIn(500);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert("Connection error");
                },
                complete: function(data) {
                    window.ajaxCalling = false;
                },
            });
        },
    };
    var footer = function() {
        var args = {
            duration: 250
        };
        $(".footer-title-mobile").on("click", function() {
            $(this).parent(".footer-col-block").toggleClass("open");
            if (!$(this).parent(".footer-col-block").is(".open")) {
                $(this).next().slideUp();
            } else {
                $(this).next().slideDown();
            }
        });
    };
    var popupProduct = function() {
        $(window).on("scroll", function() {
            const $element = $(".tf-sticky-btn");
            const footerOffset = $("#footer-main").offset().top;
            const scrollPosition = $(window).scrollTop() + $(window).height();

            if (scrollPosition >= footerOffset) {
                $element.addClass("remove");
            } else {
                $element.removeClass("remove");
            }
        });
    };
    var animateText = function() {
        if ($(".text-anime-style-1").length) {
            let animatedTextElements = document.querySelectorAll(".text-anime-style-1");

            animatedTextElements.forEach((element) => {
                if (element.animation) {
                    element.animation.progress(1).kill();
                    element.split.revert();
                }

                element.split = new SplitText(element, {
                    type: "words",
                });

                element.split.words.forEach((word, index) => {
                    gsap.set(word, {
                        opacity: 0,
                        scale: index % 2 === 0 ? 1.5 : 0.8,
                        transformOrigin: "center center",
                    });
                });

                element.animation = gsap.to(element.split.words, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 90%",
                        toggleActions: "play reverse play reverse",
                    },
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                });
            });
        }

        if ($(".text-anime-style-2").length) {
            let animatedTextElements = document.querySelectorAll(".text-anime-style-2");

            animatedTextElements.forEach((element) => {
                if (element.animation) {
                    element.animation.progress(1).kill();
                    element.split.revert();
                }

                element.split = new SplitText(element, {
                    type: "lines",
                    linesClass: "split-line",
                });

                gsap.set(element.split.lines, {
                    opacity: 1,
                    y: 0,
                    rotateY: -90,
                });

                element.animation = gsap.to(element.split.lines, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 90%",
                        toggleActions: "play reverse play reverse",
                    },
                    y: 0,
                    rotateY: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                    stagger: 0.1,
                });
            });
        }
    };
    var portfolioIsotope = function() {
        if ($().isotope) {
            // Isotope cho container .portfolio-wrap
            var $container1 = $(".portfolio-wrap").isotope({
                layoutMode: "masonry",
                itemSelector: ".item",
                percentPosition: true,
                stagger: 0,
                masonry: {
                    columnWidth: ".grid-sizer",
                },
            });

            // Isotope cho container .portfolio-wrap2 (chỉ với layoutMode: "masonry" và itemSelector)
            var $container2 = $(".portfolio-wrap2").isotope({
                layoutMode: "masonry", // Chỉ sử dụng masonry layout mode
                itemSelector: ".item", // Chọn item có class "item"
            });

            // Load more cho .portfolio-wrap
            $("#load-more").on("click", function() {
                var $hiddenItems = $(".item.hidden").slice(0, 3); // Lấy 3 item mỗi lần
                $hiddenItems.removeClass("hidden");

                $container1.append($hiddenItems);
                $container1.isotope("reloadItems").isotope("layout");

                if ($(".item.hidden").length === 0) {
                    $(this).hide();
                }
            });

            // Load more cho .portfolio-wrap2
            $("#load-more2").on("click", function() {
                var $hiddenItems = $(".item.hidden").slice(0, 3); // Lấy 3 item mỗi lần
                $hiddenItems.removeClass("hidden");

                $container2.append($hiddenItems);
                $container2.isotope("reloadItems").isotope("layout");

                if ($(".item.hidden").length === 0) {
                    $(this).hide();
                }
            });

            // Xử lý filter cho cả 2 container
            $(".portfolio-filter li").on("click", function() {
                var selector = $(this).find("a").attr("data-filter");
                $(".portfolio-filter li").removeClass("active");
                $(this).addClass("active");
                $container1.isotope({
                    filter: selector
                });
                $container2.isotope({
                    filter: selector
                });
                return false;
            });
        }
    };
    /* totalPriceVariant
  ------------------------------------------------------------------------------------- */
    var totalPriceVariant = function() {
        $(".tf-product-info-list,.tf-cart-item,.mini-cart-item").each(function() {
            var productItem = $(this);
            var basePrice =
                parseFloat(productItem.find(".price-on-sale").data("base-price")) ||
                parseFloat(productItem.find(".price-on-sale").text().replace("$", ""));
            var quantityInput = productItem.find(".quantity-product");

            function updateTotalPrice(price, scope) {
                var currentPrice = price || parseFloat(scope.find(".price-on-sale").text().replace("$", ""));
                var quantity = parseInt(scope.find(".quantity-product").val());
                var totalPrice = currentPrice * quantity;
                scope.find(".total-price").text("$" + totalPrice.toFixed(2).toLocaleString());
            }

            updateTotalPrice(null, productItem);

            productItem.find(".color-btn, .size-btn").on("click", function() {
                var newPrice = parseFloat($(this).data("price")) || basePrice;
                quantityInput.val(1);
                productItem.find(".price-on-sale").text("$" + newPrice.toFixed(2).toLocaleString());
                updateTotalPrice(newPrice, productItem);
                updateCartTotal();
            });

            productItem.find(".btn-increase").on("click", function() {
                var currentQuantity = parseInt(quantityInput.val());
                quantityInput.val(currentQuantity + 1);
                updateTotalPrice(null, productItem);
                updateCartTotal();
            });

            productItem.find(".btn-decrease").on("click", function() {
                var currentQuantity = parseInt(quantityInput.val());
                if (currentQuantity > 1) {
                    quantityInput.val(currentQuantity - 1);
                    updateTotalPrice(null, productItem);
                    updateCartTotal();
                }
            });
        });

        function updateCartTotal() {
            let total = 0;
            $(".total-price").each(function() {
                let price = parseFloat($(this).text().replace("$", "").replace(/,/g, ""));
                if (!isNaN(price)) {
                    total += price;
                }
            });
            $(".last-total-price").text(`Total: $${total.toFixed(2).toLocaleString()}`);
        }

        updateCartTotal();

        $(".remove-cart").on("click", function() {
            $(this).closest(".tf-cart-item").remove();
            updateCartTotal();
        });
    };
    var deleteFile = function(e) {
        $(".remove").on("click", function(e) {
            e.preventDefault();
            var $this = $(this);
            $this.closest(".file-delete").remove();
        });
        $(".clear-file-delete").on("click", function(e) {
            e.preventDefault();
            $(this).closest(".list-file-delete").find(".file-delete").remove();
        });
    };
    /* sidebar mobile
  -------------------------------------------------------------------------*/
    var sidebarMobile = function() {
        if ($(".wrap-sidebar-mobile,.wrap-sidebar-account").length > 0) {
            var sidebar = $(".wrap-sidebar-mobile,.wrap-sidebar-account").html();
            $(".sidebar-mobile-append").append(sidebar);
            // $(".wrap-sidebar-mobile").remove();
        }
    };
    var clickControl = function() {
        $(".btn-address").click(function() {
            $(".show-form-address").toggle();
        });
        $(".btn-hide-address").click(function() {
            $(".show-form-address").hide();
        });

        $(".btn-edit-address").click(function() {
            $(this).closest(".account-address-item").find(".edit-form-address").toggle();
        });
        $(".btn-hide-edit-address").click(function() {
            $(this).closest(".account-address-item").find(".edit-form-address").hide();
        });
    };
    var preloader = function() {
        $("#loading").fadeOut("slow", function() {
            $(this).remove();
        });
    };
    
    // Add smooth scrolling function for hash links
    var smoothScroll = function() {
        // Handle clicks on links with hash
        $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').on('click', function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && 
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually going to happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - 100 // Offset by 100px to account for header
                    }, 800);
                }
            }
        });

        // Handle page load with hash in URL
        if (window.location.hash) {
            var hash = window.location.hash;
            if ($(hash).length) {
                // Wait for page to fully load
                setTimeout(function() {
                    $('html, body').animate({
                        scrollTop: $(hash).offset().top - 100 // Offset by 100px to account for header
                    }, 800);
                }, 500);
            }
        }
    };
    
    // Dom Ready
    $(function() {
        videoWrap();
        openNavMobile();
        openWelcome();
        btnQuantity();
        tabs();
        changeValue();
        dayTimeInput();
        btnLoadMore();
        colorList();
        rangeslider();
        visibleHeader();
        scollElement();
        goTop();
        animateImgItem();
        animateBoxVideo();
        numberNotNegative();
        ajaxContactForm();
        ajaxSubscribe.eventLoad();
        footer();
        popupProduct();
        animateText();
        portfolioIsotope();
        totalPriceVariant();
        deleteFile();
        sidebarMobile();
        clickControl();
        preloader();
        smoothScroll(); // Add smooth scrolling
    });
})(jQuery);