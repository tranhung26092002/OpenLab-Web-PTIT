// components/NodeCard/NodeCard.tsx
import React from "react";
import { Card, Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Node } from "../../types/Gateway";
import styles from "./NodeCard.module.scss";

const { Text } = Typography;

interface NodeCardProps {
  node: Node;
  onClick: () => void;
}

export const NodeCard: React.FC<NodeCardProps> = ({ node, onClick }) => (
  <Card className={styles.nodeCard} onClick={onClick}>
    <div className={styles.nodeInfo}>
      <div className={styles.nodeMain}>
        <Text strong>{node.name}</Text>
        <Text type="secondary" className={styles.nodeId}>
          {" "}
          ID: {node.nodeId}
        </Text>
      </div>
      <div className={styles.nodeStatus}>
        <div className={styles.statusIndicator}>
          <span className={node.active ? styles.active : styles.inactive} />
          {node.active ? "Active" : "Inactive"}
        </div>
        <RightOutlined className={styles.nodeArrow} />
      </div>
    </div>
    {node.lastSeen && (
      <Text type="secondary" className={styles.lastSeen}>
        Last seen: {new Date(node.lastSeen).toLocaleString()}
      </Text>
    )}
  </Card>
);
