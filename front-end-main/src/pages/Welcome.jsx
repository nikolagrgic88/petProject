import styles from "../style/Welcome.module.css";
import { Link, NavLink } from "react-router-dom";
const Welcome = () => {
  return (
    <div className={styles.outerMain}>
      <div className={styles.mainBox}>
        <div className={styles.heading}>
          <div>
            <h1>Welcome to the NSW Pet Registry</h1>
          </div>
          <div>
            <p>
              The NSW Pet Registry is a database of microchipped and registered
              cats and dogs that live in NSW.
            </p>
          </div>
          <div className={styles.linkHeading}>
            <NavLink to="auth/?mode=login" className={styles.button}>
              Register
            </NavLink>
          </div>
        </div>
        <div className={styles.outerWrapper}>
          <div className={styles.imageContainer}>
            <div className={styles.image}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
