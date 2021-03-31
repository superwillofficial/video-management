import React, { useEffect, Fragment } from "react";
import { useObserver } from "mobx-react-lite";

import { Table } from "antd";
import { onColumn } from "@utils/table";
import { useStore } from "../store";

import { PUBLIC_STATUS_DESC } from '@config/consts';

const useColumns = () => {
  return [
    onColumn("影片id", "id"),
    onColumn("影片标题", "title"),
    onColumn("影片连结", "video"),
    onColumn("发布状态", "status", {
      render: text => PUBLIC_STATUS_DESC[text]
    }),
    onColumn("影片介绍", "memo"),
  ];
};

const usePagination = () => {
  const store = useStore();
  //表格查询
  const onTableChange = (current, pageSize) => {
    store.setValue("page", { ...store.page, current, pageSize }).getVidList();
  };
  //表格显示数改变
  const onShowSizeChange = (current, pageSize) => {
    store.setValue("page", { ...store.page, current, pageSize }).getVidList();
  };

  useEffect(() => {
    const dataFetch = async () => {
      await store.getVidList();
    };
    dataFetch();
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
  const columns = useColumns();
  const store = useStore();
  const pagination = usePagination();
  return (
    <Fragment>
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