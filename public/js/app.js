/*global window*/
window.jQuery = window.$;

var imports = [
    'madisonApp.filters',
    'madisonApp.services',
    'madisonApp.resources',
    'madisonApp.directives',
    'madisonApp.controllers',
    'ui',
    'ui.router',
    // 'ui.bootstrap',
    // 'ui.bootstrap.datetimepicker',
    'ngAnimate',
    'ngSanitize',
    'angular-growl',
    'ngResource',
    'angular-tour',
    'ipCookie'
  ];

try {
  var app = angular.module('madisonApp', imports);
} catch (err) {
  console.log(err);
}


var xhReq = new XMLHttpRequest();
xhReq.open("GET", "/auth/token", false);
xhReq.send(null);

app.constant("CSRF_TOKEN", xhReq.responseText);

if (!history.pushState) {
  if (window.location.hash) {
    if (window.location.pathname !== '/') {
      window.location.replace('/#' + window.location.hash.substr(1));
    } else {
      window.location.replace('/#' + window.location.pathname);
    }
  }
}

try {
  app.config(['growlProvider', '$httpProvider', '$stateProvider', '$urlRouterProvider',
    function (growlProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
      //Set up growl notifications
      growlProvider.messagesKey("messages");
      growlProvider.messageTextKey("text");
      growlProvider.messageSeverityKey("severity");
      growlProvider.onlyUniqueMessages(true);
      growlProvider.globalTimeToLive(3000);
      $httpProvider.interceptors.push(growlProvider.serverMessagesInterceptor);

      $urlRouterProvider.otherwise('404');

      $stateProvider
        .state('index', {
          url: "/",
          controller: "HomePageController",
          templateUrl: "/templates/pages/home.html",
          data: {title: "Madison Home"}
        })
        .state('login', {
          url: '/user/login',
          controller: "LoginPageController",
          templateUrl: "/templates/pages/login.html",
          data: {title: "Login to Madison"}
        })
        .state('signup', {
          url: '/user/signup',
          controller: "SignupPageController",
          templateUrl: "/templates/pages/signup.html",
          data: {title: "Signup for Madison"}
        })
        .state('password-reset', {
          url: '/password/reset',
          controller: 'PasswordResetController',
          templateUrl: '/templates/pages/password-reset.html',
          data: {title: 'Password Reset'}
        })
        .state('faq', {
          url: "/faq",
          templateUrl: "/templates/pages/faq.html",
          data: {title: "Frequently Asked Questions"}
        })
        .state('about', {
          url: "/about",
          templateUrl: "/templates/pages/about.html",
          data: {title: "About Madison"}
        })
        .state('privacy-policy', {
          url: '/privacy-policy',
          templateUrl: "/templates/pages/privacy-policy.html",
          data: {title: "Privacy Policy"}
        })
        .state('copyright', {
          url: '/copyright',
          templateUrl: "/templates/pages/copyright.html",
          data: {title: "Copyright Policy"}
        })
        .state('terms-and-conditions', {
          url: '/terms-and-conditions',
          templateUrl: "/templates/pages/terms-and-conditions.html",
          data: {title: "Terms and Conditions"}
        })
        .state('user-notification-settings', {
          url: "/user/edit/:user/notifications",
          controller: "UserNotificationsController",
          templateUrl: "/templates/pages/user-notification-settings.html",
          data: {title: "Notification Settings"}
        })
        .state('group-management', {
          url: "/groups",
          controller: "GroupManagementController",
          templateUrl: "/templates/pages/group-management.html",
          data: {title: "Group Management"}
        })
        .state('create-group', {
          url: "/groups/edit",
          controller: "GroupEditController",
          templateUrl: "/templates/pages/group-edit.html",
          data: {title: "Create Group"}
        })
        .state('edit-group', {
          url: "/groups/edit/:groupId",
          controller: "GroupEditController",
          templateUrl: "/templates/pages/group-edit.html",
          data: {title: "Edit Group"}
        })
        .state('administrative-dashboard', {
          url: "/administrative-dashboard",
          templateUrl: "/templates/pages/administrative-dashboard.html",
          data: {title: "Administrative Dashboard"}
        })
        .state('verify-account', {
          url: '/administrative-dashboard/verify-account',
          templateUrl: '/templates/pages/verify-account.html',
          controller: 'DashboardVerifyController',
          data: {title: 'Verify Account'}
        })
        .state('verify-group', {
          url: '/administrative-dashboard/verify-group',
          templateUrl: '/templates/pages/verify-group.html',
          controller: 'DashboardVerifyGroupController',
          data: {title: 'Verify Group'}
        })
        .state('verify-independent', {
          url: '/administrative-dashboard/verify-independent',
          templateUrl: '/templates/pages/verify-independent.html',
          controller: 'DashboardVerifyUserController',
          data: {title: 'Verify Independent Sponsor'}
        })
        .state('user', {
          url: '/user/:id',
          templateUrl: '/templates/pages/user.html',
          controller: 'UserPageController',
          data: {title: 'User Profile'}
        })
        .state('404', {
          url: '/404',
          templateUrl: '/templates/pages/404.html',
          data: {title: "Uh oh."}
        });
    }]);
} catch (err) {
  console.error(err);
}

app.config(['$locationProvider',
  function ($locationProvider) {
    $locationProvider.html5Mode(true);
  }]);

window.console = window.console || {};
window.console.log = window.console.log || function () {};
