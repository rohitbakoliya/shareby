import React from 'react';
import { Form, Modal, Input } from 'antd';

const RunModal = ({ handleCancel, handleOk, isModalVisible, confirmLoading }) => {
  const [form] = Form.useForm();
  return (
    <>
      <Modal
        title="Compile and execute your code"
        visible={isModalVisible}
        onOk={() => handleOk(form)}
        okText="Compile"
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        <Form form={form} name="input-form">
          <Form.Item name="input" rules={[{ required: true, message: 'Please provide input!' }]}>
            <Input.TextArea placeholder="add input here" rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RunModal;
