import { useEffect, useState } from "react";

const useInputValidation = () => {
  const [max, setMax] = useState(10);
  const [field, setField] = useState();
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState(false);
  const [textError, setTextError] = useState("");

  const checkInput = (e, max, field) => {
    setInputValue(e.target.value);
    setMax(max);
    setField(field);
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValue.length === 0) {
        setInputError(false);
        setTextError("");
      } else if (inputValue.length > max) {
        setInputError(true);
        setTextError(`${field} is too long!`);
      } else if (inputValue.length < max) {
        setInputError(true);
        setTextError(`${field} is too short!`);
      } else {
        setInputError(false);
        setTextError("");
      }
    }, 700);

    return () => clearTimeout(timeoutId);
  }, [inputValue, max, field]);

  return {
    inputValue,
    inputError,
    textError,
    checkInput,
  };
};

export default useInputValidation;
