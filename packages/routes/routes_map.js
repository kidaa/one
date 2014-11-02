/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.configure({
  layoutTemplate: 'application',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.map(function () {
  this.route(Routes.LOGIN, {
    path: '/',
    layoutTemplate: 'loginLayout'
  });

  this.route(Routes.LOGOUT, {
    path: '/logout',
    action: function () {
      Meteor.logout();
      this.redirect(Routes.LOGIN);
    }
  });

  this.route(Routes.APPS, {
    path: '/apps'
  });

  this.route(Routes.COMPANY_DOCUMENTS, {
    path: '/company-documents'
  });

  this.route(Routes.MY_DOCUMENTS, {
    path: '/my-documents'
  });

  this.route(Routes.MESSAGES, {
    path: '/messages'
  });

  this.route(Routes.DASHBOARD, {
    path: '/dashboard',
    waitOn : function () {
      return Meteor.subscribe('user');
    }
  });

  this.route(Routes.DIRECTORY, {
    path: '/directory',
    waitOn : function () {
      return Meteor.subscribe('users');
    }
  });

  this.route(Routes.PROFILE_EDIT, {
    path: '/profile/edit',
    data: function() {
      if (Meteor.user()) {
        return Meteor.user().profile;
      }
    }
  });

  this.route(Routes.SUPPORT, {
    path: '/support'
  });

  /* Admin */
  this.route(Routes.Admin.DASHBOARD, {
    path: '/admin'
  });

  this.route(Routes.Admin.USERS, {
    path: '/admin/users'
  });

  this.route(Routes.Admin.COMPANIES, {
    path: '/admin/companies'
  });

  this.route(Routes.Admin.COMPANIES_NEW, {
    path: '/admin/companies/new'
  });
});
