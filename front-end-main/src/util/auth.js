import { redirect } from "react-router-dom";

export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const loader = () => {
  return getAuthToken();
};

export const checkAuthLoader = () => {
  const token = getAuthToken();

  if (!token) {
    return redirect("/");
  }
  return null;
};
