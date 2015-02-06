/* globals RoomsController: true */
Template.messageInput.rendered = function(){
	Session.set('menuOpen', false);
	Session.set('attachment', false);
};

Template.messageInput.events({
	// toggle the menu on button click
	'click #communication-message-input-btn': function(){
		var x = Session.get('menuOpen');
		if(x){
			Session.set("menuOpen", false);
		}else{
			Session.set("menuOpen", true);
		}
	},

	// close the menu when an option is selected
	'click #communication-message-input-options-post': function(){
		Session.set("menuOpen", false);
    // Open New Post menu
    $('.selectpicker').selectpicker('render');
    $( '#communication-message-post' )
      .velocity( "slideDown", { duration: 500 } );
	},

  // close the menu when an option is selected
  'click #communication-message-input-options-attachment': function () {
    Session.set("menuOpen", false);
  },

  // close the menu when an option is selected
  'click #communication-message-input-options-task': function () {
    Session.set("menuOpen", false);
  },

	// Check to see if the input holds an attachment when the value changes
	'change #communication-message-input-attachment-input': function(){
		var input = $('#communication-message-input-attachment-input');
		if( input.val() ){
			Session.set('attachment', true);
		}else{
			Session.set('attachment', false);
		}
	},

	// Clear input value and resets session
	'click #communication-message-attachment-delete': function(){
		$('#communication-message-input-attachment-input').val('');
		Session.set('attachment', false);
	},

  'submit #addMessageForm': function(event) {
    event.preventDefault();
    var message = $('#addMessageInput').val();

    if(message && message.length > 0)
      RoomsController.addSimpleMessageToRoom(
        Session.get('openRoomId'),
        message);

    $('#addMessageInput').val("");

    //also mark room as read

    RoomsController.updateTimestamp(Session.get('openRoomId'));

  },
  'click #communication-message-post-btn': function() {

    var context = {
      title: $('#new-post-subject').val(),
      postContent: $('#communication-message-post-textarea').serialize()
    };

    var postImage = null;

    if(postImage)
      context.fileId = postImage;

    var draft = null;
    if(draft)
      context.draft = draft;
    else
      context.draft = false;

    console.log(context);
    if (context.title !== '' && context.postContent !== '') {
      RoomsController.addPostMessageToRoom(Session.get('openRoomId'),
        //TODO: multiple room selector
        context);
    } else {
      return null;
    }
  }
});

Tracker.autorun(function () {
	// controls options menu
  var menuOpen = Session.get('menuOpen');
  if (menuOpen){
    $('#communication-message-input-btn').velocity({ rotateZ: "90deg"}, 400);
		$('#communication-message-input-options')
			.velocity({ opacity: 1 })
			.velocity("slideDown", { duration: 200 });
  } else {
  	$('#communication-message-input-btn').velocity({ rotateZ: "0deg"}, 400);
		$('#communication-message-input-options')
			.velocity("fadeOut", { duration: 300 })
			.velocity({ opacity: 0 });
  }

  // controls attachment viewer
  var attachment = Session.get('attachment');
  if(attachment){
  	$('#communication-message-input').addClass('holding');
		var str = $('#communication-message-input-attachment-input').val();
		var fileName = /[^\\]*$/.exec(str)[0];
		$('#communication-message-attachment-name').text('').prepend(fileName);
		$('#communication-message-attachment-display')
			.velocity({width: '270px'}, 800, "easeInSine")
			.velocity("fadeIn", {duration: 300})
			.velocity({overflow: 'visible'}, {delay: 800});
		} else {
			$('#communication-message-input').removeClass('holding');
			$('#communication-message-attachment-display')
				.velocity({width: '0'}, 800, "easeInSine")
				.velocity("fadeOut", {duration: 800})
				.velocity({overflow: 'hidden'});
		}
});
