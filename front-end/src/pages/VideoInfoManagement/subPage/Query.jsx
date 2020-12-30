import React, { Fragment, useEffect } from "react";
import { useObserver } from "mobx-react-lite";
import { createHashHistory } from 'history';
import _ from "lodash";
import { Button, Form, Row, Col, DatePicker, Input, Select } from "antd";
import { useStore } from "../store";
import '../../index.less';
import { STATUS, STATUS_DESC } from "@config/consts";

const history = createHashHistory();
const FormItem = Form.Item;
const { Option } = Select;

export default () => useObserver(() => {
  const store = useStore();
  const [form] = Form.useForm();

  // 表单布局
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  useEffect(() => {
    const dataFetch = async () => {
      await store.getCatList();
      await store.getVidList();
    };
    dataFetch();
  }, []);

  const onSearch = async () => {
    await form.validateFields();
    let data = form.getFieldsValue();
    console.log(data);
    await store.getVidList(data);
  };

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
              name="title"
            >
              <Input.Search enterButton placeholder="请输入影片标题" onSearch={onSearch} />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
});