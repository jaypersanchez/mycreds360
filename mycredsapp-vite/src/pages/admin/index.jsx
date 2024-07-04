import { Outlet } from "react-router-dom";

export default function Admin() {
  return (
    <div className="container overflow-hidden">
      <Outlet />
    </div>
  );
}
