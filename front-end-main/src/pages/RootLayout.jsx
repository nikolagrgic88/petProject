import { Outlet } from "react-router-dom";
import Components from "../components/index";

const RootLayout = () => {
  return (
    <div>
      <Components.MainNavigation />
      <Outlet />
      <Components.Footer />
    </div>
  );
};
export default RootLayout;
