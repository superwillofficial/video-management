import React, { useEffect } from 'react';
import { useObserver } from "mobx-react-lite";
import { Card, Menu, Row, Popconfirm, Button } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useStore } from '../store';

import { EDITABLE_DESC } from '@config/consts';

export default () => useObserver(() => {
  const store = useStore();
  const { VISIBLE_TYPE } = store.consts;

  // 切换角色
  const toggleRole = async () => {
    await store.getRoles();
    await store.getUsers();
  };
  // 选中角色
  const onSelect = async ({ selectedKeys }) => {
    store.setValue('roleSelectedKeys', selectedKeys);
    console.log('roleSelectedKeys===', selectedKeys);
    console.log('role===', _.find(store.roles, (o) => {
      return String(o.id) === selectedKeys[0];
    }));
    await store.getUsers();
  };
  // 新增角色
  const addRole = () => {
    store
      .setValue('currentRole', { visibleType: VISIBLE_TYPE.GROUP })
      .setValue('type', 'addRole')
      .openModal('addRole');
  };
  // 编辑角色
  const editRole = (currentRole) => {
    store
      .setValue('currentRole', currentRole)
      .setValue('type', 'editRole')
      .openModal('editRole');
  };
  // 删除角色
  const deleteRole = (id) => {
    store
      .deleteRole(id)
      .then(toggleRole);
  };
  // 查询角色
  useEffect(() => {
    toggleRole();
  }, []);
  return (
    <Card
      title="角色列表"
      extra={<PlusOutlined onClick={addRole} />}
      className="role-card"
    >
      <Menu
        selectedKeys={store.roleSelectedKeys}
        onSelect={onSelect}
        style={{ width: '100%', border: 'none', marginTop: '1px' }}>
        {
          store.roles.map((item) => {
            return (
              <Menu.Item key={item.id}>
                <span>{item.name} - {item.memo}</span>
                {
                  EDITABLE_DESC[item.editable] === '可编辑' ? (
                    <Row className="role-card-actions">
                      <Button
                        type="link"
                        onClick={() => editRole(item)}
                        icon={<EditOutlined />} />
                      <Popconfirm
                        title="确认要删除?"
                        onConfirm={() => deleteRole(item.id)}>
                        <Button type="link" icon={<DeleteOutlined />} danger />
                      </Popconfirm>
                    </Row>
                  ) : null
                }
              </Menu.Item>
            );
          })
        }
      </Menu>
    </Card>
  );
});
