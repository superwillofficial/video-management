import React, { Fragment, useEffect } from "react";
import { useObserver } from "mobx-react-lite";
import { createHashHistory } from 'history';
import _ from "lodash";
import { Button, Form, Row, Col, Input, Select } from "antd";
import { useStore } from "../store";
import '../../index.less';

const FormItem = Form.Item;

export default () => useObserver(() => {
  const store = useStore();
  const [form] = Form.useForm();

  // 表单布局
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const onSearch = async () => {
    await form.validateFields();
    let data = form.getFieldsValue();
    console.log(data);
    await store.getCatList(data);
  };

  useEffect(() => {
    const dataFetch = async () => {
      await store.getCatList();
    };
    dataFetch();
  }, []);

  return (
    <Fragment>
      <Form
        form={form}
        colon={true}
        // {...formItemLayout}
      >
        <Row justify="center">
          <Col span={12}>
            <FormItem
              name="category"
            >
              <Input.Search enterButton placeholder="请输入分类名称" onSearch={onSearch} />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
});