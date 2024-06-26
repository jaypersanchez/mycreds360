import {
  Outlet,
  useRouteLoaderData,
  useNavigation,
  Link,
} from "react-router-dom";
import Footer from "./Footer";

export default function AuthLayout() {
  const data = useRouteLoaderData("main");
  const navigation = useNavigation();

  console.log({ auth: data });
  return (
    <div className="flex">
      <div className="relative flex-1 hidden w-0 max-w-sm bg-left bg-no-repeat bg-cover bg-login laptop:block desktop:max-w-7xl scale-x-[-1]" />
      <div className="min-h-screen flex flex-col px-1 select-none min-w-[375px] max-w-7xl desktop:max-w-4xl flex-1 mx-auto">
        <div className="w-full max-w-lg px-4 pt-8 mx-auto tablet:px-6 laptop:px-8">
          <div className="block">
            <img src="/logo.png" className="w-64" />
          </div>
        </div>
        <section className="flex flex-col justify-center flex-grow w-full max-w-xl px-4 py-6 mx-auto tablet:px-6 laptop:px-8">
          <div className="px-4 py-12 bg-gray-900 border shadow-md tablet:px-6 laptop:px-8 bg-opacity-10 border-white/20 rounded-xl shadow-gray-600">
            <Outlet />
          </div>
        </section>
        <div className="w-full max-w-lg px-8 mx-auto tablet:px-2 laptop:px-0">
          <Footer />
        </div>
      </div>
    </div>
  );
}
