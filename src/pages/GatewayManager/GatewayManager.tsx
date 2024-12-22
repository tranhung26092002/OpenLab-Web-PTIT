// GatewayManager.tsx
import React, { useEffect, useState, useCallback, Fragment } from "react";
import { Row, Col, Spin, Empty, message, Form, notification } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./GatewayManager.module.scss";
import { Gateway } from "../../types/Gateway";

import { GatewayCard } from "../../components/GatewayCard/GatewayCard";
import { AddGatewayModal } from "../../components/AddGatewayModal/AddGatewayModal";
import { GatewayHeader } from "../../components/GatewayHeader/GatewayHeader";

const GatewayManager: React.FC = () => {
  const navigate = useNavigate();
  const [gateways, setGateways] = useState<Gateway[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedGateway, setExpandedGateway] = useState<number | null>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const fetchGateways = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const { data } = await axios.get<Gateway[]>(
        "http://14.225.255.177:8083/mqtt/api/gateways"
      );
      setGateways(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch gateways");
      message.error("Unable to load gateways");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchGateways();
    // Set up polling every 30 seconds
    const interval = setInterval(() => fetchGateways(false), 30000);
    return () => clearInterval(interval);
  }, [fetchGateways]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchGateways(false);
  };

  // Update handleAddGateway
  const handleAddGateway = () => {
    setIsModalVisible(true);
  };

  // Add new handlers
  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleSubmit = async (values: { gatewayId: string }) => {
    setSubmitting(true);
    try {
      await axios.put(
        `http://14.225.255.177:8083/mqtt/api/gateways/${values.gatewayId}`
      );

      // Success determined by 200 status code
      message.success("Gateway activated successfully");
      handleCancel();
      fetchGateways(false);
    } catch (err: any) {
      console.error("Gateway activation error:", err);
      message.error(
        err.response?.data?.message ||
          "Failed to activate gateway. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Add handler
  const handleAddNode = async (nodeId: string) => {
    try {
      await axios.put(`http://14.225.255.177:8083/mqtt/api/nodes/${nodeId}`, {
        nodeId: nodeId,
      });
      notification.success({
        message: "Success",
        description: `Node ${nodeId} was successfully added`,
        placement: "topRight",
        duration: 4,
        style: {
          borderRadius: "8px",
          backgroundColor: "#f6ffed",
          border: "1px solid #b7eb8f",
        },
      });
      message.success("Node added successfully");
      fetchGateways(false);
    } catch (err: any) {
      console.error("Node addition error:", err);
      message.error(
        err.response?.data?.message || "Failed to add node. Please try again."
      );
    }
  };

  const toggleGatewayExpand = (gatewayId: number) => {
    setExpandedGateway(expandedGateway === gatewayId ? null : gatewayId);
  };

  const handleNodeClick = (nodeId: number) => {
    navigate(`/node/${nodeId}`);
  };

  return (
    <Fragment>
      <Header />
      <main className={styles.main}>
        <div>
          <h1 className={styles.title}>Quản lý thiết bị</h1>
        </div>
        <GatewayHeader
          gatewaysCount={gateways.length}
          onAddGateway={handleAddGateway}
          onRefresh={handleRefresh}
          loading={loading}
          refreshing={refreshing}
        />

        {loading ? (
          <div className={styles.loading}>
            <Spin size="large" />
          </div>
        ) : error ? (
          <Empty description={error} image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <Row gutter={[24, 24]} className={styles.gatewaysGrid}>
            {gateways.map((gateway) => (
              <Col xs={24} sm={12} md={12} lg={12} xl={12} key={gateway.id}>
                <GatewayCard
                  gateway={gateway}
                  expandedGateway={expandedGateway}
                  onExpand={toggleGatewayExpand}
                  onNodeClick={handleNodeClick}
                  onAddNode={handleAddNode}
                />
              </Col>
            ))}
          </Row>
        )}

        <AddGatewayModal
          visible={isModalVisible}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      </main>
      <Footer />
    </Fragment>
  );
};

export default GatewayManager;
