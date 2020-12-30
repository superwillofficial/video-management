import React, { Fragment } from "react";
import { useObserver } from "mobx-react-lite";
import { createHashHistory } from 'history';
import _ from "lodash";
import { Button, Form, Row, Col, Input, Select, Modal } from "antd";
import { useStore } from "../store";

const FormItem = Form.Item;
const { Option } = Select;

export default () => useObserver(() => {
  const store = useStore();
  const [form] = Form.useForm();

  // 表单布局
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onSearch = async () => {
    await form.validateFields();
    let data = form.getFieldsValue();
    data['id'] = _.find(store.roles, (o) =>
      String(o.id) === store._roleSelectedKeys[0]);
    console.log(data);
    await store.getUsers(data);
  };

  return (
    <Fragment>
      <Form
        form={form}
        colon={true}
        {...formItemLayout}
      >
        <Row>
          <Col span={6}>
            <FormItem
              label="用户昵称"
              name="nickName"
            >
              <Input />
            </FormItem>
          </Col>
          <Col span={1} />
          <Col span={2}>
            <FormItem>
              <Button type="primary" onClick={onSearch}>
                查询
              </Button>
            </FormItem>
          </Col>
          <Col span={2} >
            <FormItem>
              <Button
                type="primary"
                onClick={() => {
                  store
                    .setValue('type', 'addUser')
                    .openModal('addUser');
                }}
              >
                新增
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
});