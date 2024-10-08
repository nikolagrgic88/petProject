import { json, redirect, useRouteLoaderData } from "react-router-dom";
import Components from "../components";

const Authentication = () => {
  const token = useRouteLoaderData("root");
  return (
    <div>
      {token ? <Components.OwnerFinderForm /> : <Components.AuthForm />}
    </div>
  );
};

export default Authentication;
export const action = async ({ request }) => {
  const data = await request.formData();

  const searchParams = new URL(request.url).searchParams;

  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode" }, { status: 422 });
  }

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(`http://localhost:8080/auth/${mode}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(authData),
  });
  if ((response.status === 422, response.status === 401)) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  if (mode === "login") {
    const token = resData.token;
    localStorage.setItem("token", token);
    return redirect("../search");
  }
  return redirect("?mode=login");
};
