import { useLocalStore } from 'mobx-react';
import { action, computed } from 'mobx';

import _ from 'lodash';
import axios from '@utils/axios';
import { useStore as useGlobalStore } from '@stores';
import { rsaEncrypt } from '@utils/encrypt';
import BaseStore from '@stores/BaseStore';

/**
 * 登录
 * @class Store
 */
class Store extends BaseStore {
  constructor(global) {
    super();
    this.global = global;
  }

  @computed
  get authUrl() {
    return this.sysConsts.AUTH_URL;
  }

  @action
  onLogin = async (body) => {
    // body = _.mapValues(body, v => rsaEncrypt(v));
    return await axios({
      // mode: 'cors',
      method: 'GET',
      url: `${this.authUrl}/web-login`,
      query: {
        ...body
      },
    }).then(res => {
      if (res.code === this.sysConsts.RESP_CODE.SUCCESS) {
        localStorage.setItem('token', _.get(res.data, 'token'));
        console.log('localStorage===', localStorage);
        return true;
      } else {
        return false; 
      }
    });
  }
}

/**
 * 使用store
 */
function useStore() {
  const global = useGlobalStore();
  const store = useLocalStore(() => new Store(global));
  return store;
};
export default useStore;
