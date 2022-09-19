import { useCallback, useState } from "react";

export function useKeywords(initialValue) {
  const [values, setValues] = useState(initialValue ?? []);

  const addKeyword = useCallback((keyword) => {
    setValues((values) => [...values, keyword]);
  }, []);

  const deleteKeyword = useCallback((deleteKeyword) => {
    setValues((prev) => {
      let modified = [...prev];
      modified = modified.filter((keyword) => keyword !== deleteKeyword);
      return modified;
    });
  }, []);

  const reset = useCallback(() => setValues({}), []);

  return { values, addKeyword, deleteKeyword, reset };
}
//선택한 키워드 저장할 때 사용하는 훅.
//선호 키워드할 때는 mode prop을 'like'
//불호 키워드할 때는 mode props을 'hate'로 전달해주면 됨.
