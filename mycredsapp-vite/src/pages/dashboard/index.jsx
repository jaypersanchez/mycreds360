import StatsWidget from "./components/stats";

export default function Dashboard() {
  return (
    <div>
      <h2 className="pb-6 text-2xl font-bold">
        Hi <span className="text-primary">FName</span>, Welcome Back!
      </h2>

      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-4">
        <StatsWidget
          title="Total active users"
          stats="12,000"
          increment="up"
          percentage="2%"
        />
        <StatsWidget
          title="Total in-active users"
          stats="40"
          increment="down"
          percentage="0.1%"
        />
        <StatsWidget
          title="Total badge issued"
          stats="3"
          increment="up"
          percentage="0.05%"
        />
        <StatsWidget
          title="Total certificate issued"
          stats="40"
          increment="up"
          percentage="2%"
        />
      </div>
    </div>
  );
}
