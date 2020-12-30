import React, { Fragment } from "react";
import { useObserver } from "mobx-react-lite";
import _ from "lodash";
import { Form, Row, Col, Input } from "antd";
import { useStore } from "../store";
import '../index.less';

const FormItem = Form.Item;
const { Search } = Input;

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
    await store.getVidList(form.getFieldsValue());
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
              <Search enterButton placeholder="请输入影片名称" onSearch={onSearch} />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
});