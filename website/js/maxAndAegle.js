// JavaScript Document
(function ($, window) {

    var maxAndAegle = {};
    window.maxAndAegle = maxAndAegle;

    maxAndAegle.environment = {
        init: function (){

            console.log('Take a break!')


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
                } else {
                    maxAndAegle.navigation.els.navigation.height(0);
                    maxAndAegle.navigation.status = '';
                }
            })
        }
    };

    // main init
    maxAndAegle.init = function () { // all init here
        maxAndAegle.environment.init();
        maxAndAegle.navigation.init();
    };



    // main init
    $(document).ready(function() {
        maxAndAegle.init();
    });

}(jQuery, window));