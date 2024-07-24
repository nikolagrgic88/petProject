import { useState, useEffect } from "react";
import { Form, Link, useNavigation, useRouteError } from "react-router-dom";
import styles from "../style/OwnerDetailsForm.module.css";
import useInputValidation from "../hooks/use-InputValidation";

const OwnerDetailsForm = ({ method, details }) => {
  const [isEditing, setIsEditing] = useState(true);
  const error = useRouteError();
  const [userDetails, setUserDetails] = useState(
    error ? error.data.formData : ""
  );
  const navigation = useNavigation();

  const {
    inputError: postcodeError,
    textError: postCodeTextError,
    checkInput: postCodeCheckInput,
  } = useInputValidation();

  const {
    inputError: mobileInputError,
    textError: mobileTextError,
    checkInput: mobileCheckInput,
  } = useInputValidation();

  const {
    inputError: homePhoneInputError,
    textError: homePhoneTextError,
    checkInput: homePhoneCheckInput,
  } = useInputValidation();

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    method === "PATCH" ? setIsEditing(true) : setIsEditing(false);
  }, [isEditing, method]);

  useEffect(() => {
    if (error && error.data.message) {
      const timer = setTimeout(() => {
        setUserDetails("");
      }, 8000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [error]);

  const getDefaultValue = (field, details, userDetails) =>
    details ? details[field] : userDetails ? userDetails[field] : "";

  const today = new Date();
  const minBirthdate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  var dob;
  var formatted;

  if (details) {
    dob = new Date(details.dateofbirth);
    formatted = new Date(dob.getFullYear(), dob.getMonth(), dob.getDate());
  }
  const formattedDob = details ? formatted.toISOString().split("T")[0] : "";
  const minBirthdateString = minBirthdate.toISOString().split("T")[0];

  return (
    <div className={styles.formContainer}>
      <div className={styles.errorContainer}>
        {userDetails && (
          <div className={styles.errorBubble}>{error.data.message}</div>
        )}
      </div>
      <Form method={method} className={styles.form}>
        <div className={styles.formGroup}>
          <div className={styles.formLeft}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              defaultValue={getDefaultValue("firstname", details, userDetails)}
              readOnly={isEditing}
              required
            />
          </div>
          <div className={styles.formRight}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              defaultValue={getDefaultValue("lastname", details, userDetails)}
              placeholder="Last Name"
              readOnly={isEditing}
              required
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.formLeft}>
            <label htmlFor="dob">DOB</label>
            <input
              type="date"
              name="dob"
              id="dob"
              defaultValue={formattedDob}
              max={minBirthdateString}
              readOnly={isEditing}
              required
            />
          </div>
          <div className={styles.formRight}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className={error ? styles.errorInput : ""}
              defaultValue={getDefaultValue(
                "emailaddress",
                details,
                userDetails
              )}
              placeholder="Email"
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.formLeft}>
            <label htmlFor="streetNumber">Street Number</label>
            <input
              type="text"
              name="streetNumber"
              id="streetNumer"
              defaultValue={getDefaultValue(
                "streetnumber",
                details,
                userDetails
              )}
              placeholder="Street Number"
              required
            />
          </div>
          <div className={styles.formRight}>
            <label htmlFor="streetName">Street Name</label>
            <input
              type="text"
              name="streetName"
              id="streetName"
              defaultValue={getDefaultValue("streetname", details, userDetails)}
              placeholder="Street Name"
              required
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.formLeft}>
            <label htmlFor="streetType">Street Type</label>
            <input
              type="text"
              name="streetType"
              id="streetType"
              placeholder="Street Type"
              defaultValue={getDefaultValue("streettype", details, userDetails)}
              required
            ></input>
          </div>
          <div className={styles.formRight}>
            <label htmlFor="suburb">Suburb</label>
            <input
              type="text"
              name="suburb"
              id="suburb"
              defaultValue={getDefaultValue("suburb", details, userDetails)}
              placeholder="Suburb"
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.formLeft}>
            <label htmlFor="state">State</label>
            <select
              name="state"
              placeholder="State"
              id="state"
              defaultValue={getDefaultValue("state", details, userDetails)}
              required
            >
              <option value="NSW">NSW</option>
              <option value="VIC">VIC</option>
              <option value="QLD">QLD</option>
              <option value="SA">SA</option>
              <option value="WA">WA</option>
              <option value="TAS">TAS</option>
              <option value="NT">NT</option>
              <option value="ACT">ACT</option>
            </select>
          </div>
          <div className={styles.formRight}>
            <label htmlFor="postcode">Postcode</label>
            <div className={styles.innerInput}>
              <input
                type="number"
                name="postcode"
                onChange={(e) => postCodeCheckInput(e, 4, "Postcode")}
                className={postcodeError ? styles.errorInput : ""}
                defaultValue={getDefaultValue("postcode", details, userDetails)}
                placeholder="Postcode"
                required
              />
              {postcodeError && (
                <div className={styles.textError}>{postCodeTextError}</div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.formLeft}>
            <label htmlFor="mobileNumber">Mobile Number</label>
            <div className={styles.innerInput}>
              <input
                type="text"
                name="mobileNumber"
                id="mobileNumber"
                defaultValue={getDefaultValue(
                  "mobilephone",
                  details,
                  userDetails
                )}
                onChange={(e) => mobileCheckInput(e, 12, "Mobile Number")}
                className={mobileInputError ? styles.errorInput : ""}
                placeholder="Mobile Number"
                pattern="[0-9]{4} [0-9]{3} [0-9]{3}"
                required
              />
              {mobileInputError ? (
                <div className={styles.textError}>{mobileTextError}</div>
              ) : (
                <div style={{ fontSize: 12 }}>format: XXXX XXX XXX</div>
              )}
            </div>
          </div>
          <div className={styles.formRight}>
            <label htmlFor="homePhone">Home Phone</label>
            <div className={styles.innerInput}>
              <input
                type="text"
                name="homePhone"
                className={homePhoneInputError ? styles.errorInput : ""}
                onChange={(e) =>
                  homePhoneCheckInput(e, 12, "Home phone number")
                }
                defaultValue={getDefaultValue(
                  "homephone",
                  details,
                  userDetails
                )}
                placeholder="Home Phone"
                pattern="[0-9]{2} [0-9]{4} [0-9]{4}"
                required
              />
              {homePhoneInputError ? (
                <div className={styles.textError}>{homePhoneTextError}</div>
              ) : (
                <div style={{ fontSize: 12 }}>format: XX XXXX XXXX</div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button
            type="submit"
            className={styles.saveButton}
            disabled={mobileInputError || homePhoneInputError || postcodeError}
          >
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
          <Link
            to={method === "PATCH" ? "../?mode=search" : "../search"}
            className={styles.backButton}
          >
            Back
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default OwnerDetailsForm;
