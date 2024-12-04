// components/GatewayCard/GatewayCard.tsx
import React, { useState } from 'react';
import { Card, Typography, Empty, Button } from 'antd';
import { WifiOutlined, EnvironmentOutlined, NodeIndexOutlined, ExpandAltOutlined, PlusOutlined } from '@ant-design/icons';
import { Gateway } from '../../types/Gateway';
import { NodeCard } from '../NodeCard/NodeCard';
import { AddNodeModal } from '../AddNodeModal/AddNodeModal';
import styles from './GatewayCard.module.scss';

const { Title } = Typography;

interface GatewayCardProps {
  gateway: Gateway;
  expandedGateway: number | null;
  onExpand: (id: number) => void;
  onNodeClick: (nodeId: number) => void;
  onAddNode: (nodeId: string) => Promise<void>;
}

export const GatewayCard: React.FC<GatewayCardProps> = ({
  gateway,
  expandedGateway,
  onExpand,
  onNodeClick,
  onAddNode,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleAddNode = async (nodeId: string ) => {
    setSubmitting(true);
    try {
      await onAddNode(nodeId);
      setIsModalVisible(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Card
        className={`${styles.gatewayCard} ${gateway.active ? styles.activeGateway : ''}`}
        title={
          <div className={styles.cardHeader}>
            <div className={styles.statusIndicator}>
              <span className={gateway.active ? styles.active : styles.inactive} />
              {gateway.active ? 'Active' : 'Inactive'}
            </div>
            <ExpandAltOutlined onClick={() => onExpand(gateway.id)} className={styles.expandIcon} />
          </div>
        }
      >
        <div className={styles.cardContent}>
          <Title level={3} className={styles.gatewayName}>{gateway.name}</Title>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <WifiOutlined />
              <span>{gateway.ipAddress}</span>
            </div>
            <div className={styles.infoItem}>
              <EnvironmentOutlined />
              <span>{gateway.location}</span>
            </div>
            <div className={styles.infoItem}>
              <NodeIndexOutlined />
              <span>{gateway.nodes?.length || 0} Nodes</span>
            </div>
          </div>
          
          {gateway.active && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalVisible(true)}
              className={styles.addNodeButton}
            >
              Active Node
            </Button>
          )}

          {expandedGateway === gateway.id && (
            <div className={styles.nodesSection}>
              <Title level={5}>Connected Nodes</Title>
              <div className={styles.nodesList}>
                {gateway.nodes?.length ? (
                  gateway.nodes.map(node => (
                    <NodeCard key={node.id} node={node} onClick={() => onNodeClick(node.id)} />
                  ))
                ) : (
                  <Empty description="No nodes connected" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </div>
            </div>
          )}
        </div>
      </Card>

      <AddNodeModal
        visible={isModalVisible}
        gatewayId={gateway.id}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleAddNode}
        submitting={submitting}
      />
    </>
  );
};

export default GatewayCard;