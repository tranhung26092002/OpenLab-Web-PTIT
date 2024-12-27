// components/AddNodeModal/AddNodeModal.tsx
import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import styles from './AddNodeModal.module.scss';

interface AddNodeModalProps {
  visible: boolean;
  gatewayId: number; 
  onCancel: () => void;
  onSubmit: (nodeId: string) => Promise<void>;
  submitting: boolean;
}

interface FormValues {
  nodeId: string;
}

export const AddNodeModal: React.FC<AddNodeModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  submitting,
}) => {
  const [form] = Form.useForm<FormValues>();

  const handleSubmit = async (values: FormValues) => {
    await onSubmit(values.nodeId);
    form.resetFields();
  };

  return (
    <Modal
      title="Active New Node"
      open={visible}
      onCancel={onCancel}
      footer={null}
      maskClosable={false}
    >
      <Form<FormValues>
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          label="Node ID"
          name="nodeId"
          rules={[
            { required: true, message: 'Please input Node ID!' },
            {
              pattern: /^[A-Za-z0-9-_]+$/,
              message: 'Only letters, numbers, hyphens and underscores allowed',
            },
          ]}
        >
          <Input placeholder="Enter Node ID" />
        </Form.Item>
        <Form.Item className={styles.modalFooter}>
          <Button onClick={onCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={submitting}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNodeModal;