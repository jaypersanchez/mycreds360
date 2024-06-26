import { Outlet, useNavigation } from "react-router-dom";

export default function RootLayout() {
  const navigation = useNavigation();

  if (navigation.state !== "idle") {
    return (
      <div className="absolute inset-x-0 text-lg bg-yellow-500">Loading...</div>
    );
  }

  sessionStorage.setItem("user", JSON.stringify([{ id: 123, name: "romar" }]));
  return (
    <>
      <Outlet />
    </>
  );
}
