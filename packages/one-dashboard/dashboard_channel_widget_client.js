/* globals RoomsController: false, Messages: false, Rooms: false */
Template.channelWidget.rendered = function () {
  Session.set('unreadDirty', true);
  // initialize maazalik:malihu-jquery-custom-scrollbar scrollbar plugin
  var $sleeve = $( ".conversation" );
  $sleeve.mCustomScrollbar({
      theme:"one-dark",
      scrollbarPosition: "inside",
      autoHideScrollbar: true,
      scrollInertia: 0,
      callbacks:{
        onInit: function(){
          this.mCustomScrollbar( "scrollTo", "bottom" );
        }
      }
  });
};

Template.channelWidget.helpers({
  unreadRooms: function() {
    //getting all unread messages first
    return RoomsController.getRoomsWithUnreadMessages();
  },
// TODO: Return the channel type. String (company, message, rooms)
//    (to be used as class name)
  channelType: function () {
    switch (this.roomType) {
      case 'office':
        return 'company';
      case 'company':
        return 'company';
      case 'dm':
        return 'message';
      default:
        return 'rooms';
      }
  },

// TODO: Return the descriptive channel type. String
//    (company channels, direct messaging, rooms)
  channelTypeLong: function () {
    switch (this.roomType) {
      case 'office':
        return 'company channels';
      case 'company':
        return 'company channels';
      case 'dm':
        return 'direct messaging';
      default:
        return 'rooms';
      }
  },

// TODO: Return the channel name. String. Title case
//    (Events, Listings, Dottie Herman, 575 Madison Ave)
  channelName: function () {
    if(this.roomType === 'dm') {
      var dmWith = _.find(this.participants, function(item) {
        return item.participantId !== Meteor.userId();
      });

      var user = Meteor.users.findOne(dmWith.participantId);
      return user.profile.firstName + ' ' + user.profile.lastName;
    }
    return this.roomName;
  },

// TODO: Return the number of unread messages
  unread: function () {
    return RoomsController.getUnreadMessagesCount(this._id);
  },
  messages: function() {
    return Messages.find({
      roomId: this._id,
      'messagePayload.draft': {
        $ne: true
      }
    },{
      sort: {
        dateCreated: 1
      }
    });
  },
  isSimpleMessage: function() {
    return (this.messageType === 'message' || ! this.messageType);
  },
  isPostMessage: function() {
    return (this.messageType === 'post');
  },
  isFirstUnread: function(roomId) {
    var room = Rooms.findOne(roomId);
    var latestTimestamp = null;
    var currentParticipant = _.where(room.participants,{
      participantId: Meteor.userId()
    });

    if (currentParticipant[0]) {
      latestTimestamp = currentParticipant[0].lastReadTimestamp;
    }
    if (! latestTimestamp )
      return false;

    var latestUnreadMessage = Messages.findOne({
      roomId: roomId,
      'messagePayload.draft': {
        $ne: true
      },
      dateCreated: {
        $gt: latestTimestamp
      }
    },{
      sort: {
        dateCreated: 1
      },
      limit: 1
    });
    return (latestUnreadMessage && latestUnreadMessage._id === this._id);
  }
});

Template.channelWidget.events({
  'click .view-chat': function () {
    Session.set('openRoomId', $(event.currentTarget).data("id"));
    $( "#transitioner-1" ).animate( { scrollTop: 400 } );
    $.Velocity.hook($('#communication-main'), "width", "100%");
    $.Velocity.hook($('#communication-message-board'), "width", "60%");
    $.Velocity.hook($('#communication-task-board'), "width", "0");
    $.Velocity.hook($('#communication-library-board'), "width", "22%");
    // lock scroll position, but retain settings for later
    var scrollPosition = [
      window.pageXOffset ||
      document.documentElement.scrollLeft ||
      document.body.scrollLeft,
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop
    ];
    var body = $('body');
    body.data('scroll-position', scrollPosition);
    body.data('previous-overflow', body.css('overflow'));
    body.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);
  }

});