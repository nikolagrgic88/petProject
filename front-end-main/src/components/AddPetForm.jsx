import { useEffect, useState } from "react";
import {
  Form,
  Link,
  useSearchParams,
  useLocation,
  useRouteLoaderData,
  useRouteError,
} from "react-router-dom";
import styles from "../style/AddPetForm.module.css";
import dogSvg from "../img/dog.svg";
import catSvg from "../img/cat.svg";

const AddPetForm = () => {
  const [image, setImage] = useState(null);

  const [isEditing, setIsEditing] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [method, setMethod] = useState("");
  const [pet, setPet] = useState("Dog");
  const location = useLocation();
  const { petData } = useRouteLoaderData("owner-details");
  const error = useRouteError();
  const mode = searchParams.get("mode");
  const [userDetails, setUserDetails] = useState(
    error ? error.data.formData : ""
  );

  const id = location.state?.mode || {};
  const details = petData.find((pet) => pet.petid == id);

  const today = new Date();
  const minBirthdate = new Date(
    today.getFullYear(),
    today.getMonth() - 6,
    today.getDate()
  );
  const minBirthdateString = minBirthdate.toISOString().split("T")[0];

  var dob;
  var formatted;

  if (details) {
    dob = new Date(details.dateofbirth);
    formatted = new Date(dob.getFullYear(), dob.getMonth(), dob.getDate());
  }

  const formattedDob = details ? formatted.toISOString().split("T")[0] : "";

  useEffect(() => {
    if (mode === "add") {
      setIsEditing(false);
      setMethod("POST");
    } else if (mode === "edit") {
      setIsEditing(true);
      setMethod("PATCH");
    }
  }, [method, isEditing, mode]);

  const getDefaultValue = (field) =>
    details ? details[field] : userDetails ? userDetails[field] : "";

  const handleImageInputChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div>
      <div className={styles.headingContainer}>
        <h2>Pet Details</h2>
      </div>

      <Form method={method}>
        <div className={styles.mainContainer}>
          <div className={styles.container}>
            <div className={styles.left}>
              <div className={styles.photo}>
                <label htmlFor="photo">
                  <input
                    id="photo"
                    name="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleImageInputChange}
                    defaultValue={details ? details.photo : null}
                    disabled={isEditing}
                  />
                </label>
                <div className={styles.photoBox}>
                  {pet === "Dog" ? (
                    <img src={dogSvg} alt="Dog" style={{ padding: 10 }} />
                  ) : (
                    <img src={catSvg} alt="Cat" style={{ padding: 10 }} />
                  )}
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <input
                id="petid"
                name="petid"
                defaultValue={getDefaultValue("petid")}
                hidden
              ></input>
              <div className={styles.inputGroup}>
                <label htmlFor="microchip">Microchip Number:</label>
                <input
                  type="number"
                  id="microchip"
                  name="microchip"
                  placeholder="Microchip Number"
                  className={error ? styles.errorInptu : ""}
                  defaultValue={getDefaultValue("microchip")}
                  minLength="6"
                  maxLength="6"
                  required
                  readOnly={isEditing}
                />
                {error && (
                  <p className={styles.errorText}>{error.data.message}</p>
                )}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="species">Species:</label>
                <select
                  id="species"
                  name="species"
                  defaultValue={getDefaultValue("species")}
                  required
                  onChange={(e) => setPet(e.target.value)}
                  disabled={isEditing}
                >
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                </select>
              </div>
              <input
                name="species"
                defaultValue={getDefaultValue("species")}
                disabled={!isEditing}
                hidden
              ></input>
              <div className={styles.inputGroup}>
                <label htmlFor="breed">Breed:</label>
                <input
                  type="text"
                  id="breed"
                  name="breed"
                  placeholder="Breed"
                  defaultValue={getDefaultValue("breed")}
                  required
                  readOnly={isEditing}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  max={minBirthdateString}
                  defaultValue={formattedDob}
                  required
                  readOnly={isEditing}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="petName">Pet Name:</label>
                <input
                  type="text"
                  id="petName"
                  name="petName"
                  placeholder="Pet Name"
                  defaultValue={getDefaultValue("petname")}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="gender">Gender:</label>
                <select
                  id="gender"
                  name="gender"
                  defaultValue={getDefaultValue("gender")}
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="desexed">Desexed:</label>
                <select
                  id="desexed"
                  name="desexed"
                  defaultValue={getDefaultValue("desexed")}
                  required
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="identifyingMarks">Identifying Marks:</label>
                <textarea
                  id="identifyingMarks"
                  name="identifyingMarks"
                  placeholder="Identifying Marks"
                  defaultValue={getDefaultValue("identifyingmarks")}
                ></textarea>
              </div>
              <div className={styles.inputGroup}>
                <button type="submit" className={styles.registerPetButton}>
                  {isEditing ? "Save Changes" : "Register Pet"}
                </button>
                <Link to="../?mode=search" className={styles.registerPetButton}>
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>{" "}
      </Form>
    </div>
  );
};

export default AddPetForm;
