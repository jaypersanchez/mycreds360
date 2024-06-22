import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

const TextField = ({
  label,
  id,
  name,
  type,
  classNameVariant = "default",
  className,
  icon,
  password,
  noTextHelper = false,
  noFloatingLabel = false,
  ...props
}) => {
  return (
    <div className="w-full">
      <div className="relative flex flex-col group">
        <input
          type={type}
          name={name}
          id={id}
          autoComplete={props.autoComplete}
          className={cn(
            "relative py-2.5 pt-2.5 h-14 w-full text-base bg-transparent rounded-md border-1 appearance-none focus:outline-none focus:ring-0 border shadow-sm peer select-none text-neutral-500 placeholder:text-neutral-400 focus:text-neutral-900 group-hover:text-neutral-900",
            "read-only:group-hover:border-neutral-400 read-only:cursor-default read-only:select-none read-only:focus:border-neutral-400 read-only:!text-neutral-400",
            "disabled:cursor-default disabled:group-hover:border-neutral-400 disabled:border-neutral-400 disabled:!text-neutral-400",
            props.error
              ? "border-red-500 group-hover:border-red-400"
              : "border-neutral-400 group-hover:border-neutral-900 focus:border-neutral-600",
            icon?.left
              ? "px-3.5 pl-11"
              : icon?.right
              ? "px-3.5 pr-11"
              : "px-3.5",
            classNameVariant === "default" && className
          )}
          placeholder={props.placeholder ?? " "}
          {...props}
        />

        {!noFloatingLabel && (
          <label
            htmlFor={id}
            className={cn(
              "absolute text-neutral-400 text-base font-semibold duration-300 -translate-y-3.5 scale-90 top-1 z-20 origin-[0] bg-white px-2 group-hover:text-neutral-900 select-none left-3",
              "peer-focus:px-2 peer-focus:text-neutral-900 peer-focus:-translate-y-3.5 peer-focus:top-1 peer-focus:scale-90",
              "peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2",
              "peer-read-only:text-neutral-500 leading-none",
              "peer-disabled:-translate-y-4 peer-disabled:scale-90 peer-disabled:top-1",
              "peer-read-only:-translate-y-4 peer-read-only:scale-90 peer-read-only:top-1 peer-read-only:peer-focus:text-neutral-500",
              props.error
                ? "text-red-600 group-hover:text-red-500"
                : props.disabled &&
                    "text-neutral-400 group-hover:text-neutral-400",
              props.required &&
                "after:content-['*'] after:ml-1 after:text-sm after:text-red-500",
              icon?.left &&
                "left-2 peer-focus:left-2 peer-placeholder-shown:left-9",
              classNameVariant === "label" && className
            )}
          >
            {label}
          </label>
        )}

        {label && noFloatingLabel && (
          <label
            htmlFor={id}
            className={cn(
              "text-neutral-500 font-semibold px-1 peer-focus:text-neutral-900 select-none group-hover:text-neutral-900 peer-read-only:text-neutral-500 mb-1 order-first",
              props.error
                ? "text-red-600 group-hover:text-red-500"
                : props.disabled &&
                    "text-neutral-400 group-hover:text-neutral-500",
              props.required &&
                "after:content-['*'] after:ml-1 after:text-sm after:text-red-600"
            )}
          >
            {label}
          </label>
        )}

        {icon?.left && (
          <icon.left
            className={cn(
              "absolute left-0 bottom-4 h-6 w-6 z-10 mx-3 text-neutral-900 hover:text-neutral-500 peer-focus:text-neutral-400",
              icon.className
            )}
          />
        )}

        {password && icon?.right && (
          <button
            type="button"
            onClick={icon.onClick}
            className={cn(
              "absolute right-0 bottom-4 h-6 w-6 z-10 mx-3 text-neutral-900 hover:text-neutral-500 peer-focus:text-neutral-400",
              icon.className
            )}
          >
            <icon.right className="w-full h-full" />
          </button>
        )}

        {!password && icon?.right && (
          <icon.right
            className={cn(
              "absolute right-0 bottom-4 h-6 w-6 z-10 mx-3 text-neutral-900 group-hover:text-neutral-500 peer-focus:text-neutral-400",
              icon.className
            )}
          />
        )}
      </div>

      {!noTextHelper && (
        <p
          className={cn(
            "my-1 ml-1 text-xs font-medium h-4",
            props.error ? "text-red-500" : "text-neutral-500",
            props.error ?? props.description ? "visible" : "invisible"
          )}
        >
          {props.error ?? props.description}
        </p>
      )}
    </div>
  );
};

TextField.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "email", "number", "password", "tel"])
    .isRequired,
  className: PropTypes.string,
  classNameVariant: PropTypes.string,
  placeholder: PropTypes.oneOf(["default", "label"]),
  required: PropTypes.bool,
  error: PropTypes.string,
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  icon: PropTypes.object,
  right: PropTypes.any,
  left: PropTypes.any,
  password: PropTypes.bool,
  description: PropTypes.string,
  noTextHelper: PropTypes.bool,
  noFloatingLabel: PropTypes.bool,
};

export default TextField;
