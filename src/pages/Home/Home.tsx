import React, { Fragment } from "react";
import styles from "./Home.module.scss";
import Header from "../../components/Header/Header";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

type Props = {};

export const Home = (props: Props) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Header />
      <h2>THỰC HÀNH CHUYÊN NGHÀNH HỆ THỐNG IoT</h2>
      <div className={styles.contentImage}>
        <img src={require("../../assets/img/image.png")} alt="" />
      </div>

      <Footer />
    </Fragment>
  );
};
