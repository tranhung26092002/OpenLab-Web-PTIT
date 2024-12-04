import React from "react";
import style from "./LedButton.module.scss";
import { Lightbulb } from "@mui/icons-material"; // Import icon bóng đèn

interface LedButtonProps {
  ledStatus: boolean;
  toggleLed: () => void;
}

const LedButton: React.FC<LedButtonProps> = ({ ledStatus, toggleLed }) => {
  return (
    <div className={style.Button}>
      <button
        onClick={toggleLed}
        className={ledStatus ? style.On : style.Off} // Class tùy theo trạng thái
      >
        {/* Thêm icon bóng đèn */}
        <Lightbulb style={{ marginRight: "8px", fontSize: "20px" }} />
        LED {ledStatus ? "ON" : "OFF"}
      </button>
    </div>
  );
};

export default LedButton;
