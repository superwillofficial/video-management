// 路由配置
module.exports = {
  Login: {
    text: '登录', path: '/login', parent: 'Root',
    component: 'Login', redirect: '/login',
    nav: false, exact: false,
  },

  Index: {
    text: '根目录', path: '/', parent: 'Root',
    component: 'AppFrame', redirect: '/tag-management/comment-tag-management',
    nav: false, exact: false,
  },

  Home: {
    text: '首页', path: '/home', parent: 'Index',
    component: 'Home', redirect: '/video/play',
    nav: false, exact: false,
  },

  // 影片
  Video: {
    text: '影片管理', path: '/video', parent: 'Index',
    component: 'Video', redirect: '/activity-management/template-config',
    nav: true, exact: true,
  },

  // 影片播放
  VideoPlay: {
    text: '影片播放', path: '/video/play', parent: 'Video',
    component: 'VideoPlay', nav: true, exact: true,
  },

  VideoInfoManagement: {
    text: '影片资讯管理', path: '/video/info-management', parent: 'Video',
    component: 'VideoInfoManagement', nav: true, exact: true,
  },

  CategoryManagement: {
    text: '分类管理', path: '/video/category-management', parent: 'Video',
    component: 'CategoryManagement', nav: true, exact: true,
  },

  CategoryDisplay: {
    text: '分类层级展示', path: '/video/category-display', parent: 'Video',
    component: 'CategoryDisplay', nav: true, exact: true,
  },

  // // 系统配置
  // SystemManagement: {
  //   text: '系统管理', path: '/system-management', parent: 'Index',
  //   component: 'SystemManagement', icon: "iconyonghu-shezhi",
  //   nav: true, exact: true,
  // },

  // TestQuestionManagement: {
  //   text: '问卷设置', path: '/tag-management/test-question-tag-management',
  //   parent: 'SystemManagement', component: 'TestQuestionManagement', nav: true, exact: true,
  // },
  
  // UserRoleManagement: {
  //   text: '用户角色管理', path: '/system-management/user-role', parent: 'SystemManagement',
  //   component: 'UserRoleManagement', nav: true, exact: true,
  // },

  NotFound: {
    text: '404', path: '/404', parent: 'Index',
    component: 'NotFound',
    nav: false, exact: true,
  },
};
