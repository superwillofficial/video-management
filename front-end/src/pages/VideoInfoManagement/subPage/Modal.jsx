import React, { useRef, Fragment, useEffect, useState } from "react";
import { useObserver } from "mobx-react-lite";
import _ from "lodash";
import { Modal, Select, message, Form, Input, Row, Col, Upload, Button } from "antd";
import { useStore } from "../store";

const FormItem = Form.Item;
const { Option } = Select;

export default () => useObserver(() => {
  const store = useStore();
  const formRef = useRef({});
  const [form] = Form.useForm();

  // 弹窗标题
  const title = {
    edit: '编辑资讯',
  }[store.type];

  // 关闭弹窗
  const onCancel = () => {
    formRef.current.resetFields();
    store.closeModal(store.type);
  };

  // 提交表单
  const onFinish = async () => {
    // 当编辑按钮请求提交时
    if (store.type === 'edit') {
      await form.validateFields();
      const data = { ...store.vid, ...form.getFieldsValue() };
      const res = await store[`on${_.upperFirst(store.type)}`](data);
      if (res) {
        message.success('编辑成功');
        await store.getVidList();
        onCancel();
      } else {
        message.error(`服务错误, ${store.message}`);
      }
    }
  };

  useEffect(() => {
    if (store.type === 'edit' && store.modal[store.type] === true) {
      formRef.current.setFieldsValue({
        title: store.vid['title'],
        categoryId: store.vid['categoryId'],
        memo: store.vid['memo'],
      });
    };
  }, [store.modal[store.type]]);

  // 表单布局
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };

  return (
    <Fragment>
      {
        store.modal[store.type] ? (
          <Modal
            width="45%"
            title={title}
            visible={store.modal[store.type] && title}
            onCancel={onCancel}
            onOk={onFinish}
          >
            <Form
              colon={true}
              form={form}
              ref={formRef}
              {...formItemLayout}
            >
              <FormItem
                label="影片标题"
                name="title"
                rules={[{ required: true, message: '影片标题必填' }]}
              >
                <Input />
              </FormItem>

              <FormItem
                label="所属目录"
                name="categoryId"
                rules={[{ required: true, message: '所属目录必填' }]}
              >
                <Select
                  placeholder="请选择"
                  allowClear
                >
                  {
                    _.map([...store.catList, { id: 0, category: '根节点' }],
                      v => <Option key={v.id} value={v.id}>{v.category}</Option>)
                  }
                </Select>
              </FormItem>

              <FormItem
                label="影片简介"
                name="memo"
              >
                <Input.TextArea rows={4} />
              </FormItem>
            </Form>
          </Modal>
        ) : null
      }
    </Fragment>
  );
});
