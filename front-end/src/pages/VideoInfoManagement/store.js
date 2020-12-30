import React from 'react';
import { useLocalStore } from 'mobx-react';
import { observable, action, computed, toJS } from 'mobx';

import _ from 'lodash';
import { useStore as useGlobalStore } from '@stores';
import BaseStore from '@stores/BaseStore';

/**
 * 影片资讯管理
 * @class Store
 */
class Store extends BaseStore {
  @observable _vidList = [];
  @observable _catList = [];
  @observable _vid = {};
  @observable _urlOfVideoFile = '';
  @observable _page = {
    total: 0,
    pageSize: 10,
    current: 1,
  };
  @observable _query = {};
  @observable _type = '';
  @observable _file = {};

  constructor(global) {
    super();
    this.global = global;
  }

  @computed
  get type() {
    return this._type;
  }

  @computed
  get urlOfVideoFile() {
    return this._urlOfVideoFile;
  }

  @computed
  get vid() {
    return toJS(this._vid);
  }

  @computed
  get file() {
    return toJS(this._file);
  }

  @computed
  get page() {
    return toJS(this._page);
  }

  @computed
  get catList() {
    return toJS(this._catList);
  }

  @computed
  get vidList() {
    return toJS(this._vidList);
  }

  @action
  getCatList = async (query = {}) => {
    const res = await this.axios({
      method: 'GET',
      url: `${this.baseUrl}/category/list`,
      query: {
        ...query,
        pageSize: 100000,
        pageIndex: 1,
      },
    });
    console.log("res========", res);
    this
      .setValue('catList', _.get(res, 'data', []));
  }

  @action
  getVidList = async (query = {}) => {
    const res = await this.axios({
      method: 'GET',
      url: `${this.baseUrl}/videoInfo/list`,
      query: {
        ...query,
        pageSize: this.page.pageSize,
        pageIndex: this.page.current,
      },
    });
    console.log("res========", res);
    this
      .setValue('vidList', _.get(res, 'data', []))
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
      url: `${this.baseUrl}/videoInfo/${id}`,
    });
    // console.log("res========", res);
    return this.onHandleResult(res);
  }

  @action
  onAdd = async (body) => {
    const res = await this.axios({
      method: 'POST',
      url: `${this.baseUrl}/videoInfo`,
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
      url: `${this.baseUrl}/videoInfo/${body['id']}`,
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