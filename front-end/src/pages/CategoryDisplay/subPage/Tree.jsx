import React, { useEffect, Fragment } from "react";
import { useObserver } from "mobx-react-lite";

import { Tree, Card } from "antd";
import { useStore } from "../store";

const toGetTreeData = () => {
  const store = useStore();
  useEffect(() => {
    const dataFetch = async () => {
      await store.getTreeData();
    };
    dataFetch();
  }, []);
};

export default () => useObserver(() => {
  const store = useStore();
  toGetTreeData();
  const data = store.treeData;
  const jsonData = JSON.stringify(data).replace(/id/g, 'key').replace(/category/g, 'title');
  const treeData = JSON.parse(jsonData);
  const treeDataWithRoot = [{ key: 0, title: '根节点', children: treeData }];
  console.log('treeData', treeData);
  const onSelect = async (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
    await store.getVidList({ categoryId: selectedKeys[0] });
  };

  return (
    <Fragment>
      <Card
        title="分类树"
        style={{ width: 300 }}
      >
        <Tree
          treeData={treeDataWithRoot}
          defaultExpandAll={true}
          onSelect={onSelect}
        />
      </Card>
    </Fragment>
  );
});