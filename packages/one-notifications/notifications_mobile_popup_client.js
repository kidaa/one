
Template.notificationsMobilePopup.created = function () {
  var mySwiper = new ReactiveVar();
};

Template.notificationsMobilePopup.rendered = function () {
  //initialize swiper when document ready  
  mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    // loop: true,
    spaceBetween: 20,
    pagination: '.swiper-pagination',
    slidesPerView: 'auto',
    centeredSlides: true,
    paginationClickable: true
  });      
};



Template.notificationsMobilePopup.helpers({
  // TODO: Should only return true if there are notifications
  'haveNotifications': function () {
    return Notify.getUnreadNotifications().count() ? true : false;
  },
  notificationsUnread: function () {
    return Notify.getUnreadNotifications();
  },
  date: function (dateToFormat) {
    return moment(dateToFormat).calendar();
  }
});

Template.notificationsMobilePopup.events({
  // Hides .notice when .x is clicked & updates database
  'click .x': function (event) {
    var $this = $(event.target);
    var $slide = $this.closest( '.swiper-slide' );
    $slide.velocity( "slideUp", { duration: 500 } );
    Notify.markNotificationAsRead($(event.currentTarget).data("id"));
    setTimeout(function(){ 
      $slide.remove();
      // Getting "undefined" error for these, also a 500 error for Notify 
      // mySwiper.updatePagination();
      // mySwiper.updateClasses();
      // mySwiper.update();
      // mySwiper.slideNext();
    }, 500);
    
  }
});

// Template.notificationsMobilePopup.gestures({
//   // move carousel on swipe
//   'swipeleft .notifications-mobile-popup': function () {
//     $( "#notifications-carousel-left" ).click();
//   },
//   'swiperight .notifications-mobile-popup': function () {
//     $( "#notifications-carousel-right" ).click();
//   }
// });