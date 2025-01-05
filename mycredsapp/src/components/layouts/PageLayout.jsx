import { Outlet } from "react-router-dom";

import { Navbar, Sidebar } from "@/components/navigations";
import Footer from "./Footer";

export default function PageLayout() {
  return (
    <div className="min-h-screen min-w-[360px] select-none flex">
      <Sidebar noWrap />
      <main className="flex flex-col flex-1 min-h-full">
        <Navbar />
        <div className="flex-1 p-10">
          <Outlet />
        </div>
        <Footer className="justify-end" />
      </main>
    </div>
  );
}
