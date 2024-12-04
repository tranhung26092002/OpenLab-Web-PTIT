import React, { Fragment } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { useSensorData } from "../../hooks/useSensorData";
import SensorBlock from "../../components/SensorBlock/SensorBlock";
import ChartBlock from "../../components/ChartBlock/ChartBlock";
import LedButton from "../../components/LedButton/LedButton";
import style from "./Sensor.module.scss";
import {
  AirOutlined,
  OpacityOutlined,
  ThermostatOutlined,
} from "@mui/icons-material";

const Sensor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { sensorData, toggleLed } = useSensorData(id!);

  return (
    <Fragment>
      <Header />
      <div>
        <h2>Kit IoT: Node {id}</h2>
        <div className={style.Container}>
          <div className={style.MainContainer}>
            <h3>Cảm biến</h3>
            <div className={style.SensorGrid}>
              <SensorBlock
                title="Nhiệt độ"
                value={`${sensorData.temperature} °C`}
                icon={ThermostatOutlined}
              />
              <SensorBlock
                title="Độ ẩm"
                value={`${sensorData.humidity} %`}
                icon={OpacityOutlined}
              />
              <SensorBlock
                title="Khí gas"
                value={`${sensorData.gas} ppm`}
                icon={AirOutlined}
              />
              <LedButton ledStatus={sensorData.led} toggleLed={toggleLed} />
            </div>
          </div>
          <div className={style.ChartContainer}>
            <h3>Biểu đồ</h3>
            <div className={style.ChartGrid}>
              <ChartBlock
                title="Nhiệt độ"
                dataKey="temperature"
                data={sensorData.temperature}
                color="#82ca9d"
              />
              <ChartBlock
                title="Độ ẩm"
                dataKey="humidity"
                data={sensorData.humidity}
                color="#8884d8"
              />
              <ChartBlock
                title="Khí gas"
                dataKey="gas"
                data={sensorData.gas}
                color="#ffc658"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Sensor;
