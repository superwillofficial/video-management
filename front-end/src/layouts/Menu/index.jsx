import React, { useState, useCallback, useEffect } from 'react';
import { useObserver } from "mobx-react-lite";
import { useHistory, useLocation, matchPath } from 'react-router-dom';
import _ from 'lodash';
import { Menu } from 'antd';
import { useStore } from '@stores';
import './index.less';

const { SubMenu } = Menu;

const useMenuDomTree = (menus) => {
  // 获取叶节点
  const getMenuItem = menu => (
    <Menu.Item className="menu-block-branch-leaf" key={menu.key}> {menu.title} </Menu.Item>
  );
  // 获取菜单树
  const getMenuTree = menus => menus.map(menu => {
    // 仅能显示类似父子型的二级菜单
    if (!_.isEmpty(menu.children) && menu.children.length) {
      return (
        <SubMenu
          key={menu.key}
          title={menu.title}
          popupClassName="menu-block-branch"
        >
          { menu.children.map((item, index) => getMenuItem(item))}
        </SubMenu>
      );
    } else {
      // return getMenuItem(menu);
    }
  });
  return getMenuTree(menus);
};

export default () => useObserver(() => {
  const store = useStore();
  const { appStore } = store;
  const history = useHistory();
  const [selectedKeys, setSelectedKeys] = useState([]);
  // 菜单DOM树
  const menuDomTree = useMenuDomTree(appStore.menus);
  // 页面跳转
  const pathTo = useCallback((selectedKeys) => {
    const current = _.last(selectedKeys);
    // console.log('selectedKeys', selectedKeys);
    // console.log('current', current);
    // console.log('routes in Menu', appStore.routes);
    const route = appStore.routes.find(r => r.key === current);
    // console.log('route in Menu', route);
    localStorage.setItem('route', route.path);
    history.push(route.path);
  }, []);
  // 选择菜单项
  const onSelect = useCallback(({ selectedKeys }) => {
    setSelectedKeys(selectedKeys);
    pathTo(selectedKeys);
  }, [selectedKeys]);
  // 当前菜单选中
  const location = useLocation();
  useEffect(() => {
    const route = appStore.routes.find(route =>
      matchPath(route.path, { path: location.pathname, exact: true, strict: true }));
    route && setSelectedKeys([route.key]);
  }, [location.pathname, appStore.routes]);
  return (
    <Menu
      // mode="inline"
      // theme="dark"
      mode="horizontal"
      className="menu-block"
      onSelect={onSelect}
      selectedKeys={selectedKeys}
    >
      { menuDomTree}
    </Menu>
  );
});
