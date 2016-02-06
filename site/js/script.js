/*
 * holly yoga primary script file
 * Leon Slater
 * http://mynamesleon.com
 */
(function ($, client) {
    'use strict';

    var resizeTimer,
        $window = $(window);

    /* ----------------------------
        main functions
       ---------------------------- */

    function googleMap() {

        window.initMaps = function () {
            $('.map-holder').each(function () {
                var map,
                    marker,
                    $holder = $(this),
                    coords = $holder.data('coords').split(','),
                    position = {
                        lat: parseFloat(coords[0].replace(' ', '')),
                        lng: parseFloat(coords[1].replace(' ', ''))
                    };

                map = new google.maps.Map($holder[0], {
                    center: position,
                    zoom: 14,
                    mapTypeControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    scaleControl: false
                });

                marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    icon: '/img/icons/marker-1.png'
                });

                $window.on('resizeEnd', function () {
                    map.setCenter(position);
                });
            });
        };

        function loadMap() {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'http://maps.googleapis.com/maps/api/js?callback=initMaps';
            document.getElementsByTagName('head')[0].appendChild(script);
        }

        loadMap();
    }

    function contactForm() {
        var $form = $(this).find('form'),
            $submit = $form.find('input[type="submit"]'),
            $inputs = $form.find('input, textarea').not($submit),
            $response = $form.find('.response'),
            formSubmit;

        function emptyCheck() {
            var $input = $(this),
                isRequired = $input.data('required') === true,
                regEx;

            if (isRequired) {
                if ($.trim($input.val()) === '') {
                    $input.parent().addClass('error');
                } else {
                    $input.parent().removeClass('error');
                }
            }

            if (!!$input.data('pattern')) {
                regEx = new RegExp($input.data('pattern'));
                if (regEx.test($input.val()) === false) {
                    $input.parent().addClass('error');
                } else {
                    $input.parent().removeClass('error');
                }
            }
        }

        $inputs.on('blur', emptyCheck);

        $form.on('submit', function (e) {
            e.preventDefault();

            $inputs.each(emptyCheck);
            if ($form.find('label.error').length) {
                $response.addClass('hide');
                return;
            }

            if (formSubmit) {
                formSubmit.abort();
            }
            formSubmit = $.ajax({
                type: 'POST',
                url: $form.data('url'),
                data: $form.serialize(),
                success: function (response) {
                    $inputs.val('');
                    $response.removeClass('hide').text(response);
                }
            });
        });
    }

    /* ----------------------------
        document ready
       ---------------------------- */

    $(document).ready(function () {

        $('.image-fit-img').imageFit({
            useMargins: client.oldIE
        });

        if ($('.map-holder').length) {
            googleMap();
        }

        $('.module.form').each(contactForm);

    }); // dom ready end

    /* ----------------------------
        window resize
       ---------------------------- */

    $window.on('resize', function () {

        if (resizeTimer) {
            clearTimeout(resizeTimer);
        }

        resizeTimer = setTimeout(function () {
            $window.trigger('resizeEnd');
        });

    }); // window resize end

}(window.jQuery, window.client));
