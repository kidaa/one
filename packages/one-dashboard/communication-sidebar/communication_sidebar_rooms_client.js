/* globals Rooms: true, RoomsController: true */
Template.communicationSidebarRooms.rendered = function(){

  // initialize maazalik:malihu-jquery-custom-scrollbar scrollbar plugin
  // Repeated to play nice with plugin
  $(".communication-sidebar-sleeve").mCustomScrollbar({
	  	theme:"one-light",
	  	scrollbarPosition: "inside"
  });

};

Template.communicationSidebarRooms.created = function() {
  Session.set('roomOpenId', false);
  Tracker.autorun(function() {
    Meteor.subscribe('room', Session.get('roomOpenId'));
  });
};

Template.communicationSidebarRoomsFill.helpers({
  rooms: function() {
    return Rooms.find({
      roomType: 'room'
    });
  },
  unreadMessages: function() {
    var roomCount = RoomsController.getUnreadMessagesCount(this._id);
    return (roomCount > 0) ? roomCount : false;
  }
});