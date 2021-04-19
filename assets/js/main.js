(function($){
    
    "use strict";
    
    //===== Prealoder
    
    $(window).on('load', function(event) {
        $('.preloader').delay(500).fadeOut(500);
    });
    
    
    //===== Mobile Menu 
    
    $(".navbar-toggler").on('click', function() {
        $(this).toggleClass('active');
    });
    
    $(".navbar-nav a").on('click', function() {
        $(".navbar-toggler").removeClass('active');
    });
    
    
    //===== close navbar-collapse when a  clicked
    
    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });
    
    
    //===== Sticky
    
    $(window).on('scroll', function(event) {    
        var scroll = $(window).scrollTop();
        if (scroll < 10) {
            $(".navigation").removeClass("sticky");
        } else{
            $(".navigation").addClass("sticky");
        }
    });
    
    
    //===== Section Menu Active

    var scrollLink = $('.page-scroll');
        // Active link switching
        $(window).scroll(function() {
        var scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function() {

          var sectionOffset = $(this.hash).offset().top - 73;

          if ( sectionOffset <= scrollbarLocation ) {
            $(this).parent().addClass('active');
            $(this).parent().siblings().removeClass('active');
          }
        });
    });
    
    
    
    // Parallaxmouse js
    
    function parallaxMouse() {
        if ($('#parallax').length) {
            var scene = document.getElementById('parallax');
            var parallax = new Parallax(scene);
        };
    };
    parallaxMouse();
    
    
    //===== Progress Bar
    
    if($('.progress-line').length){
        $('.progress-line').appear(function(){
            var el = $(this);
            var percent = el.data('width');
            $(el).css('width',percent+'%');
        },{accY: 0});
    }
    
    
    //===== Counter Up
    
    $('.counter').counterUp({
        delay: 10,
        time: 1600,
    });
    
    
    //===== Magnific Popup
    
    $('.image-popup').magnificPopup({
      type: 'image',
      gallery:{
        enabled:true
      }
    });
    
    
    //===== Back to top
    
    // Show or hide the sticky footer button
    $(window).on('scroll', function(event) {
        if($(this).scrollTop() > 600){
            $('.back-to-top').fadeIn(200)
        } else{
            $('.back-to-top').fadeOut(200)
        }
    });
    
    
    //Animate the scroll to yop
    $('.back-to-top').on('click', function(event) {
        event.preventDefault();
        
        $('html, body').animate({
            scrollTop: 0,
        }, 1500);
    });
    

    
    //===== 
    
    var imgButterfly = $('.large.shiny.butterfly');
    var pos = document.getElementById('profile-button').getBoundingClientRect();
    var timelineFlutterFly = new TimelineMax({yoyo: true, repeat: -1}) 
      .to(imgButterfly,  1, { scaleX:0.5, ease: Back.easeInOut.config(1.7)})
      .to(imgButterfly, .3, { scaleX:1, ease: Back.easeInOut.config(1.7)}).delay(3);
     

    var img = $('.butterfly');
    var offset = img.offset();
    var center_x = (offset.left) + (51/2);
    var center_y = (offset.top) + (51/2);
    var mouse_x = window.innerWidth - 200;
    var mouse_y = window.innerHeight - 200; //evt.pageY;

    var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
    var degree = (radians * (180 / Math.PI) * 1); 
    var timelineMoveButterfly = new TimelineMax({
      yoyo: true
    })
      .to(imgButterfly,  1, { rotation: degree })
      .to(imgButterfly,  5, { left: mouse_x, top: mouse_y, ease: Power1.easeInOut})
      .to(imgButterfly,  1, { rotation: 0 })
      .to(imgButterfly,  1, { rotation: -31, ease: Power1.easeInOut})
      .to(imgButterfly,  5, { rotation: -34, ease: Power1.easeInOut})
      .to(imgButterfly,  1, { rotation: (180 / Math.PI) - degree })
      .to(imgButterfly,  5, { left:211, top: -18, ease: Power1.easeInOut})
      .to(imgButterfly,  1, { rotation: -31, ease: Power1.easeInOut}).delay(3);

    setInterval(function() {
      console.log(timelineMoveButterfly.totalProgress());
      if(timelineMoveButterfly.progress() == 1){
        timelineMoveButterfly.restart();
      }
    }, 5000)

    // $( "body" ).mousemove(function( event ) {
    //   var pageCoords = "( " + event.pageX + ", " + event.pageY + " )";
    //   var clientCoords = "( " + event.clientX + ", " + event.clientY + " )";
    //   console.log(clientCoords);
    //     var center_x = (offset.left) + (51/2);
    //     var center_y = (offset.top) + (51/2);

    //     var mouse_x = event.pageX;
    //     var mouse_y = event.pageY; //evt.pageY;

    //     var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
    //     var degree = (radians * (180 / Math.PI) * 1); 

    //     timelineMoveButterfly.to(imgButterfly,  .0, { rotation: degree })
    //       .to(imgButterfly,  .001, { left: mouse_x, top: mouse_y, ease: Back.easeInOut.config(1.7)});

    // });

    
}(jQuery));