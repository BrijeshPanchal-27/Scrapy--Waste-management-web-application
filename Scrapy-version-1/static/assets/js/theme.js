(function ($) {
    'use strict';

    if ($('.nav-tabs').length) {
        $('.nav-tabs').each(function () {
            let navTab = $(this);
            navTab.find('li').on('click', function () {
                navTab.find('li').removeClass('active');
                $(this).addClass('active');
            });
        });
    }

    // Single Features Active
    $('.nano-area').on('mouseover', '.nano-item', function () {
        $('.nano-item.active').removeClass('active');
        $(this).addClass('active');
    });

    const hideCommentBtn = document.querySelectorAll(
        '.blog-details__hide-comment'
    );

    if (hideCommentBtn.length) {
        hideCommentBtn.forEach((hideCommentBtn, index) => {
            hideCommentBtn.addEventListener('click', (event) => {
                event.preventDefault();
                let textVariable = event.target.dataset.toggletext;
                let textContent = event.target.textContent;
                let targetForToggle = event.target.dataset.targetForToggle;
                event.target.dataset.toggletext = textContent;
                event.target.textContent = textVariable;
                $(targetForToggle).slideToggle();
            });
        });
    }

    if ($('.curved-circle').length) {
        $('.curved-circle').circleType({
            position: 'absolute',
            dir: 0.95,
            radius: 85,
            forceHeight: false,
            forceWidth: true,
        });
    }

    if ($('.topbar-one__toggler').length) {
        $('.topbar-one__toggler').on('click', function () {
            $('.topbar-one').slideToggle();
            $(this).toggleClass('open');
        });
    }

    function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split('/').reverse()[0];

        selector.find('li').each(function () {
            let anchor = $(this).find('a');
            if ($(anchor).attr('href') == FileName) {
                $(this).addClass('current');
            }
        });
        // if any li has .current elmnt add class
        selector.children('li').each(function () {
            if ($(this).find('.current').length) {
                $(this).addClass('current');
            }
        });
        // if no file name return
        if ('' == FileName) {
            selector.find('li').eq(0).addClass('current');
        }
    }

    // mobile menu

    if ($('.main-nav__main-navigation').length) {
        let mobileNavContainer = $('.mobile-nav__container');
        let mainNavContent = $('.main-nav__main-navigation').html();

        mobileNavContainer.append(function () {
            return mainNavContent;
        });

        // dynamic current class
        let mainNavUL = $('.main-nav__main-navigation').find(
            '.main-nav__navigation-box'
        );
        let mobileNavUL = mobileNavContainer.find('.main-nav__navigation-box');
        mobileNavUL
            .find('li.dropdown')
            .append(
                '<button class="dropdown-btn"><i class="fa fa-angle-right"></i></button>'
            );

        //Dropdown Button
        mobileNavContainer.find('.dropdown-btn').on('click', function () {
            $(this).toggleClass('open');
            $(this).prev('ul').slideToggle(500);
        });

        dynamicCurrentMenuClass(mainNavUL);
        dynamicCurrentMenuClass(mobileNavUL);
    }

    if ($('.mc-form').length) {
        var mcURL = $('.mc-form').data('url');
        $('.mc-form').ajaxChimp({
            url: mcURL,
            callback: function (resp) {
                // appending response
                $('.mc-form__response').append(function () {
                    return '<p class="mc-message">' + resp.msg + '</p>';
                });
                // making things based on response
                if (resp.result === 'success') {
                    // Do stuff
                    $('.mc-form').removeClass('errored').addClass('successed');
                    $('.mc-form__response')
                        .removeClass('errored')
                        .addClass('successed');
                    $('.mc-form').find('input').val('');

                    $('.mc-form__response p').fadeOut(10000);
                }
                if (resp.result === 'error') {
                    $('.mc-form').removeClass('successed').addClass('errored');
                    $('.mc-form__response')
                        .removeClass('successed')
                        .addClass('errored');
                    $('.mc-form').find('input').val('');

                    $('.mc-form__response p').fadeOut(10000);
                }
            },
        });
    }

    if ($('.datepicker').length) {
        $('.datepicker').datepicker();
    }

    if ($('.plan-visit__tab-links').length) {
        var planVisitLink = $('.plan-visit__tab-links').find('.nav-link');
        planVisitLink.on('click', function (e) {
            var target = $(this).attr('data-target');
            // animate
            $('html, body').animate(
                {
                    scrollTop: $(target).offset().top - 50,
                },
                1000
            );

            planVisitLink.removeClass('active');
            $(this).addClass('active');

            return false;
        });
    }


    if ($('.counter').length) {
        $('.counter').counterUp({
            delay: 10,
            time: 1500,
        });
    }
    if ($('.img-popup').length) {
        var groups = {};
        $('.img-popup').each(function () {
            var id = parseInt($(this).attr('data-group'), 10);

            if (!groups[id]) {
                groups[id] = [];
            }

            groups[id].push(this);
        });

        $.each(groups, function () {
            $(this).magnificPopup({
                type: 'image',
                closeOnContentClick: true,
                closeBtnInside: false,
                gallery: {
                    enabled: true,
                },
            });
        });
    }
    if ($('.wow').length) {
        var wow = new WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)

            mobile: true, // trigger animations on mobile devices (default is true)
            live: true, // act on asynchronously loaded content (default is true)
        });
        wow.init();
    }

    if ($('.video-popup').length) {
        $('.video-popup').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: true,

            fixedContentPos: false,
        });
    }
    if ($('[data-toggle="tooltip"]').length) {
        $('[data-toggle="tooltip"]').tooltip();
    }
    if ($('.stricky').length) {
        $('.stricky')
            .addClass('original')
            .clone(true)
            .insertAfter('.stricky')
            .addClass('stricked-menu')
            .removeClass('original');
    }
    if ($('.scroll-to-target').length) {
        $('.scroll-to-target').on('click', function () {
            var target = $(this).attr('data-target');
            // animate
            $('html, body').animate(
                {
                    scrollTop: $(target).offset().top,
                },
                1000
            );

            return false;
        });
    }

    if ($('.side-menu__toggler').length) {
        $('.side-menu__toggler').on('click', function (e) {
            $('.side-menu__block').toggleClass('active');
            e.preventDefault();
        });
    }

    if ($('.side-menu__block-overlay').length) {
        $('.side-menu__block-overlay').on('click', function (e) {
            $('.side-menu__block').removeClass('active');
            e.preventDefault();
        });
    }

    if ($('.side-content__toggler').length) {
        $('.side-content__toggler').on('click', function (e) {
            $('.side-content__block').toggleClass('active');
            $('body').toggleClass('scrollLock');
            e.preventDefault();
        });
    }

    if ($('.side-content__block-overlay').length) {
        $('.side-content__block-overlay').on('click', function (e) {
            $('.side-content__block').removeClass('active');
            $('body').removeClass('scrollLock');
            e.preventDefault();
        });
    }
    if ($('.side-content__close').length) {
        $('.side-content__close').on('click', function (e) {
            $('.side-content__block').removeClass('active');
            $('body').removeClass('scrollLock');
            e.preventDefault();
        });
    }

    if ($('.search-popup__toggler').length) {
        $('.search-popup__toggler').on('click', function (e) {
            $('.search-popup').addClass('active');
            e.preventDefault();
        });
    }

    if ($('.search-popup__overlay').length) {
        $('.search-popup__overlay').on('click', function (e) {
            $('.search-popup').removeClass('active');
            e.preventDefault();
        });
    }
    $(window).on('scroll', function () {
        if ($('.scroll-to-top').length) {
            var strickyScrollPos = 100;
            if ($(window).scrollTop() > strickyScrollPos) {
                $('.scroll-to-top').fadeIn(500);
            } else if ($(this).scrollTop() <= strickyScrollPos) {
                $('.scroll-to-top').fadeOut(500);
            }
        }
        if ($('.stricked-menu').length) {
            var headerScrollPos = 180;
            var stricky = $('.stricked-menu');
            var y = $(window).scrollTop();
            var speed = 0.05;
            var pos = y * speed;
            var maxPos = 130;

            if (y > headerScrollPos) {
                stricky.addClass('stricky-fixed');
            } else if ($(this).scrollTop() <= headerScrollPos) {
                stricky.removeClass('stricky-fixed');
            }
        }
    });

    if ($('.accrodion-grp').length) {
        var accrodionGrp = $('.accrodion-grp');
        accrodionGrp.each(function () {
            var accrodionName = $(this).data('grp-name');
            var Self = $(this);
            var accordion = Self.find('.accrodion');
            Self.addClass(accrodionName);
            Self.find('.accrodion .accrodion-content').hide();
            Self.find('.accrodion.active').find('.accrodion-content').show();
            accordion.each(function () {
                $(this)
                    .find('.accrodion-title')
                    .on('click', function () {
                        if ($(this).parent().hasClass('active') === false) {
                            $('.accrodion-grp.' + accrodionName)
                                .find('.accrodion')
                                .removeClass('active');
                            $('.accrodion-grp.' + accrodionName)
                                .find('.accrodion')
                                .find('.accrodion-content')
                                .slideUp();
                            $(this).parent().addClass('active');
                            $(this)
                                .parent()
                                .find('.accrodion-content')
                                .slideDown();
                        }
                    });
            });
        });
    }

    if ($('.thm__owl-carousel').length) {
        $('.thm__owl-carousel').each(function () {
            var Self = $(this);
            var carouselOptions = Self.data('options');
            var carouselPrevSelector = Self.data('carousel-prev-btn');
            var carouselNextSelector = Self.data('carousel-next-btn');
            var carouselDotsContainer = Self.data('carousel-dots-container');
            var thmCarousel = Self.owlCarousel(carouselOptions);
            if (carouselPrevSelector !== undefined) {
                $(carouselPrevSelector).on('click', function () {
                    thmCarousel.trigger('prev.owl.carousel', [1000]);
                    return false;
                });
            }
            if (carouselNextSelector !== undefined) {
                $(carouselNextSelector).on('click', function () {
                    thmCarousel.trigger('next.owl.carousel', [1000]);
                    return false;
                });
            }
            if (carouselDotsContainer !== undefined) {
                $(carouselDotsContainer)
                    .find('.owl-dot')
                    .on('click', function () {
                        var dotIndex = $(this).index();
                        // $(carouselDotsContainer).find('.owl-dot').removeClass('active');
                        // $(carouselDotsContainer).find('.owl-dot').eq(dotIndex).addClass('active');
                        thmCarousel.trigger('to.owl.carousel', [
                            dotIndex,
                            1000,
                        ]);
                    });
            }
        });
    }

    $(window).on('load', function () {
        if ($('.preloader').length) {
            $('.preloader').fadeOut('slow');
        }

        if ($('.side-menu__block-inner').length) {
            $('.side-menu__block-inner').mCustomScrollbar({
                axis: 'y',
                theme: 'dark',
            });
        }

        if ($('.custom-cursor__overlay').length) {
            // / cursor /
            var cursor = $('.custom-cursor__overlay .cursor'),
                follower = $('.custom-cursor__overlay .cursor-follower');

            var posX = 0,
                posY = 0;

            var mouseX = 0,
                mouseY = 0;

            TweenMax.to({}, 0.016, {
                repeat: -1,
                onRepeat: function () {
                    posX += (mouseX - posX) / 9;
                    posY += (mouseY - posY) / 9;

                    TweenMax.set(follower, {
                        css: {
                            left: posX - 22,
                            top: posY - 22,
                        },
                    });

                    TweenMax.set(cursor, {
                        css: {
                            left: mouseX,
                            top: mouseY,
                        },
                    });
                },
            });

            $(document).on('mousemove', function (e) {
                var scrollTop =
                    window.pageYOffset || document.documentElement.scrollTop;
                mouseX = e.pageX;
                mouseY = e.pageY - scrollTop;
            });
            $('button, a').on('mouseenter', function () {
                cursor.addClass('active');
                follower.addClass('active');
            });
            $('button, a').on('mouseleave', function () {
                cursor.removeClass('active');
                follower.removeClass('active');
            });
            $('.custom-cursor__overlay').on('mouseenter', function () {
                cursor.addClass('close-cursor');
                follower.addClass('close-cursor');
            });
            $('.custom-cursor__overlay').on('mouseleave', function () {
                cursor.removeClass('close-cursor');
                follower.removeClass('close-cursor');
            });
        }

        if ($('.masonary-layout').length) {
            $('.masonary-layout').isotope({
                layoutMode: 'masonry',
                itemSelector: '.masonary-item',
            });
        }

        if ($('.post-filter').length) {
            var postFilterList = $('.post-filter li');
            // for first init
            $('.filter-layout').isotope({
                filter: '.filter-item',
                animationOptions: {
                    duration: 500,
                    easing: 'linear',
                    queue: false,
                },
            });
            // on click filter links
            postFilterList.children('span').on('click', function () {
                var Self = $(this);
                var selector = Self.parent().attr('data-filter');
                postFilterList.children('span').parent().removeClass('active');
                Self.parent().addClass('active');

                $('.filter-layout').isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 500,
                        easing: 'linear',
                        queue: false,
                    },
                });
                return false;
            });
        }

        if ($('.post-filter.has-dynamic-filter-counter').length) {
            // var allItem = $('.single-filter-item').length;

            var activeFilterItem = $(
                '.post-filter.has-dynamic-filter-counter'
            ).find('li');

            activeFilterItem.each(function () {
                var filterElement = $(this).data('filter');
                var count = $('.gallery-content').find(filterElement).length;
                $(this)
                    .children('span')
                    .append('<span class="count"><b>' + count + '</b></span>');
            });
        }

        if ($('.testimonials-two__thumb-carousel').length) {
            var testiTwoThumbCarousel = new Swiper(
                '.testimonials-two__thumb-carousel',
                {
                    slidesPerView: 3,
                    spaceBetween: 20,
                    freeMode: true,
                    speed: 1400,
                    watchSlidesVisibility: true,
                    watchSlidesProgress: true,
                    loop: true,
                    autoplay: {
                        delay: 5000,
                    },
                }
            );
        }

        if ($('.testimonials-two__carousel').length) {
            var testiTwoCarousel = new Swiper('.testimonials-two__carousel', {
                navigation: {
                    nextEl: '',
                    prevEl: '',
                },
                observer: true,
                observeParents: true,
                speed: 1400,
                mousewheel: true,
                autoplay: {
                    delay: 5000,
                },
                thumbs: {
                    swiper: testiTwoThumbCarousel,
                },
            });
        }


        // banner-carousel
        if ($('.banner-carousel').length) {
            $('.banner-carousel').owlCarousel({
                loop:true,
                margin:0,
                nav:true,
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                active: true,
                smartSpeed: 1000,
                autoplay: 6000,
                navText: [ '<span class="far fa-angle-up"></span>', '<span class="far fa-angle-down"></span>' ],
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:1
                    },
                    800:{
                        items:1
                    },
                    1024:{
                        items:1
                    }
                }
            });
        }

        // banner-carousel
        if ($('.banner-carousel-2').length) {
            $('.banner-carousel-2').owlCarousel({
                loop:true,
                margin:0,
                nav:true,
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                active: true,
                smartSpeed: 1000,
                autoplay: 6000,
                navText: [ '<span class="far fa-angle-left"></span>', '<span class="far fa-angle-right"></span>' ],
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:1
                    },
                    800:{
                        items:1
                    },
                    1024:{
                        items:1
                    }
                }
            });
        }


        //Fact Counter + Text Count
    if($('.count-box').length){
        $('.count-box').appear(function(){
    
            var $t = $(this),
                n = $t.find(".count-text").attr("data-stop"),
                r = parseInt($t.find(".count-text").attr("data-speed"), 10);
                
            if (!$t.hasClass("counted")) {
                $t.addClass("counted");
                $({
                    countNum: $t.find(".count-text").text()
                }).animate({
                    countNum: n
                }, {
                    duration: r,
                    easing: "linear",
                    step: function() {
                        $t.find(".count-text").text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $t.find(".count-text").text(this.countNum);
                    }
                });
            }
            
        },{accY: 0});
    }


    // Progress Bar
    if ($('.count-bar').length) {
        $('.count-bar').appear(function(){
            var el = $(this);
            var percent = el.data('percent');
            $(el).css('width',percent).addClass('counted');
        },{accY: -50});

    }


    //Client Testimonial Carousel
    if ($('.client-testimonial-carousel').length && $('.client-thumbs-carousel').length) {

        var $sync3 = $(".client-testimonial-carousel"),
            $sync4 = $(".client-thumbs-carousel"),
            flag = false,
            duration = 500;

            $sync3
                .owlCarousel({
                    loop:true,
                    items: 1,
                    margin: 0,
                    nav: true,
                    navText: [ '<span class="far fa-long-arrow-up"></span>', '<span class="far fa-long-arrow-down"></span>' ],
                    dots: true,
                    autoplay: true,
                    autoplayTimeout: 5000
                })
                .on('changed.owl.carousel', function (e) {
                    if (!flag) {
                        flag = false;
                        $sync4.trigger('to.owl.carousel', [e.item.index, duration, true]);
                        flag = false;
                    }
                });

            $sync4
                .owlCarousel({
                    loop:true,
                    margin:5,
                    items: 1,
                    nav: false,
                    navText: [ '<span class="fas fa-long-arrow-up"></span>', '<span class="fas fa-long-arrow-down"></span>' ],
                    dots: true,
                    center: false,
                    autoplay: true,
                    autoplayTimeout: 5000,
                    responsive: {
                        0:{
                            items:1,
                            autoWidth: false
                        },
                        400:{
                            items:1,
                            autoWidth: false
                        },
                        600:{
                            items:1,
                            autoWidth: false
                        },
                        1000:{
                            items:1,
                            autoWidth: false
                        },
                        1200:{
                            items:1,
                            autoWidth: false
                        }
                    },
                })
                
        .on('click', '.owl-item', function () {
            $sync3.trigger('to.owl.carousel', [$(this).index(), duration, true]);
        })
        .on('changed.owl.carousel', function (e) {
            if (!flag) {
                flag = true;        
                $sync3.trigger('to.owl.carousel', [e.item.index, duration, true]);
                flag = false;
            }
        });
    } 


    //Tabs Box
    if($('.tabs-box').length){
        $('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
            e.preventDefault();
            var target = $($(this).attr('data-tab'));
            
            if ($(target).is(':visible')){
                return false;
            }else{
                target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
                $(this).addClass('active-btn');
                target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
                target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
                $(target).fadeIn(300);
                $(target).addClass('active-tab');
            }
        });
    }
    

    });
})(jQuery);
