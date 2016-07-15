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

  function centerHeroImg() {
    // Exit function if no hero is found
    if ($(".hero").length === 0) {
      return;
    }
    
    // Get elements
    var hero = $(".hero");
    var heroImg = $(".hero img");

    // First set the height of the hero to that of the image + 50 pixels for "padding"
    hero.height(heroImg.innerHeight() + 50);

    // Get half point of elements
    var heroHeightHalfPoint = hero.innerHeight() / 2;
    var heroImgHeightHalfPoint = heroImg.innerHeight() / 2;

    var heroWidthHalfPoint = hero.innerWidth() / 2;
    var heroImgWidthHalfPoint = heroImg.innerWidth() / 2;
    
    // Set the top margin of the heroImg to the half of the hero, and correct it with half of the heroImg, only if that equation is more than 0
    var newTopMargin = heroHeightHalfPoint - heroImgHeightHalfPoint >= 0 ? heroHeightHalfPoint - heroImgHeightHalfPoint : 0;
    var newLeftMargin = heroWidthHalfPoint - heroImgWidthHalfPoint >= 0 ? heroWidthHalfPoint - heroImgWidthHalfPoint : 0;
    
    heroImg.css("margin-top", newTopMargin);
    heroImg.css("margin-left", newLeftMargin);
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

  $(document).ready(function() {
    // First: center hero image
    centerHeroImg();

    // And create Google Maps iFrame if needed
    googleMapsRequired();

    // Add an eventlistener in case the window height changes
    $window.resize(function () {
      // Center hero on resize
      centerHeroImg();
      
      // Do we need Google Maps?
      googleMapsRequired();
    });

    // Also add an event listener when the hero image has loaded, we may need to adjust the height of the hero and such the spacing of the page
    $(".hero img").load(centerHeroImg);

    // Now, calculate when to opaqueify the navigation
    $window.scroll(opaqueifyNav);

    // Replace the empty anchor of the contact link when clicked
    $("#contact-link").on( "click", function(event) {
      $(this).attr("href", "mailto:hi@planetvintage.rocks?subject=Hi!");
    });
  });
}(jQuery));