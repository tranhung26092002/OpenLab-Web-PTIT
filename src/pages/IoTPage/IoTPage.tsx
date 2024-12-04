import React, { Fragment } from "react";
import styles from "../Home/Home.module.scss";
import Header from "../../components/Header/Header";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const IoTPage = () => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Header />
      <div className={styles.container}>
        <h2>THỰC HÀNH CHUYÊN NGHÀNH HỆ THỐNG IoT</h2>
        <div className={styles.contentImage}>
          <img src={require("../../assets/img/image.png")} alt="" />
        </div>
      </div>

      <section className={styles.project_padding}>
        <div className={styles.container_project}>
          <div className={styles.content_project}>
            <div className={styles.text_project}>
              <h2 className={styles.sub_heading}>Bài tập thực hành</h2>
              <p className={styles.heading}>
                Các bài tập thực hành giúp sinh viên nắm vững kiến thức và kỹ
                năng cần thiết trong lĩnh vực IoT
              </p>
            </div>
          </div>
          <div className={styles.row_project}>
            <div className={styles.project_column}>
              <div className={styles.project_header}>
                <span>
                  <img
                    src={require("../../assets/home/anh1.png")}
                    alt="project 1"
                  />
                </span>
              </div>
              <div className={styles.project_content}>
                <div className={styles.project_title}>
                  <p>Bài 1. Tìm hiểu về kít wifi nodemcu esp8266</p>
                </div>
                <div className={styles.project_footer}>
                  <div className="project-price"></div>
                  <button
                    className={styles.btn}
                    onClick={() =>
                      navigate("/home", {
                        replace: true,
                      })
                    }
                  >
                    Xem chi tiết
                    <i className="fa fa-long-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.project_column}>
              <div className={styles.project_header}>
                <span>
                  <img
                    src={require("../../assets/home/anh2.png")}
                    alt="project 2"
                  />
                </span>
              </div>
              <div className={styles.project_content}>
                <div className={styles.project_title}>
                  <p>Bài 2. Tìm hiểu về giao tiếp uart trên esp8266 nodemcu</p>
                </div>
                <div className={styles.project_footer}>
                  <div className="project-price"></div>
                  <button
                    className={styles.btn}
                    onClick={() =>
                      navigate("/home", {
                        replace: true,
                      })
                    }
                  >
                    Xem chi tiết
                    <i className="fa fa-long-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.project_column}>
              <div className={styles.project_header}>
                <span>
                  <img
                    src={require("../../assets/home/anh3.png")}
                    alt="project 3"
                  />
                </span>
              </div>
              <div className={styles.project_content}>
                <div className={styles.project_title}>
                  <p>Bài 3. Webserver trên ESP8266 nodemcu</p>
                </div>
                <div className={styles.project_footer}>
                  <div className={styles.project_price}></div>
                  <button
                    className={styles.btn}
                    onClick={() =>
                      navigate("/home", {
                        replace: true,
                      })
                    }
                  >
                    Xem chi tiết
                    <i className="fa fa-long-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.project_column}>
              <div className={styles.project_header}>
                <span>
                  <img
                    src={require("../../assets/home/anh4.png")}
                    alt="project 3"
                  />
                </span>
              </div>
              <div className={styles.project_content}>
                <div className={styles.project_title}>
                  <p>Bài 4. Giao thức MQTT trong lập trình ESP8266 và IoT</p>
                </div>
                <div className={styles.project_footer}>
                  <div className={styles.project_price}></div>
                  <button
                    className={styles.btn}
                    onClick={() =>
                      navigate("/home", {
                        replace: true,
                      })
                    }
                  >
                    Xem chi tiết
                    <i className="fa fa-long-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};
export default IoTPage;
