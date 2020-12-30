import React, { Fragment } from 'react';
import Query from './Query';
import Table from './Table';
import '../index.less';

export default () => {
  return (
    <div className='user-card'>

      {/* 查询块 */}
      <Query />

      {/* 表格块 */}
      <Table />

    </div>
  );
};
