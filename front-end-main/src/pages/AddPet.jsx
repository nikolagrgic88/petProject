import { json, redirect } from "react-router-dom";
import AddPetForm from "../components/AddPetForm";
import { getAuthToken } from "../util/auth";

const AddPet = () => {
  return (
    <div>
      <AddPetForm />
    </div>
  );
};

export default AddPet;

export const action = async ({ request, params }) => {
  const method = request.method;
  const data = await request.formData();

  const petDetails = {
    petid: parseInt(data.get("petid")),
    microchip: parseInt(data.get("microchip")),
    dateofbirth: data.get("dateOfBirth"),
    species: data.get("species"),
    breed: data.get("breed"),
    petname: data.get("petName"),
    gender: data.get("gender"),
    desexed: data.get("desexed"),
    identifyingmarks: data.get("identifyingMarks"),
  };
  const petid = parseInt(data.get("petid"));
  const ownerId = parseInt(params.ownerId);

  var url = `http://localhost:8080/petregistry/addpet/${ownerId}`;
  if (method === "PATCH") {
    url = `http://localhost:8080/petregistry/updatepet/${petid}`;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(petDetails),
  });

  console.log(response);
  if (response.status === 402 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    const errorData = {
      message: "The Microchip Number Has Already Been Registered!",
      formData: petDetails,
    };
    throw json(errorData, { status: 500 });
  }

  return redirect(`/ownerHome/${params.ownerId}/?mode=search`);
};
