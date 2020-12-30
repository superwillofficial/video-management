import React, { useEffect, Fragment } from "react";
import ReactPlayer from 'react-player';
import { useObserver } from "mobx-react-lite";
import { Button, Table, message, Pagination, Card, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  UndoOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { onColumn } from "@utils/table";
import { useStore } from "../store";
import { PUBLIC_STATUS, PUBLIC_STATUS_DESC } from "@config/consts";

const moment = require('moment');
const { Meta } = Card;

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
    // ...store.page
    // parseInt 是为了将字符串转换为数字
    // 以让当前页能够在分页显示器中高亮
    ...{
      current: parseInt(store.page.current, 10),
      pageSize: parseInt(store.page.pageSize, 10),
      total: parseInt(store.page.total, 10),
    }
  };
};

export default () => useObserver(() => {
  const store = useStore();
  const pagination = usePagination();
  const data = store.vidList;


  const handleDelete = async (item) => {
    await store.deleteFile(item['video']);
    const res = await store.onDelete(item['id']);
    if (res) {
      message.success('删除成功');
      await store.getVidList();
    } else {
      message.error(`服务错误, ${store.message}`);
    }
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
      }}
      >
        {data.map((item, index) =>
          <Card
            style={{ width: 300, marginTop: 20 }}
            cover={
              <video
                width = '300'
                src={item['video']}
                
              />
            }
            actions={PUBLIC_STATUS_DESC[item['status']] === '已发布' ?
              [
                <div onClick={async () => {
                  item['status'] = '0';
                  const isSuccess = await store.onEdit(item);
                  if (isSuccess) {
                    message.success(`撤回成功`);
                    await store.getVidList();
                  } else {
                    message.error(`服务错误, ${store.message}`);
                  }
                }}
                >撤回
                </div>
              ] :
              [
                // 删除
                <DeleteOutlined key="setting" onClick={() => handleDelete(item)} />,
                // 发布
                <CheckOutlined key="publish" onClick={async () => {
                  item['status'] = '1';
                  const isSuccess = await store.onEdit(item);
                  if (isSuccess) {
                    message.success(`发布成功`);
                    await store.getVidList();
                  } else {
                    message.error(`服务错误, ${store.message}`);
                  }
                }} />,
              ]
            }
            key={item['id']}
          >
            <Meta
              title={item['title']}
              description={
                <div>
                  <div>{`发布状态: ${PUBLIC_STATUS_DESC[item['status']]}`}</div>
                  <div>{`创建时间：${moment(item['createTime']).format('YYYY-MM-DD HH:mm:ss')}`}</div>
                </div>
              }
            />
          </Card>
        )}
      </div>
      <div style={{ marginTop: 20 }}>
        <Pagination {...pagination} style={{ float: 'right' }} />
      </div>
    </div>
  );
});