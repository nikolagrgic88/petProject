import { Link } from "react-router-dom";
import styles from "../style/OwnerDetailsDisplay.module.css";

const OwnerDetailsDisplay = ({ details }) => {
  const originalDate = new Date(details.dateofbirth);
  const dd = String(originalDate.getDate()).padStart(2, "0");
  const mm = String(originalDate.getMonth() + 1).padStart(2, "0");
  const yyyy = originalDate.getFullYear();
  const formattedDate = `${dd}-${mm}-${yyyy}`;

  return (
    <div className={styles.pageContainer}>
      <h2>Owner Details</h2>
      <div className={styles.detailsContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.groupLeft}>
            <div className={styles.detailGroup}>
              <label>First Name:</label>
              <span>{details.firstname}</span>
            </div>
            <div className={styles.detailGroup}>
              <label>Date of Birth:</label>
              <span>{formattedDate}</span>
            </div>
            <div className={styles.detailGroup}>
              <label>Street Number:</label>
              <span>{details.streetnumber}</span>
            </div>
            <div className={styles.detailGroup}>
              <label>Street Type:</label>
              <span>{details.streettype}</span>
            </div>
            <div className={styles.detailGroup}>
              <label>State:</label>
              <span>{details.state}</span>
            </div>
            <div className={styles.detailGroup}>
              <label>Mobile Number:</label>
              <span>{details.mobilephone}</span>
            </div>
          </div>
          <div className={styles.groupRight}>
            <div className={styles.detailGroup}>
              <label>Last Name:</label>
              <span>{details.lastname}</span>
            </div>
            <div className={styles.detailGroup}>
              <label>Email:</label>
              <span>{details.emailaddress}</span>
            </div>
            <div className={styles.detailGroup}>
              <label>Street Name:</label>
              <span>{details.streetname}</span>
            </div>
            <div className={styles.detailGroup}>
              <label>Suburb:</label>
              <span>{details.suburb}</span>
            </div>
            <div className={styles.detailGroup}>
              <label>Postcode:</label>
              <span>{details.postcode}</span>
            </div>
            <div className={styles.detailGroup}>
              <label>Home Phone:</label>
              <span>{details.homephone}</span>
            </div>
          </div>
        </div>
        <div className={styles.linkBtn}>
          <Link to={`editOwner/?mode=edit`} className={styles.backButton}>
            Edit
          </Link>
          <Link to="../search" className={styles.backButton}>
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OwnerDetailsDisplay;
