import { Navbar, Sidebar } from "@/components/navigations";

const PageLayout = () => {
  return (
    <div className="min-h-screen min-w-[360px] select-none flex">
      <Sidebar noWrap />
      <main className="flex flex-col flex-1 min-h-full">
        <Navbar />
        <div className="flex-1 p-10">
          <div className="w-full h-48 bg-orange-400" />
          <div className="w-full h-48 bg-orange-400" />
          <div className="w-full h-48 bg-orange-400" />
          <div className="w-full h-48 bg-orange-400" />
          <div className="w-full h-48 bg-orange-400" />
          <div className="w-full h-48 bg-orange-400" />
          <div className="w-full h-48 bg-orange-400" />
          <div className="w-full h-48 bg-orange-400" />
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
