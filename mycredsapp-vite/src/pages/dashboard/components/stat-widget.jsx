import { FlexBox, FlexCenter, FlexCol } from "@/components/flexbox";
import { WidgetBox } from "@/components/ui";

import TrendUpIcon from "~icons/custom/trend-up";
import TrendDownIcon from "~icons/custom/trend-down";

export default function StatWidget({ title, stats, increment, percentage }) {
  const isTrendUp = increment === "up";
  const isTrendDown = increment === "down";
  return (
    <WidgetBox className="w-full min-h-36">
      <FlexCol className="flex-1">
        <h4 className="flex-1 font-semibold">{title}</h4>
        <h2 className="pt-4 pb-2 text-3xl font-bold">{stats}</h2>
        <FlexBox className="gap-0.5">
          {isTrendUp && <TrendUpIcon className="h-4 text-green-600" />}
          {isTrendDown && <TrendDownIcon className="h-4 text-red-600" />}
          <h2 className="text-xs font-semibold">{percentage}</h2>
        </FlexBox>
      </FlexCol>

      {/* add icons/graphics here */}
    </WidgetBox>
  );
}
