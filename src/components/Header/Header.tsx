import React, { Fragment, useState } from "react";
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/configStore";
import { Dropdown, Menu, Space, message } from "antd";
import { NavLink } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { history } from "../../util/config";
import { logout } from "../../redux/UserReducer/UserReducer";
import logo from "../../assets/img/logo120.png";
import { MenuOutlined } from "@ant-design/icons";

const Header: React.FC = () => {
  const role = useSelector((state: RootState) => state.UserReducer.role);
  // const email = useSelector((state: RootState) => state.UserReducer.email);
  const [email, setEmail] = useState<string>('B20DCVT199');
  const dispatch: DispatchType = useDispatch();
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState<boolean>(false);

  const handlAdminClick = () => {
    if (role !== "ROLE_ADMIN") {
      message.error("Bạn không có quyền truy cập trang này");
      return;
    }

    history.push("/admin");
  };

  const handLogout = () => {
    dispatch(logout());
  };

  const menu = (
    <Menu>
      <Menu.Item key="admin">
        <span className="text-decoration-none" onClick={handlAdminClick}>
          Trang Admin
        </span>
      </Menu.Item>
      <Menu.Item key="chat">
        <a href="/boxchat" target="_blank" className="text-decoration-none">
          Trợ giảng lab
        </a>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handLogout}>
        <span className="text-decoration-none">Đăng xuất</span>
      </Menu.Item>
    </Menu>
  );

  const navigationMenu = (
    <Menu>
      <Menu.Item key="intro">
        <NavLink to="/">Trang chủ</NavLink>
      </Menu.Item>
      <Menu.Item key="devices">
        <NavLink to="/gateway">Quản lý thiết bị</NavLink>
      </Menu.Item>
      <Menu.Item key="practice">
        <NavLink to="/iot">Thực hành</NavLink>
      </Menu.Item>
      <Menu.Item key="apis">
        <NavLink to="/dashboard">APIs</NavLink>
      </Menu.Item>
      <Menu.Item key="mqtt">
        <NavLink to="/broker">MQTT Client</NavLink>
      </Menu.Item>
      <Menu.Item key="report">
        <NavLink to="/report">Báo cáo</NavLink>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className={styles.headerContainer}>
      <div className={styles.topBar}>
        <Dropdown overlay={menu}>
          <div className={styles.userInfo}>
            <Space>
              {email}
              <DownOutlined />
            </Space>
          </div>
        </Dropdown>
      </div>

      <div className={styles.mainHeader}>
        <div className={styles.brand}>
          <img src={logo} alt="PTIT Logo" />
          <div className={styles.schoolName}>
            <div className={styles.primaryName}>
              HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG
            </div>
            <div className={styles.secondaryName}>
              Posts and Telecommunications Institute of Technology
            </div>
          </div>
        </div>

        <div className={styles.mobileMenu}>
          <Dropdown overlay={navigationMenu} trigger={['click']}>
            <MenuOutlined />
          </Dropdown>
        </div>
      </div>

      <nav className={styles.navigation}>
        <NavLink to="/" className={styles.navLink}>Trang chủ</NavLink>
        <NavLink to="/gateway" className={styles.navLink}>Quản lý thiết bị</NavLink>
        <NavLink to="/iot" className={styles.navLink}>Thực hành</NavLink>
        <NavLink to="/dashboard" className={styles.navLink}>APIs</NavLink>
        <NavLink to="/broker" className={styles.navLink}>MQTT Client</NavLink>
        <NavLink to="/report" className={styles.navLink}>Báo cáo</NavLink>
      </nav>

      <div className={styles.redLine}></div>
    </header>
  );
};

export default Header;
