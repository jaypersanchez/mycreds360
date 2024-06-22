import { FlexBox } from "@/components/flexbox";
import { WidgetBox } from "@/components/ui";
import StatWidget from "./components/stat-widget";

export default function Dashboard() {
  return (
    <div>
      <h2 className="pb-6 text-2xl font-bold">
        Hi <span className="text-primary">FName</span>, Welcome Back!
      </h2>
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-4">
        <StatWidget
          title="Total active users"
          stats="12,000"
          increment="up"
          percentage="2%"
        />
        <StatWidget
          title="Total in-active users"
          stats="40"
          increment="down"
          percentage="0.1%"
        />
        <StatWidget
          title="Total student"
          stats="3"
          increment="up"
          percentage="0.05%"
        />
        <StatWidget
          title="Total badge"
          stats="40"
          increment="up"
          percentage="2%"
        />
      </div>
      {/* <div className="w-full h-48 bg-orange-400" />
      <div className="w-full h-48 bg-orange-400" />
      <div className="w-full h-48 bg-orange-400" />
      <div className="w-full h-48 bg-orange-400" />
      <div className="w-full h-48 bg-orange-400" />
      <div className="w-full h-48 bg-orange-400" />
      <div className="w-full h-48 bg-orange-400" />
      <div className="w-full h-48 bg-orange-400" />
      <div className="w-full h-48 bg-orange-400" />
      <div className="w-full h-48 bg-orange-400" />
      <div className="w-full h-48 bg-orange-400" />
      <div className="w-full h-48 bg-orange-400" />
      <div className="w-full h-48 bg-orange-400" />
      <div className="w-full h-48 bg-orange-400" />
      <div className="w-full h-48 bg-orange-400" />
      <div className="w-full h-48 bg-orange-400" /> */}
    </div>
  );
}
