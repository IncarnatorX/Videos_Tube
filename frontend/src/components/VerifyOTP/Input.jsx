import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

const Input = ({ num }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (num === 1) inputRef.current.focus();
  }, [num]);

  function handleChange(event) {
    let { value } = event.target;

    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    event.target.value = value;

    if (value && inputRef.current.nextSibling) {
      inputRef.current.nextSibling.focus();
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Backspace" && !event.target.value) {
      inputRef.current.previousSibling &&
        inputRef.current.previousSibling.focus();
    }
  }

  return (
    <input
      ref={inputRef}
      id={`input${num}`}
      name={num}
      type="number"
      maxLength="1"
      className="w-10 h-10 text-center border-b-2 border-t-0 border-x-0 border-b-[#d2d2d2] outline-none hide-arrow"
      required
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};

Input.propTypes = {
  num: PropTypes.number,
};

export default Input;
