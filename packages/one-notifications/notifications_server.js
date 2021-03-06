Meteor.publish('notifications', function(limit) {
	if (limit)
		check(limit, Number);
	else
		limit = 20;

	return Notifications.find({
		createdFor: this.userId,
		$or: [
			{ expires:
				{ $gt: new Date() }
			},
			{ expires:
				{ $exists: false }
			}]
		 },{
		 	limit: limit,
		 	sort: {
		 		createdAt: -1
		 	} });
});

Meteor.methods({
	// @description: Adds a new notification
	// @params: toUserId - String, context - Object (message - String,
	// title - String optional, link - String optional);
	// @returns: Object - insert result

	addNotification: function(toUserId, context) {
		check(toUserId, String);
		check(context, Object);

		if (! context.message)
			return 'You need to specify a message';

		//check that the user exists
		var user = Meteor.users.findOne(toUserId);

		if (! user)
			return ('User does not exist');

		var options = {
			createdAt: new Date(),
			createdFor: toUserId,
			notificationText: context.message,
			notificationTitle: context.title ? context.title : 'New notification'
		};

		if (context.link)
			options.notificationActionLink = context.link;

		Notifications.insert(options, function(error, result) {
			if (error)
				return (error.message);
			else
				return (null, result);
		});
	},
	markNotificationAsRead: function(notificationId) {
		check(notificationId, String);

		if (! this.userId)
			return "You are not logged in";

		//check that the notification exist
		var notification = Notifications.findOne(notificationId);

		if (! notification)
			return "Notification does not exist";

		if (notification.read === true)
			return "Notification already read";

		Notifications.update(notificationId,
			{
				$set: {
					read: true
				}
			},
			function(error, result) {
				if (error)
					return "Could not update notification";

				return result;
			});
	},
	markAllNotificationsAsRead: function() {
		if (! this.userId)
			return "You are not logged in";

		Notifications.update(
			{
				createdFor: this.userId,
				read: {
					$ne: false
				}
			},
			{
				$set:
				{
					read: true
				}
			},
			{
				multi: true
			},
			function(error, result) {
				if (error)
					return "Could not update notifications";

				return (null, result);
			});
	}
});

Notify.messages = {
	FOLLOWED_BY_USER: {
		message: '{arg1} followed you',
		title: 'New follower'
	},
	DOCUMENT_SHARED_WITH_YOU: {
		message: '{arg1} shared a document with you',
		title: 'New document'
	},
	FOLDER_SHARED_WITH_YOU: {
		message: '{arg1} shared a folder with you',
		title: 'New folder'
	},
	ADDED_TO_A_TEAM: {
		message: '{arg1} added you to team {arg2}',
		title: 'New team'
	},
	TWITTER_AUTHORIZATION_ERROR: {
		message: 'Your twitter account {arg1} authorization token was rejected.' +
		'Please reconnect your twitter account in your account settings',
		title: 'Twitter Error'
	}
};

// @description: Function that generates a message from a string and
// multiple arguments
// @params: text - the string to replace in, arg0...argN - the strings
// to replace with
// @returns: String text
Notify.generateMessageText = function(text, stringArray) {

	//checking if the number of arguments passed is same with the number of
	//string placeholders
	var placeholders = /(\{arg\d\})/gi;
	var found = text.match(placeholders);

	if (stringArray.length !== found.length)
		throw new Meteor.Error(500,"You have specified a different number " +
			"of arguments. (Notifications package)");

	for (var i=0; i<stringArray.length; i++) {
		var argNo = i + 1;
		text = text.replace('{arg'+argNo+'}', stringArray[i]);
	}

	return text;
};

//Placeholder function to avoid using Meteor.call everytime
Notify.addNotification = function(toUserId, context) {
	Meteor.call('addNotification', toUserId, context, function(error) {
		if (error)
			throw new Meteor.Error(500, error);
	});
};
