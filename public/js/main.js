;(function ($) {
  // First, vertically center the jumbotron
  centerJumbotron();

  // Add an eventlistener in case the window height changes
  $(window).resize(function () {
    centerJumbotron();
  });

  // Also add an event listener when the hero image has loaded, we may need to adjust the height of the hero and such the spacing of the page
  $(".hero img").load(centerJumbotron);
  

})(jQuery);

function centerJumbotron() {
    // Get elements
    var hero = $(".hero");
    var jumbotron = $(".jumbotron");

    // First set the height of the hero to that of the image
    hero.height($(".hero img").innerHeight());

    // Get half point of elements
    var heroHalfPoint = hero.innerHeight() / 2;
    var jumbotronHalfPoint = jumbotron.innerHeight() / 2;
    
    // Set the top margin of the jumbotron to the half of the hero, and correct it with half of the jumbotron, only if that equation is more than 0
    var newMargin = heroHalfPoint - jumbotronHalfPoint >= 0 ? heroHalfPoint - jumbotronHalfPoint : 0;
    jumbotron.css("margin-top", newMargin);
  }