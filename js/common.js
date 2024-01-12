jQuery(function($) {

    /*--------------------------------------------------
    Function Scroll Effects
    ---------------------------------------------------*/


    window.ScrollEffects = function() {

        gsap.defaults({
            overwrite: "auto"
        });
        gsap.registerPlugin(ScrollMagic, ScrollTrigger, ScrollToPlugin, Draggable);
        gsap.config({
            nullTargetWarn: false
        });

        setTimeout(function() {
            var threeapp = document.getElementById("app");
            threeapp.className += "active";
            $("body").append(threeapp)
        }, 1500);

        if ($('#showcase-slider').length > 0) {
            setTimeout(function() {
                var threeSlider = document.getElementById("canvas-slider");
                threeSlider.className += " active";
                $("body").append(threeSlider)
            }, 1500);
        }
        if (!$("body").hasClass("project-nav-text")) {
            if ($('#project-nav').length > 0) {
                $('#main-content').addClass('solid-color');
                $('#main-page-content').addClass('project-page');
            }
        }

        if ($('.portfolio').length > 0) {
            $('#main-content').addClass('portfolio-page');
        }

        if (isMobile()) {

            var heroTranslate = $('.hero-translate').height();
            var winHeight = $(window).height();
            var footer_height = $('footer').height();
            $('.smooth-scroll main, .infinity-lists-holder, .infinity-lists-wrapper, nav, #canvas-slider, #showcase-slider-holder, #showcase-carousel-holder, #hero-image-wrapper, .thumb-container, .thumb-page, .next-project-image-wrapper, .snap-slide, .panels-container').css({
                'height': winHeight
            });
            $('#main-page-content.project-page').css({
                'margin-bottom': heroTranslate - footer_height
            });
            if (!$("body").hasClass("project-nav-text")) {
                $('#project-nav').css({
                    'height': winHeight,
                    'bottom': -heroTranslate
                });
            }
            if ($("body").hasClass("hero-below-caption")) {
                $('#hero.has-image').css({
                    'padding-bottom': winHeight
                });
            }
            $(".icon-wrap").removeClass("parallax-wrap");


            var resizeTime;
            $(window).resize(function() {
                clearTimeout(resizeTime);
                resizeTime = setTimeout(doneResizing, 100);
            });

            function doneResizing() {
                var heroTranslate = $('.hero-translate').height();
                var winHeight = $(window).height();
                var footer_height = $('footer').height();
                $('.smooth-scroll main, .infinity-lists-holder, .infinity-lists-wrapper, nav, #canvas-slider, #showcase-slider-holder, #showcase-carousel-holder, #hero-image-wrapper, .thumb-container, .thumb-page, .next-project-image-wrapper, .snap-slide, .panels-container').css({
                    'height': winHeight
                });
                $('#main-page-content.project-page').css({
                    'margin-bottom': heroTranslate - footer_height
                });
                if (!$("body").hasClass("project-nav-text")) {
                    $('#project-nav').css({
                        'height': winHeight,
                        'bottom': -heroTranslate
                    });
                }
                if ($("body").hasClass("hero-below-caption")) {
                    $('#hero.has-image').css({
                        'padding-bottom': winHeight
                    });
                }
                $(".icon-wrap").removeClass("parallax-wrap");
            }
        }




        if ($("body").hasClass("smooth-scroll")) {
            const ScrollArea = document.querySelector('#content-scroll');
            var scrollbar = window.Scrollbar;
            var __extends = (this && this.__extends) || (function() {
                var extendStatics = Object.setPrototypeOf ||
                    ({
                            __proto__: []
                        }
                        instanceof Array && function(d, b) {
                            d.__proto__ = b;
                        }) ||
                    function(d, b) {
                        for (var p in b)
                            if (b.hasOwnProperty(p)) d[p] = b[p];
                    };
                return function(d, b) {
                    extendStatics(d, b);

                    function __() {
                        this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            })();
            var EdgeEasingPlugin = /** @class */ (function(_super) {
                __extends(EdgeEasingPlugin, _super);

                function EdgeEasingPlugin() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._remainMomentum = {
                        x: 0,
                        y: 0
                    };
                    _this._defaultOptions = {
                        speed: 1
                    };
                    return _this;
                }
                EdgeEasingPlugin.prototype.transformDelta = function(delta) {
                    const {
                        speed
                    } = this.options;
                    var _a = this.scrollbar,
                        limit = _a.limit,
                        offset = _a.offset;
                    var x = this._remainMomentum.x + delta.x * speed;
                    var y = this._remainMomentum.y + delta.y * speed;
                    // clamps momentum within [-offset, limit - offset]
                    this.scrollbar.setMomentum(Math.max(-offset.x, Math.min(x, limit.x - offset.x)), Math.max(-offset.y, Math.min(y, limit.y - offset.y)));
                    return {
                        x: 0,
                        y: 0
                    };
                };
                EdgeEasingPlugin.prototype.onRender = function(remainMomentum) {
                    Object.assign(this._remainMomentum, remainMomentum);
                };
                EdgeEasingPlugin.pluginName = 'edgeEasing';
                return EdgeEasingPlugin;

            }(Scrollbar.ScrollbarPlugin));
            Scrollbar.use(EdgeEasingPlugin);

            var ScaleSpeedPlugin = /** @class */ (function(_super) {
                __extends(ScaleSpeedPlugin, _super);

                function ScaleSpeedPlugin() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._defaultOptions = {
                        speed: 1
                    };
                    return _this;
                }
                ScaleSpeedPlugin.prototype.transformDelta = function(delta) {

                    const {
                        speed
                    } = this.options;

                    return {

                        x: delta.x * speed,
                        y: delta.y * speed,
                    };
                }
                ScaleSpeedPlugin.pluginName = 'scaleSpeed';
                return ScaleSpeedPlugin;

            }(Scrollbar.ScrollbarPlugin));


            // Config
            if (isMobile()) {

                var ScrollbarOptions = {
                    damping: 0.05,
                    renderByPixel: true,
                    continuousScrolling: true,
                    syncCallbacks: true,
                    plugins: {
                        edgeEasing: {
                            speed: 2,
                        },
                    },
                };

            }

            if (!isMobile()) {

                var ScrollbarOptions = {
                    damping: 0.1,
                    renderByPixel: true,
                    continuousScrolling: true,
                    syncCallbacks: true,
                    plugins: {
                        edgeEasing: {
                            speed: 1,
                        },
                    },
                };


            }

            // Initialise
            var scrollbar = Scrollbar.init(ScrollArea, ScrollbarOptions);


            ScrollTrigger.scrollerProxy("#content-scroll", {
                scrollTop(value) {
                    if (arguments.length) {
                        scrollbar.scrollTop = value;
                    }
                    return scrollbar.scrollTop;
                }
            });
            scrollbar.addListener(ScrollTrigger.update);
            ScrollTrigger.defaults({
                scroller: ScrollArea,
                ScrollbarOptions
            });

        } // End Smooth Scroll



        $('body').waitForImages({
            finished: function() {


                // Horizontal Gallery
                const panelsSections = gsap.utils.toArray(".panels");
                for (var i = 0; i < panelsSections.length; i++) {

                    thePanelsSection = panelsSections[i];
                    const panels = gsap.utils.toArray(".panels-container .panel", thePanelsSection);
                    const panelsContainer = thePanelsSection.querySelector(".panels-container");

                    gsap.set(panelsContainer, {
                        height: window.innerHeight
                    });
                    gsap.set(panels, {
                        height: window.innerHeight
                    });

                    var totalPanelsWidth = 0;
                    panels.forEach(function(panel) {
                        totalPanelsWidth += $(panel).width();
                    });

                    gsap.set(panelsContainer, {
                        width: totalPanelsWidth
                    });
                    gsap.to(panels, {
                        x: -totalPanelsWidth + innerWidth,
                        ease: "none",
                        scrollTrigger: {
                            trigger: panelsContainer,
                            pin: true,
                            start: "top top",
                            scrub: 1,
                            end: (st) => "+=" + (st.vars.trigger.offsetWidth - innerWidth),
                        }
                    });

                }


                // Vertical Parallax Columns
                if ($(window).width() > 767) {
                    gsap.utils.toArray('.vertical-parallax').forEach((parallaxElement) => {
                        const startMovement = -(parallaxElement.offsetHeight * parallaxElement.dataset.startparallax);
                        const endMovement = -(parallaxElement.offsetHeight * parallaxElement.dataset.endparallax);
                        gsap.fromTo(
                            parallaxElement, {
                                y: -startMovement
                            }, {
                                y: endMovement,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: parallaxElement,
                                    scrub: 0.5,
                                }
                            }
                        );
                    });
                }


                // Pinned Sections
                if ($(window).width() > 479) {
                    window.PinnedSectionArr = new Array();
                    $('.pinned-element').each(function() {
                        var $this = $(this);
                        const PinnedSection = ScrollTrigger.create({
                            trigger: $this,
                            start: "top top-=-120px",
                            end: (st) => "+=" + (st.vars.trigger.siblings('.scrolling-element').outerHeight(true) - st.vars.trigger.outerHeight(true)),
                            pin: $this,
                        });

                        window.PinnedSectionArr.push(PinnedSection);

                        setTimeout(function() {
                            PinnedSection.refresh()
                        }, 200);
                    });
                }


                // Moving Gallery		
                gsap.utils.toArray('.moving-gallery').forEach((section, index) => {
                    const w = section.querySelector('.wrapper-gallery');
                    const [x, xEnd] = (index % 2) ? [(section.offsetWidth - w.scrollWidth), 0] : [0, section.offsetWidth - w.scrollWidth];
                    gsap.fromTo(w, {
                        x
                    }, {
                        x: xEnd,
                        scrollTrigger: {
                            trigger: section,
                            scrub: 0.5,
                        }
                    });
                });


                //Roling Text	
                let direction = 1;
                const roll1 = roll(".marquee-text.fw", {
                    duration: 20
                });
                const roll2 = roll(".marquee-text.bw", {
                    duration: 20
                }, true);
                const roll3 = roll(".marquee-title .hero-title", {
                    duration: 10
                });
                const roll4 = roll(".marquee-title .next-hero-title", {
                    duration: 10
                });

                scroll = ScrollTrigger.create({
                    onUpdate(self) {
                        if (self.direction !== direction) {
                            direction *= -1;
                            gsap.to([roll1, roll2, roll3, roll4], {
                                timeScale: direction,
                                overwrite: true
                            });
                        }
                    }
                });

                function roll(targets, vars, reverse) {
                    const tl = gsap.timeline({
                        repeat: -1,
                        onReverseComplete() {
                            let totalTime = this.rawTime() + this.duration() * 10;
                            if (totalTime != 0) {
                                this.totalTime(totalTime);
                            }
                        }
                    });
                    vars = vars || {};
                    vars.ease || (vars.ease = "none");
                    gsap.utils.toArray(targets).forEach(el => {
                        let clone = el.cloneNode(true);
                        el.parentNode.appendChild(clone);
                        gsap.set(clone, {
                            position: "absolute",
                            top: el.offsetTop,
                            left: el.offsetLeft + (reverse ? -el.offsetWidth : el.offsetWidth)
                        });
                        gsap.to(clone.querySelectorAll("span"), {
                            duration: 0.7,
                            y: 0,
                            opacity: 1,
                            delay: 0.5,
                            ease: Power2.easeOut
                        });
                        tl.to([el, clone], {
                            xPercent: reverse ? 100 : -100,
                            ...vars
                        }, 0);
                    });
                    return tl;
                }

            },
            waitForAll: true
        });


        if (!isMobile()) {
            $("article .post-title").mouseenter(function(e) {
                var $this = $(this);
                gsap.to('#ball', {
                    duration: 0.3,
                    borderWidth: '2px',
                    scale: 1.2,
                    borderColor: $this.data('color'),
                    backgroundColor: $this.data('color')
                });
                gsap.to('#ball-loader', {
                    duration: 0.2,
                    borderWidth: '2px',
                    top: 2,
                    left: 2
                });
                $("#ball").addClass("with-icon").append('<i class="arrow-icon"></i>');
            });

            $("article .post-title").mouseleave(function(e) {
                var $this = $(this);
                gsap.to('#ball', {
                    duration: 0.2,
                    borderWidth: '4px',
                    scale: 0.5,
                    borderColor: '#999999',
                    backgroundColor: 'transparent'
                });
                gsap.to('#ball-loader', {
                    duration: 0.2,
                    borderWidth: '4px',
                    top: 0,
                    left: 0
                });
                $("#ball").removeClass("with-icon");
                $('#ball i').remove();
            });
        }


        // Hero AutoScroll On Page Load
        if ($('#hero.has-image').hasClass('autoscroll')) {
            if ($("body").hasClass("smooth-scroll")) {
                gsap.to(scrollbar, {
                    duration: 2,
                    scrollTo: 120,
                    delay: 0,
                    ease: Power4.easeInOut
                });
            } else {
                gsap.to(window, {
                    duration: 2,
                    scrollTo: 120,
                    delay: 0,
                    ease: Power4.easeInOut
                });
            }
        }


        // Slider Center on click
        $('.autocenter').on('click', function() {
            var $window = $(window),
                $element = $(this),
                elementTop = $element.offset().top,
                elementHeight = $element.height(),
                viewportHeight = $window.height(),
                scrollIt = elementTop - ((viewportHeight - elementHeight) / 2);
            if ($("body").hasClass("smooth-scroll")) {
                var scrollOffset = scrollbar.offset.y + (elementTop - scrollbar.getSize().container.height / 2);
                gsap.to(scrollbar, {
                    duration: 0.8,
                    scrollTo: scrollOffset + elementHeight / 2,
                    ease: Power4.easeInOut
                });
            } else {
                $("html, body").animate({
                    scrollTop: scrollIt
                }, 350);
            }
        });


        // Back To Top
        $('#backtotop').on('click', function() {
            if ($("body").hasClass("smooth-scroll")) {
                gsap.to(scrollbar, {
                    duration: 1.5,
                    scrollTop: 0,
                    delay: 0.1,
                    ease: Power4.easeInOut
                });
                gsap.to('#ball', {
                    duration: 0.3,
                    borderWidth: '4px',
                    scale: 0.5,
                    borderColor: '#999999',
                    delay: 0.15
                });
            } else {
                $("html,body").animate({
                    scrollTop: 0
                }, 800);
                gsap.to('#ball', {
                    duration: 0.3,
                    borderWidth: '4px',
                    scale: 0.5,
                    borderColor: '#999999',
                    delay: 0.15
                });
            }
        });

        //Scroll Down
        $('.scroll-down').on('click', function() {
            var heroheight = $("#hero").height();
            if ($("body").hasClass("smooth-scroll")) {
                gsap.to(scrollbar, {
                    duration: 1.5,
                    scrollTop: heroheight,
                    ease: Power4.easeInOut
                });
                gsap.to('#ball', {
                    duration: 0.3,
                    borderWidth: '4px',
                    scale: 0.5,
                    borderColor: '#999999',
                    delay: 0.15
                });
            } else {
                $("html,body").animate({
                    scrollTop: heroheight
                }, 800);
                gsap.to('#ball', {
                    duration: 0.3,
                    borderWidth: '4px',
                    scale: 0.5,
                    borderColor: '#999999',
                    delay: 0.15
                });
            }
        });



        var controller = new ScrollMagic.Controller();

        //Hero Parallax

        if ($('body').hasClass('hero-below-caption')) {
            var heroImageParallax = gsap.to('.parallax-scroll-image #hero-bg-image', {
                duration: 1,
                top: "20%",
                opacity: 1,
                ease: Linear.easeNone
            });
            var heroCaptionParallax = gsap.to('#hero-caption.parallax-scroll-caption', {
                duration: 1,
                yPercent: 0,
                opacity: 0,
                ease: Linear.easeNone
            });
            var heroFooterParallax = gsap.to('#hero-footer', {
                duration: 1,
                yPercent: 0,
                opacity: 0,
                ease: Linear.easeNone
            });
        } else {
            var heroImageParallax = gsap.to('.parallax-scroll-image #hero-bg-image', {
                duration: 1,
                top: "20%",
                ease: Linear.easeNone
            });
            var heroCaptionParallax = gsap.to('#hero-caption.parallax-scroll-caption', {
                duration: 1,
                yPercent: 0,
                opacity: 0.3,
                ease: Linear.easeNone
            });
            var heroFooterParallax = gsap.to('#hero-footer', {
                duration: 1,
                yPercent: 0,
                opacity: 0.3,
                ease: Linear.easeNone
            });
        }

        var HeroCaptionHeight = $('#hero').outerHeight();

        var heroImageScene = new ScrollMagic.Scene({
                triggerElement: '#hero-image-wrapper',
                triggerHook: 0,
                duration: '100%'
            })
            .setTween(heroImageParallax)
            .addTo(controller);

        var heroCaptionScene = new ScrollMagic.Scene({
                triggerElement: '#hero',
                triggerHook: 0,
                duration: '100%'
            })
            .setTween(heroCaptionParallax)
            .addTo(controller);

        if ($('body').hasClass('hero-below-caption')) {
            var heroFooterScene = new ScrollMagic.Scene({
                    triggerElement: '#hero',
                    triggerHook: 0,
                    duration: '100%'
                })
                .setTween(heroFooterParallax)
                .addTo(controller);
        } else {
            var heroFooterScene = new ScrollMagic.Scene({
                    triggerElement: '#hero',
                    triggerHook: 0,
                    duration: '100%'
                })
                .setTween(heroFooterParallax)
                .addTo(controller);

        }

        if ($("body").hasClass("smooth-scroll")) {
            scrollbar.addListener(() => {
                heroImageScene.refresh()
                heroCaptionScene.refresh()
                heroFooterScene.refresh()
            });
        }


        // 	Page and Project Navigation
        if ($('body').hasClass('hero-below-caption')) {
            if (!$("body").hasClass("project-nav-text")) {
                var heroTranslate = $('.hero-translate').height();
                var nextProjectImageParallax = gsap.to('.next-project-image', {
                    duration: 1,
                    scale: 1,
                    opacity: 1,
                    ease: Linear.easeNone
                });
            }
        } else {
            var nextProjectImageParallax = gsap.to('#page-content .next-project-image', {
                duration: 1,
                yPercent: 0,
                opacity: 1,
                ease: Linear.easeNone
            });
        }
        var nextProjectCaptionParallax = gsap.to('.next-project-wrap', {
            duration: 0.5,
            top: "0",
            scale: 1,
            opacity: 1,
            ease: Linear.easeNone
        });
        var nextProjectProgress = gsap.to('.next-hero-progress span', {
            duration: 1,
            width: "100%",
            ease: Linear.easeNone
        });
        var nextPageCaptionParallax = gsap.to('.page-nav-caption', {
            duration: 0.5,
            top: "0",
            scale: 1,
            opacity: 1,
            ease: Linear.easeNone
        });


        var nextProjectImageScene = new ScrollMagic.Scene({
                triggerElement: '#project-nav',
                triggerHook: 1,
                duration: '100%'
            })
            .setTween(nextProjectImageParallax)
            .addTo(controller);
        if ($("body").hasClass("hero-below-caption")) {
            var ProjectNavHeight = $('#project-nav').outerHeight();
            var nextProjectCaptionScene = new ScrollMagic.Scene({
                    triggerElement: '#project-nav',
                    triggerHook: 1,
                    duration: ProjectNavHeight
                })
                .setTween(nextProjectCaptionParallax)
                .addTo(controller);
        } else {
            var nextProjectCaptionScene = new ScrollMagic.Scene({
                    triggerElement: '#project-nav',
                    triggerHook: 1,
                    duration: '100%'
                })
                .setTween(nextProjectCaptionParallax)
                .addTo(controller);
        }

        var nextProjectProgressScene = new ScrollMagic.Scene({
                triggerElement: '#project-nav',
                triggerHook: 1,
                duration: "100%"
            })
            .setTween(nextProjectProgress)
            .addTo(controller);

        var PageNavHeight = $('#page-nav').outerHeight() + $('footer').outerHeight();
        var nextPageCaptionScene = new ScrollMagic.Scene({
                triggerElement: '#page-nav',
                triggerHook: 1,
                duration: PageNavHeight
            })
            .setTween(nextPageCaptionParallax)
            .addTo(controller);


        if ($("body").hasClass("smooth-scroll")) {
            scrollbar.addListener(() => {
                nextProjectImageScene.refresh()
                nextProjectCaptionScene.refresh()
                nextProjectProgressScene.refresh()
                nextPageCaptionScene.refresh()
            });
        }

        // 	Content Parallax Image 
        $(".has-parallax").each(function() {
            var $this = $(this);
            var $thisHeight = $(this).outerHeight() + window.innerHeight;
            var bg = $this.find("img")[0];

            // Add tween for backgroundParallax
            var parallax = gsap.fromTo(bg, {
                y: '-20%'
            }, {
                duration: 1,
                y: '20%',
                ease: Linear.easeNone
            });

            // Create scrollmagic scene
            var parallaxScene = new ScrollMagic.Scene({
                    triggerElement: this, // <-- Use this to select current element
                    triggerHook: 1,
                    duration: $thisHeight
                })
                .setTween(parallax)
                .addTo(controller);

            if ($("body").hasClass("smooth-scroll")) {
                scrollbar.addListener(() => {
                    parallaxScene.refresh()
                });
            }

        });

        // Elements Animation
        $('.has-animation').each(function() {
            var $this = $(this);
            var $thisHeight = $(this).height();

            var scene = new ScrollMagic.Scene({
                    triggerElement: $this[0],
                    duration: $thisHeight
                })
                .addTo(controller);

            scene.triggerHook(1)

            scene.on('enter', function() {
                $this.delay($this.attr('data-delay')).queue(function(next) {
                    gsap.to($this, {
                        duration: 0.6,
                        force3D: true,
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        delay: 0,
                        ease: Power2.easeOut
                    });
                    next();
                    $this.addClass('animated')
                });
            });

            if ($("body").hasClass("smooth-scroll")) {
                scrollbar.addListener(() => {
                    scene.refresh()
                });
            }
        })

        $(".has-cover").css('background-color', function() {
            return $(this).parents(".content-row").data('bgcolor')
        });

        $('.has-mask').each(function() {
            var words = $(this).text().split(" ");
            var total = words.length;
            $(this).empty();
            for (index = 0; index < total; index++) {
                $(this).append($("<span /> ").text(words[index]));
            }
        });

        $('.has-mask span').each(function() {
            var words = $(this).text().split(" ");
            var total = words.length;
            $(this).empty();
            for (index = 0; index < total; index++) {
                $(this).append($("<span /> ").text(words[index]));
            }
        });

        $('.has-mask').each(function() {
            var $this = $(this);
            var $thisHeight = $(this).height();

            var scene = new ScrollMagic.Scene({
                    triggerElement: $this[0],
                    duration: $thisHeight
                })
                .addTo(controller);

            scene.triggerHook(1)

            scene.on('enter', function() {
                $this.delay($this.attr('data-delay')).queue(function(next) {
                    var tl = gsap.timeline();

                    $this.find('span > span').each(function(index, element) {
                        tl.to(element, 0.6, {
                            y: 0,
                            opacity: 1,
                            delay: 0.1,
                            ease: Power2.easeOut
                        }, index * 0)
                    });
                    next();
                });
            });

            if ($("body").hasClass("smooth-scroll")) {
                scrollbar.addListener(() => {
                    scene.refresh()
                });
            }
        });

        $('.has-mask-fill').each(function() {
            var words = $(this).text();
            var total = words;
            $(this).empty();
            $(this).append($("<span /> ").text(words));
        });



        $('.has-mask-fill.block-title').each(function() {
            var words = $(this).text().split(" ");
            var total = words.length;
            $(this).empty();
            for (index = 0; index < total; index++) {
                $(this).append($("<span /> ").text(words[index]));
            }

        });

        $('.has-mask-fill span').each(function() {
            var $this = $(this);
            var $thisHeight = $(this).height() * 2;

            var maskFillText = gsap.to($this, {
                duration: 1,
                backgroundSize: "200% 100%",
                ease: Linear.easeNone
            });

            var maskFillTextScene = new ScrollMagic.Scene({
                    triggerElement: $this[0],
                    triggerHook: 0.8,
                    duration: $thisHeight
                })
                .setTween(maskFillText)
                .addTo(controller);

            if ($("body").hasClass("smooth-scroll")) {
                scrollbar.addListener(() => {
                    maskFillTextScene.refresh()
                });
            }
        });


        //Content Row Options
        if ($(".content-row").hasClass("light-section")) {
            $(".light-section").each(function(i) {
                $(this).wrap("<div class='light-section-wrapper'><div class='light-section-container content-max-width'></div></div>");
                $("body").find(".light-section-wrapper").each(function(i) {
                    $(this).css('background-color', function() {
                        return $(this).children().children().data('bgcolor')
                    });
                });
            });
        }

        if ($(".content-row").hasClass("dark-section")) {
            $(".dark-section").each(function(i) {
                $(this).wrap("<div class='dark-section-wrapper'><div class='dark-section-container content-max-width'></div></div>");
                $("body").find(".dark-section-wrapper").each(function(i) {
                    $(this).css('background-color', function() {
                        return $(this).children().children().data('bgcolor')
                    });
                });
            });
        }


        if ($('.change-header-color').length > 0) {
            $('body').waitForImages({
                finished: function() {
                    setTimeout(function() {
                        $('.change-header-color').each(function() {
                            const pageHeader = $('header');
                            var $this = $(this);
                            var $thisHeight = $(this).outerHeight(true);

                            var whiteScene = new ScrollMagic.Scene({
                                    triggerElement: this,
                                    duration: $thisHeight
                                })
                                .addTo(controller)
                            whiteScene.triggerHook(0.08)
                            whiteScene.on('enter', function() {
                                setTimeout(function() {
                                    pageHeader.addClass('white-header');
                                }, 10);
                            });
                            whiteScene.on('leave', function() {
                                pageHeader.removeClass('white-header');
                            });
                            if ($("body").hasClass("smooth-scroll")) {
                                scrollbar.addListener(() => {
                                    whiteScene.refresh()
                                });
                            }
                        });
                    }, 100);

                },
                waitForAll: true
            });
        }

        if (!$("body").hasClass("hero-below-caption")) {

            if (!$('#page-content').hasClass("dark-content")) {
                $('#project-nav.change-header').each(function() {
                    const contentu = $('#page-content');

                    var $this = $(this);
                    var $thisHeight = $(this).outerHeight(true);

                    var whiteScene = new ScrollMagic.Scene({
                            triggerElement: this,
                            duration: $thisHeight
                        })
                        .addTo(controller)


                    whiteScene.triggerHook(0.1)

                    whiteScene.on('enter', function() {
                        contentu.removeClass('light-content');
                    });

                    whiteScene.on('leave', function() {
                        contentu.addClass('light-content');
                    });


                    if ($("body").hasClass("smooth-scroll")) {
                        scrollbar.addListener(() => {
                            whiteScene.refresh()
                        });
                    }
                })
            }

            if (!$('#page-content').hasClass("light-content")) {
                if (!$('#project-nav').hasClass("change-header")) {
                    $('#project-nav').each(function() {
                        const contentu = $('#page-content');
                        var $this = $(this);
                        var $thisHeight = $(this).outerHeight(true);

                        var whiteScene = new ScrollMagic.Scene({
                                triggerElement: this,
                                duration: $thisHeight
                            })
                            .addTo(controller)

                        whiteScene.triggerHook(0.08)

                        whiteScene.on('enter', function() {
                            contentu.addClass('light-content');
                        });

                        whiteScene.on('leave', function() {
                            contentu.removeClass('light-content');
                        });

                        if ($("body").hasClass("smooth-scroll")) {
                            scrollbar.addListener(() => {
                                whiteScene.refresh()
                            });
                        }
                    })
                }
            }

        }


        //Project Nav Appear
        $('#project-nav').each(function() {
            var $this = $(this);
            var $thisHeight = $(this).height() + 200;
            var $projectNav = $('.next-project-image-wrapper');

            var scene = new ScrollMagic.Scene({
                    triggerElement: $this[0],
                    duration: $thisHeight
                })
                .addTo(controller);

            scene.triggerHook(1)

            scene.on('enter', function() {
                $projectNav.addClass('active');
            });
            scene.on('leave', function() {
                $projectNav.removeClass('active');
            });

            if ($("body").hasClass("smooth-scroll")) {
                scrollbar.addListener(() => {
                    scene.refresh()
                });
            }
        });


        var $elheight = window.innerHeight;

        //Portfolio Items Appear
        $('.portfolio .item').each(function() {
            var $this = $(this);
            var $thisHeight = $(this).height();

            var scene = new ScrollMagic.Scene({
                    triggerElement: $this[0],
                    duration: $thisHeight
                })
                .addTo(controller);

            scene.triggerHook(0.9)

            scene.on('enter', function() {
                $this.addClass('active');
            });

            if ($("body").hasClass("smooth-scroll")) {
                scrollbar.addListener(() => {
                    scene.refresh()
                });
            }
        })

        $(".item").each(function() {
            var $this = $(this);
            var $thisheight = $(this).height() + $elheight;
            var bg = $this.find(".item-parallax.enabled .item-wrap-image");

            var parallax = gsap.fromTo(bg, {
                y: '-15%'
            }, {
                duration: 0.3,
                y: '15%',
                ease: Linear.easeNone
            });

            var parallaxScene = new ScrollMagic.Scene({
                    triggerElement: this, // <-- Use this to select current element
                    triggerHook: 1,
                    duration: $thisheight
                })
                .setTween(parallax)
                .addTo(controller);

            if ($("body").hasClass("smooth-scroll")) {
                scrollbar.addListener(() => {
                    parallaxScene.refresh()
                });
            }

        });


        $('.content-carousel').each(function() {
            var $this = $(this);
            var $thisHeight = $(this).outerHeight(true);
            var tlCarousel = gsap.timeline();
            tlCarousel.set($(".content-carousel .swiper-slide"), {
                x: 800,
                opacity: 0
            });

            var scene = new ScrollMagic.Scene({
                    triggerElement: this,
                    duration: $thisHeight
                })
                .addTo(controller);

            scene.triggerHook(1)

            scene.on('enter', function() {
                $this.find(".swiper-slide").each(function(index, element) {
                    tlCarousel.to(element, 1.4, {
                        x: 0,
                        opacity: 1,
                        delay: 0.1,
                        ease: Power3.easeOut
                    }, index * 0.1)
                });
                gsap.to($this.find('.swiper-pagination'), {
                    duration: 0.3,
                    delay: 0.5,
                    opacity: 1
                });
            });

            if ($("body").hasClass("smooth-scroll")) {
                scrollbar.addListener(() => {
                    scene.refresh()
                });
            }
        });


        $(".title-moving-forward").each(function() {
            var $this = $(this);
            var $thisheight = $(this).height() + window.innerHeight;
            var $thiswidth = $(this).outerWidth(true) - window.innerWidth;
            // Add tweenmax for backgroundParallax
            var parallax = gsap.to($this, 1, {
                x: -$thiswidth,
                ease: Linear.easeNone
            });

            // Create scrollmagic scene
            var parallaxScene = new ScrollMagic.Scene({
                    triggerElement: this, // <-- Use this to select current element
                    triggerHook: 1,
                    duration: $thisheight,
                })
                .setTween(parallax)
                .addTo(controller);

            if ($("body").hasClass("smooth-scroll")) {
                scrollbar.addListener(() => {
                    parallaxScene.refresh()
                });
            }

        });


        $(".title-moving-backward").each(function() {
            var $this = $(this);
            var $thisheight = $(this).height() + window.innerHeight;
            var $thiswidth = $(this).outerWidth(true) - window.innerWidth;
            // Add tweenmax for backgroundParallax
            gsap.set($this, {
                x: -$thiswidth
            });
            var parallax = gsap.to($this, 1, {
                x: 0,
                ease: Linear.easeNone
            });

            // Create scrollmagic scene
            var parallaxScene = new ScrollMagic.Scene({
                    triggerElement: this, // <-- Use this to select current element
                    triggerHook: 1,
                    duration: $thisheight,
                })
                .setTween(parallax)
                .addTo(controller);

            if ($("body").hasClass("smooth-scroll")) {
                scrollbar.addListener(() => {
                    parallaxScene.refresh()
                });
            }

        });


        $('.number-counter-wrap').each(function() {
            var $this = $(this);
            var CounterScene = new ScrollMagic.Scene({
                    triggerElement: this, // <-- Use this to select current element
                    triggerHook: 1,
                })
                .addTo(controller);

            CounterScene.on('enter', function() {
                const counters = document.querySelectorAll('.number-counter');
                const speed = 200;

                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;
                        const inc = target / speed;
                        if (count < target) {
                            counter.innerText = count + inc;
                            setTimeout(updateCount, 1);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
            });

            if ($("body").hasClass("smooth-scroll")) {
                scrollbar.addListener(() => {
                    CounterScene.refresh()
                });
            }
        });

    } // End Scroll Effects


    /*--------------------------------------------------
    Function First Load
    ---------------------------------------------------*/

    window.FirstLoad = function() {

        $(window).on('popstate', function() {
            location.reload(true);
        });


        if ($("#page-content").hasClass("light-content")) {
            $("nav").css('background-color', function() {
                return $("header").data('menucolor')
            });
            $("main, #main-content.solid-color").css('background-color', function() {
                return $("#page-content").data('bgcolor')
            });
            $('#magic-cursor').addClass('light-content');
            if ($('#hero').length > 0) {
                if ($('#hero').hasClass("has-image")) {
                    $("header").css('background-color', 'transparent');
                } else {
                    if ($("header").hasClass("fullscreen-menu")) {
                        $("header").css('background-color', 'transparent');
                    } else {
                        if ($('#blog').length > 0) {
                            $("header").css('background-color', '#171717');
                        }
                        if ($('#post').length > 0) {
                            $("header").css('background-color', '#171717');
                        }
                    }
                }
            } else {
                $("header").css('background-color', 'transparent');
            }
        } else {
            $("nav").css('background-color', function() {
                return $("header").data('menucolor')
            });
            $("main, #main-content.solid-color").css('background-color', function() {
                return $("#page-content").data('bgcolor')
            });
            $('#magic-cursor').removeClass('light-content');
            if ($('#hero').length > 0) {
                if ($('#hero').hasClass("has-image")) {
                    $("header").css('background-color', 'transparent');
                } else {
                    if ($("header").hasClass("fullscreen-menu")) {
                        $("header").css('background-color', 'transparent');
                    } else {
                        if ($('#blog').length > 0) {
                            $("header").css('background-color', '#fff');
                        }
                        if ($('#post').length > 0) {
                            $("header").css('background-color', '#fff');
                        }
                    }
                }
            } else {
                $("header").css('background-color', 'transparent');
            }
        }

        $('.video-cover').each(function() {
            var image = $(this).data('src');
            $(this).css({
                'background-image': 'url(' + image + ')'
            });
        });

        //Load Default Page
        $('a.ajax-link').on('click', function() {
            $("body").addClass("show-loader");
            setTimeout(function() {
                $('#header-container').removeClass('light-content-header').removeClass('dark-content-header');
            }, 50);
            $(".flexnav").removeClass("flexnav-show");
            $('#menu-burger').removeClass("open");
            $("nav").css('background-color', function() {
                return $("#page-content").data('bgcolor')
            });
            $('header').removeClass('white-header');
            $("#app").remove();
            setTimeout(function() {
                $("#canvas-slider.active").remove();
            }, 300);
            $(".temporary-hero").remove();
            var tlMenu = gsap.timeline();
            $(".fullscreen-menu .menu-timeline").each(function(index, element) {
                tlMenu.to(element, {
                    duration: 0.25,
                    y: -30,
                    opacity: 0,
                    ease: Power2.easeIn
                }, index * 0.03)
            });
            if ($(window).width() < 1025) {
                $(".classic-menu .menu-timeline").each(function(index, element) {
                    tlMenu.to(element, {
                        duration: 0.25,
                        y: -30,
                        opacity: 0,
                        ease: Power2.easeIn
                    }, index * 0.03)
                });
            }
            gsap.to('#ball', {
                duration: 0.3,
                borderWidth: "4px",
                scale: 0.5,
                backgroundColor: "rgba(0, 0, 0, 0)",
                opacity: 1
            });
            gsap.to($("#main, #hero-image-wrapper, #project-nav, .next-project-image, #app, #canvas-slider, #showcase-slider-webgl-holder, .showcase-pagination-wrap, #quickmenu-scroll, #blog, .next-project-image-wrapper"), {
                duration: 0.3,
                opacity: 0,
                delay: 0,
                ease: Power0.ease
            });
            gsap.to($("#footer-container, .header-middle"), {
                duration: 0.3,
                opacity: 0,
                ease: Power0.ease
            });
            gsap.to('#show-filters, #counter-wrap', {
                duration: 0.2,
                opacity: 0
            });
        });


        //Load Page From Menu

        $('nav .ajax-link').on('click', function() {
            $(this).parents('.flexnav').addClass('hover');
            $(this).parents('.item-with-ul').addClass('hover');
            gsap.set($(this).find('span'), {
                yPercent: 0
            });
            var tl = gsap.timeline();
            $(".menu-timeline .before-span").each(function(index, element) {
                tl.to(element, {
                    duration: 0.5,
                    force3D: true,
                    y: -120,
                    opacity: 0,
                    delay: 0,
                    ease: Power2.easeIn
                }, index * 0.05)
            });
            $('header').removeClass('white-header');
            $("#app").remove();
            $(".big-title-caption").remove();
        });


        $('#burger-wrapper, .menu .button-text').on('click', function() {
            $('#menu-burger, nav').toggleClass('open');
            setTimeout(function() {
                if ($('#menu-burger').hasClass("open")) {
                    $('header').addClass('over-sidebar').addClass('over-white-section');
                    if (!$('#page-content').hasClass("light-content")) {
                        $('#magic-cursor').addClass('light-content');
                    }
                    if ($('header').hasClass("invert-header")) {
                        $('#header-container').addClass('light-content-header');
                    } else {
                        $('#header-container').addClass('dark-content-header');
                    }
                    gsap.set($("nav ul ul li"), {
                        y: 0,
                        opacity: 1
                    });
                    //Fade In Navigation Lists
                    var tlMenu = gsap.timeline();
                    tlMenu.set($(".menu-timeline .before-span"), {
                        y: 120,
                        opacity: 0
                    });
                    $(".menu-timeline .before-span").each(function(index, element) {
                        tlMenu.to(element, {
                            duration: 0.7,
                            force3D: true,
                            y: 0,
                            opacity: 1,
                            delay: 0.4,
                            ease: Power2.easeOut
                        }, index * 0.1)
                    });

                    $('.menu-timeline > .touch-button').click(function(e, bIndirect) {
                        if (bIndirect == true) {
                            return;
                        }
                        let currentItem = $(this);
                        $('.menu-timeline > .touch-button.active').each(function() {
                            if (currentItem.get(0) !== $(this).get(0)) {
                                $(this).trigger('click', true);
                            }
                        });
                    });

                } else {
                    //Fade Out Navigation Lists	
                    var tlMenu = gsap.timeline();
                    $(".menu-timeline .before-span").each(function(index, element) {
                        tlMenu.to(element, 0.5, {
                            force3D: true,
                            y: -120,
                            opacity: 0,
                            delay: 0,
                            ease: Power2.easeIn
                        }, index * 0.05)
                    });

                    var tlSubMenu = gsap.timeline();
                    $("nav ul ul li").each(function(index, element) {
                        tlSubMenu.to(element, 0.5, {
                            force3D: true,
                            y: -120,
                            opacity: 0,
                            delay: 0,
                            ease: Power2.easeIn
                        }, index * 0.03)
                    });

                    if (!$('#page-content').hasClass("light-content")) {
                        setTimeout(function() {
                            $('#magic-cursor').removeClass('light-content');
                        }, 500);
                    }
                    if ($('header').hasClass("invert-header")) {
                        setTimeout(function() {
                            $('#header-container').removeClass('light-content-header');
                        }, 500);
                    } else {
                        setTimeout(function() {
                            $('#header-container').removeClass('dark-content-header');
                        }, 500);
                    }
                    setTimeout(function() {
                        $(".touch-button.active").trigger("click");
                        $('header').removeClass('over-sidebar')
                        setTimeout(function() {
                            $('header').removeClass('over-white-section');
                        }, 350);
                    }, 500);
                }
            }, 20);
        });


        var viewportWidth = $(window).width();
        if (viewportWidth < 1024) {
            $('.hero-video-wrapper').remove();
        }

        $('.wpcf7-form-control-wrap').each(function() {
            if ($(this).has('label').length <= 0) {
                $(this).append('<label class="input_label"></label>');
            }
        });

    } // End First Load





    /*--------------------------------------------------
    Function FitThumbScreen WEBGL
    ---------------------------------------------------*/

    window.FitThumbScreenWEBGL = function() {

        if (!$("body").hasClass("disable-ajaxload")) {

            if ($("#itemsWrapper").hasClass("webgl-fitthumbs")) {

                if ($('#itemsWrapper').length > 0) {

                    function createDemoEffect(options) {
                        const transitionEffect = new GridToFullscreenEffect(
                            document.getElementById("app"),
                            document.getElementById("itemsWrapper"),
                            Object.assign({
                                    scrollContainer: window,
                                    onToFullscreenStart: ({
                                        index
                                    }) => {},
                                    onToFullscreenFinish: ({
                                        index
                                    }) => {},
                                    onToGridStart: ({
                                        index
                                    }) => {},
                                    onToGridFinish: ({
                                        index,
                                        lastIndex
                                    }) => {}
                                },
                                options
                            )
                        );

                        return transitionEffect;
                    }

                    let currentIndex;
                    const itemsWrapper = document.getElementById("itemsWrapper");
                    const thumbs = [...itemsWrapper.querySelectorAll("img.grid__item-img:not(.grid__item-img--large)")];

                    let transitionEffectDuration = 0.0;
                    let transitionEffect = null;

                    if ($(".webgl-fitthumbs").hasClass("fx-one")) {

                        //FX 01 ////////////////////////////// .fx-one  

                        transitionEffectDuration = 2.2;
                        transitionEffect = createDemoEffect({
                            timing: {
                                type: "sameEnd",
                                sections: 0,
                                duration: transitionEffectDuration,
                            },
                            activation: {
                                type: "mouse"
                            },
                            transformation: {
                                type: "wavy",
                                props: {
                                    seed: "5000",
                                    frequency: 0.1,
                                    amplitude: 1
                                }
                            },
                            onToFullscreenStart: ({
                                index
                            }) => {
                                currentIndex = index;
                                thumbs[currentIndex].style.opacity = 1;
                                gsap.to(itemsWrapper, {
                                    duration: .6,
                                    ease: Power1.easeInOut,
                                    mopacity: 1,
                                    delay: 0,
                                });
                                toggleFullview();
                            },
                            onToGridStart: ({
                                index
                            }) => {
                                gsap.to(itemsWrapper, {
                                    duration: 1,
                                    ease: Power3.easeInOut,
                                    scale: 1,
                                    opacity: 1,
                                });
                                toggleFullview();
                            },
                            onToGridFinish: ({
                                index,
                                lastIndex
                            }) => {
                                thumbs[lastIndex].style.opacity = 1;
                            },
                            easings: {
                                toFullscreen: Cubic.easeInOut
                            }
                        });

                    } else if ($(".webgl-fitthumbs").hasClass("fx-two")) {

                        //FX 02 ////////////////////////////// .fx-two  

                        transitionEffectDuration = 1.8;
                        transitionEffect = createDemoEffect({
                            activation: {
                                type: "mouse"
                            },
                            timing: {
                                duration: transitionEffectDuration
                            },
                            transformation: {
                                type: "simplex",
                                props: {
                                    seed: "8000",
                                    frequencyX: 0.2,
                                    frequencyY: 0.2,
                                    amplitudeX: 0.3,
                                    amplitudeY: 0.3
                                }
                            },
                            onToFullscreenStart: ({
                                index
                            }) => {
                                currentIndex = index;
                                thumbs[currentIndex].style.opacity = 1;
                                gsap.to(itemsWrapper, {
                                    duration: .6,
                                    ease: Power1.easeInOut,
                                    mopacity: 1,
                                    delay: 0,
                                });
                                toggleFullview();
                            },
                            onToGridStart: ({
                                index
                            }) => {
                                gsap.to(itemsWrapper, {
                                    duration: 1,
                                    ease: Power3.easeInOut,
                                    scale: 1,
                                    opacity: 1,
                                });
                                toggleFullview();
                            },
                            onToGridFinish: ({
                                index,
                                lastIndex
                            }) => {
                                thumbs[lastIndex].style.opacity = 1;
                            },
                            easings: {
                                toFullscreen: Power1.easeInOut
                            }
                        });

                    } else if ($(".webgl-fitthumbs").hasClass("fx-three")) {

                        //FX 03 ////////////////////////////// .fx-three  

                        transitionEffectDuration = 1.8;
                        transitionEffect = createDemoEffect({
                            activation: {
                                type: "closestCorner"
                            },
                            timing: {
                                duration: transitionEffectDuration
                            },
                            transformation: {
                                type: "flipX"
                            },
                            flipBeizerControls: {
                                c0: {
                                    x: 0.4,
                                    y: -0.8
                                },
                                c1: {
                                    x: 0.5,
                                    y: 0.9
                                }
                            },
                            onToFullscreenStart: ({
                                index
                            }) => {
                                currentIndex = index;
                                thumbs[currentIndex].style.opacity = 1;
                                gsap.to(itemsWrapper, {
                                    duration: .6,
                                    ease: Power1.easeInOut,
                                    mopacity: 1,
                                    delay: 0,
                                });
                                toggleFullview();
                            },
                            onToGridStart: ({
                                index
                            }) => {
                                gsap.to(itemsWrapper, {
                                    duration: 1,
                                    ease: Power3.easeInOut,
                                    scale: 1,
                                    opacity: 1,
                                });
                                toggleFullview();
                            },
                            onToGridFinish: ({
                                index,
                                lastIndex
                            }) => {
                                thumbs[lastIndex].style.opacity = 1;
                            },
                            easings: {
                                toFullscreen: Power1.easeInOut
                            }
                        });

                    } else if ($(".webgl-fitthumbs").hasClass("fx-four")) {


                        //FX 04 ////////////////////////////// .fx-four  

                        transitionEffectDuration = 1.5;
                        transitionEffect = createDemoEffect({
                            activation: {
                                type: "sinX"
                            },
                            flipX: false,
                            timing: {
                                type: "sections",
                                sections: 4,
                                duration: transitionEffectDuration
                            },
                            onToFullscreenStart: ({
                                index
                            }) => {
                                currentIndex = index;
                                thumbs[currentIndex].style.opacity = 1;
                                gsap.to(itemsWrapper, {
                                    duration: .6,
                                    ease: Power1.easeInOut,
                                    mopacity: 1,
                                    delay: 0,
                                });
                                toggleFullview();
                            },
                            onToGridStart: ({
                                index
                            }) => {
                                gsap.to(itemsWrapper, {
                                    duration: 1,
                                    ease: Power3.easeInOut,
                                    scale: 1,
                                    opacity: 1,
                                });
                                toggleFullview();
                            },
                            onToGridFinish: ({
                                index,
                                lastIndex
                            }) => {
                                thumbs[lastIndex].style.opacity = 1;
                            },
                            easings: {
                                toFullscreen: Power3.easeIn
                            }
                        });

                    } else if ($(".webgl-fitthumbs").hasClass("fx-five")) {


                        //FX 05 ////////////////////////////// .fx-five  

                        transitionEffectDuration = 1.8;
                        transitionEffect = createDemoEffect({
                            timing: {
                                type: "sections",
                                sections: 1,
                                duration: transitionEffectDuration
                            },
                            activation: {
                                type: "mouse"
                            },
                            transformation: {
                                type: "wavy",
                                props: {
                                    seed: "8000",
                                    frequency: 0.1,
                                    amplitude: 1
                                }
                            },
                            onToFullscreenStart: ({
                                index
                            }) => {
                                currentIndex = index;
                                thumbs[currentIndex].style.opacity = 1;
                                gsap.to(itemsWrapper, {
                                    duration: .6,
                                    ease: Power1.easeInOut,
                                    mopacity: 1,
                                    delay: 0,
                                });
                                toggleFullview();
                            },
                            onToGridStart: ({
                                index
                            }) => {
                                gsap.to(itemsWrapper, {
                                    duration: 1,
                                    ease: Power3.easeInOut,
                                    scale: 1,
                                    opacity: 1,
                                });
                                toggleFullview();
                            },
                            onToGridFinish: ({
                                index,
                                lastIndex
                            }) => {
                                thumbs[lastIndex].style.opacity = 1;
                            },
                            easings: {
                                toFullscreen: Cubic.easeInOut
                            }
                        });

                    } else if ($(".webgl-fitthumbs").hasClass("fx-six")) {


                        //FX 06 ////////////////////////////// .fx-six  

                        transitionEffectDuration = 2;
                        transitionEffect = createDemoEffect({
                            activation: {
                                type: "bottom"
                            },
                            timing: {
                                duration: transitionEffectDuration
                            },
                            transformation: {
                                type: "wavy",
                                props: {
                                    seed: "8000",
                                    frequency: 1,
                                    amplitude: 0.6
                                }
                            },
                            onToFullscreenStart: ({
                                index
                            }) => {
                                currentIndex = index;
                                thumbs[currentIndex].style.opacity = 1;
                                gsap.to(itemsWrapper, {
                                    duration: .6,
                                    ease: Power1.easeInOut,
                                    mopacity: 1,
                                    delay: 0,
                                });
                                toggleFullview();
                            },
                            onToGridStart: ({
                                index
                            }) => {
                                gsap.to(itemsWrapper, {
                                    duration: 1,
                                    ease: Power3.easeInOut,
                                    scale: 1,
                                    opacity: 1,
                                });
                                toggleFullview();
                            },
                            onToGridFinish: ({
                                index,
                                lastIndex
                            }) => {
                                thumbs[lastIndex].style.opacity = 1;
                            },
                            easings: {
                                toFullscreen: Power2.easeInOut
                            }
                        });

                    } else {

                        //FX 01 ////////////////////////////// .fx-one  

                        transitionEffectDuration = 2.2;
                        transitionEffect = createDemoEffect({
                            timing: {
                                type: "sameEnd",
                                sections: 0,
                                duration: transitionEffectDuration,
                            },
                            activation: {
                                type: "mouse"
                            },
                            transformation: {
                                type: "wavy",
                                props: {
                                    seed: "5000",
                                    frequency: 0.1,
                                    amplitude: 1
                                }
                            },
                            onToFullscreenStart: ({
                                index
                            }) => {
                                currentIndex = index;
                                thumbs[currentIndex].style.opacity = 1;
                                gsap.to(itemsWrapper, {
                                    duration: .6,
                                    ease: Power1.easeInOut,
                                    mopacity: 1,
                                    delay: 0,
                                });
                                toggleFullview();
                            },
                            onToGridStart: ({
                                index
                            }) => {
                                gsap.to(itemsWrapper, {
                                    duration: 1,
                                    ease: Power3.easeInOut,
                                    scale: 1,
                                    opacity: 1,
                                });
                                toggleFullview();
                            },
                            onToGridFinish: ({
                                index,
                                lastIndex
                            }) => {
                                thumbs[lastIndex].style.opacity = 1;
                            },
                            easings: {
                                toFullscreen: Cubic.easeInOut
                            }
                        });
                    }

                    transitionEffect.init();

                    if ($('#itemsWrapperLinks').length > 0) {

                        const itemsCaptions = document.getElementById("itemsWrapperLinks");
                        const thumbsLink = [...itemsCaptions.querySelectorAll(".trigger-item-link")];
                        for (let idxCaption = 0; idxCaption < thumbsLink.length; idxCaption++) {
                            thumbsLink[idxCaption].addEventListener("mousedown", transitionEffect.createOnMouseDown(idxCaption));
                        }
                    }

                    const toggleFullview = () => {
                        if (transitionEffect.isFullscreen) {
                            transitionEffect.toGrid();
                        }
                    };

                    // Preload all the images in the pageI
                    imagesLoaded(document.querySelectorAll(".grid__item-img"), instance => {

                        let images = [];
                        for (var i = 0, imageSet = {}; i < instance.elements.length; i++) {
                            let image = {
                                element: instance.elements[i],
                                image: instance.images[i].isLoaded ? instance.images[i].img : null
                            };
                            if (i % 2 === 0) {
                                imageSet = {};
                                imageSet.small = image;
                            }

                            if (i % 2 === 1) {
                                imageSet.large = image;
                                images.push(imageSet);
                            }
                        }
                        transitionEffect.createTextures(images);
                    });

                }


                $('#itemsWrapperLinks .trigger-item-link, #itemsWrapperLinks .trigger-item-link-secondary').on('click', function() {

                    let parent_item = $(this).closest('.trigger-item');
                    parent_item.addClass('above');

                    gsap.to(parent_item.find(".item-parallax.enabled .item-wrap-image"), {
                        duration: 0.4,
                        y: 0,
                        ease: Power1.easeOut
                    });

                    if (!$('body').hasClass("hero-below-caption")) {
                        if (!$('#page-content').hasClass("light-content")) {

                            if (!$('.portfolio').hasClass("portfolio-shortcode")) {
                                if (!parent_item.hasClass("change-header")) {
                                    $('#page-content').delay(1200).queue(function(next) {
                                        $(this).addClass('light-content');
                                        next();
                                    });
                                }
                            } else {
                                alert("shortcode");
                                if (!parent_item.hasClass("change-header")) {
                                    $('#page-content').delay(1200).queue(function(next) {
                                        $(this).removeClass('light-content');
                                        next();
                                    });
                                }
                            }
                        } else {
                            if (!$('.portfolio').hasClass("portfolio-shortcode")) {
                                if (parent_item.hasClass("change-header")) {
                                    $('#page-content').delay(1200).queue(function(next) {
                                        $(this).removeClass('light-content');
                                        next();
                                    });
                                }
                            } else {
                                if (!parent_item.hasClass("change-header")) {
                                    $('#page-content').delay(1200).queue(function(next) {
                                        $(this).removeClass('light-content');
                                        next();
                                    });
                                }

                            }
                        }
                    }

                    $("body").addClass("load-project-thumb").addClass("show-loader");

                    gsap.to('#hero, #show-filters, .item-caption-wrapper, #page-nav, footer, .fadeout-element', {
                        duration: 0.5,
                        opacity: 0,
                        ease: Power4.easeInOut
                    });

                    $('.item').each(function() {
                        if (!$(this).hasClass("above")) {
                            gsap.to($(this), {
                                duration: 0.5,
                                delay: 0,
                                opacity: 0,
                                ease: Power4.easeInOut
                            });
                        } else {
                            gsap.to($(this), {
                                duration: 0.5,
                                delay: 0.4,
                                opacity: 0,
                                ease: Power4.easeInOut
                            });
                        }
                    });

                    $('.sr-slide').each(function() {
                        if (!$(this).hasClass("above")) {
                            gsap.to($(this), {
                                duration: 0.5,
                                delay: 0,
                                opacity: 0,
                                ease: Power4.easeInOut
                            });
                        } else {
                            gsap.to($(this), {
                                duration: 0.5,
                                delay: 0.4,
                                opacity: 0,
                                ease: Power4.easeInOut
                            });
                        }
                    });

                    gsap.to($("#showcase-carousel .swiper-slide .inner"), {
                        duration: 0.3,
                        force3D: true,
                        delay: 0,
                        opacity: 0,
                        ease: Power3.easeInOut
                    });
                    $('#showcase-carousel .swiper-slide').each(function() {
                        if (!$(this).hasClass("above")) {
                            gsap.to($(this), {
                                duration: 0.5,
                                delay: 0,
                                opacity: 0,
                                ease: Power4.easeInOut
                            });
                        } else {
                            gsap.to($(this), {
                                duration: 0.5,
                                delay: 0.4,
                                opacity: 0,
                                ease: Power4.easeInOut
                            });
                        }
                    });

                    $('.showcase-list-holder').removeClass("loaded");
                    var SlideListTitle = gsap.timeline();
                    $(".sl-title span").each(function(index, element) {
                        SlideListTitle.to(element, {
                            duration: 0.5,
                            force3D: true,
                            y: -80,
                            opacity: 0,
                            delay: 0,
                            ease: Power2.easeInOut
                        }, index * 0)
                    });
                    var SlideListSubtitle = gsap.timeline();
                    $(".sl-subtitle span").each(function(index, element) {
                        SlideListSubtitle.to(element, {
                            duration: 0.5,
                            force3D: true,
                            y: -30,
                            opacity: 0,
                            delay: 0,
                            ease: Power2.easeInOut
                        }, index * 0)
                    });

                    $('.slide-list').each(function() {
                        if (!$(this).hasClass("above")) {
                            gsap.to($(this), {
                                duration: 0.5,
                                delay: 0,
                                opacity: 0,
                                ease: Power4.easeInOut
                            });
                        } else {
                            gsap.to($(this), {
                                duration: 0.5,
                                delay: 0.3,
                                opacity: 0,
                                ease: Power4.easeInOut
                            });
                        }
                    });

                    $('.infinity-list').each(function() {
                        if (!$(this).hasClass("above")) {
                            gsap.to($(this), {
                                duration: 0.5,
                                delay: 0,
                                opacity: 0,
                                ease: Power4.easeInOut
                            });
                        } else {
                            gsap.to($(this), {
                                duration: 0.5,
                                delay: 0.4,
                                opacity: 0,
                                ease: Power4.easeInOut
                            });
                        }
                    });

                    gsap.to('#ball', {
                        duration: 0.2,
                        borderWidth: '4px',
                        scale: 0.5,
                        borderColor: '#999999',
                        backgroundColor: 'transparent',
                        opacity: 1
                    });
                    gsap.to('#ball-loader', {
                        duration: 0.2,
                        borderWidth: '4px',
                        top: 0,
                        left: 0
                    });
                    $("#ball").removeClass("with-icon");
                    $('#ball p').remove();
                    $('#ball i').remove();

                    if ($('body').hasClass('hero-below-caption')) {
                        var heroTranslate = $('.hero-translate').height();
                        gsap.to('#app canvas', {
                            duration: 1,
                            y: heroTranslate,
                            delay: 0.7,
                            ease: Power3.easeInOut
                        });
                    }

                    $(this).delay(1000).queue(function() {
                        var link = $(".above").find('a');
                        link.trigger('click');
                    });
                });


            }
        }

    } //End FitThumbScreenWEBGL


    /*--------------------------------------------------
    Function FitThumbScreen GSAP
    ---------------------------------------------------*/

    window.FitThumbScreenGSAP = function() {

        if (!$("body").hasClass("disable-ajaxload")) {

            if ($("#itemsWrapper").hasClass("scale-fitthumbs")) {

                $("body").find(".thumb-wrapper").each(function() {
                    $("#clone-image").append($(this))
                });

                $('.thumb-page').each(function() {
                    var image = $(this).data('src');
                    $(this).css({
                        'background-image': 'url(' + image + ')'
                    });
                });

                var root = document.documentElement;
                var body = document.body;
                var pages = document.querySelectorAll(".thumb-page");
                var tiles = document.querySelectorAll(".item-image");
                var urls = document.querySelectorAll(".trigger-item-link");

                for (var i = 0; i < tiles.length; i++) {
                    addListeners(tiles[i], pages[i], urls[i]);
                }

                function addListeners(tile, page, url) {

                    url.addEventListener("click", function() {
                        let parent_item = $(this).closest('.trigger-item');
                        parent_item.addClass('above');
                        gsap.to(parent_item.find(".item-parallax.enabled .item-wrap-image"), {
                            duration: 0.4,
                            y: 0,
                            ease: Power1.easeOut
                        });

                        if (!$('body').hasClass("hero-below-caption")) {
                            if (!$('#page-content').hasClass("light-content")) {

                                if (!$('.portfolio').hasClass("portfolio-shortcode")) {
                                    if (!parent_item.hasClass("change-header")) {
                                        $('#page-content').delay(1200).queue(function(next) {
                                            $(this).addClass('light-content');
                                            next();
                                        });
                                    }
                                } else {
                                    alert("shortcode");
                                    if (!parent_item.hasClass("change-header")) {
                                        $('#page-content').delay(1200).queue(function(next) {
                                            $(this).removeClass('light-content');
                                            next();
                                        });
                                    }
                                }
                            } else {
                                if (!$('.portfolio').hasClass("portfolio-shortcode")) {
                                    if (parent_item.hasClass("change-header")) {
                                        $('#page-content').delay(1200).queue(function(next) {
                                            $(this).removeClass('light-content');
                                            next();
                                        });
                                    }
                                } else {
                                    if (!parent_item.hasClass("change-header")) {
                                        $('#page-content').delay(1200).queue(function(next) {
                                            $(this).removeClass('light-content');
                                            next();
                                        });
                                    }

                                }
                            }
                        }

                        gsap.to('#ball', {
                            duration: 0.2,
                            borderWidth: '4px',
                            scale: 0.5,
                            borderColor: '#999999',
                            backgroundColor: 'transparent',
                            opacity: 1
                        });
                        gsap.to('#ball-loader', {
                            duration: 0.2,
                            borderWidth: '4px',
                            top: 0,
                            left: 0
                        });
                        $("#ball").removeClass("with-icon");
                        $('#ball p').remove();
                        $('#ball i').remove();
                        $("body").addClass("show-loader").addClass("load-project-thumb");

                        gsap.to('#hero, #show-filters, .item, .item-caption-wrapper, #page-nav, footer, .fadeout-element, .sr-slide', {
                            duration: 0.3,
                            opacity: 0,
                            delay: 0,
                            ease: Power2.easeIn
                        });

                        gsap.to($("#showcase-carousel .swiper-slide .inner"), {
                            duration: 0.3,
                            force3D: true,
                            delay: 0,
                            opacity: 0,
                            ease: Power3.easeInOut
                        });
                        $('#showcase-carousel .swiper-slide').each(function() {
                            if (!$(this).hasClass("above")) {
                                gsap.to($(this), {
                                    duration: 0.5,
                                    delay: 0,
                                    opacity: 0,
                                    ease: Power4.easeInOut
                                });
                            } else {
                                gsap.to($(this), {
                                    duration: 0.5,
                                    delay: 0.4,
                                    opacity: 0,
                                    ease: Power4.easeInOut
                                });
                            }
                        });

                        $('.showcase-list-holder').removeClass("loaded");
                        var SlideListTitle = gsap.timeline();
                        $(".sl-title span").each(function(index, element) {
                            SlideListTitle.to(element, {
                                duration: 0.5,
                                force3D: true,
                                y: -80,
                                opacity: 0,
                                delay: 0,
                                ease: Power2.easeInOut
                            }, index * 0)
                        });
                        var SlideListSubtitle = gsap.timeline();
                        $(".sl-subtitle span").each(function(index, element) {
                            SlideListSubtitle.to(element, {
                                duration: 0.5,
                                force3D: true,
                                y: -30,
                                opacity: 0,
                                delay: 0,
                                ease: Power2.easeInOut
                            }, index * 0)
                        });
                        gsap.to('.slide-list', {
                            duration: 0.5,
                            opacity: 0,
                            ease: Power4.easeInOut
                        });

                        setTimeout(function() {
                            animateHero(tile, page);
                        }, 750);
                        setTimeout(function() {
                            $(".above").find('a').trigger('click');
                        }, 1200);
                    });

                    page.addEventListener("click", function() {
                        $('.item').removeClass('above');
                        gsap.to('#hero, #show-filters, .item, .item-caption-wrapper, #page-nav, footer', {
                            duration: 0.3,
                            opacity: 1,
                            delay: 0.6,
                            ease: Power2.easeOut
                        });
                        animateHero(page, tile);
                    });
                }

                function animateHero(fromHero, toHero) {

                    var clone = fromHero.cloneNode(true);

                    var from = calculatePosition(fromHero);
                    var to = calculatePosition(toHero);

                    gsap.set([fromHero, toHero], {
                        visibility: "hidden"
                    });
                    gsap.set(clone, {
                        position: "absolute",
                        margin: 0
                    });

                    var cloneWrapper = document.createElement('div');
                    cloneWrapper.classList.add('clone-wrapper');
                    document.body.appendChild(cloneWrapper);
                    cloneWrapper.appendChild(clone);

                    if ($('body').hasClass('hero-below-caption')) {
                        var heroTranslate = $('.hero-translate').height();
                        gsap.set('.thumb-wrapper', {
                            y: heroTranslate
                        });
                        gsap.to('.clone-wrapper', {
                            duration: 1,
                            y: heroTranslate,
                            delay: 0,
                            ease: Expo.easeInOut
                        });
                    }

                    var style = {
                        x: to.left - from.left,
                        y: to.top - from.top,
                        scale: 1.02,
                        width: to.width,
                        height: to.height,
                        autoRound: false,
                        ease: Expo.easeInOut,
                        onComplete: onComplete
                    };

                    gsap.set(clone, from);
                    gsap.to(clone, 1, style)


                    function onComplete() {
                        gsap.set('.thumb-container', {
                            scale: 1.02
                        });
                        gsap.set(toHero, {
                            visibility: "visible"
                        });
                        body.removeChild(cloneWrapper, clone);
                    }
                }

                function calculatePosition(element) {
                    var rect = element.getBoundingClientRect();
                    var scrollTop = window.pageYOffset || root.scrollTop || body.scrollTop || 0;
                    var scrollLeft = window.pageXOffset || root.scrollLeft || body.scrollLeft || 0;
                    var clientTop = root.clientTop || body.clientTop || 0;
                    var clientLeft = root.clientLeft || body.clientLeft || 0;

                    return {
                        top: Math.round(rect.top + scrollTop - clientTop),
                        left: Math.round(rect.left + scrollLeft - clientLeft),
                        height: rect.height,
                        width: rect.width,
                    };
                }

            } else if ($("#itemsWrapper").hasClass("no-fitthumbs")) {

                $('#itemsWrapperLinks .trigger-item-link').on('click', function() {
                    let parent_item = $(this).closest('.trigger-item');
                    parent_item.addClass('above-trigger');
                    $("body").addClass("show-loader").addClass("load-project-thumb");

                    gsap.to('#hero, #show-filters, .item, .item-caption-wrapper, #page-nav, footer, .fadeout-element, .sr-slide', {
                        duration: 0.5,
                        opacity: 0,
                        ease: Power4.easeInOut
                    });

                    gsap.to($("#showcase-carousel .swiper-slide"), {
                        duration: 0.6,
                        force3D: true,
                        delay: 0,
                        opacity: 0,
                        ease: Power3.easeInOut
                    });

                    $('.showcase-list-holder').removeClass("loaded");
                    var SlideListTitle = gsap.timeline();
                    $(".sl-title span").each(function(index, element) {
                        SlideListTitle.to(element, {
                            duration: 0.5,
                            force3D: true,
                            y: -80,
                            opacity: 0,
                            delay: 0,
                            ease: Power2.easeInOut
                        }, index * 0)
                    });
                    var SlideListSubtitle = gsap.timeline();
                    $(".sl-subtitle span").each(function(index, element) {
                        SlideListSubtitle.to(element, {
                            duration: 0.5,
                            force3D: true,
                            y: -30,
                            opacity: 0,
                            delay: 0,
                            ease: Power2.easeInOut
                        }, index * 0)
                    });
                    gsap.to('.slide-list, .infinity-list', {
                        duration: 0.5,
                        opacity: 0,
                        ease: Power4.easeInOut
                    });

                    gsap.to('#ball', {
                        duration: 0.2,
                        borderWidth: '4px',
                        scale: 0.5,
                        borderColor: '#999999',
                        backgroundColor: 'transparent',
                        opacity: 1
                    });
                    gsap.to('#ball-loader', {
                        duration: 0.2,
                        borderWidth: '4px',
                        top: 0,
                        left: 0
                    });
                    $("#ball").removeClass("with-icon");
                    $('#ball p').remove();
                    $('#ball i').remove();

                    $(this).delay(1000).queue(function() {
                        var link = $(".above-trigger").find('a');
                        link.trigger('click');
                    });
                });
            }

        } else {

            $('#itemsWrapperLinks .trigger-item').on('click', function() {

                $("body").addClass("show-loader").addClass("load-project-thumb");

                gsap.to('#hero, #show-filters, .item, .item-caption-wrapper, #page-nav, footer, .showcase-list-header, .fadeout-element', {
                    duration: 0.5,
                    opacity: 0,
                    ease: Power4.easeInOut
                });

                gsap.to($("#showcase-carousel .swiper-slide"), {
                    duration: 0.6,
                    force3D: true,
                    delay: 0,
                    opacity: 0,
                    ease: Power3.easeInOut
                });

                $('.showcase-list-holder').removeClass("loaded");
                var SlideListTitle = gsap.timeline();
                $(".sl-title span").each(function(index, element) {
                    SlideListTitle.to(element, {
                        duration: 0.5,
                        force3D: true,
                        y: -80,
                        opacity: 0,
                        delay: 0,
                        ease: Power2.easeInOut
                    }, index * 0)
                });
                var SlideListSubtitle = gsap.timeline();
                $(".sl-subtitle span").each(function(index, element) {
                    SlideListSubtitle.to(element, {
                        duration: 0.5,
                        force3D: true,
                        y: -30,
                        opacity: 0,
                        delay: 0,
                        ease: Power2.easeInOut
                    }, index * 0)
                });
                gsap.to('.slide-list, .infinity-list', {
                    duration: 0.5,
                    opacity: 0,
                    ease: Power4.easeInOut
                });

                gsap.to('#ball', {
                    duration: 0.2,
                    borderWidth: '4px',
                    scale: 0.5,
                    borderColor: '#999999',
                    backgroundColor: 'transparent',
                    opacity: 1
                });
                gsap.to('#ball-loader', {
                    duration: 0.2,
                    borderWidth: '4px',
                    top: 0,
                    left: 0
                });
                $("#ball").removeClass("with-icon");
                $('#ball p').remove();
                $('#ball i').remove();

            });
        }

    } //End FitThumbScreenGSAP	




    /*--------------------------------------------------
    Function Shortcodes
    ---------------------------------------------------*/

    window.Shortcodes = function() {
        // Buttons

        $('.button-border').each(function() {
            $(this).css('background-color', function() {
                return $(this).data('btncolor')
            });
            $(this).css('border-color', function() {
                return $(this).data('btncolor')
            });
            $(this).find("a").css('color', function() {
                return $(this).parent().data('btntextcolor')
            });
        });

        $('.button-border.outline').each(function() {
            $(this).css('background-color', 'transparent');
            $(this).css('border-color', function() {
                return $(this).data('btncolor')
            });
            $(this).find("a").css('color', function() {
                return $(this).parent().data('btncolor')
            });
            $(".button-border.outline").mouseenter(function(e) {
                $(this).css('background-color', function() {
                    return $(this).data('btncolor')
                });
                $(this).css('border-color', function() {
                    return $(this).data('btncolor')
                });
                $(this).find("a").css('color', function() {
                    return $(this).parent().data('btntextcolor')
                });
            });
            $(".button-border.outline").mouseleave(function(e) {

                $(this).css('background-color', 'transparent');
                $(this).css('border-color', function() {
                    return $(this).data('btncolor')
                });
                $(this).find("a").css('color', function() {
                    return $(this).parent().data('btncolor')
                });
            });
        });

        // Accordion	  

        $('dd.accordion-content').slideUp(1).addClass('hide');
        $('dl.accordion').on('click', 'dt', function() {
            $(this).addClass('accordion-active').next().slideDown(350).siblings('dd.accordion-content').slideUp(350).prev().removeClass('accordion-active');
        });
        $('dl.accordion').on('click', 'dt.accordion-active', function() {
            $(this).removeClass('accordion-active').siblings('dd.accordion-content').slideUp(350);
        });

        $(".flexnav").flexNav({
            'animationSpeed': 250
        });

        // Project Share	

        $("#share").jsSocials({
            showLabel: false,
            showCount: false,
            shares: ["facebook", "twitter", "pinterest"]
        });

        $('.jssocials-share').wrap("<div class='parallax-wrap'><div class='parallax-element'></div></div>");

        if ($('.random-collage-wrap').length > 0) {

            if ($(window).width() >= 1024) {

                $(".random-collage .rc-slide .item-wrap-image").on('mouseenter', function() {
                    var $this = $(this);
                    gsap.to('#ball', {
                        duration: 0.3,
                        borderWidth: '2px',
                        scale: 1.2,
                        borderColor: $("body").data('primary-color'),
                        backgroundColor: $("body").data('primary-color')
                    });
                    gsap.to('#ball-loader', {
                        duration: 0.2,
                        borderWidth: '2px',
                        top: 2,
                        left: 2
                    });
                    $("#ball").append('<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>');
                });

                $(".random-collage .rc-slide .item-wrap-image").on('mouseleave', function() {
                    gsap.to('#ball', {
                        duration: 0.2,
                        borderWidth: '4px',
                        scale: 0.5,
                        borderColor: '#999999',
                        backgroundColor: 'transparent'
                    });
                    gsap.to('#ball-loader', {
                        duration: 0.2,
                        borderWidth: '4px',
                        top: 0,
                        left: 0
                    });
                    $('#ball p').remove();
                });

            }
        }

        if ($('.has-hover-image').length > 0) {

            var parent_row = $('.has-hover-image').closest('.content-row');
            parent_row.css("z-index", "10");

            if ($("body").hasClass("smooth-scroll")) {
                var elem = document.querySelector("#content-scroll");
                var scrollbar = Scrollbar.init(elem, {
                    renderByPixels: true,
                    damping: 0.1
                });
            }

            const getMousePos = (e) => {
                let posx = 0;
                let posy = 0;
                if (!e) e = window.event;
                if (e.pageX || e.pageY) {
                    posx = e.pageX;
                    posy = e.pageY;
                } else if (e.clientX || e.clientY) {
                    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                }
                return {
                    x: posx,
                    y: posy
                }
            }

            // Effect 1
            class HoverImgFx1 {
                constructor(el) {
                    this.DOM = {
                        el: el
                    };
                    this.DOM.reveal = document.createElement('div');
                    this.DOM.reveal.className = 'hover-reveal';
                    this.DOM.reveal.innerHTML = `<div class="hover-reveal__inner"><div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div></div>`;
                    this.DOM.el.appendChild(this.DOM.reveal);
                    this.DOM.revealInner = this.DOM.reveal.querySelector('.hover-reveal__inner');
                    this.DOM.revealInner.style.overflow = 'hidden';
                    this.DOM.revealImg = this.DOM.revealInner.querySelector('.hover-reveal__img');

                    this.initEvents();
                }
                initEvents() {

                    this.positionElement = (ev) => {
                        const mousePos = getMousePos(ev);
                        if ($("body").hasClass("smooth-scroll")) {
                            const docScrolls = {
                                left: document.body.scrollLeft + document.documentElement.scrollLeft,
                                top: -scrollbar.scrollTop
                            };
                            gsap.to($('.hover-reveal'), {
                                duration: 0.7,
                                top: `${mousePos.y-($('.hover-reveal').height()/2)-docScrolls.top}px`,
                                left: `${mousePos.x-($('.hover-reveal').width()/2)-docScrolls.left}px`,
                                ease: Power4.easeOut
                            });
                        } else {
                            const docScrolls = {
                                left: document.body.scrollLeft + document.documentElement.scrollLeft,
                                top: document.body.scrollTop + document.documentElement.scrollTop
                            };
                            gsap.to($('.hover-reveal'), {
                                duration: 1,
                                top: `${mousePos.y+40-docScrolls.top}px`,
                                left: `${mousePos.x+10-docScrolls.left}px`,
                                ease: Power4.easeOut
                            });
                        }

                    };
                    this.mouseenterFn = (ev) => {
                        this.positionElement(ev);
                        this.showImage();
                    };
                    this.mousemoveFn = ev => requestAnimationFrame(() => {
                        this.positionElement(ev);
                    });
                    this.mouseleaveFn = () => {
                        this.hideImage();
                    };

                    this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
                    this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
                    this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
                }
                showImage() {
                    TweenMax.killTweensOf(this.DOM.revealInner);
                    TweenMax.killTweensOf(this.DOM.revealImg);

                    this.tl = new TimelineMax({
                            onStart: () => {
                                this.DOM.reveal.style.opacity = 1;
                                TweenMax.set(this.DOM.el, {
                                    zIndex: 1000
                                });
                            }
                        })
                        .add('begin')
                        .add(new TweenMax(this.DOM.revealInner, 0.3, {
                            ease: Sine.easeOut,
                            startAt: {
                                x: '-100%'
                            },
                            x: '0%'
                        }), 'begin')
                        .add(new TweenMax(this.DOM.revealImg, 0.3, {
                            ease: Sine.easeOut,
                            startAt: {
                                x: '100%'
                            },
                            x: '0%'
                        }), 'begin');
                }
                hideImage() {
                    TweenMax.killTweensOf(this.DOM.revealInner);
                    TweenMax.killTweensOf(this.DOM.revealImg);

                    this.tl = new TimelineMax({
                            onStart: () => {
                                TweenMax.set(this.DOM.el, {
                                    zIndex: 999
                                });
                            },
                            onComplete: () => {
                                TweenMax.set(this.DOM.el, {
                                    zIndex: ''
                                });
                                TweenMax.set(this.DOM.reveal, {
                                    opacity: 0
                                });
                            }
                        })
                        .add('begin')
                        .add(new TweenMax(this.DOM.revealInner, 0.3, {
                            ease: Sine.easeOut,
                            x: '100%'
                        }), 'begin')

                        .add(new TweenMax(this.DOM.revealImg, 0.3, {
                            ease: Sine.easeOut,
                            x: '-100%'
                        }), 'begin');
                }
            }

            Array.from(document.querySelectorAll('.has-hover-image')).forEach(link => new HoverImgFx1(link));

        }


    } //End Shortcodes




    /*--------------------------------------------------
    Function Sliders
    ---------------------------------------------------*/

    window.Sliders = function() {

        if ($('.content-slider').length > 0) {

            var interleaveOffset = 0.4;

            var ContentSliderOptions = {
                direction: 'horizontal',
                loop: true,
                slidesPerView: 1,
                paginationClickable: true,
                touchStartPreventDefault: false,
                spaceBetween: 0,
                mousewheelControl: false,
                simulateTouch: false,
                speed: 1000,
                navigation: {
                    nextEl: '.slider-button-next',
                    prevEl: '.slider-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    renderBullet: function(index, className) {
                        return '<span class="' + className + '">' + '<div class="parallax-wrap">' + '<div class="parallax-element">' + '<svg class="fp-arc-loader" width="20" height="20" viewBox="0 0 20 20">' +
                            '<circle class="path" cx="10" cy="10" r="5.5" fill="none" transform="rotate(-90 10 10)"' +
                            'stroke-opacity="1" stroke-width="2px"></circle>' +
                            '<circle class="solid-fill" cx="10" cy="10" r="3"></circle>' +
                            '</svg></div></div></span>';
                    },
                }
            }

            var swiper = new Swiper(".content-slider", ContentSliderOptions);

            $(".slider-button-prev").mouseenter(function(e) {
                if ($(this).parent().hasClass("light-cursor")) {
                    $("body").addClass("drag-cursor-white");
                    gsap.to('#ball', {
                        duration: 0.2,
                        borderWidth: '2px',
                        scale: 1,
                        borderColor: '#fff'
                    });
                } else if ($(this).parent().hasClass("dark-cursor")) {
                    $("body").addClass("drag-cursor-black");
                    gsap.to('#ball', {
                        duration: 0.2,
                        borderWidth: '2px',
                        scale: 1,
                        borderColor: '#000'
                    });
                }
                gsap.to('#ball-loader', {
                    duration: 0.2,
                    borderWidth: '2px',
                    top: 2,
                    left: 2
                });
                $("#ball").addClass("with-icon").append('<i class="fa fa-chevron-left"></i>');
            });

            $(".slider-button-prev").mouseleave(function(e) {
                gsap.to('#ball', {
                    duration: 0.2,
                    borderWidth: '4px',
                    scale: 0.5,
                    borderColor: '#999999',
                });
                gsap.to('#ball-loader', {
                    duration: 0.2,
                    borderWidth: '4px',
                    top: 0,
                    left: 0
                });
                $("#ball").removeClass("with-icon");
                $('#ball i').remove();
                $("body").removeClass("drag-cursor-black").removeClass("drag-cursor-white");
            });

            $(".slider-button-next").mouseenter(function(e) {
                if ($(this).parent().hasClass("light-cursor")) {
                    $("body").addClass("drag-cursor-white");
                    gsap.to('#ball', {
                        duration: 0.2,
                        borderWidth: '2px',
                        scale: 1,
                        borderColor: '#fff'
                    });
                } else if ($(this).parent().hasClass("dark-cursor")) {
                    $("body").addClass("drag-cursor-black");
                    gsap.to('#ball', {
                        duration: 0.2,
                        borderWidth: '2px',
                        scale: 1,
                        borderColor: '#000'
                    });
                }
                gsap.to('#ball-loader', {
                    duration: 0.2,
                    borderWidth: '2px',
                    top: 2,
                    left: 2
                });
                $("#ball").addClass("with-icon").append('<i class="fa fa-chevron-right"></i>');
            });

            $(".slider-button-next").mouseleave(function(e) {
                gsap.to('#ball', {
                    duration: 0.2,
                    borderWidth: '4px',
                    scale: 0.5,
                    borderColor: '#999999',
                });
                gsap.to('#ball-loader', {
                    duration: 0.2,
                    borderWidth: '4px',
                    top: 0,
                    left: 0
                });
                $("#ball").removeClass("with-icon");
                $('#ball i').remove();
                $("body").removeClass("drag-cursor-black").removeClass("drag-cursor-white");
            });

        }


        if ($('.content-carousel').length > 0) {

            var ContentCarouselOptions = {
                direction: 'horizontal',
                simulateTouch: true,
                slidesPerView: 'auto',
                touchStartPreventDefault: false,
                spaceBetween: 100,
                mousewheelControl: false,
                speed: 700,
                navigation: {
                    nextEl: '.slider-button-next',
                    prevEl: '.slider-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    renderBullet: function(index, className) {
                        return '<span class="' + className + '">' + '<div class="parallax-wrap">' + '<div class="parallax-element">' + '<svg class="fp-arc-loader" width="20" height="20" viewBox="0 0 20 20">' +
                            '<circle class="path" cx="10" cy="10" r="5.5" fill="none" transform="rotate(-90 10 10)"' +
                            'stroke-opacity="1" stroke-width="2px"></circle>' +
                            '<circle class="solid-fill" cx="10" cy="10" r="3"></circle>' +
                            '</svg></div></div></span>';
                    },
                }
            }

            var swiper = new Swiper(".content-carousel", ContentCarouselOptions);


            $('.content-carousel .swiper-wrapper').on('mousedown touchstart', function() {
                gsap.to($(this).find('.swiper-slide img'), {
                    duration: 0.7,
                    scale: 0.9
                });
                $("body").addClass("drag-cursor");
            });

            $('body').on('mouseup touchend', function() {
                gsap.to('.swiper-slide img', {
                    duration: 0.7,
                    scale: 1
                });
                $("body").removeClass("drag-cursor");
            });

            $('.content-carousel .swiper-wrapper').on('mouseenter mousemove', function() {
                $("body").addClass("scale-drag-x");
                if ($(this).parent().hasClass("light-cursor")) {
                    $("body").addClass("drag-cursor-white");
                    gsap.to('#ball', {
                        duration: 0.2,
                        borderWidth: '2px',
                        scale: 1,
                        borderColor: '#fff'
                    });
                } else if ($(this).parent().hasClass("dark-cursor")) {
                    $("body").addClass("drag-cursor-black");
                    gsap.to('#ball', {
                        duration: 0.2,
                        borderWidth: '2px',
                        scale: 1,
                        borderColor: '#000'
                    });
                }
            });

            $('.content-carousel .swiper-wrapper').on('mouseleave', function() {
                gsap.to('#ball', {
                    duration: 0.2,
                    borderWidth: '4px',
                    scale: 0.5,
                    borderColor: '#999999',
                });
                $("body").removeClass("scale-drag-x").removeClass("drag-cursor").removeClass("drag-cursor-white").removeClass("drag-cursor-black");
            });

            $("body").mouseleave(function(e) {
                gsap.to('.swiper-slide img', {
                    duration: 0.7,
                    scale: 1
                });
                $("body").removeClass("scale-drag-x").removeClass("drag-cursor").removeClass("drag-cursor-white").removeClass("drag-cursor-black");
            });

        }


        if ($('.content-looped-carousel').length > 0) {

            var ContentLoopedCarouselOptions = {
                direction: 'horizontal',
                simulateTouch: true,
                slidesPerView: 'auto',
                touchStartPreventDefault: false,
                spaceBetween: 100,
                centeredSlides: true,
                loop: true,
                mousewheelControl: false,
                speed: 700,
                navigation: {
                    nextEl: '.slider-button-next',
                    prevEl: '.slider-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    renderBullet: function(index, className) {
                        return '<span class="' + className + '">' + '<div class="parallax-wrap">' + '<div class="parallax-element">' + '<svg class="fp-arc-loader" width="20" height="20" viewBox="0 0 20 20">' +
                            '<circle class="path" cx="10" cy="10" r="5.5" fill="none" transform="rotate(-90 10 10)"' +
                            'stroke-opacity="1" stroke-width="2px"></circle>' +
                            '<circle class="solid-fill" cx="10" cy="10" r="3"></circle>' +
                            '</svg></div></div></span>';
                    },
                }
            }

            var swiper = new Swiper(".content-looped-carousel", ContentLoopedCarouselOptions);


            $('.content-looped-carousel .swiper-wrapper').on('mousedown touchstart', function() {
                gsap.to($(this).find('.swiper-slide img'), {
                    duration: 0.5,
                    scale: 0.95
                });
                $("body").addClass("drag-cursor");

            });

            $('body').on('mouseup touchend', function() {
                gsap.to('.swiper-slide img', {
                    duration: 0.7,
                    scale: 1
                });
                $("body").removeClass("drag-cursor");
            });

            $('.content-looped-carousel .swiper-wrapper').on('mouseenter mousemove', function() {
                $("body").addClass("scale-drag-x");
                if ($(this).parent().hasClass("light-cursor")) {
                    $("body").addClass("drag-cursor-white");
                    gsap.to('#ball', {
                        duration: 0.2,
                        borderWidth: '2px',
                        scale: 1,
                        borderColor: '#fff'
                    });
                } else if ($(this).parent().hasClass("dark-cursor")) {
                    $("body").addClass("drag-cursor-black");
                    gsap.to('#ball', {
                        duration: 0.2,
                        borderWidth: '2px',
                        scale: 1,
                        borderColor: '#000'
                    });
                }
            });

            $('.content-looped-carousel .swiper-wrapper').on('mouseleave', function() {
                gsap.to('#ball', {
                    duration: 0.2,
                    borderWidth: '4px',
                    scale: 0.5,
                    borderColor: '#999999',
                });
                $("body").removeClass("scale-drag-x").removeClass("drag-cursor").removeClass("drag-cursor-white").removeClass("drag-cursor-black");
            });

            $("body").mouseleave(function(e) {
                gsap.to('.swiper-slide img', {
                    duration: 0.7,
                    scale: 1
                });
                $("body").removeClass("scale-drag-x").removeClass("drag-cursor").removeClass("drag-cursor-white").removeClass("drag-cursor-black");
            });

        }

        if ($('.team-looped-carousel').length > 0) {

            var TeamLoopedCarouselOptions = {
                direction: 'horizontal',
                simulateTouch: true,
                touchStartPreventDefault: false,
                slidesPerView: 5,
                spaceBetween: 0,
                breakpoints: {
                    100: {
                        slidesPerView: 2,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                    1466: {
                        slidesPerView: 4,
                    }
                },
                centeredSlides: false,
                loop: true,
                mousewheelControl: false,
                speed: 700,
            }

            var swiper = new Swiper(".team-looped-carousel", TeamLoopedCarouselOptions);



            $('.team-looped-carousel .swiper-wrapper').on('mousedown touchstart', function() {
                $("body").addClass("drag-cursor");

            });

            $('body').on('mouseup touchend', function() {
                $("body").removeClass("drag-cursor");
            });

            $('.team-looped-carousel .swiper-wrapper').on('mouseenter mousemove', function() {
                $("body").addClass("scale-drag-x");
                if ($(this).parent().hasClass("light-cursor")) {
                    $("body").addClass("drag-cursor-white");
                    gsap.to('#ball', {
                        duration: 0.2,
                        borderWidth: '2px',
                        scale: 1,
                        borderColor: '#fff'
                    });
                } else if ($(this).parent().hasClass("dark-cursor")) {
                    $("body").addClass("drag-cursor-black");
                    gsap.to('#ball', {
                        duration: 0.2,
                        borderWidth: '2px',
                        scale: 1,
                        borderColor: '#000'
                    });
                }
            });

            $('.team-looped-carousel .swiper-wrapper').on('mouseleave', function() {
                gsap.to('#ball', {
                    duration: 0.2,
                    borderWidth: '4px',
                    scale: 0.5,
                    borderColor: '#999999',
                });
                $("body").removeClass("scale-drag-x").removeClass("drag-cursor").removeClass("drag-cursor-white").removeClass("drag-cursor-black");
            });

            $("body").mouseleave(function(e) {
                gsap.to('.swiper-slide img', {
                    duration: 0.7,
                    scale: 1
                });
                $("body").removeClass("scale-drag-x").removeClass("drag-cursor").removeClass("drag-cursor-white").removeClass("drag-cursor-black");
            });

        }

    } //End Sliders	


    /*--------------------------------------------------
    Function Justified Grid
    ---------------------------------------------------*/

    window.JustifiedGrid = function() {

        if ($('.justified-grid').length > 0) {

            $('.justified-grid').justifiedGallery({
                rowHeight: 360,
                lastRow: 'nojustify',
                margins: 10
            });

        }

    } //End Justified Grid	


    /*--------------------------------------------------
    Function Lightbox
    ---------------------------------------------------*/

    window.Lightbox = function() {

        $('.image-link').magnificPopup({
            type: 'image',
            mainClass: 'mfp-with-zoom',
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300,
                easing: 'ease-in-out',
                opener: function(openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });

        $(".image-link").mouseenter(function(e) {
            gsap.to('#ball', {
                duration: 0.2,
                borderWidth: '2px',
                scale: 1,
                borderColor: '#fff',
            });
            gsap.to('#ball-loader', {
                duration: 0.2,
                borderWidth: '2px',
                top: 2,
                left: 2
            });
            $("#ball").addClass("with-icon").append('<i class="fa-solid fa-plus"></i>');
        });

        $(".image-link").mouseleave(function(e) {
            gsap.to('#ball', {
                duration: 0.2,
                borderWidth: '4px',
                scale: 0.5,
                borderColor: '#999999',
            });
            gsap.to('#ball-loader', {
                duration: 0.2,
                borderWidth: '4px',
                top: 0,
                left: 0
            });
            $("#ball").removeClass("with-icon");
            $('#ball i').remove();
        });

        $('.video-link').magnificPopup({
            type: 'iframe',
            iframe: {
                markup: '<div class="mfp-iframe-scaler">' +
                    '<div class="mfp-close"></div>' +
                    '<iframe class="mfp-iframe" frameborder="0" allow="autoplay"></iframe>' +
                    '</div>',
                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: 'v=',
                        src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                    },
                    vimeo: {
                        index: 'vimeo.com/',
                        id: '/',
                        src: 'https://player.vimeo.com/video/%id%?autoplay=1'
                    },
                }
            }

        });

        $(".video-link").mouseenter(function(e) {
            gsap.to('#ball', {
                duration: 0.2,
                borderWidth: '2px',
                scale: 1,
                borderColor: '#fff',
            });
            gsap.to('#ball-loader', {
                duration: 0.2,
                borderWidth: '2px',
                top: 2,
                left: 2
            });
            $("#ball").addClass("with-icon").append('<i class="fa-solid fa-play"></i>');
        });

        $(".video-link").mouseleave(function(e) {
            gsap.to('#ball', {
                duration: 0.2,
                borderWidth: '4px',
                scale: 0.5,
                borderColor: '#999999',
            });
            gsap.to('#ball-loader', {
                duration: 0.2,
                borderWidth: '4px',
                top: 0,
                left: 0
            });
            $("#ball").removeClass("with-icon");
            $('#ball i').remove();
        });

    } //End Lightbox	



    /*--------------------------------------------------
    Function Page PlayVideo
    ---------------------------------------------------*/

    window.PlayVideo = function() {

        if ($('.video-wrapper').length > 0) {


            $(".video-wrapper").mouseenter(function(e) {
                if ($(this).hasClass("play")) {
                    $("#ball").addClass("pause-movie")
                }
                gsap.to('#ball', {
                    duration: 0.2,
                    borderWidth: '2px',
                    scale: 1,
                    borderColor: '#fff',
                });
                $("#ball").addClass("over-movie").append('<i class="fa fa-play"></i><i class="fa fa-pause"></i>');
            });

            $(".video-wrapper").mouseleave(function(e) {
                gsap.to('#ball', {
                    duration: 0.2,
                    borderWidth: '4px',
                    scale: 0.5,
                    borderColor: '#999999',
                });
                $("#ball").removeClass("over-movie").removeClass("pause-movie");
                $('#ball i').remove();
            });

            $(".video-wrapper .control").mouseenter(function(e) {
                gsap.to('#ball', {
                    duration: 0.2,
                    borderWidth: '20px',
                    scale: 0
                });
            });

            $(".video-wrapper .control").mouseleave(function(e) {
                gsap.to('#ball', {
                    duration: 0.2,
                    borderWidth: '2px',
                    scale: 1,
                    borderColor: '#fff',
                });
            });

            var videocenter = ($(window).height() - $('.video-cover').height()) / 2

            var playpause = function(videoObj) {

                if (videoObj[0] != null) {
                    if (videoObj[0].paused || videoObj[0].ended) {

                        videoObj.parent().addClass('play');
                        videoObj[0].play();
                    } else {

                        videoObj.parent().removeClass('play');
                        videoObj[0].pause();
                    }
                }
            };

            //Time format converter - 00:00
            var timeFormat = function(seconds) {
                var m = Math.floor(seconds / 60) < 10 ? "0" + Math.floor(seconds / 60) : Math.floor(seconds / 60);
                var s = Math.floor(seconds - (m * 60)) < 10 ? "0" + Math.floor(seconds - (m * 60)) : Math.floor(seconds - (m * 60));
                return m + ":" + s;
            };

            // Events
            // click to video cover - will start the video
            $('.video-wrapper').on('click', function() {

                $('html,body').animate({
                    scrollTop: $(this).offset().top - videocenter
                }, 390);
                // hide the video cover in order to start playing
                $(this).find('.video-cover').addClass('hidden');

                $("#ball").toggleClass("pause-movie");

                // pause first the other videos
                var current_wrapper = $(this);
                $('#main-page-content').find('.video-wrapper').each(function() {

                    if (!current_wrapper.is($(this))) {

                        $(this).removeClass('play');
                        $(this).find('video').each(function() {

                            if (!$(this).get(0).paused && !$(this).get(0).ended) {

                                $(this).get(0).pause();
                            }
                        });
                    }

                });

                // trigger the click for the inner video
                $(this).find('video').each(function() {

                    playpause($(this));
                });

            });

            //fullscreen button clicked
            $('.btnFS').on('click', function(e) {

                var parent_wrapper = $(this).closest('.video-wrapper');
                var video_object = parent_wrapper.find('video');

                if ($.isFunction(video_object[0].webkitEnterFullscreen)) {
                    video_object[0].webkitEnterFullscreen();
                } else if ($.isFunction(video_object[0].mozRequestFullScreen)) {
                    video_object[0].mozRequestFullScreen();
                } else {
                    alert('Your browsers doesn\'t support fullscreen');
                }


                // prevent video wrapper div responding the event
                e.stopPropagation();

            });

            //sound button clicked
            $('.sound').on('click', function(e) {

                var parent_wrapper = $(this).closest('.video-wrapper');
                var video_object = parent_wrapper.find('video');

                video_object[0].muted = !video_object[0].muted;
                $(this).toggleClass('muted');
                if (video_object[0].muted) {
                    parent_wrapper.find('.volumeBar').css('width', 0);
                } else {
                    parent_wrapper.find('.volumeBar').css('width', video_object[0].volume * 100 + '%');
                }

                // prevent video wrapper div responding the event
                e.stopPropagation();
            });

            //progress bar (video timebar) clicked
            $('.progress').on('click', function(e) {

                var parent_wrapper = $(this).closest('.video-wrapper');
                var video_object = parent_wrapper.find('video');

                // calculate click position
                // and update video current time
                // as well as progress bar
                var maxduration = video_object[0].duration;
                var position = e.pageX - $(this).offset().left;
                var percentage = 100 * position / $(this).width();
                if (percentage > 100) {

                    percentage = 100;
                }
                if (percentage < 0) {

                    percentage = 0;
                }
                $('.timeBar').css('width', percentage + '%');
                video_object[0].currentTime = maxduration * percentage / 100;

                // prevent video wrapper div responding the event
                e.stopPropagation();
            });

            $('#main-page-content').find('video').each(function() {

                var video = $(this);
                var video_wrapper = $(this).parent();

                //remove default control when JS loaded
                video[0].removeAttribute("controls");
                video_wrapper.find('.control').fadeIn(500);
                video_wrapper.find('.caption').fadeIn(500);

                //before everything get started and we have the info about the video such as duration
                video.on('loadedmetadata', function() {

                    var video_object = $(this);
                    var parent_wrapper = $(this).parent();
                    //set video properties
                    parent_wrapper.find('.current').text(timeFormat(0));
                    parent_wrapper.find('.duration').text(timeFormat(video[0].duration));

                });

                //display current video buffered progress
                video.on('progress', function() {

                    var video_object = $(this);
                    var parent_wrapper = $(this).parent();
                    var maxduration = video_object[0].duration;

                    if (maxduration > 0) {
                        for (var i = 0; i < video_object[0].buffered.length; i++) {
                            if (video_object[0].buffered.start(video_object[0].buffered.length - 1 - i) < video_object[0].currentTime) {
                                var perc = (video_object[0].buffered.end(video_object[0].buffered.length - 1 - i) / maxduration) * 100 + "%";
                                parent_wrapper.find('.bufferBar').css('width', perc + '%');
                                break;
                            }
                        }
                    }

                });

                //display current video play time
                video.on('timeupdate', function() {

                    var parent_wrapper = $(this).parent();
                    var currentPos = $(this).get(0).currentTime;
                    var maxduration = $(this).get(0).duration;
                    var perc = 100 * currentPos / maxduration;
                    parent_wrapper.find('.timeBar').css('width', perc + '%');
                    parent_wrapper.find('.current').text(timeFormat(currentPos));
                });

                //video screen and play button clicked
                video.on('click', function() {

                    playpause($(this));
                });

                //video canplay event
                video.on('canplay', function() {

                    var parent_wrapper = $(this).parent();
                    parent_wrapper.find('.loading').fadeOut(100); //?
                });

                //video canplaythrough event
                //solve Chrome cache issue
                var completeloaded = false;
                video.on('canplaythrough', function() {

                    completeloaded = true;
                });

                //video ended event
                video.on('ended', function() {

                    $(this).get(0).pause();
                    $(this).parent().removeClass("play");
                    $("#ball").toggleClass("pause-movie");
                });

                //video seeking event
                video.on('seeking', function() {

                    //if video fully loaded, ignore loading screen
                    if (!completeloaded) {
                        var parent_wrapper = $(this).parent();
                        parent_wrapper.find('.loading').fadeIn(200); //?
                    }
                });

                //video seeked event
                video.on('seeked', function() {});

                //video waiting for more data event
                video.on('waiting', function() {

                    var parent_wrapper = $(this).parent();
                    parent_wrapper.find('.loading').fadeIn(200); //?
                });

            });

        }

    } // End PlayVideo

    window.isMobile = function() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $('body').addClass("disable-cursor");
            return true

        } else {
            if ($(window).width() <= 1024) {
                $('body').addClass("disable-cursor");
                return true
            }
        };
        return false
    };



    /*--------------------------------------------------
    Function Core
    ---------------------------------------------------*/

    window.Core = function() {

        if (!isMobile() && !$('body').hasClass("disable-cursor")) {
            var mouse = {
                x: 0,
                y: 0
            };
            var pos = {
                x: 0,
                y: 0
            };
            var ratio = 0.65;
            var active = false;
            var ball = document.getElementById("ball");
            var ballloader = document.getElementById("ball-loader");
            var offsetX = 40;


            gsap.set(ball, {
                xPercent: -50,
                yPercent: -50,
                scale: 0.5,
                borderWidth: '4px'
            });

            document.addEventListener("mousemove", mouseMove);

            function mouseMove(e) {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                mouse.x = e.pageX;
                mouse.y = e.pageY - scrollTop;

            }

            gsap.ticker.add(updatePosition);

            function updatePosition() {
                if (!active) {
                    pos.x += (mouse.x - pos.x) * ratio;
                    pos.y += (mouse.y - pos.y) * ratio;

                    gsap.to(ball, {
                        duration: 0.4,
                        x: pos.x,
                        y: pos.y
                    });
                }
            }

            $(".sticky.left").mouseenter(function(e) {
                var rcBounds = $(this)[0].getBoundingClientRect();
                var positionX = rcBounds.left - offsetX;
                var positionY = rcBounds.top + rcBounds.height / 2;
                gsap.to(ball, {
                    duration: 0.5,
                    x: positionX,
                    y: positionY,
                    scale: 0.9,
                    borderWidth: '2px'
                });
                gsap.ticker.remove(updatePosition);
            })

            $(".sticky.right").mouseenter(function(e) {
                var rcBounds = $(this)[0].getBoundingClientRect();
                var positionX = rcBounds.right + offsetX;
                var positionY = rcBounds.top + rcBounds.height / 2;
                gsap.to(ball, {
                    duration: 0.5,
                    x: positionX,
                    y: positionY,
                    scale: 0.9,
                    borderWidth: '2px'
                });
                gsap.ticker.remove(updatePosition);
            })

            $("#main .sticky.left").mouseenter(function(e) {
                var rcBounds = $(this)[0].getBoundingClientRect();
                var positionX = rcBounds.left - offsetX + 10;
                var positionY = rcBounds.top + rcBounds.height / 2;
                gsap.to(ball, {
                    duration: 0.5,
                    x: positionX,
                    y: positionY,
                    scale: 0.7,
                    opacity: 0.6,
                    borderWidth: '6px',
                    borderColor: '#999999'
                });
                gsap.ticker.remove(updatePosition);
            })

            $("#main .sticky.right").mouseenter(function(e) {
                var rcBounds = $(this)[0].getBoundingClientRect();
                var positionX = rcBounds.right + offsetX - 10;
                var positionY = rcBounds.top + rcBounds.height / 2;
                gsap.to(ball, {
                    duration: 0.5,
                    x: positionX,
                    y: positionY,
                    scale: 0.7,
                    opacity: 0.6,
                    borderWidth: '6px',
                    borderColor: '#999999'
                });
                gsap.ticker.remove(updatePosition);
            })

            $(".sticky").mouseleave(function(e) {
                gsap.to(ball, {
                    duration: 0.2,
                    scale: 0.5,
                    borderWidth: '4px',
                    borderColor: '#999999',
                    opacity: 1
                });
                gsap.ticker.add(updatePosition);
            })

            $(".parallax-wrap").mouseenter(function(e) {
                gsap.to(this, {
                    duration: 0.3,
                    scale: 2
                });
                gsap.to(ball, {
                    duration: 0.3,
                    scale: 0.9,
                    borderWidth: '2px',
                    opacity: 1
                });
                gsap.to($(this).children(), {
                    duration: 0.3,
                    scale: 0.5
                });
                active = true;
            });

            $("#main .parallax-wrap.icon-wrap").mouseenter(function(e) {
                gsap.to(ball, {
                    duration: 0.3,
                    scale: 0.7,
                    borderWidth: '6px',
                    opacity: 0.6,
                    borderColor: '#999'
                });
            });

            $(".parallax-wrap.bigger").mouseenter(function(e) {
                gsap.to(ball, {
                    duration: 0.3,
                    scale: 1.35,
                    borderWidth: '2px',
                    opacity: 1
                });
            });

            $(".parallax-wrap").mouseleave(function(e) {
                gsap.to(this, {
                    duration: 0.3,
                    scale: 1
                });
                gsap.to(ball, {
                    duration: 0.3,
                    scale: 0.5,
                    borderWidth: '4px',
                    opacity: 1,
                    borderColor: '#999999'
                });
                gsap.to($(this).children(), {
                    duration: 0.3,
                    scale: 1,
                    x: 0,
                    y: 0
                });
                active = false;
            });

            if ($('#magic-cursor').hasClass("light-content")) {
                $(".sticky").mouseenter(function(e) {
                    gsap.to(ball, {
                        duration: 0.5,
                        borderColor: $("body").data('primary-color')
                    });
                })
                $("#main .sticky").mouseenter(function(e) {
                    gsap.to(ball, {
                        duration: 0.5,
                        borderColor: '#999'
                    });
                })
                $(".parallax-wrap").mouseenter(function(e) {
                    gsap.to(ball, {
                        duration: 0.3,
                        borderColor: $("body").data('primary-color')
                    });
                });
                $(".parallax-wrap.bigger").mouseenter(function(e) {
                    gsap.to(ball, {
                        duration: 0.3,
                        borderColor: $("body").data('primary-color')
                    });
                });
                $("#main .parallax-wrap.icon-wrap").mouseenter(function(e) {
                    gsap.to(ball, {
                        duration: 0.3,
                        borderColor: '#999'
                    });
                });
            } else {
                $(".sticky").mouseenter(function(e) {
                    gsap.to(ball, {
                        duration: 0.5,
                        borderColor: $("body").data('primary-color')
                    });
                })
                $("#main .sticky").mouseenter(function(e) {
                    gsap.to(ball, {
                        duration: 0.5,
                        borderColor: '#999'
                    });
                })
                $(".parallax-wrap").mouseenter(function(e) {
                    gsap.to(ball, {
                        duration: 0.3,
                        borderColor: $("body").data('primary-color')
                    });
                });
                $(".parallax-wrap.bigger").mouseenter(function(e) {
                    gsap.to(ball, {
                        duration: 0.3,
                        borderColor: $("body").data('primary-color')
                    });
                });
                $("#main .parallax-wrap.icon-wrap").mouseenter(function(e) {
                    gsap.to(ball, {
                        duration: 0.3,
                        borderColor: '#999'
                    });
                });
            }

            $(".parallax-wrap").mousemove(function(e) {
                parallaxCursor(e, this, 2);
                callParallax(e, this);
            });

            function callParallax(e, parent) {
                parallaxIt(e, parent, parent.querySelector(".parallax-element"), 20);
            }

            function parallaxIt(e, parent, target, movement) {
                var boundingRect = parent.getBoundingClientRect();
                var relX = e.pageX - boundingRect.left;
                var relY = e.pageY - boundingRect.top;
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                gsap.to(target, {
                    duration: 0.3,
                    x: (relX - boundingRect.width / 2) / boundingRect.width * movement,
                    y: (relY - boundingRect.height / 2 - scrollTop) / boundingRect.height * movement,
                    ease: Power2.easeOut
                });
            }

            function parallaxCursor(e, parent, movement) {
                var rect = parent.getBoundingClientRect();
                var relX = e.pageX - rect.left;
                var relY = e.pageY - rect.top;
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
                pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2 - scrollTop) / movement;
                gsap.to(ball, {
                    duration: 0.3,
                    x: pos.x,
                    y: pos.y
                });
            }

            $(".hide-ball").mouseenter(function(e) {
                gsap.to('#ball', {
                    duration: 0.2,
                    borderWidth: '1px',
                    scale: 1,
                    opacity: 0
                });
            });

            $(".hide-ball").mouseleave(function(e) {
                gsap.to('#ball', {
                    duration: 0.3,
                    borderWidth: '4px',
                    scale: 0.5,
                    opacity: 1
                });
            });

            $(".link, .button").mouseenter(function(e) {
                gsap.to('#ball', {
                    duration: 0.2,
                    borderWidth: "0px",
                    scale: 1.5,
                    backgroundColor: "rgba(153, 153, 153, 1)",
                    opacity: 0.15
                });
                gsap.to('#ball-loader', {
                    duration: 0.2,
                    borderWidth: '2px',
                    top: 4,
                    left: 4
                });
            });

            $(".link, .button").mouseleave(function(e) {
                gsap.to('#ball', {
                    duration: 0.3,
                    borderWidth: "4px",
                    scale: 0.5,
                    backgroundColor: "rgba(153, 153, 153, 0)",
                    opacity: 1
                });
                gsap.to('#ball-loader', {
                    duration: 0.2,
                    borderWidth: '4px',
                    top: 0,
                    left: 0
                });
            });

            //Blog Hover Effects			
            $("#blog-page-nav .page-numbers li a, .post-page-numbers, #post-content a, #post-form a, #post-comments a, .wp-block-search__button, .clapat-sidebar-widget a").mouseenter(function(e) {
                gsap.to('#ball', {
                    duration: 0.2,
                    borderWidth: '1px',
                    scale: 1,
                    opacity: 0
                });
            });

            $("#blog-page-nav .page-numbers li a, .post-page-numbers, #post-content a, #post-form a, #post-comments a, .wp-block-search__button, .clapat-sidebar-widget a").mouseleave(function(e) {
                gsap.to('#ball', {
                    duration: 0.3,
                    borderWidth: '4px',
                    scale: 0.5,
                    opacity: 1
                });
            });
        }

        if ($('body').hasClass("disable-ajaxload")) {
            return
        }

        jQuery(document).ready(function() {
            var isAnimating = false,
                newLocation = '';
            firstLoad = false;

            //trigger smooth transition from the actual page to the new one 
            $('main').on('click', '[data-type="page-transition"]', function(event) {
                event.preventDefault();
                //detect which page has been selected
                var newPage = $(this).attr('href');
                //if the page is not already being animated - trigger animation
                if (!isAnimating) changePage(newPage, true);
                firstLoad = true;
            });

            //detect the 'popstate' event - e.g. user clicking the back button
            $(window).on('popstate', function() {
                if (firstLoad) {

                    /*
                    Safari emits a popstate event on page load - check if firstLoad is true before animating
                    if it's false - the page has just been loaded
                    */
                    var newPage = location.href;

                    if (!isAnimating && newLocation != newPage) changePage(newPage, false);
                }
                firstLoad = true;
            });

            function changePage(url, bool) {
                isAnimating = true;
                // trigger page animation
                $('body').addClass('page-is-changing');
                $('.cd-cover-layer').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
                    loadNewContent(url, bool);
                    newLocation = url;
                    $('.cd-cover-layer').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
                });
                //if browser doesn't support CSS transitions
                if (!transitionsSupported()) {
                    loadNewContent(url, bool);
                    newLocation = url;
                }
            }

            function loadNewContent(url, bool) {
                url = ('' == url) ? 'index.html' : url;

                var section = $('<div class="cd-main-content "></div>');


                section.load(url + ' .cd-main-content > *', function(event) {
                    // load new content and replace <main> content with the new one

                    $('main').html(section);

                    var clapat_title = event.match(/<title[^>]*>([^<]+)<\/title>/)[1];
                    $('head title').html(clapat_title);

                    // if we have Elementor inline styles in the target page
                    headTags = [
                        'style[id*=elementor-frontend-inline]',
                        'style[id*="elementor-post"]',
                        'link[id*="elementor-post"]',
                        'link[id*="google-fonts"]',
                    ];
                    var head = document.head;
                    var newPageRawHead = event.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0];
                    newPageHead = document.createElement('head');

                    newPageHead.innerHTML = newPageRawHead;

                    var oldHeadTags = head.querySelectorAll(headTags);
                    var newHeadTags = newPageHead.querySelectorAll(headTags);

                    // append new and remove old tags
                    for (let i = 0; i < newHeadTags.length; i++) {
                        if (typeof oldHeadTags[i] !== 'undefined') {
                            head.insertBefore(newHeadTags[i], oldHeadTags[i].nextElementSibling);
                            head.removeChild(oldHeadTags[i]);
                        } else {
                            head.insertBefore(newHeadTags[i], newHeadTags[i - 1]);
                        }
                    }

                    $('html, body').scrollTop(0);

                    //if browser doesn't support CSS transitions - dont wait for the end of transitions
                    var delay = (transitionsSupported()) ? 30 : 0;
                    setTimeout(function() {
                        //wait for the end of the transition on the loading bar before revealing the new content				
                        $('body').removeClass('page-is-changing');
                        $('.cd-cover-layer').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
                            isAnimating = false;
                            $('.cd-cover-layer').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
                        })


                        LoadViaAjax();

                        if (!isMobile() && !$('body').hasClass("disable-cursor")) {
                            $(".sticky.left").mouseenter(function(e) {
                                var rcBounds = $(this)[0].getBoundingClientRect();
                                var positionX = rcBounds.left - offsetX;
                                var positionY = rcBounds.top + rcBounds.height / 2;
                                gsap.to(ball, {
                                    duration: 0.5,
                                    x: positionX,
                                    y: positionY,
                                    scale: 0.9,
                                    borderWidth: '2px'
                                });
                                gsap.ticker.remove(updatePosition);
                            })

                            $(".sticky.right").mouseenter(function(e) {
                                var rcBounds = $(this)[0].getBoundingClientRect();
                                var positionX = rcBounds.right + offsetX;
                                var positionY = rcBounds.top + rcBounds.height / 2;
                                gsap.to(ball, {
                                    duration: 0.5,
                                    x: positionX,
                                    y: positionY,
                                    scale: 0.9,
                                    borderWidth: '2px'
                                });
                                gsap.ticker.remove(updatePosition);
                            })

                            $("#main .sticky.left").mouseenter(function(e) {
                                var rcBounds = $(this)[0].getBoundingClientRect();
                                var positionX = rcBounds.left - offsetX + 10;
                                var positionY = rcBounds.top + rcBounds.height / 2;
                                gsap.to(ball, {
                                    duration: 0.5,
                                    x: positionX,
                                    y: positionY,
                                    scale: 0.7,
                                    opacity: 0.6,
                                    borderWidth: '6px',
                                    borderColor: '#999999'
                                });
                                gsap.ticker.remove(updatePosition);
                            })

                            $("#main .sticky.right").mouseenter(function(e) {
                                var rcBounds = $(this)[0].getBoundingClientRect();
                                var positionX = rcBounds.right + offsetX - 10;
                                var positionY = rcBounds.top + rcBounds.height / 2;
                                gsap.to(ball, {
                                    duration: 0.5,
                                    x: positionX,
                                    y: positionY,
                                    scale: 0.7,
                                    opacity: 0.6,
                                    borderWidth: '6px',
                                    borderColor: '#999999'
                                });
                                gsap.ticker.remove(updatePosition);
                            })

                            $(".sticky").mouseleave(function(e) {
                                gsap.to(ball, {
                                    duration: 0.2,
                                    scale: 0.5,
                                    borderWidth: '4px',
                                    borderColor: '#999999',
                                    opacity: 1
                                });
                                gsap.ticker.add(updatePosition);
                            })

                            $(".parallax-wrap").mouseenter(function(e) {
                                gsap.to(this, {
                                    duration: 0.3,
                                    scale: 2
                                });
                                gsap.to(ball, {
                                    duration: 0.3,
                                    scale: 0.9,
                                    borderWidth: '2px',
                                    opacity: 1
                                });
                                gsap.to($(this).children(), {
                                    duration: 0.3,
                                    scale: 0.5
                                });
                                active = true;
                            });

                            $("#main .parallax-wrap.icon-wrap").mouseenter(function(e) {
                                gsap.to(ball, {
                                    duration: 0.3,
                                    scale: 0.7,
                                    borderWidth: '6px',
                                    opacity: 0.6,
                                    borderColor: '#999'
                                });
                            });

                            $(".parallax-wrap.bigger").mouseenter(function(e) {
                                gsap.to(ball, {
                                    duration: 0.3,
                                    scale: 1.35,
                                    borderWidth: '2px',
                                    opacity: 1
                                });
                            });

                            $(".parallax-wrap").mouseleave(function(e) {
                                gsap.to(this, {
                                    duration: 0.3,
                                    scale: 1
                                });
                                gsap.to(ball, {
                                    duration: 0.3,
                                    scale: 0.5,
                                    borderWidth: '4px',
                                    opacity: 1,
                                    borderColor: '#999999'
                                });
                                gsap.to($(this).children(), {
                                    duration: 0.3,
                                    scale: 1,
                                    x: 0,
                                    y: 0
                                });
                                active = false;
                            });

                            if ($('#magic-cursor').hasClass("light-content")) {
                                $(".sticky").mouseenter(function(e) {
                                    gsap.to(ball, {
                                        duration: 0.5,
                                        borderColor: $("body").data('primary-color')
                                    });
                                })
                                $("#main .sticky").mouseenter(function(e) {
                                    gsap.to(ball, {
                                        duration: 0.5,
                                        borderColor: '#999'
                                    });
                                })
                                $(".parallax-wrap").mouseenter(function(e) {
                                    gsap.to(ball, {
                                        duration: 0.3,
                                        borderColor: $("body").data('primary-color')
                                    });
                                });
                                $(".parallax-wrap.bigger").mouseenter(function(e) {
                                    gsap.to(ball, {
                                        duration: 0.3,
                                        borderColor: $("body").data('primary-color')
                                    });
                                });
                                $("#main .parallax-wrap.icon-wrap").mouseenter(function(e) {
                                    gsap.to(ball, {
                                        duration: 0.3,
                                        borderColor: '#999'
                                    });
                                });
                            } else {
                                $(".sticky").mouseenter(function(e) {
                                    gsap.to(ball, {
                                        duration: 0.5,
                                        borderColor: $("body").data('primary-color')
                                    });
                                })
                                $("#main .sticky").mouseenter(function(e) {
                                    gsap.to(ball, {
                                        duration: 0.5,
                                        borderColor: '#999'
                                    });
                                })
                                $(".parallax-wrap").mouseenter(function(e) {
                                    gsap.to(ball, {
                                        duration: 0.3,
                                        borderColor: $("body").data('primary-color')
                                    });
                                });
                                $(".parallax-wrap.bigger").mouseenter(function(e) {
                                    gsap.to(ball, {
                                        duration: 0.3,
                                        borderColor: $("body").data('primary-color')
                                    });
                                });
                                $("#main .parallax-wrap.icon-wrap").mouseenter(function(e) {
                                    gsap.to(ball, {
                                        duration: 0.3,
                                        borderColor: '#999'
                                    });
                                });
                            }

                            $(".parallax-wrap").mousemove(function(e) {
                                parallaxCursor(e, this, 2);
                                callParallax(e, this);
                            });

                            function callParallax(e, parent) {
                                parallaxIt(e, parent, parent.querySelector(".parallax-element"), 20);
                            }

                            function parallaxIt(e, parent, target, movement) {
                                var boundingRect = parent.getBoundingClientRect();
                                var relX = e.pageX - boundingRect.left;
                                var relY = e.pageY - boundingRect.top;
                                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                                gsap.to(target, {
                                    duration: 0.3,
                                    x: (relX - boundingRect.width / 2) / boundingRect.width * movement,
                                    y: (relY - boundingRect.height / 2 - scrollTop) / boundingRect.height * movement,
                                    ease: Power2.easeOut
                                });
                            }

                            function parallaxCursor(e, parent, movement) {
                                var rect = parent.getBoundingClientRect();
                                var relX = e.pageX - rect.left;
                                var relY = e.pageY - rect.top;
                                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                                pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
                                pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2 - scrollTop) / movement;
                                gsap.to(ball, {
                                    duration: 0.3,
                                    x: pos.x,
                                    y: pos.y
                                });
                            }

                            $(".hide-ball").mouseenter(function(e) {
                                gsap.to('#ball', {
                                    duration: 0.2,
                                    borderWidth: '1px',
                                    scale: 1,
                                    opacity: 0
                                });
                            });

                            $(".hide-ball").mouseleave(function(e) {
                                gsap.to('#ball', {
                                    duration: 0.2,
                                    borderWidth: '4px',
                                    scale: 0.5,
                                    opacity: 1
                                });
                            });

                            $(".link, .button").mouseenter(function(e) {
                                gsap.to('#ball', {
                                    duration: 0.2,
                                    borderWidth: "0px",
                                    scale: 1.5,
                                    backgroundColor: "rgba(153, 153, 153, 1)",
                                    opacity: 0.15
                                });
                                gsap.to('#ball-loader', {
                                    duration: 0.2,
                                    borderWidth: '2px',
                                    top: 4,
                                    left: 4
                                });
                            });

                            $(".link, .button").mouseleave(function(e) {
                                gsap.to('#ball', {
                                    duration: 0.3,
                                    borderWidth: "4px",
                                    scale: 0.5,
                                    backgroundColor: "rgba(153, 153, 153, 0)",
                                    opacity: 1
                                });
                                gsap.to('#ball-loader', {
                                    duration: 0.2,
                                    borderWidth: '4px',
                                    top: 0,
                                    left: 0
                                });
                            });

                            //Blog Hover Effects			
                            $("#blog-page-nav .page-numbers li a, .post-page-numbers, #post-content a, #post-form a, #post-comments a, .wp-block-search__button, .clapat-sidebar-widget a").mouseenter(function(e) {
                                gsap.to('#ball', {
                                    duration: 0.2,
                                    borderWidth: '1px',
                                    scale: 1,
                                    opacity: 0
                                });
                            });

                            $("#blog-page-nav .page-numbers li a, .post-page-numbers, #post-content a, #post-form a, #post-comments a, .wp-block-search__button, .clapat-sidebar-widget a").mouseleave(function(e) {
                                gsap.to('#ball', {
                                    duration: 0.3,
                                    borderWidth: '4px',
                                    scale: 0.5,
                                    opacity: 1
                                });
                            });
                        }




                        if (!transitionsSupported()) isAnimating = false;
                    }, delay);
                    if (url != window.location && bool) {
                        window.history.pushState({
                            path: url
                        }, '', url);
                    }
                });
            }

            function transitionsSupported() {
                return $('html').hasClass('csstransitions');
            }
        });


    } // End Core


});

// Export functions to scripts
var ScrollEffects = window.ScrollEffects;
var FitThumbScreenWEBGL = window.FitThumbScreenWEBGL;
var FitThumbScreenGSAP = window.FitThumbScreenGSAP;
var Shortcodes = window.Shortcodes;
var Sliders = window.Sliders;
var JustifiedGrid = window.JustifiedGrid;
var Lightbox = window.Lightbox;
var PlayVideo = window.PlayVideo;
var isMobile = window.isMobile;
var Core = window.Core;