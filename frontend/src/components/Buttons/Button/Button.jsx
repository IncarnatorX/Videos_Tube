import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const Button = ({ children, className, ...props }) => {
  const mergedClassNames = twMerge(
    "rounded-md text-white bg-blue-600 px-2 py-1.5 cursor-pointer",
    className
  );

  return (
    <button className={mergedClassNames} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Button;
