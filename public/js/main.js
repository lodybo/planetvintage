(function ($) {
  // Settings
  var $window = $(window);
  var gMapsiFrameCreated = false;
  var fbiFrameCreated = false;
  
  function createGoogleMapsiFrame() {
    // Create iFrame for Google Maps
    var googleMapsDiv = $("#google-maps")[0];
    var iFrame = document.createElement("iframe");

    // Add options (attributes) for iFrame
    iFrame.width = "100%";
    iFrame.height = "550";
    iFrame.src = "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ96Va-mrZxkcRo16YiaFdpE0&key=AIzaSyBU4G1fF_bSnuC63CmRUN4u-fR4d0vUaaE";
    iFrame.frameBorder = 0;
    iFrame.style = "border: 0";

    // Add iFrame to Google Maps div
    googleMapsDiv.appendChild(iFrame);
  }

  function createFBiFrame() {
    // Create iFrame for Google Maps
    var fbDiv = $("#fb-aftermovie");
    fbDiv.css('display', 'none');
    var iFrame = document.createElement("iframe");

    // Add options (attributes) for iFrame
    iFrame.width = "750";
    iFrame.height = "450";
    iFrame.src = "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fplanetvintagerocks%2Fvideos%2F1632479373713610%2F&show_text=0&width=750";
    iFrame.frameBorder = 0;
    iFrame.style = "border:none;overflow:hidden";
    iFrame.scrolling="no";
    iFrame.frameborder="0";
    iFrame.allowTransparency=true;
    iFrame.allowFullScreen=true;

    // Add iFrame to Google Maps div
    fbDiv[0].appendChild(iFrame);
    $('.fake-fb-aftermovie-wrapper').css('display', 'block');

    // Hide fake image when iFrame is loaded
    $(iFrame).on('load', function () {
      $('.fake-fb-aftermovie-wrapper').css('display', '');
      fbDiv.css('display', '');
    });
  }

  function googleMapsRequired() {
    // See if the screen is big enough and no iFrame has yet been created
    if ($window.width() >= 768 && !gMapsiFrameCreated && $(".google-maps").length > 0) {
      // Nope, go ahead!
      gMapsiFrameCreated = true;

      createGoogleMapsiFrame();
    }
  }

  function FBRequired() {
    // See if the screen is big enough and no iFrame has yet been created
    if ($window.width() >= 768 && !fbiFrameCreated && $(".fb-aftermovie").length > 0) {
      // Nope, go ahead!
      fbiFrameCreated = true;

      createFBiFrame();
    }
  }

  function opaqueifyNav() {
    // Exit function if no hero is found
    if ($(".hero").length === 0) {
      return;
    }

    // Get reference to hero
    var hero = {
      el: $(".hero")
    };
    hero.top = hero.el.position().top;
    hero.height = hero.el.height();
    hero.threshold = hero.top + hero.height;

    // Get current scroll position
    var currentScrollPosition = $(window).scrollTop();

    // Get navbar
    var navbar = $(".navbar.navbar-fixed-top");

    // Check if we"ve passed the threshold in our current scroll position
    if (currentScrollPosition > hero.threshold) {
      navbar.css("opacity", "1");
    } else {
      navbar.css("opacity", "0");
    }
  }

  function centerLogo(logo) {
    var windowWidth = $window.width();
    var logoWidth = logo.width();

    logo.css("left", (windowWidth / 2) - (logoWidth / 2));
  }

  $(document).ready(function() {
    // And create Google Maps iFrame if needed
    googleMapsRequired();
    FBRequired();

    // Add an eventlistener in case the window height changes
    $window.resize(function () {      
      // Do we need Google Maps?
      googleMapsRequired();
      FBRequired();
    });

    // Now, calculate when to opaqueify the navigation
    $window.scroll(opaqueifyNav);

    // Replace the empty anchor of the contact link when clicked
    $("#contact-link").on( "click", function(event) {
      $(this).attr("href", "mailto:hi@planetvintage.rocks?subject=Hi!");
    });

    // Every image with the class "opcaify" can be opacified
    $(".opacify").fadeTo("slow", 1);

    // Look for a centered logo
    var logo = $("#logo-centered");
    if (logo) {
      centerLogo(logo);
      $window.resize(function () {
        centerLogo(logo)
      });
    }
  });
}(jQuery));