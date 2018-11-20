// JavaScript Document
(function ($, window) {

    var maxAndAegle = {};
    window.maxAndAegle = maxAndAegle;

    maxAndAegle.properties = {
        windowWidth: null
    };

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

    maxAndAegle.gallery = {

        images: [],
        currentImageIndex: null,

        els: {
            parentNode: $('#gallery-images'),
            thumbnails: $('#gallery-images').find('a'),
            overlay: null
        },

        hideOverlay: function(){
            $(maxAndAegle.gallery.overlay).removeClass('show');
            $('html').removeClass('no-scroll');
        },

        showOverlay: function(){
            $(maxAndAegle.gallery.overlay).addClass('show');
            $('html').addClass('no-scroll');
        },

        createOverlay: function(){

            maxAndAegle.gallery.overlay = $('<div id="overlay" />');

            $('body').prepend(maxAndAegle.gallery.overlay);

            $(maxAndAegle.gallery.overlay).on('click', function () {
                maxAndAegle.gallery.hideOverlay();
            });

            var $stage = $('<div id="stage" />'),
                $stageSets = $('<div class="stage-sets" />'),
                overlay = maxAndAegle.gallery.overlay,
                sets = ['left', 'center', 'right'],
                buttons = ['prev', 'next'];

            $stage.append($stageSets);
            for(var s=0; s<sets.length; s++){
                $stageSets.append($('<div class="stage-set stage-'+ sets[s] +'"><img class="image-' + sets[s] + '" /></div>'));
            }

            overlay.append($stage);

            for(var b=0; b<buttons.length; b++){
                $stage.append($('<div class="gallery-nav nav-'+ buttons[b] +'"><a href="" class="move-images hexagon direction-'+ buttons[b] +'" data-direction="'+ buttons[b] + '"></a></div>'));
            }

            $stage.on('click', '.move-images', function (evt) {
                evt.preventDefault();

                var buttonClicked = this,
                    direction = $(buttonClicked).attr('data-direction');

                maxAndAegle.gallery.moveImages(direction);
            });

            $stage.on('click', function (e) {
                e.stopPropagation();
            });

            var $closeButton = $('<div class="closeOverlay"><a href="" class="close-overlay-button">CLOSE</a></div>');
            overlay.append($closeButton);

            overlay.on('click', '.close-overlay-button', function (evt) {
                evt.preventDefault();
                maxAndAegle.gallery.hideOverlay();
            });
        },

        moveImages: function(direction){

            var currentImageIndex = maxAndAegle.gallery.currentImageIndex,
                newImageIndex = direction === 'next' ? (currentImageIndex + 1) : (currentImageIndex - 1),
                count = maxAndAegle.gallery.images.length - 1;

            if(newImageIndex > count){
                newImageIndex = 0;
            }

            if(newImageIndex < 0){
                newImageIndex = count;
            }

            maxAndAegle.gallery.setUpImagesWithIndex(newImageIndex);
        },

        getImageData: function(){
            var thumbnails =  maxAndAegle.gallery.els.thumbnails;
            for(var t=0; t<thumbnails.length; t++){
                maxAndAegle.gallery.images.push($(thumbnails[t]).attr('href'));
            }
        },

        setUpImagesWithIndex: function(index){

            maxAndAegle.gallery.currentImageIndex = index;

            var count = maxAndAegle.gallery.images.length - 1;

            var nextIndex = index + 1;
            if(nextIndex > count){
                nextIndex = 0;
            }

            var prevIndex = index - 1;
            if(prevIndex < 0){
                prevIndex = count;
            }

            maxAndAegle.gallery.overlay.find('.image-right').attr('src', maxAndAegle.gallery.images[nextIndex]);
            maxAndAegle.gallery.overlay.find('.image-center').attr('src', maxAndAegle.gallery.images[index]);
            maxAndAegle.gallery.overlay.find('.image-left').attr('src', maxAndAegle.gallery.images[prevIndex]);
        },

        init: function () {
            if(maxAndAegle.gallery.els.parentNode){

                maxAndAegle.gallery.createOverlay();

                maxAndAegle.gallery.getImageData();

                maxAndAegle.gallery.els.parentNode.on('click', 'a', function (evt) {

                    evt.preventDefault();

                    maxAndAegle.gallery.showOverlay();

                    maxAndAegle.gallery.setUpImagesWithIndex($(maxAndAegle.gallery.els.thumbnails).index(this));

                });
            }
        },

        resize: function () {

            if(maxAndAegle.properties.windowWidth && maxAndAegle.properties.windowWidth < 1400){
                $('.stage-set').width(800);
                $('.stage-sets').width(3 * $('.stage-set').outerWidth());
            } else {
                $('.stage-set').removeAttr('style');
                $('.stage-sets').removeAttr('style');
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
        maxAndAegle.gallery.init();

        $(window).on('resize', function () {

            var newWidth = $(window).width(),
                oldWidth = maxAndAegle.properties.windowWidth;

            if (oldWidth !== newWidth) {
                maxAndAegle.properties.windowWidth = newWidth;
                maxAndAegle.resize();
            }
        });

        // trigger initial resize, just to be sure
        maxAndAegle.resize();
        $(window).trigger('resize');
    };

    // main resize
    maxAndAegle.resize = function () {
        maxAndAegle.gallery.resize();
    };

    // main init call
    $(document).ready(function() {
        maxAndAegle.init();
    });

}(jQuery, window));