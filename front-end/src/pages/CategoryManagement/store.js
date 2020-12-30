import React from 'react';
import { useLocalStore } from 'mobx-react';
import { observable, action, computed, toJS } from 'mobx';

import _ from 'lodash';
import { useStore as useGlobalStore } from '@stores';
import BaseStore from '@stores/BaseStore';

/**
 * 分类管理
 * @class Store
 */
class Store extends BaseStore {
  @observable _catList = [];
  @observable _respCode;
  @observable _cat = {};
  @observable _page = {
    total: 0,
    pageSize: 10,
    current: 1,
  };
  @observable _query = {};
  @observable _type = '';

  constructor(global) {
    super();
    this.global = global;
  }

  @computed
  get type() {
    return this._type;
  }

  @computed
  get respCode() {
    return this._respCode;
  }

  @computed
  get cat() {
    return toJS(this._cat);
  }

  @computed
  get page() {
    return toJS(this._page);
  }

  @computed
  get typeDesc() {
    if (this._type === 'add') return '新增';
    if (this._type === 'edit') return '编辑';
  }

  @computed
  get catList() {
    return toJS(this._catList);
  }

  @action
  getCatList = async (query = {}) => {
    const res = await this.axios({
      method: 'GET',
      url: `${this.baseUrl}/category/list`,
      query: {
        ...query,
        pageSize: 10000,
        pageIndex: 1,
      },
    });
    console.log("res========", res);
    this
      .setValue('catList', _.get(res, 'data', []))
      .setPatch('page',
        {
          current: _.get(res.pageInfo, 'pageIndex'),
          pageSize: _.get(res.pageInfo, 'pageSize'),
          total: _.get(res.pageInfo, 'count')
        });
  }

  @action
  onDelete = async (id) => {
    const res = await this.axios({
      method: 'DELETE',
      url: `${this.baseUrl}/category/${id}`,
    });
    return this.onHandleResult(res);
  }

  @action
  onAdd = async (body) => {
    const res = await this.axios({
      method: 'POST',
      url: `${this.baseUrl}/category`,
      body: {
        ...body,
      }
    });
    // console.log("res========", res);
    return this.onHandleResult(res);
  }

  @action
  onEdit = async (body) => {
    const res = await this.axios({
      method: 'PUT',
      url: `${this.baseUrl}/category/${this.cat['id']}`,
      body: {
        ...body,
      }
    });
    // console.log("res========", res);
    return this.onHandleResult(res);
  }

  onHandleResult = (res) => {
    return _.get(res, 'code') === this.sysConsts.RESP_CODE.SUCCESS;
  }

  @action
  resetPage = () => {
    return this.setValue('page', {
      total: 0,
      pageSize: 10,
      current: 1,
    });
  }

}

const storeContext = React.createContext(null);

export const useStore = () => {
  const store = React.useContext(storeContext);
  if (!store) { throw new Error('You have forgot to use StoreProvider, shame on you.'); }
  return store;
};

export default (props) => {
  const global = useGlobalStore();
  const store = useLocalStore(() => (new Store(global)));
  return (
    <storeContext.Provider value={store}>
      {props.children}
    </storeContext.Provider>
  );
};