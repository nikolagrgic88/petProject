import {
  createBrowserRouter,
  Navigate,
  useRouteLoaderData,
} from "react-router-dom";

import { action as ownerDetailsAction } from "../pages/OwnerDetails";
import { action as addPetAction } from "../pages/AddPet";
import { action as deletePetAction } from "../pages/OwnerHome";
import { action as authAction } from "../pages/Authentication";
import { action as logoutAction } from "../pages/Logout";
import { checkAuthLoader, loader as tokenLoader } from "../util/auth";
import RootLayout from "../pages/RootLayout";
import { loader as userLoader } from "../pages/OwnerHome";

import Pages from "../pages/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <RootLayout />,
    errorElement: <Pages.Error />,
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <Pages.Welcome />,
      },
      {
        path: "auth",
        element: <Pages.Authentication />,
        action: authAction,
        errorElement: <Pages.Authentication />,
      },
      {
        path: "search",
        element: <Pages.PetOwnerFinder />,
        errorElement: <Pages.Error />,
        loader: checkAuthLoader,
      },
      {
        path: "registerOwner",
        element: <Pages.OwnerDetails />,
        action: ownerDetailsAction,
        loader: checkAuthLoader,
        errorElement: <Pages.OwnerDetails />,
      },
      {
        path: "ownerHome/:ownerId",
        element: <Pages.OwnerHome />,
        id: "owner-details",
        loader: userLoader,
        errorElement: <Pages.Error />,
        action: deletePetAction,
        children: [
          {
            path: "registerPet",
            element: <Pages.AddPet />,
            action: addPetAction,
            errorElement: <Pages.AddPet />,
            loader: checkAuthLoader,
          },

          {
            path: "editOwner",
            element: <Pages.EditOwnerDetails />,
            errorElement: <Pages.Error />,
            action: ownerDetailsAction,
            loader: checkAuthLoader,
          },
        ],
      },

      {
        path: "error",
        element: <Pages.Error />,
        errorElement: <Pages.Error />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);
export default router;
