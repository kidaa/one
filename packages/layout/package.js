Package.describe({
  summary: 'Layout templates.'
});

Package.onUse(function (api) {
  api.use(['templating', 'authorization', 'left-nav', 'less'], 'web');
  api.addFiles(['application.html', 'application_client.js', 'application.less',
                'buttons.less'
               ], 'web');
});
