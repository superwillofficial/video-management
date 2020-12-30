import React from 'react';
import { useLocation } from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';
import Route from '../Route';
import routes from '@routes/index';

import { Layout } from 'antd';
import { useStore } from '@stores';
import './index.less';

const { Content } = Layout;

const usePageTitle = () => {
  const { pathname } = useLocation();
  const route = _.find(routes, v => v.path === pathname) || {};
  const titles = [route.text];
  const getTitle = (route) => {
    const parent = routes[route.parent];
    if (parent) {
      titles.push(parent.text);
    }
  };
  getTitle(route);
  return titles.reverse().join('-');
};

export default () => useObserver(() => {
  const store = useStore();
  const appStore = store.appStore;
  // 页面头部
  const title = usePageTitle();
  return (
    <Content className="content-block">

      {
        !!appStore.routes.length && <div className="page-haeder">{title}</div>
      }

      <Route routerList={appStore.routes} />
    </Content>
  );
});
