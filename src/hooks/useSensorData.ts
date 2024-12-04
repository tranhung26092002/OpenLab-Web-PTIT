import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export const useSensorData = (id: string) => {
  const stompClientRef = useRef<Client | null>(null);
  const [sensorData, setSensorData] = useState({
    temperature: null,
    humidity: null,
    gas: null,
    light: null,
    led: false,
  });

  useEffect(() => {
    const sock = new SockJS("http://localhost:8081/mqtt/ws");
    const stompClient = new Client({
      webSocketFactory: () => sock,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClientRef.current = stompClient;

    stompClient.onConnect = () => {
      console.log("WebSocket connected");

      stompClient.subscribe(`/topic/sensorData/${id}`, (message) => {
        const data = JSON.parse(message.body);
        setSensorData((prev) => ({
          ...prev,
          ...data,
        }));
      });

      // Gọi hàm fetchInitialData khi kết nối
      fetchInitialData();
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [id]);

  const publishCommand = (command: string) => {
    if (stompClientRef.current?.connected) {
      stompClientRef.current.publish({
        destination: `/app/publish/command/${id}`,
        body: JSON.stringify({ command }),
      });
    }
  };

  // Hàm yêu cầu dữ liệu cảm biến
  const fetchInitialData = () => {
    if (stompClientRef.current?.connected) {
      stompClientRef.current.publish({
        destination: `/app/node/${id}`,
        body: JSON.stringify({ id }),
      });
      console.log("Fetch initial data requested");
    } else {
      console.warn("STOMP client is not connected");
    }
  };

  const toggleLed = () => {
    const newLedStatus = !sensorData.led; // Tính trạng thái LED mới
    const command = {
      nodeName: `Node_${id}`,
      led: newLedStatus ? 1 : 0,
    };

    setSensorData((prev) => ({ ...prev, led: newLedStatus })); // Cập nhật trạng thái LED ngay lập tức
    publishCommand(JSON.stringify(command)); // Gửi lệnh điều khiển LED
  };

  return { sensorData, toggleLed };
};
