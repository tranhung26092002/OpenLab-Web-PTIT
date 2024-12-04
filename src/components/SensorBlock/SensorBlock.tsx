import React from "react";
import style from "./SensorBlock.module.scss";

interface SensorBlockProps {
  title: string;
  value: string | number | null;
  icon: React.ElementType;
}

const SensorBlock: React.FC<SensorBlockProps> = ({ title, value, icon }) => (
  <div className={style.Block}>
    {React.createElement(icon, { fontSize: "large" })}
    <div className={style.Info}>
      <h4>{title}</h4>
      <p>Value: {value ?? "N/A"}</p>
    </div>
  </div>
);

export default SensorBlock;
