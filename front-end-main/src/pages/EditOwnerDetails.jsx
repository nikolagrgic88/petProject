import { useRouteLoaderData } from "react-router-dom";
import Components from "../components/index";
import styles from "../style/OwnerPage.module.css";

const EditOwnerDetails = () => {
  const { ownerData, petData } = useRouteLoaderData("owner-details");

  return (
    <div className={styles.ownerContainer}>
      <div className={styles.ownerText}>
        <h2>Edit Details</h2>
      </div>
      <div className={styles.ownerForm}>
        <Components.OwnerDetailsForm method={"PATCH"} details={ownerData} />
      </div>
    </div>
  );
};

export default EditOwnerDetails;
