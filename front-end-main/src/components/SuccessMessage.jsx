import { useEffect, useState } from "react";
import styles from "../style/Message.module.css";
const SuccessMessage = ({ isSaving, onCountdownComplete, ownersDetails }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (isSaving) {
      const intervalId = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(intervalId);
        onCountdownComplete();
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [isSaving]);

  return isSaving ? (
    <div className={styles.pageContainer}>
      <h1 className={styles.successMessage}>
        {isSaving === "update"
          ? "Owner Successfully Updated"
          : "Owner Successfully Created"}
      </h1>
      <p>
        Congratulations!{" "}
        {isSaving === "update"
          ? "owner has been successfully updated"
          : `${ownersDetails.firstname} ${ownersDetails.lastname} has been successfully created`}
        .
      </p>
      <h3>You'll be redirected to the home page in {count}...</h3>
    </div>
  ) : null;
};

export default SuccessMessage;
