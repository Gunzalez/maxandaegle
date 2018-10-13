// JavaScript Document
(function ($, window) {

    var maxAndAegle = {};
    window.maxAndAegle = maxAndAegle;

    maxAndAegle.environment = {
        init: function (){

            console.log('Take a break!')


        }
    };


    maxAndAegle.homepageLink = {
        els: {
            link: $('.js-tilt')
        },

        init: function () {
            if(maxAndAegle.homepageLink.els.link.length){
                maxAndAegle.homepageLink.els.link.tilt({
                    // maxTilt:        20,
                    // perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
                    // easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
                    scale:          1.1      // 2 = 200%, 1.5 = 150%, etc..
                    // speed:          300,    // Speed of the enter/exit transition.
                    // transition:     true,   // Set a transition on enter/exit.
                    // disableAxis:    null,   // What axis should be disabled. Can be X or Y.
                    // reset:          true,   // If the tilt effect has to be reset on exit.
                    // glare:          false,  // Enables glare effect
                    // maxGlare:       1       // From 0 - 1.
                })
            }
        }
    };

    maxAndAegle.navigation = {

        status: '',

        els: {
            trigger: $('#nav-trigger-link'),
            navigation: $('#nav'),
            menu: $('#menu')
        },

        init: function () {
            this.els.trigger.on('click', function (ev) {
                ev.preventDefault();
                if(maxAndAegle.navigation.status !== 'open'){
                    maxAndAegle.navigation.els.navigation.height(maxAndAegle.navigation.els.menu.height());
                    maxAndAegle.navigation.status = 'open';
                    $(this).find('.hamburger').addClass('is-active');
                } else {
                    maxAndAegle.navigation.els.navigation.height(0);
                    maxAndAegle.navigation.status = '';
                    $(this).find('.hamburger').removeClass('is-active');
                }
            })
        }
    };


    // main init
    maxAndAegle.init = function () {
        // all init here
        maxAndAegle.environment.init();
        maxAndAegle.navigation.init();
        maxAndAegle.homepageLink.init();
    };



    // main init
    $(document).ready(function() {
        maxAndAegle.init();
    });

}(jQuery, window));