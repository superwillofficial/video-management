import React, { useEffect, Fragment } from "react";
import { useObserver } from "mobx-react-lite";
import _ from 'lodash';
import { Button, Table, message } from "antd";
import { onColumn } from "@utils/table";
import { useStore } from "../store";
import { GENDER_DESC, EDITABLE_DESC } from "@config/consts";
import { RESP_CODE } from "@config/sysConsts";

const useColumns = () => {

  const store = useStore();

  return [
    onColumn("用户id", "userId"),
    onColumn("昵称", "nickName"),
    onColumn("性别", "sex", {
      render: text => GENDER_DESC[text]
    }),
    onColumn("电话", "phone"),
    onColumn("创建时间", "createTime"),
    onColumn("更新时间", "updateTime"),
    onColumn("操作", "operation", {
      render: (text, record) => {
        // 若角色是可编辑的（根据返回的 editable 字段判定是否可编辑）
        if (_.find(store.roles, (o) => {
          return String(o.id) === store._roleSelectedKeys[0];
        })['editable'] === 1) {
          return (
            <Fragment>
              <Button
                type="primary"
                onClick={async () => {
                  const isSuccess = await store.resetPassword(record.userId);
                  isSuccess ? message.success(`重置密码成功`) : message.error(`重置密码成功`);
                }}
              >
                重置密码
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  store
                    .setValue('currentUser', record)
                    .setValue('type', 'editUser')
                    .openModal('editUser');
                  store.setValue('file', {});
                  if (!_.isEmpty(record.avatar)) {
                    store.setValue('file', {
                      uid: '-1',
                      name: 'Whatever',
                      status: 'done',
                      url: record.avatar
                    });
                  }
                }}
              >
                编辑
              </Button>
              <Button
                type="primary"
                onClick={async () => {
                  const isSuccess = await store.deleteUser(record.userId);
                  if (isSuccess) {
                    message.success(`删除用户成功`);
                    await store.getUsers();
                  } else {
                    message.error(`删除用户成功`);
                  }
                }}
              >
                删除
              </Button>
            </Fragment>
          );
        } else {
          return (
            <Button
              type="primary"
              onClick={async () => {
                const isSuccess = await store.resetPassword(record.userId);
                isSuccess ? message.success(`重置密码成功`) : message.error(`重置密码成功`);
              }}
            >
              重置密码
            </Button>
          );
        }
      }
    }),
  ];
};

const usePagination = () => {
  const store = useStore();
  //表格查询
  const onTableChange = (current, pageSize) => {
    store.setValue("page", { ...store.page, current, pageSize }).getUsers();
  };
  //表格显示数改变
  const onShowSizeChange = (current, pageSize) => {
    store.setValue("page", { ...store.page, current, pageSize }).getUsers();
  };

  useEffect(() => {
    // store.getUsers();
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
  const columns = useColumns();
  const store = useStore();
  const pagination = usePagination();
  return (
    <Fragment>
      <Table
        rowKey="userId"
        bordered={true}
        columns={columns}
        dataSource={store.users}
        pagination={pagination}
      />
    </Fragment>
  );
});