import React, { useRef, Fragment, useEffect, useState } from "react";
import { useObserver } from "mobx-react-lite";
import _ from "lodash";
import { Modal, Select, message, Form, Input, Button, Divider, Upload } from "antd";
import { PlusOutlined } from '@ant-design/icons';

import axios from '@utils/axios';
import { useStore } from "../store";
import { PUBLIC_STATUS } from '@config/consts';
import { FILE_URL } from '@config/sysConsts';

const FormItem = Form.Item;
const { Option } = Select;

export default () => useObserver(() => {
  const store = useStore();
  const [defaultFileList, setDefaultFileList] = useState([]);
  const [form] = Form.useForm();

  const title = {
    uploadVideo: '上传影片',
  }[store.type];

  const uploadButton = (
    <Button
      type='primary'
      size='large'
      icon={<PlusOutlined />}
      shape="round"
      style={{ marginTop: 10 }}
    >Upload</Button>
  );

  // 关闭弹窗
  const onCancel = () => {
    form.resetFields();
    setDefaultFileList([]);
    store.closeModal(store.type);
  };

  const infoCollection = async () => {
    await form.validateFields();
    return {
      ...form.getFieldsValue(),
      video: store.urlOfVideoFile,
    };
  };

  const videoCheck = () => {
    if(_.isEmpty(defaultFileList)) {
      message.error('请选择要上传的影片!!');
      throw '请选择要上传的影片!!';
    }
    if(_.isEmpty(store.urlOfVideoFile)) {
      message.error('请等待影片上传完成!!');
      throw '请等待影片上传完成!!';
    }
  };

  const onSave = async () => {
    videoCheck();
    let data = await infoCollection();
    console.log(data);
    const isSuccess = await store.onAdd(data);
    if (isSuccess) {
      message.success('保存成功');
      await store.getVidList();
      onCancel();
    } else {
      message.error(`服务错误, ${store.message}`);
    }
  };

  const onSubmit = async () => {
    videoCheck();
    let data = await infoCollection();
    data['status'] = PUBLIC_STATUS.YES;
    const isSuccess = await store.onAdd(data);
    if (isSuccess) {
      message.success('发布成功');
      await store.getVidList();
      onCancel();
    } else {
      message.error(`服务错误, ${store.message}`);
    }
  };

  // 提交表单
  const onFinish = async () => {
    // 当编辑按钮请求提交时
    if (store.type === 'edit') {
      await form.validateFields();
      const data = { ...store.vid, ...form.getFieldsValue() };
      const res = await store[`on${_.upperFirst(store.type)}`](data);
      if (res) {
        message.success(`${store.typeDesc}成功`);
        await store.getVidList();
        onCancel();
      } else {
        message.error(`服务错误, ${store.message}`);
      }
    }
  };

  const handleBeforeUpload = file => {
    console.log(file);
    return Promise.resolve(file);
  };

  const handleCustomRequest = async options => {
    const { onSuccess, onError, file } = options;
    let formData = new FormData();
    // 合并请求参数
    formData.append('fileName', file);
    formData.append('businessNo', String(file.lastModified)); // 写死
    formData.append('businessType', 'CourseVideo'); // 写死
    // 上传
    try {
      const res = await axios({
        url: FILE_URL,
        method: 'POST',
        body: formData,
        header: { 'Content-Type': 'multipart/form-data' },
      });
      onSuccess("Ok");
      store.setValue('urlOfVideoFile', res.data.filePath);
    } catch (err) {
      const error = new Error("Some error");
      onError({ err });
    }
  };

  const handleOnChange = ({ file, fileList, event }) => {
    // console.log(file, fileList, event);
    //Using Hooks to update the state to the current filelist
    setDefaultFileList(fileList);
    //filelist - [{uid: "-1",url:'Some url to image'}]
  };

  const handleRemove = async file => {
    if(!_.isEmpty(store.urlOfVideoFile)) {
      await store.deleteFile(store.urlOfVideoFile);
      store.setValue('urlOfVideoFile', '');
    }
  };

  useEffect(() => {

  }, [store.modal[store.type]]);
  
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
            footer={[
              <Button key="save" type="primary" onClick={onSave}>保存</Button>,
              <Button key="submit" type="primary" onClick={onSubmit}>提交发布</Button>,
              <Button key="cancel" onClick={onCancel}>取消</Button>,
            ]}
          >
            <Divider orientation="left">影片上传</Divider>
            <Upload
              accept="video/*"
              listType="picture"
              beforeUpload={handleBeforeUpload}
              onChange={handleOnChange}
              onRemove={handleRemove}
              // fileList={!_.isEmpty(store.fileList) ? store.fileList : null}
              customRequest={handleCustomRequest}
              // defaultFileList={
              //   !_.isEmpty(store.thumbFileList) ? store.thumbFileList : null
              // }
            >
              {defaultFileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Divider orientation="left">资讯填写</Divider>
            <Form
              colon={true}
              form={form}
              // {...formItemLayout}
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
                    _.map([{ id: 0, category: '根节点' }, ...store.catList],
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
