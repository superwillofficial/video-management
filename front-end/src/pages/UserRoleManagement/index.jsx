import React from 'react';
import Page from './subPage/index';
import Modal from './subPage/Modal';
import UserModal from './subPage/UserModal';
import Store from './store';

export default () => {
  return (
    <Store>

      {/* 角色 */}
      <Page />

      {/* 新增/修改角色弹窗 */}
      <Modal />

      {/* 新增/修改用户弹窗 */}
      <UserModal />

    </Store>
  );
};
