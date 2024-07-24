import { Link, useRouteLoaderData } from "react-router-dom";
import styles from "../style/DropdownMenu.module.css";

function DropdownMenu({token}) {
  return (
    <div className={styles.dropdownMenu}>
      {token && (
        <Link to={"registerOwner"} className={styles.dropdownItem}>
          Register
        </Link>
      )}
      {!token && (
        <Link to="/auth/?mode=login" className={styles.dropdownItem}>
          Login
        </Link>
      )}
      {token && (
        <Link to={"search"} className={styles.dropdownItem}>
          Home
        </Link>
      )}
    </div>
  );
}

export default DropdownMenu;
