import React, { useRef, Fragment, useEffect, useState } from 'react';
import { Modal, Select, Form, Input, Row, Col, Upload } from 'antd';
import _ from 'lodash';
import { useObserver } from "mobx-react-lite";
import { PlusOutlined } from '@ant-design/icons';

import { useStore } from '../store';
import '../index.less';
import { GENDER, GENDER_DESC } from '@config/consts';

const FormItem = Form.Item;
const { Option } = Select;

export default () => useObserver(() => {
  const store = useStore();
  const formRef = useRef({});
  const [form] = Form.useForm();
  const [newfile, setNewFile] = useState(false);

  useEffect(() => {
    // console.log('typeInUser===', store.type);
    // console.log('typeInUSer===', [store.modal[store.type]]);
    // console.log('roles=======', store.roles);
    form.setFieldsValue({
      nickName: store['currentUser']['nickName'],
      sex: store['currentUser']['sex'],
      phone: store['currentUser']['phone'],
      roleId: store['currentUser']['roleId'],
    });
  }, [store.modal[store.type]]);

  // 弹窗标题
  const title = {
    addUser: '新增用户',
    editUser: '编辑用户',
  }[store.type];

  const handleBeforeUpload = file => {
    // 记录下文件资讯
    store.setValue('file', file);
    // 标志新文件已上传
    setNewFile(true);
    return false;
  };

  const handleRemove = () => {
    store.setValue('file', {});
    setNewFile(false);
  };

  // 关闭弹窗
  const handleClose = () => {
    formRef.current.resetFields();
    store
      .setValue('currentUser', {})
      .setValue('type', undefined)
      .closeModal(store.type);

  };
  // 确认弹窗
  const onOk = async () => {
    if (store.type === 'addUser') {
      let res;
      if (!_.isEmpty(store.file)) {
        const file = store.file;
        res = await store.uploadFile({ file });
      }
      formRef.current
        .validateFields()
        .then(values => {
          if (!_.isEmpty(res)) {
            values['avatar'] = res['data']['filePath'];
          }
          store[store.type](values)
            .then(() => {
              store.showMsg('success', `${title}成功`);
            })
            .then(store.getRoles)
            .then(() => {
              handleClose();
            });
        });
    } else if (store.type === 'editUser') {
      let res;
      if (!_.isEmpty(store.file) && newfile === true) {
        const file = store.file;
        res = await store.uploadFile({ file });
      }
      formRef.current
        .validateFields()
        .then(values => {
          if (!_.isEmpty(res)) {
            values['avatar'] = res['data']['filePath'];
          }
          store[store.type](values)
            .then(() => {
              store.showMsg('success', `${title}成功`);
            })
            .then(store.getRoles)
            .then(() => {
              handleClose();
            });
        });
    }
  };

  // 上传按钮
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Fragment>
      {
        <Modal
          width="25%"
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
              label="昵称"
              name="nickName"
            >
              <Input placeholder="昵称" />
            </FormItem>

            <FormItem
              label="性别"
              name="sex"
            >
              <Select placeholder="请选择性别" allowClear>
                {
                  _.map(GENDER, v => <Option key={v} value={v}>
                    {GENDER_DESC[v]}
                  </Option>)
                }
              </Select>
            </FormItem>

            <FormItem
              label="电话号码"
              name="phone"
              rules={[
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    const reg = /^1(3|4|5|6|7|8|9)\d{9}$|^$/g;
                    if (reg.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject('请输入正确的中国大陆手机号码');
                  }
                })
              ]}
            >
              <Input placeholder="电话号码" />
            </FormItem>
            {store.type === 'addUser' ? (
              <FormItem
                label="所属角色"
                name="roleId"
              >
                <Select placeholder="请选择角色">
                  {
                    _.map(store.roles, v => <Option key={v.id} value={v.id}>
                      {v.memo}
                    </Option>)
                  }
                </Select>
              </FormItem>
            ) : null}
          </Form>
          <Row>
            <span>上传头像</span>
            <Upload
              accept="image/*"
              listType="picture-card"
              beforeUpload={handleBeforeUpload}
              onRemove={handleRemove}
              customRequest={info => store.uploadFile(info)}
            >
              {_.isEmpty(store.file) ? uploadButton : null}
            </Upload>
          </Row>
        </Modal>
      }
    </Fragment>
  );
});
