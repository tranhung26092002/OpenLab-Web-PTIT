// components/GatewayHeader/GatewayHeader.tsx
import React from 'react';
import { Typography, Button, Tooltip } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import styles from './GatewayHeader.module.scss';

const { Title } = Typography;

interface GatewayHeaderProps {
  gatewaysCount: number;
  onAddGateway: () => void;
  onRefresh: () => void;
  loading: boolean;
  refreshing: boolean;
}

export const GatewayHeader: React.FC<GatewayHeaderProps> = ({
  gatewaysCount,
  onAddGateway,
  onRefresh,
  loading,
  refreshing
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.titleSection}>
        <Title level={2}>Gateways</Title>
        <span className={styles.count}>
          {gatewaysCount} {gatewaysCount === 1 ? 'Gateway' : 'Gateways'}
        </span>
      </div>
      
      <div className={styles.actions}>
        <Tooltip title="Refresh gateways">
          <Button 
            icon={<ReloadOutlined spin={refreshing} />}
            onClick={onRefresh}
            disabled={loading}
          >
            Refresh
          </Button>
        </Tooltip>
        
        <Button 
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAddGateway}
          disabled={loading}
        >
          Active Gateway
        </Button>
      </div>
    </div>
  );
};