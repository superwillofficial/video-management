import React from 'react';
import { useLocalStore } from 'mobx-react';
import { observable, action, computed, toJS } from 'mobx';

import _ from 'lodash';
import { useStore as useGlobalStore } from '@stores';
import BaseStore from '@stores/BaseStore';

/**
 * 用户角色管理
 * @class Store
 */
class Store extends BaseStore {
  // 角色列表
  @observable _type;
  @observable _roles = [];
  @observable _roleSelectedKeys = [];
  @observable _currentRole = {};
  @observable _currentUser = {};
  @observable _users = [];
  @observable _file = {};

  @observable _page = {
    total: 0,
    pageSize: 10,
    current: 1,
  };

  constructor(global) {
    super();
    this.global = global;
  }

  @computed
  get optionStore() {
    return this.global.optionStore;
  }

  @computed
  get type() {
    console.log(this._type);
    return this._type;
  }

  @computed
  get roles() {
    return toJS(this._roles);
  }

  @computed
  get users() {
    return toJS(this._users);
  }

  @computed
  get roleSelectedKeys() {
    return toJS(this._roleSelectedKeys).map(key => String(key));
  }

  @computed
  get currentUser() {
    return toJS(this._currentUser);
  }

  @computed
  get currentRole() {
    return toJS(this._currentRole);
  }

  @computed
  get page() {
    return toJS(this._page);
  }

  @computed
  get file() {
    return toJS(this._file);
  }

  @action
  getRoles = async () => {
    const res = await this.axios({
      method: 'GET',
      url: `${this.authUrl}/role-info/list`,
    });
    const defaultKey = _.get(res, 'data.0.id');
    this
      .setValue('roles', _.get(res, 'data', []))
      .setValue('roleSelectedKeys', defaultKey ? [String(defaultKey)] : []);
  }

  @action
  getUsers = async (data) => {
    const nickName = _.isEmpty(data) ? '' : data['nickName'];
    const res = await this.axios({
      method: 'GET',
      url: `${this.authUrl}/user-info/list`,
      query: {
        nickName,
        roleIds: this.roleSelectedKeys[0],
        pageSize: this.page.pageSize,
        pageIndex: this.page.current,
      },
    });
    const users = _.get(res, 'data', []);
    this
      .setValue('users', users)
      .setPatch('page', {
        current: _.get(res.pageInfo, 'pageIndex'),
        pageSize: _.get(res.pageInfo, 'pageSize'),
        total: _.get(res.pageInfo, 'total')
      });
  }

  @action
  addRole = async (body) => {
    return await this.axios({
      method: 'POST',
      url: `${this.authUrl}/role-info`,
      body: {
        ...body
      },
    });
  };

  @action
  editRole = async (body) => {
    return await this.axios({
      header: { 'Content-Type': 'application/json' },
      method: 'PUT',
      url: `${this.authUrl}/role-info/${this.currentRole.id}`,
      body: {
        ...body,
      },
    });
  };

  @action
  deleteRole = async (id) => {
    return await this.axios({
      header: { 'Content-Type': 'application/json' },
      method: 'DELETE',
      url: `${this.authUrl}/role-info/${id}`,
    });
  }

  @action
  addUser = async (body) => {
    return await this.axios({
      method: 'POST',
      url: `${this.authUrl}/user-info/back`,
      body: {
        ...body
      },
    });
  };

  @action
  editUser = async (body) => {
    return await this.axios({
      header: { 'Content-Type': 'application/json' },
      method: 'PUT',
      url: `${this.authUrl}/user-info/${this.currentUser.userId}`,
      body: {
        ...body,
      },
    });
  };

  @action
  deleteUser = async (id) => {
    const res = await this.axios({
      header: { 'Content-Type': 'application/json' },
      method: 'DELETE',
      url: `${this.authUrl}/user-info/back/${id}`,
    });
    return this.onHandleResult(res);
  }

  @action
  resetPassword = async (id) => {
    const res = await this.axios({
      header: { 'Content-Type': 'application/json' },
      method: 'PUT',
      url: `${this.authUrl}/web-login/reset-password/${id}`,
    });
    return this.onHandleResult(res);
  };

  @action
  getZones = async () => {
    await this.axios({
      method: 'GET',
      url: `${this.authUrl}/zone`,
    });
  }

  onHandleResult = (res) => {
    return _.get(res, 'code') === this.sysConsts.RESP_CODE.SUCCESS;
  };

}

const StoreContext = React.createContext(null);
export const useStore = () => {
  const store = React.useContext(StoreContext);
  if (!store) { throw new Error('You have forgot to use StoreProvider, shame on you.'); }
  return store;
};

export default (props) => {
  const global = useGlobalStore();
  const store = useLocalStore(() => (new Store(global)));
  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};
