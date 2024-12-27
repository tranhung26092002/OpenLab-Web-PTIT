// components/AddGatewayModal/AddGatewayModal.tsx
import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import styles from './AddGatewayModal.module.scss';

interface AddGatewayModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: { gatewayId: string }) => Promise<void>;
  submitting: boolean;
}

export const AddGatewayModal: React.FC<AddGatewayModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  submitting,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Active New Gateway"
      open={visible}
      onCancel={onCancel}
      footer={null}
      maskClosable={false}
    >
      <Form
        form={form}
        onFinish={onSubmit}
        layout="vertical"
        className={styles.addGatewayForm}
      >
        <Form.Item
          label="Gateway ID"
          name="gatewayId"
          rules={[
            { required: true, message: 'Please input Gateway ID!' },
            {
              pattern: /^[A-Za-z0-9-_]+$/,
              message: 'Only letters, numbers, hyphens and underscores allowed',
            },
          ]}
        >
          <Input placeholder="Enter Gateway ID" />
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