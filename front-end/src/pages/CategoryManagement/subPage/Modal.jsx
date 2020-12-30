import React, { useRef, Fragment, useEffect, useState } from "react";
import { useObserver } from "mobx-react-lite";
import _ from "lodash";
import { Modal, Select, message, Form, Input, Row, Col } from "antd";
import { useStore } from "../store";

const FormItem = Form.Item;
const { Option } = Select;

export default () => useObserver(() => {
  const store = useStore();
  const formRef = useRef({});
  const [form] = Form.useForm();
  // 关闭弹窗
  const onCancel = () => {

    formRef.current.resetFields();
    store.closeModal(store.type);
  };

  // 提交表单
  const onFinish = async () => {
    await form.validateFields();
    store[`on${_.upperFirst(store.type)}`](form.getFieldsValue())
      .then(async isSuccess => {
        if (isSuccess) {
          message.success(`${store.typeDesc}成功`);
          await store.getCatList();
          onCancel();
        } else {
          message.error(`服务错误, ${store.message}`);
        }
      });
  };

  useEffect(() => {
    if (store.type === 'edit' && store.modal[store.type] === true) {
      formRef.current.setFieldsValue({
        category: store.cat['category'],
        parentId: store.cat['parentId'],
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
            width="65%"
            title={store.typeDesc}
            visible={store.modal[store.type]}
            onCancel={onCancel}
            onOk={onFinish}
          >
            <Form
              colon={true}
              form={form}
              ref={formRef}
              {...formItemLayout}
            >
              <Row>
                <Col span={8}>
                  <FormItem
                    label="分类名称"
                    name="category"
                    rules={[{ required: true, message: '分类名称必填' }]}
                  >
                    <Input />
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    label="父节点"
                    name="parentId"
                    rules={[{ required: true, message: '父节点必填' }]}
                  >
                    <Select
                      placeholder="请选择父节点"
                      allowClear
                    >
                      {
                        _.map([...store.catList, { id: 0, category: '根节点' }], 
                          v => <Option key={v.id} value={v.id}>{v.category}</Option>)
                      }
                    </Select>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Modal>
        ) : null
      }
    </Fragment>
  );
});
