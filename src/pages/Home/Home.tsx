import React, { Fragment } from "react";
import styles from "./Home.module.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import anh from "../../assets/img/image.png";

export const Home = () => {
  return (
    <Fragment>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            THỰC HÀNH CHUYÊN NGHÀNH HỆ THỐNG IoT
          </h1>
          <div className={styles.imageWrapper}>
            <img src={anh} alt="IoT Practice" />
          </div>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
};