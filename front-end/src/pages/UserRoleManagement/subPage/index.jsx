import React from 'react';
import Role from './Role';
import User from './User';

export default () => {
  return (
    <div className="content-block-box clearfix" style={{ display: 'flex' }}>

      {/* 角色列表 */}
      <Role style={{ flex: '0' }} />

      {/* 用户列表 */}
      <User style={{ flex: '1' }} />

    </div>
  );
};
