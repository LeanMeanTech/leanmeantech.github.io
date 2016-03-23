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
    
    typeEffect($("#header-type-effect"), "App by App");

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Initialize WOW.js Scrolling Animations
    new WOW({mobile: false}).init();

    // Simple Email Decryption
    // http://rot13.florianbersier.com/    
    document.getElementById("obf").innerHTML="<n uers=\"znvygb:uryyb@yrnazrnagrpu.pbz\" >uryyb@yrnazrnagrpu.pbz</n>".replace(/[a-zA-Z]/g,function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);});
    
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
    
})(jQuery); // End of use strict