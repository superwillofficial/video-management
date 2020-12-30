import { observable, action, computed, toJS } from 'mobx';

import _ from 'lodash';

import { rsaEncrypt } from '@utils/encrypt';
import routes from '@routes/index';
import RouteHelper from '@utils/RouteHelper';
import BaseStore from './BaseStore';

const rootRoutes = _.map(
  routes,
  route => route.parent === 'Root' && route
).filter(Boolean);

/**
 * 全局 store
 */
class AppStore extends BaseStore {

  @observable routeHelper = new RouteHelper({ routes: rootRoutes });
  @observable _routes = [];
  @observable _menus = [];
  @observable _user = {};

  constructor(global) {
    super();
    this.global = global;
  }

  @computed
  get requestStore() {
    return this.global.requestStore;
  }

  @computed
  get routes() {
    return toJS(this._routes);
  }

  @computed
  get menus() {
    return toJS(this._menus)
      .filter(r =>
        r.parent !== 'Root' &&
        r.key !== 'Home' &&
        r.key !== 'NotFound'
      );
  }

  @computed
  get user() {
    return toJS(this._user);
  }

  @action
  getUser = async () => {
    const res = await this.axios({
      method: 'GET',
      url: `${this.authUrl}/user/info`,
    });
    this.setValue('user', _.get(res, 'data', {}));
  }

  @action
  getMenus = async () => {
    // const res = await this.axios({
    //   method: 'GET',
    //   url: `${this.authUrl}/menu/current-menus`,
    // });
    // console.log("res", res);
    // const data = _.get(res, 'data', []);
    // const menus = data
    //   .map(item => item.url && item)
    //   .filter(Boolean);

    // console.log("menus", menus);
    let routesArr = [];
    // 从本地 routes 中获取菜单数据
    for (let i in routes) {
      routesArr.push(routes[i]);
    }

    const _routes = routesArr
      .reduce((routes, item, index) => {
        return (
          routes[index] = {
            id: index,
            // name: item.text,
            text: item.text,
            path: item.path,
            parent: item.parent || null,
            redirect: item.redirect || null,
            component: item.component,
            nav: !!item.nav,
            icon: item.icon || null,
            exact: !!item.exact,
          },
          routes
        );
      }, {});
    this.routeHelper = new RouteHelper({ routes: _routes });
  }

  @action
  onChangePassword = async (body) => {
    body = _.mapValues(body, v => rsaEncrypt(v));
    return await this.axios({
      method: 'PUT',
      url: `${this.authUrl}/user/change-password`,
      body,
    });
  }
}

export default AppStore;
