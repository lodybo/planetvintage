;(function ($) {
  // First: center hero image
  centerHeroImg();

  // Add an eventlistener in case the window height changes
  $(window).resize(function () {
    centerHeroImg();
  });

  // Also add an event listener when the hero image has loaded, we may need to adjust the height of the hero and such the spacing of the page
  $(".hero img").load(centerHeroImg);

  // Now, calculate when to opaqueify the navigation
  $(window).scroll(opaqueifyNav);
  

})(jQuery);

function centerHeroImg() {
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

  // Check if we've passed the threshold in our current scroll position
  if (currentScrollPosition > hero.threshold) {
    navbar.css("opacity", "1");
  } else {
    navbar.css("opacity", "0");
  }
}