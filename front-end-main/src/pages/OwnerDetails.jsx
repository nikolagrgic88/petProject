import { json, redirect } from "react-router-dom";
import Components from "../components/index";
import styles from "../style/OwnerPage.module.css";
import { getAuthToken } from "../util/auth";

const OwnerDetails = () => {
  return (
    <div className={styles.ownerContainer}>
      <div className={styles.ownerText}>
        <h2>Register New Pet Owner</h2>
      </div>
      <div className={styles.ownerForm}>
        <Components.OwnerDetailsForm method={"POST"} />
      </div>
    </div>
  );
};

export default OwnerDetails;

export const action = async ({ request, params }) => {
  const method = request.method;
  const data = await request.formData();
  const ownerDetails = {
    firstname: data.get("firstName"),
    lastname: data.get("lastName"),
    dateofbirth: data.get("dob"),
    emailaddress: data.get("email"),
    streetnumber: data.get("streetNumber"),
    streetname: data.get("streetName"),
    streettype: data.get("streetType"),
    suburb: data.get("suburb"),
    state: data.get("state"),
    postcode: parseInt(data.get("postcode")),
    mobilephone: data.get("mobileNumber"),
    homephone: data.get("homePhone"),
  };

  var url = "http://localhost:8080/petregistry/addpetowner";
  if (method === "PATCH") {
    const ownerId = params.ownerId;
    url = `http://localhost:8080/petregistry/updatepetowner/${ownerId}`;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ownerDetails),
  });

  if (response.status === 402 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    const errorData = {
      message: "The email address is already in use!",
      formData: ownerDetails,
    };
    throw json(errorData, { status: 500 });
  }
  const responseData = await response.json();

  if (method === "PATCH") {
    return redirect(`/ownerHome/${responseData.petownerid}/?mode=update`);
  } else if (method === "POST") {
    return redirect(`/ownerHome/${responseData.petownerid}/?mode=create`);
  }
};
