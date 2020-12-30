import React, { useRef, Fragment, useEffect } from 'react';
import { Modal, Select, Form, Input } from 'antd';
import _ from 'lodash';
import { useObserver } from "mobx-react-lite";
import { useStore } from '../store';
import '../index.less';

const FormItem = Form.Item;
const Option = Select.Option;

export default () => useObserver(() => {
  const store = useStore();
  const formRef = useRef({});
  const [form] = Form.useForm();

  useEffect(() => {
    // console.log('typeInRole===', store.type);
    // console.log('typeInRole===', [store.modal[store.type]]);
    form.setFieldsValue({
      name: store['currentRole']['name'],
      memo: store['currentRole']['memo'],
    });
  }, [store.modal[store.type]]);
  // 弹窗标题
  const title = {
    addRole: '新增角色',
    editRole: '编辑角色',
  }[store.type];

  // 关闭弹窗
  const handleClose = () => {
    formRef.current.resetFields();
    store
      .setValue('currentRole', {})
      .setValue('type', undefined)
      .closeModal(store.type);

  };
  // 确认弹窗
  const onOk = () => {
    formRef.current
      .validateFields()
      .then(values => {
        store[store.type](values)
          .then(() => {
            store.showMsg('success', `${title}成功`);
          })
          .then(store.getRoles)
          .then(() => {
            handleClose();
          });
      });
  };
  return (
    <Fragment>
      {
        <Modal
          width="40%"
          title={title}
          visible={store.modal[store.type] && title}
          onOk={onOk}
          onCancel={handleClose}
        >
          <Form
            colon={true}
            ref={formRef}
            form={form}
            initialValues={store.currentRole}
          >
            <FormItem
              label="角色名称"
              name="name"
              rules={[
                { required: true, message: '角色名称必填' },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    const reg = /^[a-zA-Z]+$/g;
                    if (reg.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject('用户名仅支持输入英文字母');
                  }
                })
              ]}
            >
              <Input placeholder="角色名称" />
            </FormItem>

            <FormItem
              label="角色描述"
              name="memo"
              rules={[{ required: true, message: '角色描述必填' }]}
            >
              <Input placeholder="角色描述" />
            </FormItem>
          </Form>
        </Modal>
      }
    </Fragment>
  );
});
