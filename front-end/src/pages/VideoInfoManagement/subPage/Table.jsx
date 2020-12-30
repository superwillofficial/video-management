import React, { useEffect, Fragment } from "react";
import { useObserver } from "mobx-react-lite";

import { Button, Table, message } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { onColumn } from "@utils/table";
import { useStore } from "../store";

import { PUBLIC_STATUS_DESC } from '@config/consts';

const useColumns = () => {
  const store = useStore();

  return [
    onColumn("影片id", "id"),
    onColumn("影片标题", "title"),
    onColumn("影片所属目录", "categoryId", {
      render: text =>
        [...store.catList, { id: 0, category: '根节点' }].find(item => item.id === text).category
    }),
    onColumn("影片连结", "video"),
    onColumn("发布状态", "status", {
      render: text => PUBLIC_STATUS_DESC[text]
    }),
    onColumn("影片介绍", "memo"),
    onColumn("操作", "operation", {
      render: (text, record) => {
        return (
          <Fragment>
            <Button
              type="primary"
              onClick={() => {
                store
                  .setValue('type', 'edit')
                  .setValue('vid', record)
                  .openModal('edit');
              }}
            >
              编辑
            </Button>
            &nbsp;&nbsp;
            <Button
              type="primary"
              onClick={async () => {
                await store.deleteFile(record['video']);
                await store.onDelete(record['id'])
                  .then(async isSuccess => {
                    if (isSuccess) {
                      // message.success(`删除成功`);
                      await store.getVidList();
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
  const store = useStore();
  //表格查询
  const onTableChange = async (current, pageSize) => {
    await store.setValue("page", { ...store.page, current, pageSize }).getVidList();
  };
  //表格显示数改变
  const onShowSizeChange = async (current, pageSize) => {
    await store.setValue("page", { ...store.page, current, pageSize }).getVidList();
  };

  useEffect(() => {

  }, []);

  return {
    showQuickJumper: true,
    showSizeChanger: true,
    onChange: onTableChange,
    onShowSizeChange: onShowSizeChange,
    ...store.page
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
            .setValue('type', 'uploadVideo')
            .openModal('uploadVideo');
        }}
        style={{ marginBottom: 15, marginTop: 15 }}
      >
        上传影片
      </Button>
      <Table
        rowKey="id"
        bordered={true}
        columns={columns}
        dataSource={store.vidList}
        pagination={pagination}
      />
    </Fragment>
  );
});