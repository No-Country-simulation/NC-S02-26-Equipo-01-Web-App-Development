import { Outlet } from "react-router";
import Footer from "./Footer";

export default function RootLayout() {
  return (
    <div className="min-h-screen min-w-full flex flex-col overflow-x-hidden">
      <div className="grow">
        <Outlet />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
