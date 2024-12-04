import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/UserReducer/UserReducer";
import { DispatchType } from "../../redux/configStore";
import styles from "./Login.module.scss";
import { notification } from "antd";
import Footer from "../../components/Footer/Footer";

// import { auth } from '../../util/firebase';
// import { signInWithCustomToken } from 'firebase/auth';

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
    <Fragment>
      <div className={styles.mainContainer}>
        <div className={styles.contentCenter}>
          <div className="text-center text-danger">
            <h1>IoT LAB</h1>
          </div>
          <div className={styles.logoContainer}>
            <div className={styles.logoLeft}>
              <img
                src={require("../../assets/img/login_left.jpg")}
                alt="logo_left"
              />
            </div>
            <div className={styles.loginContainer}>
              <form onSubmit={handlSubmit}>
                <div className="mb-4">
                  <label>User:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label>Password:</label>
                  <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                </div>
                <button className="bg-danger" type="submit">
                  Đăng nhập
                </button>
              </form>
            </div>
            <div className={styles.logoRight}>
              <img
                src={require("../../assets/img/login_right.png")}
                alt="logo_right"
              />
            </div>
          </div>
        </div>
        <div className={styles.footerContainer}>
          THỰC HÀNH CHUYÊN NGHÀNH HỆ THỐNG IoT
        </div>
      </div>
    </Fragment>
  );
};
