import styles from "../style/MainNavigation.module.css";
import { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Form, Link, NavLink, useRouteLoaderData } from "react-router-dom";

const MainNavigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const token = useRouteLoaderData("root");

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={styles.mainHeader}>
      <div className={styles.topHeaderContainer}>
        <div className={styles.topHeader}>
          <div className={styles.headerLeft}>
            {" "}
            <Link to="/">
              <div className={styles.logoBig}></div>
            </Link>
          </div>
          <div className={styles.headerRight}>
          <Link to="search">
              <div className={styles.logoPetBig}></div>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.header}>
        <div className={styles.logoSmall}></div>
        <div className={styles.logoPetContainer}>
        <Link to="search">
            <div className={styles.logoPet}></div>
          </Link>
        </div>

        <div className={styles.headerContainer}>
          <div className={styles.buttonContainer}>
            {token && (
              <NavLink
                to={"/search"}
                className={({ isActive }) =>
                  isActive ? styles.active : styles.button
                }
              >
                Home
              </NavLink>
            )}
          </div>
          <div className={styles.rightContainer}>
            {" "}
            <div className={styles.menuButton} onClick={toggleMenu}>
              <MenuOutlinedIcon
                className={styles.icon}
                sx={{ width: 70, height: 75 }}
              />
            </div>
            <div className={styles.buttonContainer}>
              {token && (
                <NavLink
                  to={"/registerOwner"}
                  className={({ isActive }) =>
                    isActive ? styles.active : styles.button
                  }
                >
                  Register
                </NavLink>
              )}
              {!token && (
                <NavLink
                  to="auth/?mode=login"
                  className={({ isActive }) =>
                    isActive ? styles.active : styles.button
                  }
                >
                  Login
                </NavLink>
              )}
              {token && (
                <Form
                  action="/logout"
                  method="post"
                  className={styles.formContainer}
                >
                  <button className={styles.logoutBtn}>Logout</button>
                </Form>
              )}
            </div>
            {showMenu && <DropdownMenu token={token} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
