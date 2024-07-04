import PropTypes from "prop-types";
import { cn } from "@/lib/utils";
import {
  SelectContainer,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui";

export default function SelectField({
  label,
  id,
  name,
  placeholder,
  className,
  icon,
  noTextHelper = false,
  noFloatingLabel = false,
  disabled = false,
  readOnly = false,
  value,
  onValueChange,
  options,
  ...props
}) {
  console.log({ value });
  return (
    <div className="w-full">
      <div className="relative flex flex-col group">
        <SelectContainer value={value} onValueChange={onValueChange}>
          <SelectTrigger
            id={id}
            name={name}
            className={cn(
              "peer w-full border rounded-md h-14 disabled:cursor-default disabled:!border-neutral-600 [&>span]:disabled:!text-neutral-600",
              "[&>span]:text-base [&>span]:text-neutral-400 [&>span]:group-hover:text-neutral-900",
              "[&>svg]:w-6 [&>svg]:h-6",
              "[&>span]:data-[state=open]:text-neutral-900 data-[state=open]:border-neutral-900 [&>span]:data-[placeholder]:!text-neutral-400",
              icon?.icon ? "px-3.5 pl-11" : "px-3.5",
              props.error
                ? "border-red-500 group-hover:border-red-400"
                : "border-neutral-400 group-hover:border-neutral-900",
              className?.trigger ?? ""
            )}
            disabled={disabled || readOnly}
            {...props}
          >
            <SelectValue placeholder={placeholder ?? ""} />
          </SelectTrigger>
          <SelectContent>
            {options.map((item, i) => (
              <SelectItem
                key={i}
                value={item.value}
                className="mb-1 [&:last-child]:mb-0"
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectContainer>

        {!noFloatingLabel && (
          <label
            htmlFor={id}
            className={cn(
              "absolute text-neutral-500 text-base font-semibold duration-300 -translate-y-4 scale-90 top-1 z-20 origin-[0] bg-white px-2 group-hover:text-neutral-900 select-none left-3",
              "peer-data-[state=open]:px-2 peer-data-[state=open]:text-neutral-900 peer-data-[state=open]:-translate-y-4 peer-data-[state=open]:top-1 peer-data-[state=open]:scale-90",
              "peer-data-[placeholder]:scale-100 peer-data-[placeholder]:-translate-y-1/2 peer-data-[placeholder]:top-1/2",
              "peer-disabled:-translate-y-4 peer-disabled:scale-90 peer-disabled:top-1 peer-disabled:!text-neutral-500",
              props.error
                ? "text-red-600 group-hover:text-red-500"
                : props.disabled &&
                    "text-neutral-400 group-hover:text-neutral-400",
              props.required &&
                "after:content-['*'] after:ml-1 after:text-sm after:text-red-500",
              icon?.left &&
                "left-2 peer-focus:left-2 peer-data-[placeholder]:left-9",
              className?.label ?? ""
            )}
          >
            {label}
          </label>
        )}

        {label && noFloatingLabel ? (
          <label
            htmlFor={id}
            className={cn(
              "text-neutral-500 font-semibold px-1 peer-data-[state=open]:text-neutral-900 select-none group-hover:text-neutral-900 mb-1 order-first",
              props.error
                ? "!text-red-600 group-hover:!text-red-500"
                : props.disabled &&
                    "text-neutral-400 group-hover:text-neutral-500",
              props.required &&
                "after:content-['*'] after:ml-1 after:text-sm after:text-red-600",
              className?.label ?? ""
            )}
          >
            {label}
          </label>
        ) : null}

        {icon?.icon ? (
          <icon.icon
            className={cn(
              "absolute left-0 bottom-4 h-6 w-6 z-10 mx-3 text-neutral-500 group-hover:text-neutral-900 peer-data-[state=open]:text-neutral-900",
              icon?.className ?? ""
            )}
          />
        ) : null}
      </div>

      {!noTextHelper && !readOnly && (
        <p
          className={cn(
            "mt-1 ml-1 text-xs font-medium h-4",
            props.error ? "text-red-500" : "text-neutral-500",
            props.error ?? props.description ? "visible" : "invisible"
          )}
        >
          {props.error ?? props.description}
        </p>
      )}
    </div>
  );
}

SelectField.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.shape({
    trigger: PropTypes.string,
    label: PropTypes.string,
  }),
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  icon: PropTypes.shape({
    icon: PropTypes.any,
    className: PropTypes.string,
  }),
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  noTextHelper: PropTypes.bool,
  noFloatingLabel: PropTypes.bool,
};
