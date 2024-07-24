import { useEffect, useState } from "react";
import {
  json,
  Outlet,
  useLoaderData,
  useSearchParams,
  redirect,
} from "react-router-dom";
import Components from "../components";
import { getAuthToken } from "../util/auth";

const OwnerHome = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showComponents, setShowComponents] = useState();

  const { ownerData, petData } = useLoaderData();

  useEffect(() => {
    if (searchParams.get("mode") === "search") {
      setShowComponents(true);
    }
  }, [searchParams]);

  const mode = searchParams.get("mode");
  const isEdit = mode === "edit" || mode === "add";
  const isSaving = mode === "update" || mode === "create";

  return (
    <div>
      {!isEdit && showComponents && (
        <Components.OwnerDetailsDisplay details={ownerData} />
      )}
      {!isEdit && showComponents && <Components.MyPetTable petData={petData} />}

      {!showComponents && (
        <Components.SuccessMessage
          ownersDetails={ownerData}
          isSaving={isSaving}
          onCountdownComplete={() => {
            setShowComponents(true);
          }}
        />
      )}
      <Outlet />
    </div>
  );
};
export default OwnerHome;

export const loader = async ({ params }) => {
  const token = getAuthToken();

  if (!token) {
    return redirect("/");
  }

  const response = await fetch(
    `http://localhost:8080/petregistry/findpetowner/${params.ownerId}`
  );
  const petResponse = await fetch(
    `http://localhost:8080/petregistry/pet/${params.ownerId}`
  );

  if (!response.ok) {
    throw json(
      { message: `Couldnt find owner with ${params.ownerId} ID` },
      { status: 500 }
    );
  }
  if (!petResponse.ok) {
    throw json(
      { message: `Couldnt find pets for owner with an ID ${params.ownerId}` },
      { status: 500 }
    );
  }
  const ownerData = await response.json();
  const petData = await petResponse.json();

  return { ownerData, petData };
};

export const action = async ({ params, request }) => {
  const data = await request.formData();
  const petId = data.get("data");

  //calling getAuthToken from util function
  const token = getAuthToken();
  const response = await fetch(
    `http://localhost:8080/petregistry/deletepet/${petId}`,
    {
      method: request.method,
    }
  );

  if (!response.ok) {
    throw json({ message: `Couldn't delete pet` }, { status: 500 });
  }
  return redirect(`/ownerHome/${params.ownerId}/?mode=search`);
};
