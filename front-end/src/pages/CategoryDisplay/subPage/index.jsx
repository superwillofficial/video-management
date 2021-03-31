import React from 'react';
import Tree from './Tree';
import Table from './Table';
import CardList from './CardList';
import '../index.less';

export default () => {
  return (
    <div className="flexbox">

      {/* 树 */}
      <div className='tree'>
        <Tree />
      </div>
      
      {/* 表 */}
      {/* <div className='table' >
        <Table />
      </div> */}
      
      {/* 影片卡片列表 */}
      <div className='card' >
        <CardList />
      </div>
      
    </div>
  );
};
