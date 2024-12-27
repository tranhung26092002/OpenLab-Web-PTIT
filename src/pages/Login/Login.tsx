import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/UserReducer/UserReducer";
import { DispatchType } from "../../redux/configStore";
import styles from "./Login.module.scss";
import { notification } from "antd";
import Footer from "../../components/Footer/Footer";
import anhtrai from "../../assets/img/login_left.jpg";
import anhphai from "../../assets/img/login_right.png";

type Props = {};

export const Login: React.FC<Props> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch: DispatchType = useDispatch();

  const handlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const loginData = {
      email: email,
      password: password,
    };

    dispatch(loginUser(loginData))
      .then((action: any) => {
        if (action.payload.status === 200) {
          //Dang nhap thanh cong xac thuc firebase
          notification.success({
            message: "Thành công",
            description: "Đăng nhập thành công!",
          });
        } else {
          notification.error({
            message: "Lỗi",
            description: "Đăng nhập thất bại. Vui lòng thử lại!",
          });
        }
      })
      .catch((error) => {
        // Xử lý trường hợp gặp lỗi khi gọi API
        notification.error({
          message: "Lỗi",
          description: "Đăng nhập thất bại. Vui lòng thử lại!",
        });
      });
    // // console.log("loginData", loginData);
  };

  return (
    <div className={styles.loginPage}>
      <main className={styles.mainContainer}>
        <div className={styles.header}>
          <h1>IoT LAB</h1>
        </div>
        
        <div className={styles.content}>
          <div className={styles.imageLeft}>
            <img src={anhtrai} alt="PTIT IoT Lab" />
          </div>
          
          <div className={styles.loginForm}>
            <form onSubmit={handlSubmit}>
              <div className={styles.formGroup}>
                <label>Tài khoản:</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Mật khẩu:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Đăng nhập</button>
            </form>
          </div>
          
          <div className={styles.imageRight}>
            <img src={anhphai} alt="PTIT IoT Lab" />
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        THỰC HÀNH CHUYÊN NGHÀNH HỆ THỐNG IoT
      </footer>
    </div>
  );
};
