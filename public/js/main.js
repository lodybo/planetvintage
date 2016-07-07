;(function ($) {
  // First, vertically center the heroImg
  centerheroImg();

  // Add an eventlistener in case the window height changes
  $(window).resize(function () {
    centerheroImg();
  });

  // Also add an event listener when the hero image has loaded, we may need to adjust the height of the hero and such the spacing of the page
  $(".hero img").load(centerheroImg);
  

})(jQuery);

function centerheroImg() {
    // Get elements
    var hero = $(".hero");
    var heroImg = $(".hero img");

    // First set the height of the hero to that of the image
    hero.height(heroImg.innerHeight());

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