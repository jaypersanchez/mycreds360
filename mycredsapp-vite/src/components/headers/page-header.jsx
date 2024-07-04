import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

import { FlexBox } from "../flexbox";
import { Button } from "../ui";

import BackspaceIcon from "~icons/custom/backspace";

export default function PageHeader({
  title,
  canGoBack = false,
  onGoBack,
  className,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const rootLocation = location.pathname.split("/").at(1).toString();

  console.log({ ddd: location.state?.prevPath, rootLocation });

  const handleGoBack = () => {
    if (onGoBack) onGoBack();

    if (location.state?.prevPath) {
      navigate(location.state.prevPath, { replace: true });
    } else {
      navigate(`/${rootLocation}`, { replace: true });
    }
  };

  return (
    <FlexBox className={cn("gap-3", className)}>
      {canGoBack && (
        <Button
          variant="icon"
          className="w-8 h-8 px-1 hover:bg-primary hover:text-white"
          onClick={handleGoBack}
        >
          <BackspaceIcon className="w-10 h-10" />
        </Button>
      )}
      <h1 className="text-2xl font-bold">{title}</h1>
    </FlexBox>
  );
}
