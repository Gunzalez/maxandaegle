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
            $('html').removeClass('noScroll');
        },

        showOverlay: function(){
            $(maxAndAegle.gallery.overlay).addClass('show');
            $('html').addClass('noScroll');
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
                $stageSets.append($('<div class="stage-set stage-'+ sets[s] +'" />'));
            }

            overlay.append($stage);

            for(var b=0; b<buttons.length; b++){
                $stage.append($('<div class="gallery-nav nav-'+ buttons[b] +'"><a href="#" class="move-images" data-direction="'+ buttons[b] + '"></a></div>'));
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

            // add close button X
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

            maxAndAegle.gallery.setUpImagesBasedOn(newImageIndex);
        },

        getImageData: function(){
            var thumbnails =  maxAndAegle.gallery.els.thumbnails;
            for(var t=0; t<thumbnails.length; t++){
                maxAndAegle.gallery.images.push($(thumbnails[t]).attr('href'));
            }
        },

        setUpImagesBasedOn: function(index){

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

            var prevImageSrc = maxAndAegle.gallery.images[prevIndex],
                $prevImage = $('<img src="'+ prevImageSrc + '" alt="" />');

            var centerImageSrc = maxAndAegle.gallery.images[index],
                $centerImage = $('<img src="'+ centerImageSrc + '" alt="" />');

            var nextImageSrc = maxAndAegle.gallery.images[nextIndex],
                $nextImage = $('<img src="'+ nextImageSrc + '" alt="" />');

            maxAndAegle.gallery.overlay.find('.stage-center').empty().append($centerImage);
            maxAndAegle.gallery.overlay.find('.stage-left').empty().append($prevImage);
            maxAndAegle.gallery.overlay.find('.stage-right').empty().append($nextImage);
        },

        init: function () {
            if(maxAndAegle.gallery.els.parentNode){

                maxAndAegle.gallery.createOverlay();

                maxAndAegle.gallery.getImageData();

                maxAndAegle.gallery.els.parentNode.on('click', 'a', function (evt) {
                    evt.preventDefault();
                    maxAndAegle.gallery.showOverlay();

                    var index = $(maxAndAegle.gallery.els.thumbnails).index(this);
                    maxAndAegle.gallery.setUpImagesBasedOn(index);
                });

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
    };

    // main init call
    $(document).ready(function() {
        maxAndAegle.init();
    });

}(jQuery, window));