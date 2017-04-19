(function ($) {
  // Settings
  var $window = $(window);
  var iFrameCreated = false;
  
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

  function googleMapsRequired() {
    // See if the screen is big enough and no iFrame has yet been created
    if ($window.width() >= 768 && !iFrameCreated && $(".google-maps").length > 0) {
      // Nope, go ahead!
      iFrameCreated = true;

      createGoogleMapsiFrame();
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
    $window.resize(function () {
      var windowWidth = $window.width();
      var logoWidth = logo.width();

      logo.css("left", (windowWidth / 2) - (logoWidth / 2));
    });
  }

  $(document).ready(function() {
    // And create Google Maps iFrame if needed
    googleMapsRequired();

    // Add an eventlistener in case the window height changes
    $window.resize(function () {      
      // Do we need Google Maps?
      googleMapsRequired();
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
    }
  });
}(jQuery));