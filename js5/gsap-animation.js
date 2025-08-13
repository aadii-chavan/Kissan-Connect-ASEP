// gsap.registerPlugin(ScrollTrigger, SplitText);
// gsap.config({
//     nullTargetWarn: false,
//     trialWarn: false,
// });

function tg_title_animation() {
    var tg_var = jQuery(".tg-heading-subheading");
    if (!tg_var.length) {
        return;
    }
    const quotes = document.querySelectorAll(
        ".tg-heading-subheading .tg-element-title"
    );

    quotes.forEach((quote) => {
        //Reset if needed
        if (quote.animation) {
            quote.animation.progress(1).kill();
            quote.split.revert();
        }

        var getclass = quote.closest(".tg-heading-subheading").className;
        var animation = getclass.split("animation-");
        if (animation[1] == "style4") return;

        quote.split = new SplitText(quote, {
            type: "lines,words,chars",
            linesClass: "split-line",
        });
        gsap.set(quote, {
            perspective: 400
        });

        if (animation[1] == "style1") {
            gsap.set(quote.split.chars, {
                opacity: 0,
                y: "90%",
                rotateX: "-40deg",
            });
        }
        if (animation[1] == "style2") {
            gsap.set(quote.split.chars, {
                opacity: 0,
                x: "50",
            });
        }
        if (animation[1] == "style3") {
            gsap.set(quote.split.chars, {
                opacity: 0,
            });
        }
        quote.animation = gsap.to(quote.split.chars, {
            scrollTrigger: {
                trigger: quote,
                start: "top 90%",
            },
            x: "0",
            y: "0",
            rotateX: "0",
            opacity: 1,
            duration: 2,
            ease: Back.easeOut,
            stagger: 0.02,
        });
    });
}
// ScrollTrigger.addEventListener("refresh", tg_title_animation);