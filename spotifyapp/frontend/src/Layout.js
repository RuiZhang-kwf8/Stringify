import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* This is where the pages load */}
      </main>
    </div>
  );
};

export default Layout;
