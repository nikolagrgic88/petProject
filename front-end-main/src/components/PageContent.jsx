import { Link } from "react-router-dom";
import styles from "../style/PageContent.module.css";

function PageContent({ title, children }) {
  return (
    <div className={styles.content}>
      <h1>{title}</h1>
      {children}
      <div className={styles.buttonContainer}>
        <Link to=".." className={styles.backButton}>
          Back
        </Link>
      </div>
    </div>
  );
}

export default PageContent;
