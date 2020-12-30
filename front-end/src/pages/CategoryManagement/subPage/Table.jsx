import React, { useEffect, Fragment } from "react";
import { useObserver } from "mobx-react-lite";

import { Button, Table, message } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { onColumn } from "@utils/table";
import { useStore } from "../store";

const useColumns = () => {

  const store = useStore();

  return [
    onColumn("id", "id"),
    onColumn("分类名称", "category"),
    onColumn("父节点", "parentId", {
      render: text =>
        [...store.catList, { id: 0, category: '根节点' }].find(item => item.id === text).category
    }),
    onColumn("操作", "operation", {
      render: (text, record) => {
        return (
          <Fragment>
            <Button
              type="primary"
              onClick={() => {
                store
                  .setValue('type', 'edit')
                  .setValue('cat', record)
                  .openModal('edit');
              }}
            >
              编辑
            </Button>
            &nbsp;&nbsp;
            <Button
              type="primary"
              onClick={() => {
                store.onDelete(record['id'])
                  .then(async isSuccess => {
                    if (isSuccess) {
                      message.success(`删除成功`);
                      await store.getCatList();
                    } else {
                      message.error(`删除失败`);
                    }
                  });
              }}
            >
              删除
            </Button>
          </Fragment>
        );
      }
    }),
  ];
};

const usePagination = () => {
  return {
    showQuickJumper: true,
    showSizeChanger: true,
  };
};

export default () => useObserver(() => {
  const store = useStore();
  const pagination = usePagination();
  const columns = useColumns();

  return (
    <Fragment>
      <Button
        type="primary"
        size='large'
        icon={<PlusOutlined />}
        shape="round"
        onClick={() => {
          store
            .setValue('type', 'add')
            .openModal('add');
        }}
        style={{ marginBottom: 15, marginTop: 15 }}
      >
        新增
      </Button>
      <Table
        rowKey="id"
        bordered={true}
        columns={columns}
        dataSource={store.catList}
        pagination={pagination}
      />
    </Fragment>
  );
});