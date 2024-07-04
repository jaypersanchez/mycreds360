import { FlexBox, FlexCol } from "@/components/flexbox";
import { StatusWidget } from "@/components/widgets";

export default function Dashboard() {
  return (
    <div>
      <h2 className="pb-6 text-2xl font-bold">
        Hi <span className="text-primary">FName</span>, Welcome Back!
      </h2>
      <FlexCol className="gap-4">
        <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-4">
          <StatusWidget
            title="Total active users"
            stats="12,000"
            increment="up"
            percentage="2%"
          />
          <StatusWidget
            title="Total in-active users"
            stats="40"
            increment="down"
            percentage="0.1%"
          />
          <StatusWidget
            title="Total badge issued"
            stats="3"
            increment="up"
            percentage="0.05%"
          />
          <StatusWidget
            title="Total certificate issued"
            stats="40"
            increment="up"
            percentage="2%"
          />
        </div>
        <div className="w-full h-48 bg-orange-400" />
      </FlexCol>
    </div>
  );
}
