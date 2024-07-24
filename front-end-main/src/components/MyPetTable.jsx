import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteForever, Edit } from "@mui/icons-material";
import { Link, useNavigate, useSubmit } from "react-router-dom";

const MyPetTable = ({ petData }) => {
  const submit = useSubmit();
  const navigate = useNavigate();

  const startDeleteHandler = (id) => {
    const proceed = window.confirm(
      "Are you sure you would like to delete this pet?"
    );

    // calling action in OwnerHome.jsx
    if (proceed) {
      submit({ data: id }, { method: "DELETE", data: id });
    }
  };

  const editHandler = (id) => {
    navigate(`registerPet/?mode=edit`, { state: { mode: id } });
  };

  const rows = petData.map((pet, index) => ({
    id: pet.petid,
    species: pet.species,
    breed: pet.breed,
    petName: pet.petname,
    microchipNumber: pet.microchip,
    desexed: pet.desexed,
  }));

  const MyBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
    height: 400,
    width: "100%",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    border: "1px solid #002664",
    color: "#002664",
    borderRadius: "3px",
    maxWidth: "854px",
  });

  const columns = [
    {
      field: "species",
      headerName: "Species",
      width: 120,
      headerClassName: "customHeader",
    },
    {
      field: "breed",
      headerName: "Breed",
      width: 120,
      editable: false,
      headerClassName: "customHeader",
    },
    {
      field: "petName",
      headerName: "Pet's Name",
      width: 120,
      editable: false,
      headerClassName: "customHeader",
    },
    {
      field: "microchipNumber",
      headerName: "Microchip Number",
      sortable: false,
      width: 170,
      headerClassName: "customHeader",
    },
    {
      field: "desexed",
      headerName: "Desexed",
      width: 120,
      editable: false,
      headerClassName: "customHeader",
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      cellClassName: "delete",
      headerClassName: "customHeader",
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <DeleteForever
          fontSize="medium"
          onClick={() => startDeleteHandler(params.id)}
          sx={{
            "&:hover": {
              cursor: "pointer",
              backgroundColor: "lightgray",
              borderRadius: "50%",
            },
          }}
        >
          Delete
        </DeleteForever>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      cellClassName: "actions",
      headerClassName: "customHeader",
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Edit
          onClick={() => editHandler(params.id)}
          sx={{
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "lightgray",
              borderRadius: "50%",
            },
          }}
        >
          Edit
        </Edit>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 5,
        }}
      >
        {" "}
        <MyBox
          style={{
            width: "100%",
            marginTop: 50,
            marginBottom: 60,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            className="box"
            sx={{
              "& .MuiSvgIcon-root": {
                color: "grey",
              },
            }}
            initialState={{
              ...rows.initialState,
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 15]}
          />
          <Link
            to={`registerPet/?mode=add`}
            className="backButton"
            style={{
              width: 150,
            }}
          >
            Add New Pet
          </Link>
        </MyBox>
      </div>
    </>
  );
};

export default MyPetTable;
