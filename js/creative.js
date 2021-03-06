/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Fit Text Plugin for Main Header
    /*
    $("h1").fitText(
        1.2, {
            minFontSize: '35px',
            maxFontSize: '65px'
        }
    );
    */
    
    /* Type Effect in Header */
    function typeEffect(element, text) {
        var i = 1;
        
        var tick = function () {
            element.text(text.substr(0, i));
            
            if(i < text.length) {
                i++;
                setTimeout(tick, 75);
            }
        };
        
        tick();        
    }
    
    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Initialize WOW.js Scrolling Animations
    new WOW({mobile: false}).init();
    
    // Disable Carousel on Mobile
    // Depends on xs-test element w/ visible-xs-block class + bootstrap
    if($("#xs-test").is(":visible")) {
        
        // Carousel doesn't give us an event for when it starts, so a timeout 
        // is necessary
        setTimeout(function () {
            $("#testimony").carousel("pause");
        }, 500);
    }
    
    // Carousel Swipe EVents on Mobile
    $("#testimony").swiperight(function() {  
        $("#testimony").carousel('prev');  
    });  
    $("#testimony").swipeleft(function() {  
        $("#testimony").carousel('next');  
    });  

    // Simple Email Decryption
    // http://rot13.florianbersier.com/    
    //document.getElementById("obf").innerHTML="<n uers=\"znvygb:uryyb@yrnazrnagrpu.pbz\" >uryyb@yrnazrnagrpu.pbz</n>".replace(/[a-zA-Z]/g,function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);});
    
    // Contact Form Submission
    $("#contact form").submit(function( event ) {
        event.preventDefault();
        
        var sendTo = "uryyb@yrnazrnagrpu.pbz".replace(/[a-zA-Z]/g,function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);})
        
        function validateEmail(email) {
            var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailReg.test(email);
        }
        
        var valid = true;
        
        var contact_name = $(this).find("#contact_name");
        if(!contact_name.val() || contact_name.val().length < 3) {
            contact_name.parent().addClass("has-feedback has-error");
            valid = false;
        } else {
            contact_name.parent().removeClass("has-feedback has-error");
        }
        
        var contact_email = $(this).find("#contact_email");
        if(!contact_email.val() || !validateEmail(contact_email.val())) {
            contact_email.parent().addClass("has-feedback has-error");
            valid = false;
        } else {
            contact_email.parent().removeClass("has-feedback has-error");
        }
        
        var contact_message = $(this).find("#contact_message");
        if(!contact_message.val() || contact_message.val().length < 10) {
            contact_message.parent().addClass("has-error");
            valid = false;
        } else {
            contact_message.parent().removeClass("has-error");
        }
        
        if(!valid) {
            return;
        }
        
        $($(this)).hide();
        $("#contact .pending").show();
        
        var url = "https://formspree.io/" + sendTo;
        var data = {"email": contact_email.val(), "name": contact_name.val(), "message": contact_message.val()}
        
        $.ajax({
            url: url,
            method: "POST",
            data: data,
            dataType: "json"
        }).done(function() {
            $("#contact .success").show();
        }).fail(function() {
            $("#contact .failure").show();
        }).always(function() {
            $("#contact .pending").hide();
        });        
    });
    
    var start = false;
    
    function hideBlankout() {
        if(!start) {
            typeEffect($("#header-type-effect"), "App by App");
            $("#blankout").hide();
            $("#blankout-hint").hide();
            start = true;
        }
    }
    
    $("#blankout-hint").load(hideBlankout);
    $(window).load(hideBlankout);
    
    // Map
    $.getScript("https://api.tiles.mapbox.com/mapbox-gl-js/v0.16.0/mapbox-gl.js").done(function(script, textStatus) {
        $("#map").show();
        mapboxgl.accessToken = 'pk.eyJ1IjoibG10LWFlcmdhc2hldiIsImEiOiJjaW1jZjU3aGwwMDB1dWRrb2t6NDg3cGlmIn0.hOjOYqYQlRzKNTQfr53etQ';
        var mapOptions = {
            container: 'map',
            style: 'mapbox://styles/mapbox/light-v8',
            zoom: 14,
            center: [-97.743202, 30.267000],
            pitch: 30,
            bearing: 0,
            interactive: false
        }
        
        if (!mapboxgl.supported()) {
            
        } else {
            var map = new mapboxgl.Map(mapOptions);
            
            map.on('style.load', function () {
                map.addSource("symbols", {
                    "type": "geojson",
                    "data": {
                        "type": "FeatureCollection",
                        "features": [
                            {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [
                                        -97.743000,
                                        30.268603
                                    ]
                                }
                            }
                        ]
                    }
                });
                
                // These guys don't support markers with a color, seriously...?
                map.addLayer({
                    "id": "symbols",
                    "type": "circle",
                    "source": "symbols",
                    "paint": {"circle-color": "#a92d2d", "circle-radius": 7}
                });
            });
        }
    });
})(jQuery); // End of use strict
