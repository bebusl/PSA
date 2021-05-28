import { useState, useCallback } from "react";

function useKeywords(initialValues) {
  const [values, setValues] = useState(initialValues);

  //   const onChange = useCallback((e) => {
  //     const { name, value } = e.target;
  //     setValues((values) => ({ ...values, [name]: value }));
  //   }, []);

  //   const onFileChange = useCallback((e) => {
  //     setValues((values) => ({ ...values, ["file"]: e.target.file[0] }));
  //   }, []);

  const likeButton = useCallback((keyword) => {
    setValues((values) => ({
      ...values,
      likeword: [...values.likeword, keyword],
    }));
  }, []);

  const deleteLikeKeyword = (Keyword) => {
    let modified = values.likeword;
    console.log("likeword삭제!", values);
    modified = modified.filter((keyword) => keyword !== Keyword);
    setValues((values) => ({
      ...values,
      likeword: modified,
    }));
  };

  const hateButton = useCallback((keyword) => {
    setValues((values) => ({
      ...values,
      hateword: [...values.hateword, keyword],
    }));
  }, []);

  const deleteHateKeyword = (Keyword) => {
    let modified = values.hateword;
    modified = modified.filter((keyword) => keyword !== Keyword);
    setValues((values) => ({
      ...values,
      hateword: modified,
    }));
  };

  const setHateMode = useCallback(() => {
    setValues((values) => ({ ...values, isLikeSelect: false }));
  }, []);

  const reset = useCallback(() => setValues(initialValues), [initialValues]);
  return {
    values,
    likeButton,
    hateButton,
    deleteLikeKeyword,
    deleteHateKeyword,
    reset,
    setHateMode,
  };
}

export default useKeywords;
