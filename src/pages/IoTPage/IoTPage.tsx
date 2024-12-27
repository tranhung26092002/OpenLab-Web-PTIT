import React from "react";
import styles from "./IoTPage.module.scss";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import anh from "../../assets/img/image.png";
import anh1 from "../../assets/home/anh1.png";
import anh2 from "../../assets/home/anh2.png";
import anh3 from "../../assets/home/anh3.png";
import anh4 from "../../assets/home/anh4.png";

const IoTPage = () => {
  const navigate = useNavigate();
  const projects = [
    {
      id: 1,
      image: anh1,
      title: "Bài 1. Tìm hiểu về kít wifi nodemcu esp8266",
      route: "/esp8266-intro"
    },
    {
      id: 2, 
      image: anh2,
      title: "Bài 2. Tìm hiểu về giao tiếp uart trên esp8266 nodemcu",
      route: "/esp8266-uart"
    },
    {
      id: 3,
      image: anh3, 
      title: "Bài 3. Webserver trên ESP8266 nodemcu",
      route: "/esp8266-webserver"
    },
    {
      id: 4,
      image: anh4,
      title: "Bài 4. Giao thức MQTT trong lập trình ESP8266 và IoT",
      route: "/esp8266-mqtt"
    }
  ];

  return (
    <div className={styles.iotPage}>
      <Header />
      <main className={styles.mainContent}>
        <section className={styles.heroSection}>
          <h1>THỰC HÀNH CHUYÊN NGHÀNH HỆ THỐNG IoT</h1>
          <div className={styles.mainImage}>
            <img src={anh} alt="IoT Practice" />
          </div>
        </section>

        <section className={styles.projectsSection}>
          <h2>Bài tập thực hành</h2>
          <p>Các bài tập thực hành giúp sinh viên nắm vững kiến thức và kỹ năng IoT</p>
          
          <div className={styles.projectsGrid}>
            {projects.map(project => (
              <div key={project.id} className={styles.projectCard}>
                <div className={styles.imageWrapper}>
                  <img src={project.image} alt={project.title} />
                </div>
                <div className={styles.content}>
                  <h3>{project.title}</h3>
                  <button onClick={() => navigate(project.route)}>
                    Chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IoTPage;
