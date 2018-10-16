// JavaScript Document
(function ($, window) {

    var maxAndAegle = {};
    window.maxAndAegle = maxAndAegle;

    maxAndAegle.environment = {
        init: function (){
            $('.initial-display-none').removeClass('initial-display-none');
        }
    };

    maxAndAegle.utils = {

        isValidEmail: function (item) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test($(item).val());
        },

        isEmpty: function(item){
            return $(item).val().length === 0;
        },

        setStateError: function (item) {
            $(item).parents('.form-group').addClass('error');
        }
    };

    maxAndAegle.homepageLink = {

        isTouchDevice: false,

        els: {
            link: $('.js-tilt')
        },

        tiltInit: function(){

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
        },

        init: function () {

            maxAndAegle.homepageLink.isTouchDevice = 'ontouchstart' in document.documentElement;

            if( !maxAndAegle.homepageLink.isTouchDevice ) {
                $('html').addClass('hover');
                maxAndAegle.homepageLink.tiltInit();
            }
        }
    };

    maxAndAegle.navigation = {

        els: {
            menu: $("#menu"),
            button: $('#menu-trigger'),
            api: null,
            homeLink: $('.home-link')
        },

        init: function () {

            if(maxAndAegle.navigation.els.menu.length){

                maxAndAegle.navigation.els.menu.mmenu({
                    "extensions": [
                        "pageshadow",
                        // "theme-dark",
                        "pagedim",
                        "effect-menu-slide",
                        "effect-listitems-slide"
                    ],
                    "offCanvas": {
                        "position": "right"
                    }
                });

                maxAndAegle.navigation.els.api = maxAndAegle.navigation.els.menu.data( "mmenu" );

                maxAndAegle.navigation.els.api.bind( "opened", function() {
                    maxAndAegle.navigation.els.button.find('.hamburger').addClass('is-active');
                });

                maxAndAegle.navigation.els.api.bind( "closed", function() {
                    maxAndAegle.navigation.els.button.find('.hamburger').removeClass('is-active');
                });
            }

            // home link effects
            this.els.homeLink.on('mouseover', function () {
                maxAndAegle.navigation.els.homeLink.parents('.nav-triggers').addClass('hover');
            }).on('mouseout', function () {
                maxAndAegle.navigation.els.homeLink.parents('.nav-triggers').removeClass('hover');
            });
        }
    };

    maxAndAegle.contact = {

        isValid: true,

        els: {
            form: $('#contact-form'),
            fields: []
        },

        init: function () {

            maxAndAegle.contact.els.form.on('submit', function () {

                maxAndAegle.contact.els.form.find('.error').removeClass('error');
                maxAndAegle.contact.isValid = true;

                maxAndAegle.contact.fields = maxAndAegle.contact.els.form.find('[required]');
                maxAndAegle.contact.fields.each(function (index, item) {

                    switch (item.type){
                        case 'email':
                            if(!maxAndAegle.utils.isValidEmail(item)){
                                maxAndAegle.contact.isValid = false;
                                maxAndAegle.utils.setStateError(item);
                            }
                            break;
                        default:
                            if(maxAndAegle.utils.isEmpty(item)){
                                maxAndAegle.contact.isValid = false;
                                maxAndAegle.utils.setStateError(item);
                            }
                    }
                });

                return maxAndAegle.contact.isValid
            })
        }
    };

    // main init
    maxAndAegle.init = function () {

        // all init here
        maxAndAegle.environment.init();
        maxAndAegle.navigation.init();
        maxAndAegle.homepageLink.init();
        maxAndAegle.contact.init();
    };

    // main init call
    $(document).ready(function() {
        maxAndAegle.init();
    });

}(jQuery, window));