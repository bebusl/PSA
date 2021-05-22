import { useState, useCallback } from "react";

function useInput(initialValues) {
  const [values, setValues] = useState(initialValues);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((values) => ({ ...values, [name]: value }));
  }, []);

  const onFileChange = useCallback((e) => {
    setValues((values) => ({ ...values, ["file"]: e.target.file[0] }));
  }, []);

  const reset = useCallback(() => setValues(initialValues), [initialValues]);
  return [values, onChange, onFileChange, reset];
}

export default useInput;
