Package.describe({
  summary: 'One Communications - main panel'
});

Package.onUse(function (api) {

  api.use([
    'less',
    'jquery',
    'session',
    'templating',
    'mrt:moment',
    'velocityjs:velocityjs',
    'routes',
    'styles',
    'tracker',
    'mquandalle:bower@0.1.11',
    'maazalik:malihu-jquery-custom-scrollbar',
    'reactive-var',
    'afruth:wysiwygjs',
    'one-documents-core',
    ], 'web');

  api.use([
    'underscore',
    'aldeed:simple-schema',
    'reywood:publish-composite',
    'one-core',
    'files'
  ]);

  api.addFiles([
    'directory/communication_directory_modal_server.js',
    'messages/messages_server.js',
    'rooms/rooms_server.js'
    ], 'server');

  api.addFiles([
    'messages/messages.js',
    'rooms/rooms.js'
    ], ['server', 'web']);

  api.addFiles([
    'communication_main.html',
    'communication_main.less',
    'communication_main_client.js',
    'communication_channel.html',
    'communication_channel.less',
    'communication_channel_client.js',
    'communication_room_welcome.html',
    'communication_room_welcome_client.js',
    'communication_message_board.html',
    'communication_message_board.less',
    'communication_message_board_client.js',
    'communication_message_input.html',
    'communication_message_input.less',
    'communication_message_input_client.js',
    'communication_popup.html',
    'communication_popup.js',
    'communication_post.html',
    'communication_post.less',
    'communication_post_client.js',
    'communication_post_trash_modal.html',
    //task
    'task/communication_task_board.html',
    'task/communication_task_board.less',
    'task/communication_task_board_client.js',
    'task/communication_task_create.html',
    'task/communication_task_create.less',
    'task/communication_task_create_client.js',
    'task/communication_task_welcome.html',
    'task/communication_task_welcome_client.js',
    //library
    'library/communication_library_board.html',
    'library/communication_library_board.less',
    'library/communication_library_board_client.js',
    'library/communication_library_members.html',
    'library/communication_library_members.less',
    'library/communication_library_members_client.js',
    'library/communication_library_file.html',
    'library/communication_library_file.less',
    'library/communication_library_file_client.js',
    'library/communication_library_files.html',
    'library/communication_library_files.less',
    'library/communication_library_files_client.js',
    'library/communication_library_room_file.html',
    'library/communication_library_room_file.less',
    'library/communication_library_room_file_client.js',
    'library/communication_library_room_files.html',
    'library/communication_library_room_files_client.js',
    //directory
    'directory/communication_directory_modal.html',
    'directory/communication_directory_modal.less',
    'directory/communication_directory_modal.js',
    'directory/communication_add_teammember_modal.html',
    'directory/communication_add_teammember_modal.js',
    //modals
    "modals/communication_help_task_modal.html",
    "modals/communication_help_room_modal.html",
    "modals/communication_help_task_modal_client.js",
    "modals/communication_help_room_modal_client.js",
    "modals/communication_help_modal.less"
  ], 'web');

  // Bower packages
  api.addFiles(['smart.json'], 'web');

  api.export(['Rooms','Messages','RoomsController'], ['server','web']);
});
