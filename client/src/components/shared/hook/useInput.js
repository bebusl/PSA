import { useState, useCallback } from "react";

function useInput(initialValues) {
  const [values, setValues] = useState(initialValues);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setValues((values) => ({ ...values, [name]: value }));
  }, []);

  const onFileChange = useCallback((e) => {
    setValues((values) => ({ ...values, ["file"]: e.target.file[0] }));
  }, []);

  const KeywordButton = useCallback((keyword) => {
    setValues((values) => ({
      ...values,
      likeword: [...values.likeword, keyword],
    }));
  }, []);

  const reset = useCallback(() => setValues(initialValues), [initialValues]);
  return { values, onChange, onFileChange, KeywordButton, reset };
}

export default useInput;
