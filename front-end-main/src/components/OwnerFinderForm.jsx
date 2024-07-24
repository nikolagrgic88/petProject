import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../style/PetOwnerFinder.module.css";

const OwnerFinderForm = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    const cleanedSearchValue = searchValue.trim().replace(/["']/g, " ");
    if (cleanedSearchValue.trim().includes("@")) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/petregistry/findbyemail`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(searchValue.trim()),
          }
        );

        if (response.ok) {
          const data = await response.json();
          navigate(`/ownerHome/${data.petownerid}/?mode=search`);
        } else {
          setError("Owner not found");
        }
      } catch (error) {
        setError("Error fetching owner data");
      } finally {
        setIsLoading(false);
      }
    } else {
      navigate(`/ownerHome/${parseInt(searchValue)}/?mode=search`);
    }
  };
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>Welcome to NSW Pet Registry</h1>
      <div className={styles.container}>
        <h2>Find Pet Owner</h2>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search By Email or Id"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={handleSearch} className={styles.searchButton}>
          {isLoading ? "Loading..." : "Search"}
        </button>
        <div className={styles.paragraph}>
          <p>or</p>
        </div>
        <Link to={"../registerOwner"} className={styles.createButton}>
          Create New Owner
        </Link>
      </div>
    </div>
  );
};

export default OwnerFinderForm;
