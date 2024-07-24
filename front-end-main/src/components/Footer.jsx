import { Link } from "react-router-dom";
import styles from "../style/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.outerFooter}>
      <div className={styles.footerContainer}>
        <footer className={styles.footer}>
          <div className={styles.footerLogo}></div>
          <nav className={styles.footerNav}>
            <ul>
              <li>
                <Link>About Pet Registry</Link>
              </li>
              <li>
                <Link>Contact Us</Link>
              </li>
              <li>
                <Link>FAQ</Link>
              </li>
            </ul>
          </nav>
        </footer>
      </div>
    </div>
  );
};
export default Footer;
