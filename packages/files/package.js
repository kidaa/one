Package.describe({
  summary: 'File storage -- currently on S3.'
});

Package.onUse(function (api) {
  var both = ['web', 'server'];

  api.use(['aldeed:simple-schema'], both);
  api.use(['cfs:reactive-list', 'cfs:power-queue', 'aws-sdk'], 'server');

  api.addFiles(['files.js', 'folder.js'], both);
  api.addFiles(['files_server.js', 'file_resize_server.js', 'packages.json'], 'server');
  api.addFiles('files_client.js', 'web');
  
  api.export(['Files', 'FileTools', 'Folder'], both);
});

Npm.depends({
  "imagemagick": "0.1.3",
  "gm": "1.16.0",
  "knox": "0.9.1",
  "tmp": "0.0.24",
  "request": "2.51.0",
  "node-fs": "0.1.7",
  // "crypto": "0.0.3",
  "path": "0.11.14"
});
